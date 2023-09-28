import { batch } from "dignals";

import { sendChatCompletions } from "$/api/completions";
import ReactivePromise from "$/services/ReactivePromise";

import { GPTDialogHistoryData, GPTDialogHistoryType, GPTRoles } from "./types";
import { GptMessage, GptMessageBuilder } from "./GptMessage";
import { TimerBuilder } from "$/entity/GPT/Timer";
import { lessonsController, ModeType } from "$/entity/lessons";
import { createHistory } from "$/api/history";
import { createMessage, getMessagesById } from "$/api/messages";
import { History } from "$/entity/history";
import { snackbarNotify } from "$/entity/notify";
import { interviews } from "$/entity/interview";
import { leetCode } from "$/entity/leetCode/LeetCode";
import { groupsService } from "$/services/GroupsService";

const MAX_CONTEXT_WORDS = 1000;

export abstract class ChatGptTemplate {
  currentHistory: History | null = null;
  initialSystemContent = "";
  delayTimeout: NodeJS.Timeout | null = null;
  abortController = new AbortController();

  $isBlockActions = false;
  $messages: GptMessage[] =[];
  $isDelay = false;

  systemMessage = GptMessageBuilder.create(this.initialSystemContent, GPTRoles.system);
  timer = TimerBuilder.create(20, 0, "decrement");

  sendCompletions$ = ReactivePromise.create(() => {
    this.delayTimeout = setTimeout(() => this.$isDelay = true, 8000);

    return this.sendCompletion();
  });

  createHistory$ = ReactivePromise.create(createHistory);

  getMessages$ = ReactivePromise.create(getMessagesById);

  get $selectedMessages() {
    return this.$messages.filter((message) => message.$isSelected)
  }
  get $getRunOutOfContextMessages() {
    return this.$messages.filter((message) => message.$isRunOutOfContext)
  }
  get $getIsNotRunOutOfContextMessages() {
    return this.$messages.filter((message) => !message.$isRunOutOfContext)
  }
  get $hasSelectedMessages() {
    return this.$selectedMessages.length !== 0;
  }


  init() {
    if (groupsService.isDon) {
      this.timer.setDisabled();
    }
  }

  closeDelay() {
    this.delayTimeout && clearTimeout(this.delayTimeout);
    this.$isDelay = false;
  }

  clearMessages = () => {
    this.abortSend();
    this.$messages = [];
    this.currentHistory = null;
  };

  setInitialSystemMessage(message: string = "") {
    this.initialSystemContent = message;
    this.systemMessage = new GptMessage(
      this.initialSystemContent,
      GPTRoles.system
    );
  }

  clearSystemMessage = () => {
    this.systemMessage.setContent("");
  };

  resetSystemMessage = () => {
    this.systemMessage.setContent(this.initialSystemContent);
  };

  abortSend = () => {
    this.abortController.abort();
    this.closeDelay();
  };

  blockActions = () => {
    this.$isBlockActions = true;
  };

  allowActions = () => {
    this.$isBlockActions = false;
  };

  send = async (content: string) => {
    this.sendCompletions$.loading.set(true);
    const message = new GptMessage(content, GPTRoles.user);
    this.addMessage(message);

    try {
      await this.createHistory();
      await this.postMessage(message);

      await this.sendCompletions$.run();
      this.timer.run();

      if (message === this.getLastMessage()) return;
      await this.postMessage(this.getLastMessage());
    } catch {
      this.timer.run();
    } finally {
      this.allowActions();
    }
  };

  private async sendCompletion() {
    const message = new GptMessage("", GPTRoles.assistant);

    this.abortController = new AbortController();

    await this.sendChatCompletions(message);
  }

  async sendChatCompletions(message: GptMessage) {
    const result = await sendChatCompletions(
      { messages: this.getMessages() },
      this.onMessage(message),
      () => {
        this.closeDelay();
        this.addMessage(
          new GptMessage(
            "Сеть ChatGPT перегружена. Попробуйте через минуту",
            GPTRoles.assistant,
            false,
            true
          )
        );
        this.sendCompletions$.reset();
      },
      this.abortController
    );

    this.checkOnRunOutOfMessages();

    return result;
  }

  checkOnRunOutOfMessages() {
    [...this.$messages].reverse().reduce((acc, message) => {
      if (acc > MAX_CONTEXT_WORDS) {
        message.toggleRunOutOff();
        return acc;
      }
      return acc + message.$content.split(" ").length;
    }, 0);
  }

  onMessage = (message: GptMessage) => (value: string, isFirst: boolean) => {
    this.closeDelay();

    if (isFirst) {
      message.onSetMessageContent(value);
      this.addMessage(message);
      return;
    }
    message.onSetMessageContent(value);
  };

  getMessages() {
    if (!this.systemMessage) {
      return this.filterInMemoryMessages(
        this.$getIsNotRunOutOfContextMessages
      ).map(this.toApiMessage);
    }

    return this.filterInMemoryMessages([
      this.systemMessage,
      ...this.$getIsNotRunOutOfContextMessages,
    ]).map(this.toApiMessage);
  }

  clearSelectedMessages = () => {
    batch(() => {
      this.$selectedMessages
        .forEach((message) => message.toggleSelected());
    });
  };

  addMessage(message: GptMessage) {
    console.log("add message", message);
    this.$messages = [...this.$messages, message];
  }

  async postMessage(message?: GptMessage) {
    if (!this.currentHistory || !message) return;

    await createMessage({
      historyId: this.currentHistory.id,
      error: !!message.isError,
      role: message.role,
      content: message.$content,
      isFailedModeration: !message.$failedModeration,
      lastUpdated: new Date(),
      inLocal: !!message.inLocal,
    });
  }

  toApiMessage = (message: GptMessage) => ({
    content: message.$content,
    role: message.role,
  });

  filterInMemoryMessages(messages: GptMessage[]) {
    return messages.filter((message) => !message.inLocal || !message.isError);
  }

  getLastUserMessage() {
    return [...this.$messages]
      .reverse()
      .find((message) => message.role === GPTRoles.user);
  }

  getLastMessage() {
    const messages = this.$messages;
    return messages[messages.length - 1];
  }

  async createHistory() {
    const lastMessage = this.getLastMessage();
    if (!lastMessage) return;

    const data = this.getChatData();

    const type = !data ? GPTDialogHistoryType.Free : data.chapterType;

    const lengthMessages = this.$messages.length;
    if (lengthMessages > 1) return;

    this.currentHistory = await this.createHistory$.run({
      systemMessage: this.systemMessage.$content,
      lastMessage: lastMessage.$content,
      lessonName: data?.lessonName || "",
      lastUpdated: new Date(),
      type,
    });
  }

  getChatData(): GPTDialogHistoryData {
    if (leetCode.currentProblem) {
      return {
        chapterType: ModeType.LeetCode,
        lessonName: leetCode.currentProblemSlug,
      };
    }

    const type = interviews.getCurrentInterview()?.type;

    if (type) return { chapterType: type, lessonName: null };

    const currentChapter = lessonsController.currentChapter.get();
    const currentLesson = lessonsController.currentLesson.get();

    if (!currentChapter?.type || !currentLesson?.name) return null;

    return {
      chapterType: currentChapter.type,
      lessonName: currentLesson.name,
    };
  }

  async prepareDialog(dialog: History) {
    if (dialog.type === ModeType.LeetCode) {
      await leetCode.loadDetailProblem(dialog.lessonName);
    }

    if (dialog.type.includes("INTERVIEW")) {
      interviews.setCurrentInterview(dialog.type as ModeType);
      return;
    }

    if (dialog.lessonName && dialog.type) {
      lessonsController.setCurrentChapter(dialog.type as ModeType);
      lessonsController.setCurrentLessonByName(dialog.lessonName);
      return;
    }

    lessonsController.clearChapter();
    lessonsController.clearLesson();
  }

  //todo рефакторинг
  async restoreDialogFromHistory(dialog: History, goToChat: () => void) {
    this.closeDelay();

    this.currentHistory = dialog;

    const messages = await this.getMessages$.run(dialog.id);

    if (this.getMessages$.error.get()) {
      return snackbarNotify.notify({
        type: "error",
        message: "Ошибка при переходе в диалог",
      });
    }

    await this.prepareDialog(dialog);

    this.initialSystemContent = dialog.systemMessage;
    this.systemMessage = new GptMessage(dialog.systemMessage, GPTRoles.system);

    this.$messages = messages.map((message) => {
      const gptMessage = new GptMessage(
        message.content,
        message.role as GPTRoles,
        false,
        message.error
      );

      gptMessage.$failedModeration = message.isFailedModeration;

      return gptMessage;
    });

    this.checkOnRunOutOfMessages();
    goToChat();
  }
}

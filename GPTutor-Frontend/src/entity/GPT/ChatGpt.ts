import { ChatGptFree } from "$/entity/GPT/ChatGptFree";
import { ChatGptLesson } from "$/entity/GPT/ChatGptLesson";
import { GptHistoryDialogs } from "$/entity/GPT/GptHistoryDialogs";
import { LessonItem, lessonsController, ModeType } from "$/entity/lessons";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { sig } from "dignals";
import { ChatGptInterview, ChatGptInterviewBuilder } from "$/entity/GPT/ChatGptInterview";
import { ChatGptLeetCode } from "$/entity/GPT/ChatGptLeetCode";
import { interviews } from "$/entity/interview";
import { ChatGptTrainer } from "$/entity/GPT/ChatGptTrainer";
import { createReactiveModelBuilder } from "dignals-model";

export class ChatGpt {
  history = new GptHistoryDialogs();
  chatGptFree = new ChatGptFree();

  chatGptLesson = new ChatGptLesson();

  chatGptInterview = ChatGptInterviewBuilder.create();

  chatGptLeetCode = new ChatGptLeetCode();

  chatGptTrainer = new ChatGptTrainer();

  $currentChatGpt: ChatGptTemplate = this.chatGptFree;

  moveToFreeChat = (goToChat: () => void) => {
    lessonsController.clearLesson();
    this.chatGptFree.currentHistory = null;

    this.$currentChatGpt = this.chatGptFree;

    this.chatGptFree.clearMessages();
    this.chatGptFree.abortSend();

    this.chatGptFree.setInitialSystemMessage(
      this.chatGptFree.initialSystemContent
    );

    goToChat();
  };

  moveToLessonChat(lesson: LessonItem, goToChatLesson: () => void) {
    this.chatGptLesson.clearMessages();
    this.chatGptLesson.resetSystemMessage();
    this.chatGptLesson.currentHistory = null;

    this.$currentChatGpt = this.chatGptLesson;
    this.chatGptLesson.setInitialSystemMessage(
      lessonsController.currentChapter.get()?.systemMessage
    );

    lessonsController.setCurrentLesson(lesson.id);

    goToChatLesson();
  }

  moveToInterviewChat(interviewType: string, goToChatInterview: () => void) {
    interviews.setCurrentInterview(interviewType as ModeType);
    this.chatGptInterview.clearMessages();
    goToChatInterview();
  }

  async restoreDialogFromHistory(
    id: string,
    goToChatFree: () => void,
    goToChatLesson: () => void,
    goToChatInterview: () => void,
    goToChatLeetCode: () => void
  ) {
    const dialog = this.history.getDialogById(id);
    if (!dialog) return;

    if (dialog.type === "Free") {
      this.$currentChatGpt = this.chatGptFree;
      await this.chatGptFree.restoreDialogFromHistory(dialog, goToChatFree);
      return;
    }
    if (dialog.type === ModeType.LeetCode) {
      this.$currentChatGpt = this.chatGptLeetCode;
      await this.chatGptLeetCode.restoreDialogFromHistory(
        dialog,
        goToChatLeetCode
      );
      return;
    }

    if (dialog.type.includes("INTERVIEW")) {
      this.$currentChatGpt = this.chatGptInterview;
      await this.chatGptInterview.restoreDialogFromHistory(
        dialog,
        goToChatInterview
      );
    }

    if (dialog.type && dialog.lessonName) {
      this.$currentChatGpt = this.chatGptLesson;
      await this.chatGptLesson.restoreDialogFromHistory(dialog, goToChatLesson);
      return;
    }
  }

  getCurrentChatGpt = () => this.$currentChatGpt;
}

export const chatGpt = createReactiveModelBuilder(ChatGpt).create();

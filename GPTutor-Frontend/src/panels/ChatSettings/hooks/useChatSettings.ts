import { useRef, useState } from "react";
import { useRouter } from "@happysanta/router";
import { snackbarNotify } from "$/entity/notify";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { useNavigationContext } from "$/NavigationContext";

function useChatSettings(chatGpt: ChatGptTemplate) {
  const { openAlert, goBack } = useNavigationContext();

  const router = useRouter();
  const systemMessageContent = chatGpt.systemMessage.$content;
  const systemMessage = systemMessageContent;

  const [systemMessageValue, setSystemMessageValue] = useState(systemMessage);
  const initialMessage = useRef(systemMessage);

  const isDirty = initialMessage.current !== systemMessageValue;

  const isChangedSystemMessage =
    chatGpt.initialSystemContent === systemMessageValue;

  const resetSystemMessage = () => {
    chatGpt.resetSystemMessage();
    setSystemMessageValue(systemMessageContent);
  };

  const clearSystemMessage = () => {
    chatGpt.clearSystemMessage();
    setSystemMessageValue("");
  };

  const updateSystemMessage = (value: string) => {
    setSystemMessageValue(value);
  };

  const onSubmit = () => {
    if (chatGpt.$messages.length === 0) {
      chatGpt.systemMessage.$content = systemMessageValue;
      router.popPage();

      snackbarNotify.notify({
        type: "success",
        message: "Системные настройки успешно изменены",
      });

      return;
    }

    openAlert({
      onAction: applySettings,
      actionText: "Применить настройки",
      header: "Подтвердите действие",
      text: "После изменения системных настроек будет создан новый диалог!",
    });
  };

  const applySettings = () => {
    snackbarNotify.notify({
      type: "success",
      message: "Системные настройки успешно изменены",
    });

    chatGpt.clearMessages();
    chatGpt.systemMessage.$content = systemMessageValue;
    goBack();
    goBack();
  };

  return {
    isDirty,
    systemMessageValue,
    isChangedSystemMessage,
    clearSystemMessage,
    resetSystemMessage,
    updateSystemMessage,
    onSubmit,
  };
}

export default useChatSettings;

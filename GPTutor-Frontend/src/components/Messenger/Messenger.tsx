import React, { memo, useEffect } from "react";

import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { subscriptionsController } from "$/entity/subscriptions";

import { Header } from "./Header";
import { MessengerContainer } from "./MessengerContainer";
import { MessengerList } from "./MessengerList";
import { MessengerWriteBar } from "./MessengerWriteBar";
import { AppContainer } from "../AppContainer";

import { useMessenger } from "./hooks/useMessenger";
import ScrollDown from "./ScrollDown";
import { Files } from "$/components/Files";

import classes from "./Messenger.module.css";
import { Button, Placeholder } from "@vkontakte/vkui";
import { Icon48PictureOutline } from "@vkontakte/icons";

interface IProps {
  hideDeleteDialog?: boolean;
  goBack: () => void;
  chatGpt: ChatGptTemplate;

  onStartChat: () => void;

  writeBarBefore: React.ReactNode;

  additionalRequest: (
    handleSend: (value: string) => void,
    scrollToBottom: () => void
  ) => React.ReactNode;

  placeholderHeader?: string;
  startText?: string;
  startIsDisabled?: boolean;
  placeholderText?: string;
}

function Messenger({
  goBack,
  chatGpt,
  onStartChat,
  writeBarBefore,
  additionalRequest,
  placeholderHeader,
  startText,
  startIsDisabled,
  placeholderText,
  hideDeleteDialog,
}: IProps) {
  const { isTyping, scrollRef, showScrollDown, handlerSend, scrollToBottom } =
    useMessenger({ chatGpt });

  const isDisableSubscription = subscriptionsController.isDisable();

  useEffect(() => {
    if (!isDisableSubscription) {
      chatGpt.disableTimer();
      chatGpt.updateMaxContentWords();
    }
    return () => chatGpt.closeDelay();
  }, [isDisableSubscription]);

  return (
    <AppContainer
      withoutTabbar
      maxHeight
      headerChildren={<Header goBack={goBack} isTyping={isTyping} />}
      style={{ flexDirection: "column-reverse" }}
    >
      <Files
        className={classes.messengerListContainer}
        dragActiveClassName="files-dropzone-active"
        onChange={chatGpt.setFiles}
        onError={(...args) => {
          console.log(args);
        }}
        maxFileSize={10000000}
        minFileSize={0}
        accepts={["image/*"]}
      >
        {(isDragging) => {
          if (isDragging) {
            return (
              <Placeholder
                style={{ marginTop: 46 }}
                icon={<Icon48PictureOutline width={64} height={64} />}
                header="Перетащите фотографию"
              >
                Чтобы прикрепить к сообщению
              </Placeholder>
            );
          }

          return (
            <MessengerContainer withoutDiv ref={scrollRef}>
              <MessengerList
                placeholderText={placeholderText}
                startIsDisabled={startIsDisabled}
                placeholderHeader={placeholderHeader}
                startText={startText}
                chatGpt={chatGpt}
                onStartChat={onStartChat}
              />
              <ScrollDown isShow={showScrollDown} onClick={scrollToBottom} />
            </MessengerContainer>
          );
        }}
      </Files>
      <MessengerWriteBar
        hideDeleteDialog={hideDeleteDialog}
        additionalRequest={additionalRequest}
        scrollToBottom={scrollToBottom}
        writeBarBefore={writeBarBefore}
        chatGpt={chatGpt}
        handleSend={handlerSend}
        isTyping={isTyping}
      />
    </AppContainer>
  );
}

export default memo(Messenger);

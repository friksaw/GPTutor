import { Badge, Tappable, WriteBarIcon } from "@vkontakte/vkui";
import {
  Icon24PicturePlusOutline,
  Icon28SettingsOutline,
} from "@vkontakte/icons";
import React from "react";

import classes from "./ChatFreeWriteBarBefore.module.css";
import { chatGpt } from "$/entity/GPT";
import { Files } from "$/components/Files";

interface IProps {
  onSettingsClick: () => void;
}

function ChatFreeWriteBarBefore({ onSettingsClick }: IProps) {
  return (
    <Tappable>
      <WriteBarIcon className={classes.container}>
        <Files
          className={classes.messengerListContainer}
          dragActiveClassName="files-dropzone-active"
          onChange={(files) => {
            console.log(files);
          }}
          onError={(...args) => {
            console.log(args);
          }}
          maxFileSize={10000000}
          minFileSize={0}
          accepts={["image/*"]}
          clickable
        >
          {() => <Icon24PicturePlusOutline width={28} height={28} />}
        </Files>
        {/*<Icon28SettingsOutline />*/}
        {/*{!chatGpt.hasNewModel && (*/}
        {/*  <Badge mode="prominent" className={classes.badge}>*/}
        {/*    Новый раздел*/}
        {/*  </Badge>*/}
        {/*)}*/}
      </WriteBarIcon>
    </Tappable>
  );
}

export default ChatFreeWriteBarBefore;

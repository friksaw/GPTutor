import React, { memo } from "react";

import { Avatar } from "@vkontakte/vkui";

import { ChatGPTLogo } from "$/icons";
import { GptMessage } from "$/entity/GPT";

interface IProps {
  message: GptMessage;
  photo: string;
}

function MessengerAva({ message, photo }: IProps) {
  return (
    <>
      {message.role === "assistant" ? (
        <Avatar
          size={34}
          fallbackIcon={
            <img
              style={{ borderRadius: "50%" }}
              width={36}
              height={36}
              src="https://i.etsystatic.com/8939817/r/il/f2a7cd/1024896184/il_1588xN.1024896184_m4pv.jpg"
              alt=""
            />
          }
        />
      ) : (
        <Avatar size={36} fallbackIcon={<></>} src={photo} />
      )}
    </>
  );
}

export default memo(MessengerAva);

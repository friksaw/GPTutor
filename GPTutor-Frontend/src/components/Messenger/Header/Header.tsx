import React from "react";

import {
  Avatar,
  classNames,
  PanelHeader,
  PanelHeaderBack,
  Platform,
  Separator,
  SimpleCell,
  Text,
  usePlatform,
} from "@vkontakte/vkui";
import { Icon12OnlineMobile } from "@vkontakte/icons";

import { ChatGPTLogo } from "$/icons";
import { IsTypingLoader } from "$/components/IsTypingLoader";

import classes from "./Header.module.css";
import { AppPanelHeader } from "$/components/AppPanelHeader";

interface IProps {
  goBack: () => void;
  isTyping: boolean;
}

function Header({ goBack, isTyping }: IProps) {
  const platform = usePlatform();

  return (
    <AppPanelHeader
      className={classNames(classes.header, {
        [classes.desktopHeader]: platform === Platform.VKCOM,
        [classes.compactHeader]: platform !== Platform.VKCOM,
      })}
      before={<PanelHeaderBack onClick={goBack} />}
    >
      <SimpleCell
        disabled
        before={
          <Avatar
            size={24}
            fallbackIcon={
              <div className={classes.fallbackIcon}>
                <img
                  style={{ borderRadius: "50%" }}
                  width={36}
                  height={36}
                  src="https://i.etsystatic.com/8939817/r/il/f2a7cd/1024896184/il_1588xN.1024896184_m4pv.jpg"
                  alt=""
                />
              </div>
            }
          />
        }
        // subtitle={
        //   <div className={classes.headerSubtitle}>
        //     {isTyping ? (
        //       <>
        //         <IsTypingLoader />
        //         Печатает
        //       </>
        //     ) : (
        //       <>
        //         онлайн
        //         <Icon12OnlineMobile className={classes.iconMobile} />
        //       </>
        //     )}
        //   </div>
        // }
      >
        <Text weight="1">Master</Text>
      </SimpleCell>
    </AppPanelHeader>
  );
}

export default Header;

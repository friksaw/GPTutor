import React from "react";

import {
  Button,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Title,
} from "@vkontakte/vkui";
import { chatGpt } from "$/entity/GPT";
import HistoryBanner from "$/panels/History/HistoryBanner";
import { AppContainer } from "$/components/AppContainer";

import classes from "./History.module.css";
import { Icon16ChevronLeft, Icon56GhostOutline } from "@vkontakte/icons";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  id: string;
}

function History({ id }: IProps) {
  const { goBack, goToChat } = useNavigationContext();

  const dialogs = chatGpt.history.dialogs.get();

  const history = [...chatGpt.history.dialogs.get()].reverse();

  return (
    <Panel id={id}>
      <AppContainer
        className={classes.mainContainer}
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            <Title level="1">История</Title>
          </PanelHeader>
        }
      >
        {dialogs.length === 0 ? (
          <Placeholder
            className={classes.placeholder}
            icon={<Icon56GhostOutline />}
            header="История диалогов пуста"
            action={
              <Button
                mode="outline"
                before={<Icon16ChevronLeft />}
                onClick={goBack}
              >
                Вернуться назад
              </Button>
            }
          >
            Тут будут отображаться ваши диалоги из всех разделов
          </Placeholder>
        ) : (
          history.map((dialog) => (
            <HistoryBanner
              key={dialog.id}
              dialog={dialog}
              goToChat={goToChat}
            />
          ))
        )}
      </AppContainer>
    </Panel>
  );
}
export default History;

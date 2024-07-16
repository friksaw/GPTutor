import * as React from "react";
import {
  Button,
  Div,
  Panel,
  PanelHeader,
  Placeholder,
  Spacing,
  Textarea,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";

import booksImage from "./images/books.png";

import classes from "./VKDocQuestionPanel.module.css";
import { Icon28MagicWandOutline } from "@vkontakte/icons";
import { vkDocClient } from "$/entity/GPT/VkDocClient";
import { useNavigationContext } from "$/NavigationContext";
import PanelTitle from "$/components/PanelTitle";

interface IProps {
  id: string;
}

function VKDocQuestionPanel({ id }: IProps) {
  const { goToVkDocQuestionRequest } = useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
          <PanelHeader>
            <PanelTitle
              title="Умная документация"
              mobileTitle="Умная документация"
            />
          </PanelHeader>
        }
      >
        <Div className={classes.container}>
          <div className={classes.containerWidth}>
            <Placeholder
              style={{ width: "100%" }}
              icon={<img src={booksImage} />}
              header="Умный поиск по документации"
            />
            <Textarea
              value={vkDocClient.searchValue$.get()}
              onChange={(e) => vkDocClient.searchValue$.set(e.target.value)}
              style={{ width: "100%" }}
              placeholder="Задайте ваш вопрос!"
            />
            <Spacing size={20} />
            <Button
              loading={vkDocClient.loading$.get()}
              size="l"
              mode="outline"
              style={{ width: "100%" }}
              onClick={async () => {
                await vkDocClient.getResult();
                goToVkDocQuestionRequest();
              }}
            >
              Получить ответ ✨
            </Button>
          </div>
        </Div>
      </AppContainer>
    </Panel>
  );
}

export default VKDocQuestionPanel;
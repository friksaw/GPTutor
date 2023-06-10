import React from "react";

import { Panel } from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import Cards from "$/components/Cards";
import { lessonsController } from "$/entity/lessons";
import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";

import FreeDialogBlock from "./FreeDialogBlock";
import HomeHeader from "./HomeHeader";

import classes from "./Home.module.css";

interface IProps {
  id: string;
}

function Home({ id }: IProps) {
  const { goToChapters, goToChatFree } = useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        className={classes.group}
        isSecondary
        headerChildren={<HomeHeader />}
      >
        <Cards
          chapters={lessonsController.chapters}
          isTop
          title="Все темы для обучения"
          onClickChapter={(chapter) => {
            lessonsController.setCurrentChapter(chapter.chapterType);
            goToChapters();
          }}
        />
        <FreeDialogBlock
          goToFreeDialog={() => chatGpt.moveToFreeChat(goToChatFree)}
        />
      </AppContainer>
    </Panel>
  );
}

export default Home;

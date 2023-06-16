import {
  ChatGptIcon,
  GitLesson,
  HtmlCssInterview,
  HtmlCssLesson,
  JSLesson,
  LeetCode,
  ReactLesson,
  TypescriptLesson,
  VueLessons,
} from "$/icons";
import {
  Banner,
  Button,
  ButtonGroup,
  classNames,
  Headline,
  Title,
  useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";

import React from "react";
import { chatGpt } from "$/entity/GPT";
import { ModeType } from "$/entity/lessons";
import { History } from "$/entity/history";

import classes from "./HistoryBanner.module.css";
import { useNavigationContext } from "$/NavigationContext";
import { ErrorBlock } from "$/components/ErrorBlock";

const BannerIcon: Record<string, React.FC> = {
  [ModeType.JS]: JSLesson,
  [ModeType.Typescript]: TypescriptLesson,
  [ModeType.Vue]: VueLessons,
  [ModeType.React]: ReactLesson,
  [ModeType.Git]: GitLesson,
  [ModeType.HTMLCSS]: HtmlCssLesson,
  [ModeType.HTMLCSS_INTERWIEW]: HtmlCssInterview,
  [ModeType.LeetCode]: LeetCode,
};

const chapterNames: Record<string, string> = {
  [ModeType.JS]: "Javascript",
  [ModeType.Typescript]: "Typescript",
  [ModeType.Vue]: "Vue",
  [ModeType.React]: "React",
  [ModeType.Git]: "Git",
  [ModeType.HTMLCSS]: "HTML/CSS",
  [ModeType.HTMLCSS_INTERWIEW]: "Собеседование HTML/CSS",
  [ModeType.LeetCode]: "LeetCode",
};

interface IProps {
  dialog: History;
}

function HistoryBanner({ dialog }: IProps) {
  const { goToChatFree, goToChatLesson, goToChatInterview, goToChatLeetCode } =
    useNavigationContext();

  const chapterType = dialog.type;
  const lessonName = dialog.lessonName;
  const Icon =
    !chapterType || chapterType === "Free"
      ? ChatGptIcon
      : BannerIcon[chapterType];

  const { sizeX } = useAdaptivityWithJSMediaQueries();

  const currentChatGpt = chatGpt.getCurrentChatGpt();

  const isCompact = sizeX === "compact";

  if (chatGpt.history.getHistory$.error.get()) {
    return <ErrorBlock />;
  }

  function getBannerName() {
    if (chapterType && lessonName) {
      return `${chapterNames[chapterType]} : ${lessonName}`;
    }

    if (chapterType === "Free") return "Свободный диалог";

    return chapterNames[chapterType];
  }

  return (
    <Banner
      className={classNames(classes.banner, {
        [classes.compactBanner]: isCompact,
      })}
      before={
        <div
          className={classNames(classes.bannerIcon, {
            [classes.compactBannerIcon]: isCompact,
          })}
        >
          <div
            className={classNames(classes.iconContainer, {
              [classes.compactIconContainer]: isCompact,
            })}
          >
            <Icon />
          </div>
        </div>
      }
      header={<Title level="3">{getBannerName()}</Title>}
      subheader={
        <>
          <span className={classes.lineClamp}>
            <Headline style={{ display: "inline" }} level="2" weight="1">
              Последнее сообщение:
            </Headline>{" "}
            {dialog.lastMessage}
          </span>
          {dialog.lastUpdated && (
            <span className={classes.lineClamp}>
              <Headline style={{ display: "inline" }} level="2" weight="1">
                Последнее обновление:
              </Headline>{" "}
              {new Date(dialog.lastUpdated).toLocaleString()}
            </span>
          )}
        </>
      }
      actions={
        <ButtonGroup mode="vertical">
          <Button
            disabled={currentChatGpt.getMessages$.loading.get()}
            onClick={() => {
              chatGpt.restoreDialogFromHistory(
                dialog.id,
                goToChatFree,
                goToChatLesson,
                goToChatInterview,
                goToChatLeetCode
              );
            }}
          >
            Перейти в диалог
          </Button>
          <Button
            disabled={chatGpt.history.deleteHistory$.loading.get()}
            appearance="negative"
            mode="outline"
            onClick={() => chatGpt.history.removeHistoryDialog(dialog.id)}
          >
            Удалить диалог из истории
          </Button>
        </ButtonGroup>
      }
    />
  );
}

export default HistoryBanner;

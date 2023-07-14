import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Div,
  IconButton,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Select,
  Textarea,
} from "@vkontakte/vkui";
import classes from "./Translator.module.css";
import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { Icon24RepeatOutline } from "@vkontakte/icons";
import { translator } from "$/entity/Translator";

interface IProps {
  id: string;
}

function Translator({ id }: IProps) {
  const ref = useRef<any>(null);
  const ref2 = useRef<any>(null);
  const { goBack } = useNavigationContext();

  const [value, setValue] = useState("");

  // const resultValue = translator.gptInstance.getLastAssistantMessage
  //   .get()
  //   ?.content$.get();
  //
  // useEffect(() => {
  //   translator.translateTextRight.set(resultValue || "");
  // }, [resultValue]);

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Переводчик
          </PanelHeader>
        }
      >
        <div>
          <div>
            <div className={classes.container}>
              <Select
                onChange={(event) =>
                  translator.setLeftValue(event.target.value)
                }
                value={translator.valueLeft$.get()}
                options={translator.languagesLeft$.get()}
              />
              <IconButton onClick={translator.swap}>
                <Icon24RepeatOutline className={classes.swap} />
              </IconButton>
              <Select
                onChange={(event) =>
                  translator.setRightValue(event.target.value)
                }
                value={translator.valueRight$.get()}
                options={translator.languagesRight$.get()}
              />
            </div>
            <div className={classes.containerSend}>
              <Button
                size="m"
                onClick={() => {
                  translator.translate(value);
                }}
              >
                Перевести
              </Button>
            </div>
          </div>
          <div className={classes.containerTranslator}>
            <Textarea
              getRef={ref2}
              onScroll={(event: any) => {
                const scrollTop = event.target.scrollTop;
                const scrollHeight = event.target.scrollHeight;
                const clientHeight = event.target.clientHeight;

                const scrollPercentage =
                  (scrollTop / (scrollHeight - clientHeight)) * 100;

                console.log(scrollPercentage);

                const scrollHeight1 = ref.current.scrollHeight;
                const clientHeight1 = ref.current.clientHeight;
                ref.current.scrollTop =
                  (scrollPercentage / 100) * (scrollHeight1 - clientHeight1);
              }}
              value={translator.translateTextLeft.get()}
              onChange={(e) => {
                console.log(e.target.value);
                translator.translateTextLeft.set(e.target.value);
              }}
              grow
              maxHeight={400}
              placeholder="Начните писать текст"
            />
          </div>
        </div>
        {translator.gptInstance.getLastAssistantMessage.get()?.content$.get()}
      </AppContainer>
    </Panel>
  );
}

export default Translator;

import React, { useEffect, useRef } from "react";
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  useConfigProvider,
} from "@vkontakte/vkui";
// @ts-ignore
import Terminal from "terminal-js-emulator";
import classes from "./ChatTerminal.module.css";
import { chatGpt } from "$/entity/GPT";
import { useEffectSkipFirst } from "$/hooks/useEffectSkipFirst";
import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  id: string;
}

console.log(classes);
function ChatTerminal({ id }: IProps) {
  const { appearance } = useConfigProvider();
  console.log(classes[`cursor-${appearance}`]);
  const { goBack } = useNavigationContext();
  const terminalRef = useRef<any>();

  useEffect(() => {
    const t1 = new Terminal("terminal-1");
    console.log(t1);
    terminalRef.current = t1;
    console.log(classes[`cursor-${appearance}`]);
    t1._input.classList.add(classes.input);
    t1._input.children[2].classList.add(classes[`cursor-${appearance}`]);
    t1._input.style.wordBreak = "break-all";
    t1._input.style.whiteSpace = "normal";
    t1.html.classList.add(classes.terminal);

    t1.print(
      `${""}Чат GPT настроен на режим linux терминала. Сожержимое "Выдуманного" терминала может при каждом запуске отличаться. Вам лишь необходимо использовать фантазию!`
    );
    terminalRef.current.print("_");
    terminalRef.current._output.lastChild.style.opacity = "0";
    function ss(input: string) {
      terminalRef.current._output.lastChild.classList.add(classes.outputInput);
      console.log(input);
      chatGpt.chatGptTerminal.send(input);
      t1.print(" ");
    }

    t1.input("", ss);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (!terminalRef.current) return;

      terminalRef.current._output.lastChild.innerText = chatGpt.chatGptTerminal
        .getLastMessage()
        .content$.get();
    };

    window.addEventListener("chat-message", handler);
    window.addEventListener("chat-error", handler);

    return () => {
      window.removeEventListener("chat-message", handler);
    };
  }, []);

  const isBlockActions = chatGpt.chatGptTerminal.isBlockActions$.get();

  useEffectSkipFirst(() => {
    if (!isBlockActions) {
      terminalRef.current.scrollBottom();
      terminalRef.current.print("_");
      terminalRef.current._output.lastChild.style.opacity = "0";
      terminalRef.current.input("", (input: string) => {
        terminalRef.current._output.lastChild.classList.add(
          classes.outputInput
        );
        chatGpt.chatGptTerminal.send(input);

        terminalRef.current.print(" ");
      });
    }
  }, [isBlockActions]);

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Терминал
          </PanelHeader>
        }
        childrenWithHeight={() => <div id="terminal-1" />}
      ></AppContainer>
    </Panel>
  );
}

export default ChatTerminal;

import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";

const systemMessage =
  "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in Russian, I will do so by putting text inside curly brackets {like this}.";
export class ChatGptTerminal extends ChatGptTemplate {
  systemMessage = new GptMessage(systemMessage, GPTRoles.system);
  send = async (content: string) => {
    try {
      this.blockActions();
      this.sendCompletions$.loading.set(true);
      const message = new GptMessage(content, GPTRoles.user);
      this.addMessage(message);

      await this.sendCompletions$.run();
      this.timer.run();

      if (message === this.getLastMessage()) return;
    } catch {
      this.timer.run();
    } finally {
      this.allowActions();
    }
  };
}
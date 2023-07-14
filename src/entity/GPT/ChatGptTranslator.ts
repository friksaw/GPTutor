import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";

export class ChatGptTranslator extends ChatGptTemplate {
  send = async (content: string) => {
    try {
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

  setupSystemMessage(fromLanguage: string, toLanguage: string) {
    this.systemMessage = new GptMessage(
      `Я хочу, чтобы вы выступили в роли приложения переводчика с языка "${fromLanguage}" на "${toLanguage}". Не пиши никаких замечаний и примечаний, только перевод введенного мной слова или предложения. Не нужно писать никаких приглашений для пользователя, только перевод введенного текста, Если текст перевести невозможно, выводи его в том же значении, в котором оно было передано в поселеднем сообщении пользователя.`,
      GPTRoles.system
    );
  }
}

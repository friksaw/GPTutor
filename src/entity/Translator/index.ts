import { ChatGptTranslator } from "$/entity/GPT/ChatGptTranslator";
import { memo, sig } from "dignals";

const languages = [
  { value: "Русский", label: "Русский" },
  { value: "Английский", label: "Английский" },
  { value: "Немецкий", label: "Немецкий" },
];

class Translator {
  translateTextLeft = sig("");
  translateTextRight = sig("");
  valueLeft$ = sig("Русский");
  valueRight$ = sig("Английский");

  languagesLeft$ = memo(() => languages);
  languagesRight$ = memo(() => languages);

  constructor() {
    this.gptInstance.setupSystemMessage(
      this.valueLeft$.get(),
      this.valueRight$.get()
    );
  }

  gptInstance = new ChatGptTranslator();

  async translate(text: string) {
    await this.gptInstance.send(text);
    console.log(this.gptInstance.messages$.get());
  }

  swap = () => {
    const valueLeft = this.valueLeft$.get();
    const valueRight = this.valueRight$.get();

    this.valueLeft$.set(valueRight);
    this.valueRight$.set(valueLeft);

    this.gptInstance.setupSystemMessage(
      this.valueLeft$.get(),
      this.valueRight$.get()
    );
  };

  setLeftValue(value: string) {
    this.valueLeft$.set(value);
    this.gptInstance.setupSystemMessage(
      this.valueLeft$.get(),
      this.valueRight$.get()
    );
  }
  setRightValue(value: string) {
    this.valueRight$.set(value);
    this.gptInstance.setupSystemMessage(
      this.valueLeft$.get(),
      this.valueRight$.get()
    );
  }
}

export const translator = new Translator();

import { GPTRoles } from "./types";
import { createReactiveModelBuilder } from "dignals-model";

let id = 0;

export class GptMessage {
  $content: string;
  $isSelected = false;
  $failedModeration = false;
  $isRunOutOfContext = false;

  id: number = id;

  constructor(
    message: string,
    public role: GPTRoles,
    public inLocal?: boolean,
    public isError?: boolean
  ) {
    this.$content = message;
    id++;
  }

  setContent(content: string) {
    this.$content = content;
  }

  onSetMessageContent = (value: string) => {
    this.$content = this.$content + value;
  };

  toggleSelected() {
    this.$isSelected = !this.$isSelected;
  }

  select() {
    this.$isSelected = true;
  }

  unselect() {
    this.$isSelected = false;
  }

  toggleRunOutOff() {
    this.$isRunOutOfContext = true;
  }
}

export const GptMessageBuilder = createReactiveModelBuilder(GptMessage);

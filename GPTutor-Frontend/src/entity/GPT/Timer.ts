import { sig, Signal } from "dignals";
import { createReactiveModelBuilder } from "dignals-model";

export type TimerStrategy = "increment" | "decrement";

export class Timer {
  $time: number;
  $isStopped = true;
  isDisabled = false;

  private intervalId: NodeJS.Timeout | undefined;

  constructor(
    private start: number,
    private finish: number,
    private timerStrategy: TimerStrategy
  ) {
    this.$time = start;
  }

  setDisabled = () => {
    this.isDisabled = true;
  };

  run() {
    if (this.isDisabled) return;

    this.$time = this.start;
    this.$isStopped = false;
    this.intervalId = setInterval(() => {
      this.processTime();
      this.check();
    }, 1000);
  }

  stop() {
    if (this.isDisabled) return;

    clearInterval(this.intervalId);
    this.$isStopped = true;
  }

  private check() {
    if (this.$time === this.finish) this.stop();
  }

  private processTime() {
    if (this.timerStrategy === "increment") {
      this.$time = this.$time + 1;
    } else {
      this.$time = this.$time - 1;
    }
  }
}

export const TimerBuilder = createReactiveModelBuilder(Timer);

import { sig } from "dignals";

class AppController {
  showWaitBanner$ = sig<boolean>(false);

  closeWaitBanner = () => {
    this.showWaitBanner$.set(false);
  };
}

export const appController = new AppController();

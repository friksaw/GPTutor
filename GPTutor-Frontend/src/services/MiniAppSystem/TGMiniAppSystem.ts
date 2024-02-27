import { IMiniAppSystem } from "./types";
import { telegramService } from "$/services/TelegramService";

export class TGMiniAppSystem implements IMiniAppSystem {
  initApp() {
    return Promise.resolve();
  }

  getUser() {
    return telegramService.getUser();
  }

  getAuthorization() {
    return new URLSearchParams(telegramService.getTgHash()).get(
      "#tgWebAppData"
    );
  }
}

import { telegramService } from "$/services/TelegramService";
import { TGMiniAppSystem } from "$/services/MiniAppSystem/TGMiniAppSystem";
import { MiniAppUser } from "$/entity/user/types";

export class MiniAppSystem {
  appInstance: any;

  constructor() {
    this.init();
  }

  private init() {
    if (telegramService.hasTgInstance()) {
      this.appInstance = new TGMiniAppSystem();
    }
  }
  initApp() {
    console.log(this.appInstance);
    return this.appInstance.initApp();
  }

  async getUser(): Promise<MiniAppUser> {
    return this.appInstance.getUser();
  }

  getAuthorization() {
    return this.appInstance.getAuthorization();
  }
}

export const miniAppSystem = new MiniAppSystem();

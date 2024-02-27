import { IMiniAppSystem } from "$/services/MiniAppSystem/types";
import bridge from "@vkontakte/vk-bridge";

export class VKMiniAppSystem implements IMiniAppSystem {
  initApp() {
    return bridge.send("VKWebAppInit");
  }
}

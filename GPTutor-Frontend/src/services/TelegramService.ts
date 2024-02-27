import { isDarkHex } from "$/utility/strings";
import { log } from "@craco/craco/dist/lib/logger";

console.log(window.Telegram);

class TelegramService {
  private tgHash =
    "#tgWebAppData=query_id%3DAAHfkyBZAAAAAN-TIFkgHCPC%26user%3D%257B%2522id%2522%253A1495307231%252C%2522first_name%2522%253A%2522%25D0%2593%25D1%2580%25D0%25B8%25D0%25B3%25D0%25BE%25D1%2580%25D0%25B8%25D0%25B9%2522%252C%2522last_name%2522%253A%2522%25D0%2593%25D1%2580%25D0%25B8%25D1%2588%25D0%25B0%2522%252C%2522username%2522%253A%2522asdasdpokkaj%2522%252C%2522language_code%2522%253A%2522ru%2522%252C%2522is_premium%2522%253Atrue%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1708692544%26hash%3Db1c838a9692d53e4af45037d845e6bdc31a846825c762bcb770ec3223f29a7dc&tgWebAppVersion=7.0&tgWebAppPlatform=tdesktop&tgWebAppThemeParams=%7B%22accent_text_color%22%3A%22%236ab2f2%22%2C%22bg_color%22%3A%22%2317212b%22%2C%22button_color%22%3A%22%235288c1%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22destructive_text_color%22%3A%22%23ec3942%22%2C%22header_bg_color%22%3A%22%2317212b%22%2C%22hint_color%22%3A%22%23708499%22%2C%22link_color%22%3A%22%236ab3f3%22%2C%22secondary_bg_color%22%3A%22%23232e3c%22%2C%22section_bg_color%22%3A%22%2317212b%22%2C%22section_header_text_color%22%3A%22%236ab3f3%22%2C%22subtitle_text_color%22%3A%22%23708499%22%2C%22text_color%22%3A%22%23f5f5f5%22%7D";

  hasTgInstance() {
    return true;
    console.log(window.Telegram.WebApp, "window.Telegram.WebApp");
    return !!window.Telegram.WebApp.initData;
  }

  getTgHash() {
    return this.tgHash;
  }

  getTgApplicationUrl() {
    return location.origin + this.tgHash;
  }

  getTgParams() {
    const params = window.Telegram.Utils.urlParseQueryString(
      telegramService.getTgHash()
    );

    return {
      ...params,
      user: JSON.parse(
        new URLSearchParams(params["#tgWebAppData"]).get("user")!
      ),
      tgWebAppThemeParams: JSON.parse(params.tgWebAppThemeParams),
    };
  }

  colorScheme() {
    if (!this.hasTgInstance()) return "dark";

    return isDarkHex(this.getTgParams().tgWebAppThemeParams.bg_color)
      ? "dark"
      : "light";
  }

  getUser() {
    return this.getTgParams().user;
  }
}

export const telegramService = new TelegramService();

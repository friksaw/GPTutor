interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  is_premium: boolean;
  allows_write_to_pm: boolean;
}

interface ThemeParams {
  bg_color: string;
  button_color: string;
  button_text_color: string;
  hint_color: string;
  link_color: string;
  secondary_bg_color: string;
  text_color: string;
  header_bg_color: string;
  accent_text_color: string;
  section_bg_color: string;
  section_header_text_color: string;
  subtitle_text_color: string;
  destructive_text_color: string;
}

interface InitDataUnsafe {
  query_id: string;
  user: User;
  auth_date: string;
  hash: string;
}

interface WebView {
  initParams: {
    tgWebAppData: string;
    tgWebAppVersion: string;
    tgWebAppPlatform: string;
    tgWebAppThemeParams: string; // This should be parsed into ThemeParams if needed
  };
  isIframe: boolean;
}

interface BackButton {
  isVisible: boolean;
}

interface MainButton {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isProgressVisible: boolean;
  isActive: boolean;
}

interface SettingsButton {
  isVisible: boolean;
}

interface WebApp {
  initData: string;
  initDataUnsafe: InitDataUnsafe;
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: ThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  backgroundColor: string;
  BackButton: BackButton;
  MainButton: MainButton;
  SettingsButton: SettingsButton;
  HapticFeedback: NonNullable<unknown>; // Empty object, no properties defined
  CloudStorage: NonNullable<unknown>; // Empty object, no properties defined
}

interface ITelegramUtils {
  urlParseQueryString(value: string): Record<string, any>;
}

interface ITelegram {
  WebView: WebView;
  Utils: ITelegramUtils;
  WebApp: WebApp;
}

interface Window {
  Telegram: ITelegram;
}

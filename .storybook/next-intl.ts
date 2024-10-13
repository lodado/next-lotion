import en from "../src/shared/libs/i18n/lib/locales/en.json";
import ko from "../src/shared/libs/i18n/lib/locales/ko.json";

const messagesByLocale: Record<string, any> = { en, ko };

const nextIntl = {
  defaultLocale: "en",
  messagesByLocale,
};

export default nextIntl;

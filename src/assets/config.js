import { createI18n } from "vue-i18n";
import pl from "@/src/assets/lang/pl.json";
import en from "@/src/assets/lang/en.json";
import de from "@/src/assets/lang/de.json";
import axios from "axios";
const url = import.meta.env.VITE_SIMPLELOCALIZE_URL;

const i18n = createI18n({
  legacy: false,
  locale: window.navigator.language,
  fallbackLocale: "en",
  messages: { pl, en, de },
});

if (url) {
  (async () => {
    const result = await axios.get(url, {
      withCredentials: false,
    });
    if (result.status !== 200) {
      return;
    }
    for (let i in result.data) {
      i18n.global.setLocaleMessage(i, result.data[i]);
    }
  })();
}

export default i18n;

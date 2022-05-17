/** Vuetifyバージョン管理などはここで行う */

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
/** iconをインポート */
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

/** icon使用許可 */
const opts = {
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#ff6669",
        secondary: "#00ffd0",
        accent: "#ff9800",
        error: "#ff4910",
        warning: "#ffc107",
        info: "#607d8b",
        success: "#8bc34a"
      }
    }
  }
};

export default new Vuetify(opts);

/** Vuetifyバージョン管理などはここで行う */

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
/** iconをインポート */
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

/** icon使用許可 */
const opts = {
  icons: {
    iconfont: 'mdi'
  }
}

export default new Vuetify(opts)

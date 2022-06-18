import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/index";
import vuetify from "@/plugins/vuetify";
/* eslint-disable no-new */
new Vue({
  el: "#app",
  vuetify,
  router,
  store,
  components: { App },
  template: "<App/>"
});

import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import authentication from "./modules/authentication/index";
import counter from "./modules/counter/index";
import attendanceList from "./modules/attendanceList/index";
import contactList from "./modules/contactList/index";
import clientFieldList from "./modules/clientFieldList/index";
import workFieldList from "./modules/workFieldList/index";
import ownWorker from "./modules/ownWorker/index";
import postList from "./modules/postList/index";
import subCompany from "./modules/subCompany/index";
import userInfo from "./modules/userInfo/index";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    authentication,
    counter,
    attendanceList,
    contactList,
    clientFieldList,
    workFieldList,
    ownWorker,
    postList,
    subCompany,
    userInfo
  },
  plugins: [
    createPersistedState({
      key: "accessToken",
      paths: ["authentication.accessToken"]
    })
  ]
});

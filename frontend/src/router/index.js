/** 画面遷移についてはこのファイルに記述 */
import Vue from "vue";
import Router from "vue-router";
import Methods from "@/api/methods";
/** componentsのインポート  */
import HelloWorld from "@/components/pages/HelloWorld";
import Login from "@/components/pages/login";
import ClientField from "@/components/pages/clientField";
import WorkField from "@/components/pages/workField";
import AttendanceManage from "@/components/pages/attendanceManage";
import SubCompanyAll from "@/components/pages/subCompanyAll";
import Main from "@/components/pages/main";
import ContactBox from "@/components/pages/contactBox";
import OwnWorkerAll from "@/components/pages/ownWorkerAll";

import PasswordReset from "@/components/pages/passwordReset";
import OwnCompany from "@/components/pages/ownCompany";

Vue.use(Router);

const router = new Router({
  mode: "history",
  hash: false,
  routes: [
    {
      /** 初期位置 */
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
      meta: { isPublic: true }
    },
    {
      /** login.vue */
      path: "/login",
      name: "login",
      component: Login,
      meta: { isPublic: true }
    },
    {
      /** passwordReset.vue */
      path: "/passwordReset",
      name: "passwordReset",
      component: PasswordReset
    },
    {
      /** ownCompany.vue */
      path: "/ownCompany",
      name: "ownCompany",
      component: OwnCompany
    },
    {
      /** main.vue */
      path: "/main",
      name: "main",
      component: Main
    },
    {
      /** clientField.vue */
      path: "/clientField",
      name: "clientField",
      component: ClientField
    },
    {
      /** workField.vue */
      path: "/workField",
      name: "workField",
      component: WorkField
    },
    {
      /** attendanceManage.vue */
      path: "/attendanceManage",
      name: "attendanceManage",
      component: AttendanceManage
    },
    {
      /** contactBox.vue */
      path: "/contactBox",
      name: "contactBox",
      component: ContactBox
    },
    {
      /** ownWorkerAll.vue */
      path: "/ownWorkerAll",
      name: "ownWorkerAll",
      component: OwnWorkerAll
    },
    {
      /** subCompanyAll.vue */
      path: "/subCompanyAll",
      name: "subCompanyAll",
      component: SubCompanyAll
    }
  ]
});

const auth = async () => {
  await Methods.auth();
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => !record.meta.isPublic)) {
    let accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken) {
      console.log("認証");
      // バックエンドの検証APIをたたく
      await auth()
        .then(function(uid) {
          console.log("認証成功");
          next();
          return "";
        })
        .catch(function(error) {
          next({ path: "/login", query: { redirect: to.fullPath } });
          console.log("認証失敗");
          return error;
        });
    }
  } else {
    next();
  }
});

export default router;

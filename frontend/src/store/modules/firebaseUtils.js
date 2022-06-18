import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "../../store/index";

const auth = getAuth();

export default {
  onAuthStoreStateChanged() {
    onAuthStateChanged(auth, u => {
      let user = u || {};
      store.commit("onAuthStateChanged", user);
      store.commit("onUserLoginStatusChanged", !!user.uid);
      store.commit("onAccessToken", user.accessToken);
    });
  }
};

const state = {
  user: "",
  isLoggIn: false,
  accessToken: ""
};
const getters = {
  user(state) {
    return state.user;
  },
  isLoggedIn(state) {
    return state.isLoggedIn;
  },
  accessToken(state) {
    return state.user.accessToken;
  }
};
const actions = {
  /** コンポーネントからリクエストを受けたら、処理する下準備 */
  /** ToDo */
  /** commit関数で、Mutationsで定義した関数を指定して呼び出す */
  /** 1-更新箇所のDBデータ取得 */
  /** 2-形式をここで整える（配列形式） */
};
const mutations = {
  onAuthStateChanged(state, user) {
    // firebaseが返したユーザー情報
    state.user = user;
  },
  onUserLoginStatusChanged(state, isLoggedIn) {
    // ログインしているかどうか
    state.isLoggedIn = isLoggedIn;
  },
  onAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

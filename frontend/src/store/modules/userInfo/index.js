const state = {
  userInfo: {
    employeeId: "",
    companyName: "",
    companyId: "",
    userName: "",
    postName: "",
    menuActivity: {
      attendanceManageAuth: false,
      ownCompanyManageAuth: false,
      ownWorkerManageAuth: false,
      payPlanAuth: false,
      subCompanyManageAuth: false
    }
  }
};

const getters = {
  /** 複数コンポーネントで使用する関数はここに記載 例：ソート */
  userInfo(state) {
    return state.userInfo;
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
  /** store内データ更新箇所 */
  setUserInfo(state, userInfo) {
    console.log(userInfo);
    state.userInfo.employeeId = userInfo.employeeId;
    state.userInfo.companyName = userInfo.companyName;
    state.userInfo.companyId = userInfo.companyId;
    state.userInfo.userId = userInfo.userId;
    state.userInfo.userName = userInfo.userName;
    state.userInfo.postName = userInfo.postName;
    state.userInfo.menuActivity.attendanceManageAuth =
      userInfo.menuActivity.attendanceManageAuth;
    state.userInfo.menuActivity.ownCompanyManageAuth =
      userInfo.menuActivity.ownCompanyManageAuth;
    state.userInfo.menuActivity.ownWorkerManageAuth =
      userInfo.menuActivity.ownWorkerManageAuth;
    state.userInfo.menuActivity.payPlanAuth = userInfo.menuActivity.payPlanAuth;
    state.userInfo.menuActivity.subCompanyManageAuth =
      userInfo.menuActivity.subCompanyManageAuth;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

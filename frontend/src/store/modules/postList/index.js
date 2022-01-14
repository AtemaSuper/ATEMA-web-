const state = {
  postList: [
    {
      postId: 1,
      postName: '管理者',
      attendancePermission: 1,
      ownWorkerPermission: 1,
      subWorkerPermission: 1,
      ownCompanyPermission: 1,
      planPayPermission: 1
    }, {
      postId: 2,
      postName: '一般',
      attendancePermission: -1,
      ownWorkerPermission: -1,
      subWorkerPermission: 0,
      ownCompanyPermission: -1,
      planPayPermission: -1
    }, {
      postId: 3,
      postName: '事務',
      attendancePermission: 1,
      ownWorkerPermission: 1,
      subWorkerPermission: 1,
      ownCompanyPermission: 1,
      planPayPermission: 1
    }, {
      postId: 4,
      postName: 'アルバイト',
      attendancePermission: -1,
      ownWorkerPermission: -1,
      subWorkerPermission: -1,
      ownCompanyPermission: -1,
      planPayPermission: -1
    }
  ]
}

const getters = {
  /** 複数コンポーネントで使用する関数はここに記載 例：ソート */
}

const actions = {/** コンポーネントからリクエストを受けたら、処理する下準備 */
  /** ToDo */
  /** commit関数で、Mutationsで定義した関数を指定して呼び出す */
  /** 1-更新箇所のDBデータ取得 */
  /** 2-形式をここで整える（配列形式） */
}

const mutations = {/** store内データ更新箇所 */
  /** ToDo */
  /** ここにstate(すでに持っている情報=画面描画)を更新する処理を書く */
}

export default {
  state,
  getters,
  actions,
  mutations
}

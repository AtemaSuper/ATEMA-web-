const state = {
  contactList: [
    {
      status: false,
      contactTitle: '開始連絡',
      sendUser: '田中太郎',
      createDate: '2021-12-12T09:21:11.523+09:00',
      contents: 'うんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんち'
    }, {
      status: true,
      contactTitle: '終了連絡',
      sendUser: '松岡修造',
      createDate: '2021-12-12T18:21:11.523+09:00',
      contents: 'うんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんち'
    }, {
      status: false,
      contactTitle: '遅刻連絡',
      sendUser: '田中太郎',
      createDate: '2021-12-13T10:21:11.523+09:00',
      contents: 'うんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんち'
    }, {
      status: true,
      contactTitle: '開始連絡',
      sendUser: '松岡修造',
      createDate: '2021-12-13T08:21:11.523+09:00',
      contents: 'うんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんち'
    }, {
      status: false,
      contactTitle: '終了連絡',
      sendUser: '松岡修造',
      createDate: '2021-12-13T17:21:11.523+09:00',
      contents: 'うんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんちうんち'
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

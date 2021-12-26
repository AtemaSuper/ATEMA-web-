const state = {
  // 客先一覧
  clientList: [
    {
      clientName: '株式会社ABC',
      status: '進行中',
      delete: 'true'
    },
    {
      clientName: '株式会社ABCD',
      status: '未進行',
      delete: 'true'
    }
  ],
  // 現場一覧
  fieldList: [
    {
      clientName: '株式会社ABC',
      fieldName: '現場名AAAA',
      status: '進行中',
      delete: 'true'
    },
    {
      clientName: '株式会社ABCD',
      fieldName: '現場名AAAA',
      status: '未進行',
      delete: 'true'
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

const state = {
  // 工事現場一覧
  workFieldList: [
    {
      jobNo: '21-0001',
      conmpanyName: '株式会社ABC',
      workFieldName: '現場名AAAAA',
      workName: '工事件名1-ABCD',
      status: '進行中',
      delete: 'true'
    },
    {
      jobNo: '21-0002',
      conmpanyName: '合同会社DDD',
      workFieldName: '現場名AAAAA',
      workName: '工事件名2-EFGH',
      status: '進行中',
      delete: 'true'
    },
    {
      jobNo: '21-0003',
      conmpanyName: '株式会社ABC',
      workFieldName: '現場名BBB',
      workName: '工事件名3-IJKL',
      status: '進行中',
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

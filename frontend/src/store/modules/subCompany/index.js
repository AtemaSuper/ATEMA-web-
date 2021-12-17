const state = {
  subCompany: [
    {
      companyName: '株式会社山元山本山素山基山茂登',
      type: 'コンタクトレンズの厚さを図る人'
    },
    {
      companyName: 'かずまNEET株式会社',
      type: '自宅警備員養成所 大網校'
    }, {
      companyName: '合同会社中野',
      type: '普通'
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

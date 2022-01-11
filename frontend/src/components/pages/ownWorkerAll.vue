<template>
  <v-app id="ownWorkerAll">
    <v-container>
      <v-sheet color="white" rounded outlined>
        <v-row align="center">
          <v-col cols="12" sm="4" md="2"> </v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
          <v-col cols="12" sm="4" md="4"> </v-col>
          <v-col cols="12" sm="4" md="2">
            <!-- 自社員を追加するボタン -->
            <v-btn outlined @click="addWorker()"
              >自社員を追加<v-icon>mdi-plus</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <v-row align="center">
          <!-- data teble-->
          <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
          <v-data-table
            :headers="ownWorkerHeader"
            :items="getOwnWorker"
            :search="search"
            :custom-filter="filterOnlyCapsText"
            :items-per-page="-1"
            item-key="name"
            class="elevation-1 table"
            height="300"
            @click:row="showItem"
          >
            <template v-slot:top>
              <v-row>
                <v-col>
                  <!-- 検索窓 -->
                  <v-text-field
                    v-model="search"
                    label="検索"
                    class="expanding-search mt-1"
                    prepend-inner-icon="mdi-magnify"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <!-- 従業員一覧ダウンロードメニュー -->
                <v-col align="right">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn justify="center" outlined v-bind="attrs" v-on="on">
                        社員一覧ダウンロード
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="download('CSV')">
                        <v-list-item-title>自社員一覧（CSV）</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="download('Excel')">
                        <v-list-item-title
                          >自社員一覧（Excel）</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
              <!-- 従業員削除ダイアログ -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title  align="center"
                    >この社員を削除しますか?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="deleteItemConfirm">
                      削除
                    </v-btn>
                    <v-btn color="white" @click="closeDelete"> 戻る </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 従業員詳細表示ダイアログ -->
              <v-dialog v-model="dialogShow"  max-width="600px">
                <v-card>
                  <v-card-title>
                    <v-row>
                      <v-col cols="12" lg="12" sm="12">
                        <span class="text-h4">従業員詳細</span>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>名前</p>
                        </v-col>
                        <v-col  cols="12" sm="6" md="6">
                          {{ editedItem.name }}
                        </v-col>
                      </v-row>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>役職</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          {{ editedItem.postLabel }}
                        </v-col>
                      </v-row>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>職員コード</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          {{ editedItem.code }}
                        </v-col>
                      </v-row>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>生年月日</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          {{ editedItem.birthday }}
                        </v-col>
                      </v-row>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>住所</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          {{ editedItem.address }}
                        </v-col>
                      </v-row>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>Mail</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          {{ editedItem.mail }}
                        </v-col>
                      </v-row>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>電話番号</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          {{ editedItem.phoneNumber }}
                        </v-col>
                      </v-row>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>ログインID</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          {{ editedItem.loginId }}
                        </v-col>
                      </v-row>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>パスワード</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          {{ editedItem.password }}
                        </v-col>
                      </v-row>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>所属期間</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          {{ editedItem.openDate }}～{{ editedItem.cloceDate }}
                        </v-col>
                      </v-row>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>雇用形態</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          {{ editedItem.postLabel }}
                        </v-col>
                      </v-row>
                      <v-row align="left">
                        <v-col cols="12"  lg="4" sm="4">
                          <p>保有資格</p>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <table>
                            <thead>
                              <tr>
                                <th>資格名</th>
                                <th></th>
                                <th>資格取得日</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="license in editedItem.license"
                                v-bind:key="license.id"
                              >
                                <td>{{ license.licenseName }}</td>
                                <td></td>
                                <td>{{ license.licenseDate }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialog = false">
                      編集
                    </v-btn>
                    <v-btn color="white" @click="closeShow()">
                      キャンセル
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <!-- name Row -->
            <template v-slot:[`item.name`]="{ item }">
              <v-btn outlined @click="showItem(item)">
                {{ item.name }}
              </v-btn>
            </template>
            <!-- companyName Row -->
            <template v-slot:[`item.companyName`]="{ item }">
              {{ item.companyName }}
            </template>
            <!-- postName Row -->
            <template v-slot:[`item.postLabel`]="{ item }">
              {{ item.postLabel }}
            </template>

            <!-- delete Row -->
            <template v-slot:[`item.delete`]="{ item }">
              <v-icon @click.stop="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-row>
      </v-sheet>
    </v-container>
    <v-row class="title">
      <v-col cols="2"></v-col>
      <v-col>
        <v-card>役職管理 </v-card>
      </v-col>

      <v-col cols="1"></v-col>
    </v-row>
    <v-container>
      <v-sheet color="white" rounded outlined> </v-sheet>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'ownWorkerAll',
  components: {
  },
  data: () => ({
    search: '',
    dialogDelete: false,
    dialogShow: false,
    editedIndex: -1,
    editedItem: {
      name: '',
      companyName: '',
      post: 0,
      postLabel: '',
      code: '',
      birthday: '',
      address: '',
      mail: '',
      phoneNumber: '',
      loginId: '',
      password: '',
      openDate: '',
      cloceDate: '',
      employmentId: 0,
      license: 0,
      licenseDate: ''
    },
    defaultItem: {
      name: '',
      companyName: '',
      post: 0,
      postLabel: '',
      code: '',
      birthday: '',
      address: '',
      mail: '',
      phoneNumber: '',
      loginId: '',
      password: '',
      openDate: '',
      cloceDate: '',
      employmentId: 0,
      license: 0,
      licenseDate: ''
    }
  }),
  computed: {
    /** v-tableのヘッダーを設定 */
    ownWorkerHeader () {
      return [
        {
          text: '職員名',
          align: 'center',
          sortable: false,
          value: 'name',
          width: '20%'
        },
        {
          text: '所属会社',
          value: 'companyName',
          align: 'center',
          sortable: false,
          width: '30%'
        },
        {
          text: '役職',
          value: 'postLabel',
          align: 'center',
          sortable: false,
          width: '20%'
        },
        { text: '削除',
          value: 'delete',
          sortable: false,
          align: 'right',
          width: '30%'}
      ]
    },
    /** v-tableのヘッダーを設定 */
    postListHeader () {
      return [
        {
          text: '職員名',
          align: 'center',
          sortable: false,
          value: 'name',
          width: '20%'
        },
        {
          text: '所属会社',
          value: 'status',
          align: 'center',
          filter: value => {
            if (!this.status) return true

            return value < parseInt(this.status)
          },
          width: '30%'
        },
        { text: '削除', value: 'delete', sortable: false, align: 'right', width: '50%' }
      ]
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getOwnWorker () {
      /** ToDo */
      /** Vuex subCompanyで定義したActionメソッドをここで呼び出し */
      return this.$store.state.ownWorker.ownWorker
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getPostList () {
      /** ToDo */
      /** Vuex attendanceListで定義したActionメソッドをここで呼び出し */
      return this.$store.state.postList.postList
    }
  },
  methods: {
    // 選択したレコードの情報格納・レコード詳細ダイアログの表示
    showItem (item) {
      this.editedIndex = this.getOwnWorker.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogShow = true
      console.log(this.editedItem)
    },
    // レコード削除ダイアログキャンセル処理（ダイアログ非表示・削除レコード情報の初期化）
    closeShow () {
      this.dialogShow = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    // 削除レコード情報の格納・レコード削除ダイアログの表示
    deleteItem (item) {
      this.editedIndex = this.getOwnWorker.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    // レコード削除ダイアログキャンセル処理（ダイアログ非表示・削除レコード情報の初期化）
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    // ページ遷移処理
    download (format) {
      console.log(format)
    },
    // 検索
    filterOnlyCapsText (value, search, item) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    /** ステータスカラーの変更 */
    getColor (status) {
      if (status === '出勤中') return 'green'
      else if (status === '休憩中') return 'orange'
      else return 'red'
    },
    /** データ変更処理 */
    setItem (item) {
      /** ToDo vuex 必要ないかも？ */
      /** 2-Vuex attendanceListで定義したActionメソッドをここで呼び出し 変更箇所の引数あり */
      /** 1-NCMBのデータ更新処理呼び出し express側定義 axioメソッド */
      console.log(item)
    },
    noteContents (item) {
      this.ditaileEdit = item
      this.noteContentsDialog = true
    },
    fieldContents (item) {
      this.ditaileEdit = item
      this.fieldDialog = true
    },
    addSubCompany () {
      console.log('true')
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  height: 75px;
  padding-top: 25px;
  font-size: 3.8rem;
  background-color: #cccccc;
}
.table {
  width: 100%;
}
</style>

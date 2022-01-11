<template>
  <v-app id="attendanceManage">
      <v-container class="container-1">
        <v-sheet color="white" rounded outlined>
          <v-row align="center" >
            <v-col cols="12" sm="4" md="2">
            </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- 協力会社を追加するボタン -->
              <template>
                <v-row justify="center">
                  <v-dialog v-model="adialog" max-width="600px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn outlined v-bind="attrs" v-on="on" @click="addSubCompany()">
                          協力会社を追加<v-icon >mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <v-row>
                            <v-col cols="12" lg="12" sm="12">
                              <span class="text-h4">協力会社を追加</span>
                            </v-col>
                            <v-col cols="12" lg="6" sm="6">
                              基本情報
                            </v-col>
                            <v-col cols="12" lg="6" sm="6">
                            </v-col>
                          </v-row>
                        </v-card-title>
                        <v-card-text>
                          <v-row align="center">
                            <v-col cols="12" sm="6" md="6">
                            <p class="text-h5">会社名</p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field outlined label="会社名を入力してください"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                            <p class="text-h5">設立</p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field outlined label="設立日を入力してください"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                            <p class="text-h5">代表者</p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field outlined label="代表者名を入力してください"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                            <p class="text-h5">郵便番号</p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field outlined label="郵便番号を入力してください"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                            <p class="text-h5">住所</p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field outlined label="住所を入力してください"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                            <p class="text-h5">電話番号</p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field outlined label="電話番号を入力してください"></v-text-field>
                            </v-col>
                            <v-col>
                              <p class="text-h5">工種</p>
                            </v-col>
                            <v-col>
                              <v-select
                                :items="['建築塗装業', '足場', '配管']"
                                outlined
                                label="工種を選択してください"
                                required
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col></v-col>
                            <v-col>
                              <v-btn color="primary" fab small>
                                <v-icon>mdi-plus</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                            <p class="text-h5">備考</p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-textarea outlined></v-textarea>
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            @click="adialog = false"
                          >
                            確定
                          </v-btn>
                          <v-btn
                            color="white"
                            @click="adialog = false"
                          >
                            キャンセル
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                   </v-dialog>
                </v-row>
              </template>
            </v-col>
          </v-row>
              <v-row align="center" >
            <!-- data teble-->
            <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
            <v-data-table
              :headers="subCompanyHeader"
              :items="getSubCompany"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              :items-per-page="-1"
              item-key="name"
              class="elevation-1 table"
              rowsPerPage: All
              height= '300'
            >
              <template v-slot:top>
            <v-row >
                <v-col cols='4'>
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
            </v-row>
              </template>
              <template v-slot:[`body.append`]> </template>

              <!-- companyName Row -->
              <template v-slot:[`item.delete`]="{ item }">
          <v-btn
            color="error"
            depressed
            small
            outlined
            fab
            @click="deleteItem(item)"
          >
           <v-icon dark>
            mdi-delete
           </v-icon>
          </v-btn>
              </template>
            </v-data-table>
              </v-row>
        </v-sheet>
      </v-container>
      <v-row class="title">
          <v-col cols="2"></v-col>
          <v-col>
            <v-card>協力会社員一覧</v-card>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-container class="container-2">
            <v-sheet color="white" rounded outlined>
          <v-row align="center" >
            <v-col cols="12" sm="4" md="2"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- 社員を追加するボタン -->
              <v-btn
              outlined
              @click="addSubCompany()"
              >社員を追加<v-icon >mdi-plus</v-icon></v-btn>
            </v-col>
          </v-row>
              <v-row align="center" >
            <!-- data teble-->
            <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
            <v-data-table
              :headers="subWorkerHeader"
              :items="getAttendanceList"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              :items-per-page="-1"
              item-key="name"
              class="elevation-1 table"
              rowsPerPage: All
              height= '300'
            >
        <template v-slot:top>
            <v-row>
                <v-col cols='4'>
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
            </v-row>
              </template>
              <template v-slot:[`body.append`]> </template>

              <!-- status Row -->
              <template v-slot:[`item.delete`]="{ item }">
          <v-btn
            color="error"
            depressed
            small
            outlined
            fab
            @click="deleteItem(item)"
          >
           <v-icon dark>
            mdi-delete
           </v-icon>
          </v-btn>
              </template>
            </v-data-table>
          </v-row>
        </v-sheet>
      </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'attendanceManage',
  data: () => ({
    adialog: false,
    status: '',
    menu: false,
    date: '',
    statusItems: ['出勤中', '休憩中', '退勤中', '早出', '深夜'],
    ditaileEdit: {},
    noteContentsDialog: false,
    fieldDialog: false
  }),
  computed: {
    /** v-tableのヘッダーを設定 */
    subCompanyHeader () {
      return [
        {
          text: '会社名',
          align: 'center',
          sortable: false,
          value: 'companyName',
          width: '20%'
        },
        {
          text: '工種',
          value: 'type',
          align: 'center',
          filter: value => {
            if (!this.status) return true

            return value < parseInt(this.status)
          },
          width: '30%'
        },
        { text: '削除',
          value: 'delete',
          sortable: false,
          align: 'right',
          width: '50%'}
      ]
    },
    /** v-tableのヘッダーを設定 */
    subWorkerHeader () {
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
    getSubCompany () {
      /** ToDo */
      /** Vuex subCompanyで定義したActionメソッドをここで呼び出し */
      return this.$store.state.subCompany.subCompany
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getAttendanceList () {
      /** ToDo */
      /** Vuex attendanceListで定義したActionメソッドをここで呼び出し */
      return this.$store.state.attendanceList.attendanceList
    }
  },
  methods: {
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
    /** データ変更処理 */
    setItem (item) {
      /** ToDo vuex 必要ないかも？ */
      /** 2-Vuex attendanceListで定義したActionメソッドをここで呼び出し 変更箇所の引数あり */
      /** 1-NCMBのデータ更新処理呼び出し express側定義 axioメソッド */
      console.log(item)
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
  padding-top: 12px;
  font-size: 3.8rem;
  background-color: #cccccc;
}
.table{
    width: 100%;
}
.container-1{
  padding: 90px;
}
.container-2{
  padding: 90px;
}
</style>

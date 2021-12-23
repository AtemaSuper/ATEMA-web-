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
              <v-btn
              outlined
              @click="addSubCompany()"
              >協力会社を追加<v-icon >mdi-plus</v-icon></v-btn>
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
            rounded
            depressed
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
              <!-- 協力会社を追加するボタン -->
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
            rounded
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
    search: '',
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

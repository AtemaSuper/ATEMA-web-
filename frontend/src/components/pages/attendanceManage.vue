<template>
  <v-app id="attendanceManage">
    <v-main>
      <v-container>
        <p class="text-left">
          <a @click="$router.back()"><v-icon left>mdi-home</v-icon>戻る</a>
        </p>
        <h1>出退勤管理</h1>
        <v-sheet color="white" height="250" rounded outlined>
          <v-row align="center">
            <!-- 日時選択 -->
            <v-col cols="12" sm="4" md="2">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="日時を選択"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  scrollable
                  locale="jp-ja"
                  :day-format="(date) => new Date(date).getDate()"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
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
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="4"> </v-col>
            <v-col cols="12" sm="4" md="2">
              <!-- ダウンロード形式選択 -->
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn justify="center" outlined v-bind="attrs" v-on="on">
                    ダウンロード
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="download('myCompanyAll')">
                    <v-list-item-title>自社用個人別一覧</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="download('anotherCompany')">
                    <v-list-item-title>所属会社別</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="download('anotherJob')">
                    <v-list-item-title>Job別</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="download('anotherdClient')">
                    <v-list-item-title>客先別</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
          <div>
            <!-- 出退勤情報表示箇所 -->
            <v-data-table
              :headers="headers"
              :items="getAttendanceList"
              item-key="name"
              class="elevation-1"
              :search="search"
              :custom-filter="filterOnlyCapsText"
            >
              <template v-slot:top> </template>
              <template v-slot:[`body.append`]> </template>
              <!-- status Row -->
              <template v-slot:[`item.status`]="{ item }">
                <v-edit-dialog
                  :return-value.sync="item.status"
                  large
                  @save="setItem(item.status)"
                >
                  <v-chip :color="getColor(item.status)" dark>
                    {{ item.status }}
                  </v-chip>
                  <template v-slot:input>
                    <div class="mt-4 text-h6">ステータスを変更</div>
                    <v-select
                      v-model="item.status"
                      :items="statusItems"
                      label="Outlined style"
                      outlined
                      autofocus
                    ></v-select>
                  </template>
                </v-edit-dialog>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'attendanceManage',
  components: {
  },
  computed: {
    /** v-tableのヘッダーを設定 */
    headers () {
      return [
        {
          text: '氏名',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: '勤怠ステータス',
          value: 'status',
          align: 'center',
          filter: value => {
            if (!this.status) return true

            return value < parseInt(this.status)
          }
        },
        { text: '現場名', value: 'field' },
        { text: '契約', value: 'contract' },
        { text: '開始', value: 'start' },
        { text: '休憩', value: 'restStart' },
        { text: '戻り', value: 'restEnd' },
        { text: '終了', value: 'end' },
        { text: '時間外', value: 'overTime' },
        { text: '深夜', value: 'midNight' },
        { text: '備考', value: 'note', sortable: false }
      ]
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getAttendanceList () {
      /** ToDo */
      /** Vuex attendanceListで定義したActionメソッドをここで呼び出し */
      return this.$store.state.attendanceList.attendanceList
    }
  },
  data: () => ({
    search: '',
    status: '',
    statusItems: ['出勤中', '休憩中', '退勤中', '早出', '深夜']
  }),
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

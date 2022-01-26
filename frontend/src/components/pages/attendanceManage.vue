<template>
  <v-app id="attendanceManage">
    <v-main>
      <v-container>
        <v-sheet color="white" rounded outlined>
          <v-row align="center">
            <!-- 日付選択（※フィルター動作未実装） -->
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
                    label="日付を選択"
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
                <v-btn color="#ff6669" class="white--text" rounded @click="$refs.menu.save(date)">
                  OK
                </v-btn>
                <v-btn class="#f5f5f5" rounded @click="menu = false">
                    キャンセル
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
                  <v-btn v-bind="attrs" v-on="on" outlined elevation="3">ダウンロード<v-icon color="#00ffd0">mdi-download</v-icon></v-btn>
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
            <!-- data teble-->
            <!--ToDo  keyの値にnameを設定すると同名で重複エラーが出現するので、基本的にはDB取得時の各レコードごとのユニークIDを設定する -->
            <v-data-table
              :headers="headers"
              :items="getAttendanceList"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              :items-per-page="-1"
              item-key="name"
              class="elevation-1"
              rowsPerPage: All
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

              <!-- field Row -->
              <template v-slot:[`item.field`]="{ item }">
                <v-btn outlined  @click="fieldContents(item)">
                      {{ item.field }}
                    </v-btn>
              </template>

              <!-- contract Row -->
              <template v-slot:[`item.contract`]="{ item }">
                <v-edit-dialog
                  :return-value.sync="item.contract"
                  large
                  @save="setItem(item.contract)"
                >
                  <v-chip>
                    {{ item.contract }}
                  </v-chip>
                  <template v-slot:input>
                    <div class="mt-4 text-h6">請負形式を選択</div>
                    <v-select
                      v-model="item.contract"
                      :items="contractItems"
                      label="Outlined style"
                      outlined
                      autofocus
                    ></v-select>
                  </template>
                </v-edit-dialog>
              </template>

              <!-- startTime Row -->
              <template v-slot:[`item.start`]="{ item }">
                <v-edit-dialog
                  :return-value.sync="item.start"
                  large
                  @save="setItem(item.start)"
                >
                <v-chip
                label
                outlined
                >{{ item.start }}
                </v-chip>
                  <template v-slot:input>
                    <vue-timepicker
                     format="HH:mm"
                     manual-input
                     hide-dropdown
                     v-model="item.start">
                     </vue-timepicker>
                  </template>
                </v-edit-dialog>
              </template>

            <!-- restStart Row -->
              <template v-slot:[`item.restStart`]="{ item }">
                <v-edit-dialog
                  :return-value.sync="item.restStart"
                  large
                  @save="setItem(item.restStart)"
                >
                <v-chip
                label
                outlined
                >{{ item.restStart }}
                </v-chip>
                  <template v-slot:input>
                    <vue-timepicker
                     format="HH:mm"
                     manual-input
                     hide-dropdown
                     v-model="item.restStart">
                     </vue-timepicker>
                  </template>
                </v-edit-dialog>
              </template>

              <!-- restEnd Row -->
              <template v-slot:[`item.restEnd`]="{ item }">
                <v-edit-dialog
                  :return-value.sync="item.restEnd"
                  large
                  @save="setItem(item.restEnd)"
                >
                <v-chip
                label
                outlined
                >{{ item.restEnd }}
                </v-chip>
                  <template v-slot:input>
                   <vue-timepicker
                     format="HH:mm"
                     manual-input
                     hide-dropdown
                     v-model="item.restEnd">
                     </vue-timepicker>
                  </template>
                </v-edit-dialog>
              </template>

              <!-- end Row -->
              <template v-slot:[`item.end`]="{ item }">
                <v-edit-dialog
                  :return-value.sync="item.end"
                  large
                  @save="setItem(item.end)"
                >
                <v-chip
                label
                outlined
                >{{ item.end }}
                </v-chip>
                  <template v-slot:input>
                    <vue-timepicker
                     format="HH:mm"
                     manual-input
                     hide-dropdown
                     v-model="item.end">
                     </vue-timepicker>
                  </template>
                </v-edit-dialog>
              </template>
              <!-- noteContents Row -->
              <template v-slot:[`item.note`]="{ item }" >
                <v-btn outlined @click="noteContents(item)">
                      {{ item.note }}
                    </v-btn>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
        <!-- noteContentsDialog-->
        <v-dialog v-model="noteContentsDialog" max-width="300">
           <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      備考欄
                    </v-card-title>
                    <v-card-text>
                      <v-textarea
                      v-model="ditaileEdit.noteContents"
                      outlined
                      name="input-7-4"
                      value= ditaileEdit.noteContents
                      ></v-textarea>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
              </v-dialog>
<!--fieldDialog-->
              <v-dialog v-model="fieldDialog" max-width="300">
                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      現場詳細表示
                    </v-card-title>

                    <v-card-text>
                      現場名以外内容はベタ書きです
                      <v-row>
                        <v-col cols="12" sm="4" md="4" align="right">
                          <h4>jobNo:</h4>
                        </v-col>
                        <v-col cols="12" sm="8" md="8" align="left">
                          <h4>21-1234</h4>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="4" md="4" align="right">
                          <h4>客先:</h4>
                        </v-col>
                        <v-col cols="12" sm="8" md="8" align="left">
                          <h4>株式会社ABC運送</h4>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="4" md="4" align="right">
                          <h4>現場名:</h4>
                        </v-col>
                        <v-col cols="12" sm="8" md="8" align="left">
                          <h4>{{ ditaileEdit.field }}</h4>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="4" md="4" align="right">
                          <h4>工事件名:</h4>
                        </v-col>
                        <v-col cols="12" sm="8" md="8" align="left">
                          <h4>
                            ダクト修繕・改築工事ダクト修繕・改築工事ダクト修繕・改築工事
                          </h4>
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/** VueTimepicker（時刻選択用ライブラリ） */
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
  name: 'attendanceManage',
  components: {
    VueTimepicker
  },
  data: () => ({
    search: '',
    status: '',
    menu: false,
    date: '',
    statusItems: ['出勤中', '休憩中', '退勤中', '早出', '深夜'],
    contractItems: ['請負', '常用'],
    ditaileEdit: {},
    noteContentsDialog: false,
    fieldDialog: false
  }),
  computed: {
    /** v-tableのヘッダーを設定 */
    headers () {
      return [
        {
          text: '氏名',
          align: 'center',
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
        { text: '現場名', value: 'field', align: 'center' },
        { text: '契約', value: 'contract', align: 'center' },
        { text: '開始', value: 'start', align: 'center' },
        { text: '休憩', value: 'restStart', align: 'center' },
        { text: '戻り', value: 'restEnd', align: 'center' },
        { text: '終了', value: 'end', align: 'center' },
        { text: '時間外', value: 'overTime', align: 'center' },
        { text: '深夜', value: 'midNight', align: 'center' },
        { text: '備考', value: 'note', sortable: false, align: 'center' }
      ]
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
    noteContents (item) {
      this.ditaileEdit = item
      this.noteContentsDialog = true
    },
    fieldContents (item) {
      this.ditaileEdit = item
      this.fieldDialog = true
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

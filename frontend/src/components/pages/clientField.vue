<template>
  <v-app id="clientField">
      <v-container>
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
              <template v-slot:[`item.companyName`]="{ item }">
                <v-edit-dialog
                  :return-value.sync="item.companyName"
                  large
                  @save="setItem(item.companyName)"
                >
                  <v-chip :color="getColor(item.companyName)" dark>
                    {{ item.companyName }}
                  </v-chip>
                  <template v-slot:input>
                    <div class="mt-4 text-h6">ステータスを変更</div>
                    <v-select
                      v-model="item.companyName"
                      :items="companyNameItems"
                      label="Outlined style"
                      outlined
                      autofocus
                    ></v-select>
                  </template>
                </v-edit-dialog>
              </template>

              <!-- type Row -->
              <template v-slot:[`item.type`]="{ item }">
                <v-btn outlined  @click="typeContents(item)">
                      {{ item.type }}
                    </v-btn>
              </template>

              <!-- contract Row -->
              <template >
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
              </v-row>
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
      <v-row class="title">
          <v-col cols="2"></v-col>
          <v-col>
            <v-card>協力会社員一覧</v-card>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-container>
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
              </v-row>
        </v-sheet>
      </v-container>
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
        { text: '削除', value: 'note', sortable: false, align: 'right', width: '50%' }
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

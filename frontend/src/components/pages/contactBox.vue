<template>
  <v-app id="contactBox">
<!-- 通知一覧 -->
    <v-main>
      <v-container>
        <v-sheet color="white" rounded outlined>
          <v-container fluid>
            <v-row>
              <v-col cols="4">
                <v-row class="pa-6">
                  <!-- Filter for ALL-->
                  <v-text-field
                    v-model="search"
                    type="text"
                    label="検索"
                    outlined
                    dense
                  ></v-text-field>
                  <!-- Filter for status -->
                  <v-select
                    :items="statusList"
                    v-model="statusFilterValue"
                    label="状態を選択"
                    outlined
                    dense
                  ></v-select>
                </v-row>
              </v-col>
              <v-col cols="3"> </v-col>
              <v-col cols="5">
                <v-card outlined>
                  <v-card-subtitle class="pb-0"> 期間を選択 </v-card-subtitle>
                  <v-row class="pa-1">
                    <v-col cols="5">
                      <!-- Filter for startDate -->
                      <v-menu
                        ref="startDateMenu"
                        v-model="startDateMenu"
                        :close-on-content-click="false"
                        :return-value.sync="startDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="startDate"
                            label="開始"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="startDate"
                          no-title
                          scrollable
                          locale="jp-ja"
                          :day-format="
                            (startDate) => new Date(startDate).getDate()
                          "
                        >
                          <v-btn color="#ff6669" class="white--text" rounded @click="$refs.startDateMenu.save(startDate)">
                            OK
                          </v-btn>
                          <v-btn class="#f5f5f5" rounded @click="startDateMenu = false">
                              キャンセル
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="2">～</v-col>
                    <v-col cols="5">
                      <!-- Filter for endDate-->
                      <v-menu
                        ref="endDateMenu"
                        v-model="endDateMenu"
                        :close-on-content-click="false"
                        :return-value.sync="endDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="endDate"
                            label="終了"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="endDate"
                          no-title
                          scrollable
                          locale="jp-ja"
                          :day-format="(endDate) => new Date(endDate).getDate()"
                        >
                          <v-btn color="#ff6669" class="white--text" rounded @click="$refs.endDateMenu.save(endDate)">
                            OK
                          </v-btn>
                          <v-btn class="#f5f5f5" rounded @click="endDateMenu = false">
                              キャンセル
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <!-- data table -->
          <!-- sort-by="createDate" ソートカラムの選択  -->
          <!-- :sort-desc="true" 降順を適用  -->
          <v-data-table
            :search="search"
            :headers="headers"
            :items="alertList"
            item-key="name"
            class="elevation-1 pa-6"
            sort-by="createDate"
            :sort-desc="true"
          >
            <!-- status Row -->
            <template v-slot:[`item.status`]="{ item }">
              <v-edit-dialog
                :return-value.sync="item.status"
                large
                @save="setItem(item.status)"
              >
                <v-chip :color="getColor(item.status)" label outlined>
                  <!-- statusの真偽判定-->
                  {{ item.status ? "既読" : "未読" }}</v-chip
                >
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
            <!-- createDate Row -->
            <template v-slot:[`item.createDate`]="{ item }">
              <!-- ISO8601 形式の変換-->
              {{ new Date(item.createDate).toLocaleString() }}
            </template>
          </v-data-table>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/** 外部コンポーネントの呼び出し */
import Methods from '@/api/methods'
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

export default {
  name: 'contactBox',
  components: {
  },
  data: () => ({
    alertList: [],
    //  values for our select.
    statusList: [
      {text: '全て', value: null},
      {text: '既読', value: true},
      {text: '未読', value: false}
    ],
    statusItems: [
      {text: '既読', value: true},
      {text: '未読', value: false}
    ],
    // menu models
    startDateMenu: false,
    endDateMenu: false,
    // Filter models.
    search: '',
    statusFilterValue: null,
    startDate: null,
    endDate: null
  }),
  mounted: function () {
    // 通知管理の画面情報をとってきます。
    this.getEmployeeInfo()
  },
  computed: {
    /** v-tableのヘッダーを設定 */
    headers () {
      return [
        {
          text: '状態',
          value: 'status',
          align: 'center',
          filter: this.statusFilter,
          width: '10%'
        },
        {
          text: 'タイトル',
          value: 'title',
          align: 'center',
          width: '10%'
        },
        { text: '送信者',
          value: 'sendEmployeeName',
          align: 'center',
          width: '20%' },
        { text: '内容',
          value: 'sendDetail',
          align: 'center',
          width: '40%' },
        { text: '送信日時',
          value: 'sendDate',
          align: 'center',
          width: '20%',
          filter: this.dateFilter }
      ]
    },
  },
  methods: {
       // 初期表示処理です。
    async getEmployeeInfo () {
      let response = await Methods.getAlertInfo()
      // レスポンスから画面情報をセットする
      this.alertList = createAlertList(response)
    },
    // 日付のフォーマット処理です。
    displayDateFormat(date) {
      return dayjs(date).format("YYYY/MM/DD");
    },
    /**
       * Filter for status column.
       * @param value Value is items
       * @returns {boolean}
       */
    statusFilter (value) {
      // ステータスを選択していない・全ての場合はこの処理
      if (this.statusFilterValue === null) {
        return true
      }
      // <v-select>にて選択されたステータスと一致するアイテムをリターン
      return value === this.statusFilterValue
    }, /**
       * Filter for startDate column.
       * @param value Value is items
       * @returns {boolean}
       */
    dateFilter (value) {
      // 日付が選択されていない（偽＝初期値）の場合全件表示
      if (!this.startDate && !this.endDate) return value
      // 2つの日付が指定されている場合
      // 開始日時を0時に設定'T00:00:00'=00:00:00 / 終了時間を23次59分59秒に設定'T23:59:59'=23:59:59
      else if (this.startDate && this.endDate) {
        if (new Date(value) >= new Date(this.startDate + 'T00:00:00') && new Date(value) <= new Date(this.endDate + 'T23:59:59')) { return value }
        return console.log('no mach data')
      } else if (this.startDate || this.endDate) { // どちらか一方が選択されている場合
        if (this.startDate) {
          return new Date(value) >= new Date(this.startDate + 'T00:00:00') ? value : console.error('no mach data')
        } else return new Date(value) <= new Date(this.endDate + 'T23:59:59') ? value : console.error('no mach data')
      }
    },
    /** ステータスカラーの変更 */
    getColor (status) {
      return status ? 'green' : 'red'
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
//
// privateメソッドです。
//
/**
 * レスポンスをもとに画面情報(通知)を作成します。
 *
 * @param {obeject} response レスポンスです。
 *
 * @returns
 *
 */
function createAlertList (response) {
  var alertResponse = response.data.alertResponse
  var employeeResponse = response.data.employeeResponse
  // 通知一覧表示用に変換します。
  var alertList = []
  for (var i = 0; i < alertResponse.length; i++) {
    var alert = {}
    alert.alertId = alertResponse[i].objectId
    alert.title = alertResponse[i].title
    alert.employeeId = alertResponse[i].employeeId
    alert.status = alertResponse[i].status
    alert.sendDetail = alertResponse[i].sendDetail
    alert.sendDate = alertResponse[i].sendDate
    alert.sendEmployeeName = getEmployeeName(alertResponse[i].senderId, employeeResponse)
    alert.createUserId = alertResponse[i].createUserId
    alert.updateUserId = alertResponse[i].updateUserId
    alertList.push(alert)
  }

  return alertList
}
/**
 * 社員IDをもとに社員名を取得します。
 *
 * @param {string} senderId 送信者ID（社員ID）です。
 * @param {object} employeeResponse 社員のレスポンスデータです。
 *
 * @private
 * @returns
 */
function getEmployeeName (senderId, employeeResponse) {
  var employeeName = ''
  for (var j = 0; j < employeeResponse.length; j++) {
    if (senderId === employeeResponse[j].objectId) {
      employeeName = employeeResponse[j].employeeFirstname + employeeResponse[j].employeeLastname
    }
  }
  return employeeName
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

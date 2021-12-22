<template>
  <v-app id="contactBox">
    <v-main>
      <v-container>
        <p class="text-left">
          <a @click="$router.back()"><v-icon left>mdi-home</v-icon>戻る</a>
        </p>
        <h1>管理者通知</h1>
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
              <v-col cols="4">
              </v-col>
              <v-col cols="4">
              <v-card  max-width="344" outlined>
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
                        <v-btn
                          text
                          color="primary"
                          @click="startDateMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.startDateMenu.save(startDate)"
                        >
                          OK
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
                        <v-btn
                          text
                          color="primary"
                          @click="endDateMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.endDateMenu.save(endDate)"
                        >
                          OK
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
            :items="getContactList"
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
export default {
  name: 'contactBox',
  components: {
  },
  data: () => ({
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
          value: 'contactTitle',
          align: 'center',
          width: '10%'
        },
        { text: '送信者',
          value: 'sendUser',
          align: 'center',
          width: '20%' },
        { text: '内容',
          value: 'contents',
          align: 'center',
          width: '40%' },
        { text: '送信日時',
          value: 'createDate',
          align: 'center',
          width: '20%',
          filter: this.dateFilter }
      ]
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getContactList () {
      /** ToDo */
      /** Vuex contactListで定義したActionメソッドをここで呼び出し */
      return this.$store.state.contactList.contactList
    }
  },
  methods: {
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
      else if (new Date(value) >= new Date(this.startDate + 'T00:00:00') && new Date(value) <= new Date(this.endDate + 'T23:59:59')) return value
      // どちらか一方の日時が指定されている場合
      else if (this.startDate || this.endDate) {
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

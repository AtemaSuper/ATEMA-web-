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
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="4">
                <v-row class="pa-6">
                  <!-- Filter for status -->
                  <v-select
                    :items="statusList"
                    v-model="statusFilterValue"
                    label="ステータスを選択"
                  ></v-select>
                </v-row>
              </v-col>
              <v-col cols="4">
                <v-row class="pa-6">
                  <!-- Filter for startDate -->
                </v-row>
              </v-col>
              <v-col cols="4">
                <v-row class="pa-6">
                  <!-- Filter for endDate-->
                </v-row>
              </v-col>
            </v-row>
          </v-container>
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
                <v-chip
                  :color="getColor(item.status)"
                  label
                  outlined
                >
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
    // We need some values for our select.
    statusList: [
      {text: '全て', value: null},
      {text: '既読', value: true},
      {text: '未読', value: false}
    ],
    statusItems: [
      {text: '既読', value: true},
      {text: '未読', value: false}
    ],
    // Filter models.
    search: '',
    statusFilterValue: null
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
          width: '20%' }
      ]
    },
    /** Vuex storeで設定した値を取得 (オブジェクトで取得するので、配列を指名して)リターン */
    getContactList () {
      /** ToDo */
      /** Vuex contactListで定義したActionメソッドをここで呼び出し */
      return this.$store.state.contactList.contactList
    }
  },
  methods: {/**
    /**
       * Filter for calories column.
       * @param value Value to be tested.
       * @returns {boolean}
       */
    statusFilter (value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.statusFilterValue) {
        return true
      }
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return value === this.statusFilterValue
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

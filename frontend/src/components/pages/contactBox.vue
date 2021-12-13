<template>
  <v-app id="contactBox">
    <v-main>
      <v-container>
        <p class="text-left">
          <a @click="$router.back()"><v-icon left>mdi-home</v-icon>戻る</a>
        </p>
        <h1>管理者通知</h1>
        <v-sheet color="white" rounded outlined>
          <v-data-table :headers="headers" :items="getAttendanceList" item-key="name" class="elevation-1 pa-6">
        <template v-slot:top>

            <!-- v-container, v-col and v-row are just for decoration purposes. -->
            <v-container fluid>
                <v-row>

                    <v-col cols="6">
                        <v-row class="pa-6">
                            <!-- Filter for dessert name-->
                            <v-text-field v-model="dessertFilterValue" type="text" label="Name"></v-text-field>
                        </v-row>
                    </v-col>

                    <v-col cols="6">
                        <v-row class="pa-6">
                            <!-- Filter for calories -->
                            <v-select
                                    :items="caloriesList"
                                    v-model="caloriesFilterValue"
                                    label="Calories"
                            ></v-select>
                        </v-row>
                    </v-col>

                </v-row>
            </v-container>

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
    caloriesList: [
      {text: 'All', value: null},
      {text: 'Only 237', value: 237},
      {text: 'Only 305', value: 305}
    ],
    // Filter models.
    dessertFilterValue: '',
    caloriesFilterValue: null
  }),
  computed: {
    /** v-tableのヘッダーを設定 */
    headers () {
      return [
        {
          text: '氏名',
          align: 'center',
          sortable: false,
          value: 'name',
          filter: this.nameFilter
        },
        {
          text: '勤怠ステータス',
          value: 'status',
          align: 'center',
          filter: this.caloriesFilter
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
  methods: {/**
       * Filter for dessert names column.
       * @param value Value to be tested.
       * @returns {boolean}
       */
    nameFilter (value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.dessertFilterValue) {
        return true
      }
      // Check if the current loop value (The dessert name)
      // partially contains the searched word.
      return value.toLowerCase().includes(this.dessertFilterValue.toLowerCase())
    },
    /**
       * Filter for calories column.
       * @param value Value to be tested.
       * @returns {boolean}
       */
    caloriesFilter (value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.caloriesFilterValue) {
        return true
      }
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return value === this.caloriesFilterValue
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

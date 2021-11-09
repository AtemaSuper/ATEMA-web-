<template>
  <v-app id="attendanceManage">
    <v-main>
      <v-container>
        <p class="text-left">
          <a @click="$router.back()"><v-icon left>mdi-home</v-icon>戻る</a>
        </p>
        <h1>出退勤管理</h1>
        <v-sheet  color="white" height="250" rounded outlined>
          <v-row>
            <v-col cols="12" sm="6" md="2">
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
                    label="Picker in menu"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4"> </v-col>
            <v-col cols="12" sm="6" md="4"> </v-col>
            <v-col cols="12" sm="6" md="2">
                <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn  justify="center" color="primary" outlined v-bind="attrs" v-on="on">
            ダウンロード
          </v-btn>
        </template>
        <v-list class="header-menu-list">
          <v-list-item @click="trantision()">
            <v-list-item-title>自社用個人別一覧</v-list-item-title>
          </v-list-item>
          <v-list-item @click="trantision()">
            <v-list-item-title>所属会社別</v-list-item-title>
          </v-list-item>
          <v-list-item @click="trantision()">
            <v-list-item-title>Job別</v-list-item-title>
          </v-list-item>
          <v-list-item @click="trantision()">
            <v-list-item-title>客先別</v-list-item-title>
          </v-list-item>

        </v-list>
      </v-menu>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  components: {
  },
  conputed: {
  },
  data: () => ({
  }),
  methods: {
    // ページ遷移処理
    transition (path) {
      this.$router.push(path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

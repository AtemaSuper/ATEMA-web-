<template>
  <v-app id="main">
    <v-main style="padding: 20px 0px 0px">
      <v-container>
        <v-row align="center">
          <v-col sm="7" md="8">
            <v-row
              :class="['teal lighten-5', 'text-left', 'rounded-lg']"
              justify="center"
              max-width="150px"
            >
              <v-col cols="12" v-for="n in 3" :key="n">
                <a href="">{{ newsList[n - 1] }}</a>
              </v-col>
            </v-row>
          </v-col>
          <v-col sm="3" offset-sm="2" md="4" offset-md="0">
            <v-img
              max-height="70"
              contain
              :aspect-ratio="1.0"
              :src="require('../../assets/qa.png')"
              :class="['mx-auto', 'ma-5']"
              @click="pagePush('/qa')"
            ></v-img>
          </v-col>
        </v-row>

        <v-row
          :class="[/**表示域確認用 'blue lighten-4', */ 'mt-10']"
          align-content="center"
        >
          <!-- pageNameListの長さ分だけcolを生成 -->
          <v-col
            cols="3"
            v-for="n in pageNameList.length"
            :key="n"
            @click="pagePush(toPushList[n - 1])"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 3 : 0"
                :class="{ 'on-hover': hover, 'pa-5': true, 'rounded-xl': true }"
              >
                <v-img
                  max-height="100"
                  max-width="400"
                  contain
                  :aspect-ratio="1.0"
                  :src="require('../../assets/mainlogo' + n + '.png')"
                  :class="['mx-auto', 'ma-5']"
                ></v-img>
                <h3>{{ pageNameList[n - 1] }}</h3>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
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
    newsList: ['【機能改善】自社員管理機能が新しくなりました。', '【年末年始について】年末年始営業情報についてこちらをはご参照ください。', '【障害】現在つながりにくい状態が続いております。'],
    pageNameList: ['出退勤管理', '管理者通知', '客先・現場編集', '協力会社管理', '自社員管理'],
    toPushList: ['/attendanceManage', '/contactBox', '/workField', '/subCompanyAll', '/ownWorkerAll']
  }),
  methods: {
    // サーバーから返ってくる値をログに出力したいのでasyncとawaitを行う
    async post () {
    },
    pagePush (pageName) {
      this.$router.push(pageName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

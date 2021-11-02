<template>

      <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
          <!--  -->
          SideBar
        </v-navigation-drawer>

        <v-app-bar app>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-main>
          <router-link to="/login">login</router-link>
          <router-link to="/passwordReset">passwordReset</router-link>
          <h1>{{ msg }}</h1>
          <button @click="post">click me</button>
          <div>
            <Counter />
          </div>
        </v-main>
      </v-app>
</template>

<script>
/** 外部コンポーネントの呼び出し */
import Counter from '../parts/Counter.vue'
/** 外部コンポーネントの呼び出し */
import Methods from '@/api/methods'

export default {
  name: 'HelloWorld',
  components: {
    Counter
  },
  conputed: {
    count () {
      return this.$store.state.count
    }
  },
  data: () => ({
    drawer: false,
    group: null,
    msg: 'Welcome To ATEMA ! ! ! ! !'
  }),
  methods: {
    // サーバーから返ってくる値をログに出力したいのでasyncとawaitを行う
    async post () {
      let response = await Methods.testPosting()
      console.log(response)
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

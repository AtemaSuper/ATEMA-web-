<template>
      <v-app id="inspire">
        <v-main>
          <router-link to="/login">login</router-link>
          <router-link to="/passwordReset">passwordReset</router-link>
          <router-link to="/clientField">clientField</router-link>
          <router-link to="/workField">workField</router-link>
          <h1>{{ msg }}</h1>
          <v-btn @click="get">click me</v-btn>
          <v-btn @click="testLoginPosting">login</v-btn>
          <v-btn @click="testProtectedPosting">check</v-btn>
          <v-btn @click="testLogoutPosting">logout</v-btn>
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
    async get () {
      let response = await Methods.testGet()
      console.log(response)
    },
    // user_API_login
    async testLoginPosting () {
      let response = await Methods.testLoginPosting()
      console.log(response)
    },
    // user_API_protected
    async testProtectedPosting () {
      let response = await Methods.testProtectedPosting()
      console.log(response)
    },
    // user_API_logout
    async testLogoutPosting () {
      let response = await Methods.testlogoutPosting()
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

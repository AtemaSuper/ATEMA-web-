<template>
  <div>
    <div>gazou</div>
    <div>ID</div>
    <div>PASS</div>
    <input type='button'>ログイン
    <input type='checkbox'>ログイン状態を保持しますか
    <div><a href="/">パスワードを忘れた場合</a></div>
  </div>
</template>

<script>
/** 外部コンポーネントの呼び出し */
/** import Counter from '../parts/Counter.vue' */
/** 外部コンポーネントの呼び出し */
/** import Methods from '@/api/methods' */

export default {
  name: 'login',
  components: {
  },
  conputed: {
    count () {
    }
  },
  data: () => ({
  }),
  methods: {
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

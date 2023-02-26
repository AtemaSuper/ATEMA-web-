<template>
  <v-app id="inspire">
    <v-main>
      <router-link to="/login">login</router-link>
      <h1>{{ msg }}</h1>

      <v-divider class="my-5" />
      <h3>firebase json import</h3>
      <v-btn @click="firebaseJsonImport('alert', '00000001')">alert</v-btn>
      <v-btn @click="firebaseJsonImport('attendance', '00000001')"
        >attendance</v-btn
      >
      <v-btn @click="firebaseJsonImport('clientField', '00000001')"
        >clientField</v-btn
      >
      <v-btn @click="firebaseJsonImport('contractRelation')"
        >contractRelation</v-btn
      >
      <v-btn @click="firebaseJsonImport('contractor', '00000001')"
        >contractor</v-btn
      >
      <v-btn @click="firebaseJsonImport('emoployee', '00000001')"
        >emoployee</v-btn
      >
      <v-btn @click="firebaseJsonImport('post', '00000001')">post</v-btn>
      <v-btn @click="firebaseJsonImport('subCompany', '00000001')"
        >subCompany</v-btn
      >
      <v-btn @click="firebaseJsonImport('workField', '00000001')"
        >workField</v-btn
      >
      <v-btn @click="firebaseJsonImport('workFieldDetail', '00000001')"
        >workFieldDetail</v-btn
      >
      <v-btn @click="firebaseJsonImport('workTypeId', '00000001')"
        >workTypeId</v-btn
      >

      <v-divider class="my-5" />
      <div>
        <Counter />
      </div>
    </v-main>
  </v-app>
</template>

<script>
/** 外部コンポーネントの呼び出し */
import Counter from "../parts/Counter.vue";
/** 外部コンポーネントの呼び出し */
import Methods from "@/api/methods";

export default {
  name: "HelloWorld",
  components: {
    Counter
  },
  conputed: {
    count() {
      return this.$store.state.count;
    }
  },
  data: () => ({
    drawer: false,
    group: null,
    msg: "Welcome To ATEMA ! ! ! ! !"
  }),
  methods: {
    async firebaseJsonImport(collectionName, documentName) {
      let response = await Methods.stubImport(collectionName, documentName);
      console.log(response);
    }
  }
};
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

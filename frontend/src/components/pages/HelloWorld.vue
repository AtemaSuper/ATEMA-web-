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
      <br />
      <input v-model="documentId" placeholder="documentId" />
      <v-btn @click="firebaseJsonImport('employee', '00000001')"
        >employee</v-btn
      >
      <br />
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
      <h3>firebase excel download</h3>
      <v-btn @click="firestoreExcelDownload('workTypeId', '00000001')"
        >API test</v-btn
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
    msg: "Welcome To ATEMA ! ! ! ! !",
    documentId: ""
  }),
  methods: {
    async firebaseJsonImport(collectionName, documentName) {
      if (collectionName === "employee" && this.documentId.length < 2) {
        alert("documentIdを入力してください");
        return;
      }
      await Methods.stubImport(collectionName, documentName, this.documentId);
    },
    async firestoreExcelDownload() {
      await Methods.excelDownload();
      // APIエンドポイントからExcelデータのバッファを取得
      const response = await Methods.excelDownload();
      console.log(response);

      // バッファを受け取り、Excelファイルとしてダウンロード
      const blob = new Blob([response.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "example.xlsx"; // ダウンロード時のファイル名
      link.click();
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

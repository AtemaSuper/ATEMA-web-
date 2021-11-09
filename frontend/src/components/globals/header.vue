<template>
    <!-- ヘッダー部 -->
    <v-app-bar app color="pink darken-1" max-height="64px">
      <v-img
        :src="require('@/assets/images/logo.png')"
        max-height="64px"
        max-width="256px"
      ></v-img>
      <v-spacer></v-spacer>
      <v-toolbar-title class="header-user-info"
        >{{ userInfo.companyName }} ( {{ userInfo.companyId }} )
        |</v-toolbar-title
      >
      <v-toolbar-title class="header-user-info"
        >{{ userInfo.userName }} ( {{ userInfo.postName }} )</v-toolbar-title
      >
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon class="white--text">mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <v-list class="header-menu-list">
          <v-list-item @click="trantision('/ownCompany')">
            <v-list-item-title>設定</v-list-item-title>
          </v-list-item>
          <v-list-item @click="trantision()">
            <v-list-item-title>プラン・お支払方法変更</v-list-item-title>
          </v-list-item>
          <v-list-item @click="trantision()">
            <v-list-item-title>ヘルプ</v-list-item-title>
          </v-list-item>
          <v-dialog v-model="dialog" max-width="500" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item v-bind="attrs" v-on="on">ログアウト</v-list-item>
            </template>
              <v-card>
              <v-card-title></v-card-title>
              <v-card-text class="text-h6 logout-message">
                ログアウトします。よろしいですか？
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue lighten-1 logout-btn" @click="logout()">
                  ログアウト
                </v-btn>
                <v-btn color="" outlined @click="dialog = false">
                  キャンセル
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list>
      </v-menu>
    </v-app-bar>
</template>

<script>

export default {
  data () {
    return {
      dialog: false,
      // ログインユーザ情報
      userInfo: {
        companyName: 'ABC事業',
        companyId: '2021001',
        userName: '山田太郎',
        postName: '社長'
      }
    }
  },
  components: {
  },
  conputed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    // ページ遷移処理
    transition (path) {
      this.$router.push(path)
    },
    // ログアウト処理
    logout () {
      this.dialog = false
      // TODO ログイン情報を破棄する
      this.transition('/login')
    }
  },
  mounted: {
    // TODO ユーザ情報を受けとる
  }
}
</script>

<style scoped>
.header-user-info {
  color: #fff;
}
.header-menu-list {
  text-align: left;
}
.logout-btn {
  color: #fff;
}
</style>

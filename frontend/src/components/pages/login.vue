<template>
  <v-app id="login">
    <v-row align="center">
      <v-col sm="5" md="6" class="bg"> </v-col>
      <v-col sm="5" offset-sm="2" md="6" offset-md="0"
        ><v-img
          max-height="150"
          max-width="400"
          :src="require('../../assets/logo2.png')"
          :class="['mx-auto', 'ma-5']"
        ></v-img>
        <v-card class="mx-auto" max-width="600" outlined>
          <v-card-text>
            <v-card-title primary-title class="justify-center">
              <div>
                <h2
                  class="headline font-weight-bold orange--text text--accent-2"
                >
                  契約者用ログイン
                </h2>
              </div>
            </v-card-title>
            <v-form ref="loginForm">
              <v-text-field
                name="login"
                label="ID"
                type="text"
                v-model="model.email"
                :rules="emailRules"
                maxlength="50"
                clearable
                clear-icon="mdi-close-circle"
                outlined
                required
              ></v-text-field>
              <v-text-field
                name="password"
                label="パスワード"
                id="password"
                type="password"
                v-model="model.password"
                :rules="passwordRules"
                maxlength="50"
                clearable
                clear-icon="mdi-close-circle"
                outlined
                required
              >
              </v-text-field>
            </v-form>
            <!-- <v-btn block color="primary" @click="login" :loading="loading">ログイン</v-btn> -->
            <v-card-actions class="justify-center">
              <v-btn block color="primary" to="/main">ログイン</v-btn>
            </v-card-actions>
            <v-spacer />
            <v-card-actions class="justify-center">
              <v-checkbox
                v-model="checkbox"
                label="ログイン状態を保持しますか？"
              ></v-checkbox>
            </v-card-actions>
            <router-link to="/passwordReset"
              >パスワードを忘れた場合</router-link
            >
          </v-card-text>
        </v-card>
        <a href="">新規会員登録はこちら</a>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
/** import Axios from 'axios' */
export default {
  data: () => ({
    loading: false,
    emailRules: [
      v => !!v || "IDが未入力です",
      v => (v && v.length <= 50) || "文字数制限は50文字以内です"
    ],
    passwordRules: [
      v => !!v || "パスワードが未入力です",
      v => (v && v.length <= 50) || "文字数制限は50文字以内です"
    ],
    checkbox: true,
    model: {
      email: "",
      password: ""
    }
  }),

  methods: {
    /** login () {
      // バリデーションが通った場合
      if (this.$refs.loginForm.validate()) {
        // ぐるぐる表示にしてボタンを二度押しできなくする
        this.loading = true
        // APIでログイン認証を行う
        Axios.post('/api/auth/login', this.model).then(res => {
          // 成功した場合
          if (res.data.result) {
            // ログイン情報を store に保存
            this.$store.dispatch('setLoginInfo', res.data)
            // 元の画面に戻る
            this.$router.push({path: 'backuri' in this.$route.query && this.$route.query.backuri.match(/^\//) ? this.$route.query.backuri : '/'})
          // メールアドレスとパスワードが正しくない組み合わせだった場合
          } else {
            this.loading = false
            alert(Object.values(res.data.errors).join('\n'))
          }
        })
      }
    } */
  }
};
</script>
<style scoped>
.bg {
  background-image: url("../../assets/bg1.jpg");
  background-size: cover;
  background-position: center center;
  height: 100%;
}
</style>

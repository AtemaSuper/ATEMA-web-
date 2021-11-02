<template>
  <v-app>
    <v-main>
      <v-card class="mx-auto" max-width="500" outlined>
        <v-card-text>
          <v-card-title primary-title class="justify-center">
            <div>
              <h3 class="headline pink--text text--accent-2">管理者用ログイン</h3>
            </div>
          </v-card-title>
          <v-form ref="loginForm">
            <v-text-field
              name="login"
              label="ID"
              type="text"
              v-model="model.email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              name="password"
              label="パスワード"
              id="password"
              type="password"
              v-model="model.password"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-form>
        <!-- <v-btn block color="primary" @click="login" :loading="loading">ログイン</v-btn> -->
        <v-card-actions class="justify-center">
          <v-btn to="/">ログイン</v-btn>
        </v-card-actions>
        <v-spacer />
        <v-card-actions class="justify-center">
        <v-checkbox
          v-model="checkbox"
          label="ログイン状態を保持しますか？"
        ></v-checkbox>
        </v-card-actions>
        <router-link to="/passwordReset">パスワードを忘れた場合</router-link>
        </v-card-text>
      </v-card>
      <a href="">新規会員登録はこちら</a>
    </v-main>
  </v-app>
</template>

<script>
/** import Axios from 'axios' */
export default {
  data: () => ({
    loading: false,
    emailRules: [
      v => !!v || 'メールアドレスは必須項目です。',
      v => (v && v.length <= 128) || 'メールアドレスは128文字以内で入力してください。',
      v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'メールアドレスの形式が正しくありません。'
    ],
    passwordRules: [
      v => !!v || 'パスワードは必須項目です。',
      v => (v && v.length <= 32) || 'パスワードは32文字以内で入力してください。'
    ],
    checkbox: true,
    model: {
      email: '',
      password: ''
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
}
</script>

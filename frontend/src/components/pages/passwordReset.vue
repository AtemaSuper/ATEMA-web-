<template>
  <v-app>
    <v-container>
    <v-img class="logo"  :src="require('../../assets/logo2.png')"></v-img>
    <h1 class="password-title">パスワード再設定</h1>
    <p class="password-text">
      パスワード再設定用URLを送信しますので、ご登録いただいたメールアドレスを入力し、送信ボタンを押してください。
    </p>
    <v-card outlined>
      <v-card-text>
        <v-form ref="passwordReset">
          <v-text-field
            v-model="email"
            name="email"
            label="メールアドレス"
            id="email"
            type="email"
            :rules="emailRules"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
    <v-btn rounded large color="primary" class="button" @click="submit">送 信</v-btn>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: null,
    emailRules: [
      value => !!value || '未入力です。',
      value => (value || '').length <= 100 || '入力をできる文字数を超えています。',
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'メールアドレス形式ではありません。'
      }
    ]
  }),
  mounted () {
    // エラーをリセット
    this.$refs.form.resetValidation()
  },
  methods: {
    submit () {
      if (this.$refs.form.validation()) {
        // 送信処理
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
.logo{
  margin: 0 auto;
  width: 700px;
}
.password-title {
  width: auto;
  margin-right: 60%;
}
.password-text {
  margin-right: 1%;
  padding: 2%;
}
.button{
  margin-top: 30px;
}
</style>

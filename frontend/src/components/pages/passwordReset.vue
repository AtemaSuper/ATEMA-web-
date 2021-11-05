<template>
  <v-app>
    <v-container>
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
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
    <v-btn color="primary" class="button">送 信</v-btn>
    </v-container>
  </v-app>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
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

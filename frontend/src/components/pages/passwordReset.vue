<template>
  <v-app>
    <h1 class="password-title">パスワード再設定</h1>
    <p class="password-text">
      パスワード再設定用URLを送信しますので、ご登録いただいたメールアドレスを入力し、送信ボタンを押してください。
    </p>
    <v-card class="mx-auto" max-width="600" outlined>
      <v-card-text>
        <v-card-title primary-title class="justify-center">
          <div>
            <h2 class="headline font-weight-bold orange--text text--accent-2">
              管理者用ログイン
            </h2>
          </div>
        </v-card-title>
        <v-form ref="loginForm">
          <v-text-field
            name="password"
            label="パスワード"
            id="password"
            type="password"
            required
          ></v-text-field>
        </v-form>
        <v-spacer />
      </v-card-text>
    </v-card>
    <v-btn color="primary" to="/">ログイン</v-btn>
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
.form-address {
  margin-left: 20%;
  width: 60%;
  border: solid;
  padding: 1%;
}
.botan {
  padding: 3%;
  color: skyblue;
}
</style>

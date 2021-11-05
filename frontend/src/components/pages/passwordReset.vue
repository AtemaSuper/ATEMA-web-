<template>
  <div>
    <!-- ここにパスワード変更画面用プログラムを記述-->
    <h1 class="password-henkou">パスワード再設定</h1>
    <p class="password-bun">パスワード再設定用URLを送信しますので、ご登録いただいたメールアドレスを入力し、送信ボタンを押してください。</p>
    <div class="form-address">
      メールアドレス:<input name="text">
      <form action="hoge.cgi" method="POST" enctype="multipart/form-data"></form>
    </div>
    <div class="botan"><input type=submit value="送信"></div>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  font-weight: normal;
}
.password-henkou{
  width: auto;
  margin-right: 60%;
}
.password-bun{
  margin-right: 1%;
  padding: 2%;
}
.form-address{
  margin-left: 20%;
  width: 60%;
  border: solid;
  padding: 1%;
}
.botan{
  padding: 3%;
  color: skyblue;
}
</style>

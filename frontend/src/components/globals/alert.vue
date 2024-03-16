<template>
  <v-card class="alert-contents">
    <v-alert
      v-model="responseData.showAlert"
      close-text="Close Alert"
      dismissible
      dense
      outlined
      :type="responseData.type"
      text
      transition="scale-transition"
    >
      {{ showMessage }}
    </v-alert>
  </v-card>
</template>

<script>
export default {
  name: "alertComponent",
  props: ["responseData"],
  computed: {
    // メッセージの数分メッセージを表示
    showMessage: function() {
      var message = "";
      for (var i in this.responseData.messageList) {
        message += this.responseData.messageList[i] + " ";
      }
      return message;
    }
  }
};
</script>

<style scoped>
.btn-label {
  font-size: 0.5rem;
}
.alert-contents {
  background-color: #fff;
  height: auto;
}
</style>

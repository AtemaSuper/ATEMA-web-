<template>
  <v-card class="alert-contents">
    <v-alert
      v-model="responseData.showAlert"
      close-text="Close Alert"
      dismissible
      dense
      outlined
      :type='responseData.type'
      text
      transition="scale-transition"
    >
      {{responseData.messageList[0]}}
    </v-alert>
  </v-card>
</template>

<script>

export default {
  name: 'alertComponent',
  props: ["responseData"],
  computed: {
  }
}
</script>

<style scoped>
.btn-label {
  font-size: 0.5rem;
}
.alert-contents {
  background-color: #fff;
  max-width: 100%;
  width: 100%;
  margin: auto;
}
</style>

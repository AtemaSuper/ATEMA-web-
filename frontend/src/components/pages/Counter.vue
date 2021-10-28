<template>
  <div>
    <v-btn @click="increment" value="+">increment + </v-btn>
    <v-btn @click="dicrement" value="-">dicrement - </v-btn>
    <div> {{ count }}</div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  computed: {
    count () { return this.$store.getters.count }
  },
  methods: {
    increment () {
      this.$store.dispatch('increment')
    },
    dicrement () {
      this.$store.dispatch('dicrement')
    }
  }
}
</script>

<style scoped>

</style>

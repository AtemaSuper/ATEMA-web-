<template>
  <div>
    <button @click="increment" value="+">increment + </button>
    <button @click="dicrement" value="-">dicrement - </button>
    <div> {{ count }}</div>
  </div>
</template>

<script>
  export default {
    name: "Counter",
    computed: {
      count() { return this.$store.getters.count}
    },
    methods: {
      increment() {
        this.$store.dispatch('increment')
      },
      dicrement() {
        this.$store.dispatch('dicrement')
      }
    }
  }
</script>

<style scoped>

</style>
<template>
  <v-app id="app">
    <template v-if="!$route.path.includes('login')">
    <Header/>
    </template>
      <v-main>
         <keep-alive :include="['login']">
         <router-view/>
         </keep-alive>
    </v-main>
   </v-app>
</template>

<script>

export default {

  data: () => ({
    drawer: false
  }),
  props: {
    source: String
  }
}
</script>

<script>
import Header from './components/globals/header.vue'
export default {
  components: { Header },
   name: 'App',
   data() {
      return {
         drawer: false,
      };
   },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

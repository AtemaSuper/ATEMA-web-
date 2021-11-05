<template>
  <v-app id="app" >
    <template v-if="!$route.path.includes('login')">
    <Header/>
    </template>
         <keep-alive :include="['login']">
         <router-view/>
         </keep-alive>
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
.v-application{
    font-family: "Zen Kaku Gothic New" !important;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

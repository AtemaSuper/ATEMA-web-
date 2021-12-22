<template>
  <v-app id="app">
    <template>
      <div>
        <component :is="headerComponent"></component>
        <v-row v-if="showTitleComponent" class="title">
          <v-col cols="2"></v-col>
          <v-col>
            <v-card>タイトル</v-card>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row class="main-contents">
          <v-col cols="2" v-if="showSideComponent">
            <v-card class="mx-auto side-menu-contents" max-width="350">
              <component :is="sideComponent"></component>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <router-view />
            </v-card>
          </v-col>
          <v-col cols="1" v-if="showSideComponent"></v-col>
        </v-row>
      </div>
    </template>
  </v-app>
</template>

<script>
import Header from '@/components/globals/header.vue'
import SideMenu from '@/components/globals/sideMenu.vue'

export default {
  name: 'App',
  components: {Header, SideMenu},
  data () {
    return {
    }
  },
  computed: {
    // ヘッダー表示切替
    headerComponent () {
      switch (this.$route.path) {
        case '/ownCompany':
          return 'Header'
        case '/main':
          return 'Header'
        case '/attendanceManage':
          return 'Header'
        case '/clientField':
          return 'Header'
        case '/workField':
          return 'Header'
        case '/contactBox':
          return 'Header'
        default:
          return ''
      }
    },
    // サイドメニュー部表示切替
    sideComponent () {
      switch (this.$route.path) {
        case '/ownCompany':
          return 'SideMenu'
        case '/clientField':
          return true
        case '/workField':
          return true
        default:
          return ''
      }
    },
    // サイドメニュー部表示切替
    // サイドメニューを表示しない場合は、colごと消す
    showSideComponent () {
      switch (this.$route.path) {
        case '/ownCompany':
          return true
        case '/clientField':
          return true
        case '/workField':
          return true
        default:
          return false
      }
    },
    // タイトル部表示切替
    showTitleComponent () {
      switch (this.$route.path) {
        case '/ownCompany':
          return true
        case '/clientField':
          return true
        case '/workField':
          return true
        default:
          return false
      }
    }
  },
  methods: {
  }
}
</script>

<style>
.v-application {
  font-family: "Zen Kaku Gothic New" !important;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main-contents {
  background-color: #cccccc;
}
.title {
  height: 75px;
  padding-top: 25px;
  font-size: 3.8rem;
  background-color: #cccccc;
}
</style>

<template>
  <v-app id="app">
    <template>
      <div>
        <component :is="headerComponent"></component>
        <v-row v-if="showTitleComponent" class="title">
          <v-col cols="2"></v-col>
          <v-col>
            <v-card class="page-title">{{setTitle}}</v-card>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row class="main-contents">
          <v-col cols="2" v-if="showSideComponent">
            <v-card class="mx-auto side-menu-contents" max-width="350">
              <component @parentMethod="updateContentsId" :is="sideComponent"></component>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="page-contents">
              <router-view  v-bind:showContents="contentsId"  />
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
  ownCompanyContents: 1,
  components: {Header, SideMenu},
  data () {
    return {
      title: '',
      contentsId: 1
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
        case '/ownWorkerAll':
          return 'Header'
        case '/subCompanyAll':
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
        case '/attendanceManage':
          return true
        case '/contactBox':
          return true
        case '/ownCompany':
          return true
        case '/ownWorkerAll':
          return true
        case '/clientField':
          return true
        case '/workField':
          return true
        case '/subCompanyAll':
          return true
        default:
          return false
      }
    },
    // タイトル部表示切替
    setTitle () {
      switch (this.$route.path) {
        case '/attendanceManage':
          return '出退勤管理'
        case '/contactBox':
          return '通知BOX'
        case '/ownWorkerAll':
          return '自社員管理'
        case '/ownCompany':
          return '自社設定'
        case '/clientField':
          return '客先編集'
        case '/workField':
          return '現場編集'
        case '/subCompanyAll':
          return '協力会社一覧'
        default:
          return ''
      }
    }
  },
  methods: {
    updateContentsId (contentsId) {
      this.contentsId = contentsId
    }
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
.page-contents {
  padding:2%;
}
.page-title {
  font-weight: 700;
}
</style>

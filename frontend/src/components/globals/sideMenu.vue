<template>
    <v-list dense>
      <v-list-item-group>
        <v-list-item v-for="(item, i) in setSideMenu" :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  computed: {
    // 画面に応じてサイドメニューをセットします。
    setSideMenu () {
      var items = []
      switch (this.$route.path) {
        case '/ownCompany':
          items = [
            {icon: 'mdi-pencil', text: '基本情報', page: ''},
            {icon: 'mdi-account', text: '勤怠情報', page: ''}
          ]
          return items
        case '/clientField':
          items = [
            {icon: 'mdi-wrench', text: '工事編集', page: ''},
            {icon: 'mdi-gavel', text: '客先・現場編集', page: ''}
          ]
          return items
        case '/workField':
          items = [
            {icon: 'mdi-wrench', text: '工事編集', page: ''},
            {icon: 'mdi-gavel', text: '客先・現場編集', page: ''}
          ]
          return items
        default:
          return items
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.side-menu-contents {
  margin-top: 20px;
}
</style>

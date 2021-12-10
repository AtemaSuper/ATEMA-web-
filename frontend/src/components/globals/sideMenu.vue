<template>
    <v-list dense>
      <v-list-item-group>
        <v-list-item v-for="(item, i) in items" :key="i">
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
  mounted () {
    // サイドメニューを設定
    this.setSideMenu()
  },
  methods: {
    // 画面に応じてサイドメニューをセットします。
    setSideMenu () {
      var pageName = this.$route.name
      switch (pageName) {
        case 'workField':
          this.items = [
            {icon: 'mdi-wrench', text: '工事編集', page: ''},
            {icon: 'mdi-gavel', text: '客先・現場編集', page: ''}
          ]
          break
        case 'clientField':
          this.items = [
            {icon: 'mdi-wrench', text: '工事編集', page: ''},
            {icon: 'mdi-gavel', text: '客先・現場編集', page: ''}
          ]
          break
        case 'ownCompany':
          this.items = [
            {icon: 'mdi-pencil', text: '基本情報', page: ''},
            {icon: 'mdi-account', text: '勤怠情報', page: ''}
          ]
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>
.side-menu-contents {
  margin-top: 20px;
}
</style>

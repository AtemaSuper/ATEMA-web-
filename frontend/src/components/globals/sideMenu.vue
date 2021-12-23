<template>
  <v-list dense>
    <v-list-item-group>
      <v-list-item
        v-for="(item, i) in setSideMenu"
        :key="i"
        @click="selectPage(item.action)"
      >
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
import OwnCompany from '@/components/pages/ownCompany'

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
            {icon: 'mdi-pencil', text: '基本情報', action: '1'},
            {icon: 'mdi-account', text: '勤怠情報', action: '2'}
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
    selectPage (action) {
      OwnCompany.selectPage(action)
    }
  }
}
</script>

<style scoped>
.side-menu-contents {
  margin-top: 20px;
}
</style>

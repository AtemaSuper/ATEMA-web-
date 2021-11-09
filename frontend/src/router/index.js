/** 画面遷移についてはこのファイルに記述 */
import Vue from 'vue'
import Router from 'vue-router'
/** componentsのインポート  */
import HelloWorld from '@/components/pages/HelloWorld'
import login from '@/components/pages/login'
import main from '@/components/pages/main'
import passwordReset from '@/components/pages/passwordReset'

Vue.use(Router)

export default new Router({
  routes: [
    {/** 初期位置 */
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {/** login.vue */
      path: '/login',
      name: 'login',
      component: login
    },
    {/** passwordReset.vue */
      path: '/passwordReset',
      name: 'passwordReset',
      component: passwordReset
    },
    {/** main.vue */
      path: '/main',
      name: 'main',
      component: main
    }
  ]
})

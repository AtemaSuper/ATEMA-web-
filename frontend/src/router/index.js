/** 画面遷移についてはこのファイルに記述 */
import Vue from 'vue'
import Router from 'vue-router'
/** componentsのインポート  */
import HelloWorld from '@/components/pages/HelloWorld'
import Main from '@/components/pages/main'
import Login from '@/components/pages/login'
import PasswordReset from '@/components/pages/passwordReset'
import OwnCompany from '@/components/pages/ownCompany'

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
      component: Login
    },
    {/** passwordReset.vue */
      path: '/passwordReset',
      name: 'passwordReset',
      component: PasswordReset
    },
    {/** ownCompany.vue */
      path: '/ownCompany',
      name: 'ownCompany',
      component: OwnCompany
    },
    {/** main.vue */
      path: '/main',
      name: 'main',
      component: Main
    }
  ]
})

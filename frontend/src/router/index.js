/** 画面遷移についてはこのファイルに記述 */
import Vue from 'vue'
import Router from 'vue-router'
/** componentsのインポート  */
import HelloWorld from '@/components/pages/HelloWorld'
import login from '@/components/pages/login'
import main from '@/components/pages/main'
import passwordReset from '@/components/pages/passwordReset'
import ownCompany from '@/components/pages/ownCompany'
import clientField from '@/components/pages/clientField'
import workField from '@/components/pages/workField'

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
    {/** ownCompany.vue */
      path: '/ownCompany',
      name: 'ownCompany',
      component: ownCompany
    },
    {/** main.vue */
      path: '/main',
      name: 'main',
      component: main
    },
    {/** clientField.vue */
      path: '/clientField',
      name: 'clientField',
      component: clientField
    },
    {/** workField.vue */
      path: '/workField',
      name: 'workField',
      component: workField
    }
  ]
})

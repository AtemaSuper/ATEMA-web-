/** 画面遷移についてはこのファイルに記述 */
import Vue from 'vue'
import Router from 'vue-router'
/** componentsのインポート  */
import HelloWorld from '@/components/pages/HelloWorld'
import Login from '@/components/pages/login'
import ClientField from '@/components/pages/clientField'
import WorkField from '@/components/pages/workField'
import AttendanceManage from '@/components/pages/attendanceManage'
import Main from '@/components/pages/main'
import ContactBox from '@/components/pages/contactBox'
import OwnWorkerAll from '@/components/pages/ownWorkerAll'

import PasswordReset from '@/components/pages/passwordReset'
import OwnCompany from '@/components/pages/ownCompany'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {/** clientField.vue */
      path: '/clientField',
      name: 'clientField',
      component: ClientField
    },
    {/** workField.vue */
      path: '/workField',
      name: 'workField',
      component: WorkField
    },
    {/** attendanceManage.vue */
      path: '/attendanceManage',
      name: 'attendanceManage',
      component: AttendanceManage
    },
    {/** contactBox.vue */
      path: '/contactBox',
      name: 'contactBox',
      component: ContactBox
    },
    {/** ownWorkerAll.vue */
      path: '/ownWorkerAll',
      name: 'ownWorkerAll',
      component: OwnWorkerAll
    }
  ]
})

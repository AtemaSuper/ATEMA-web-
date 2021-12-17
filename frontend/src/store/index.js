import Vue from 'vue'
import Vuex from 'vuex'
import counter from './modules/counter/index'
import attendanceList from './modules/attendanceList/index'
import subCompany from './modules/subCompany/index'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  modules: {
    counter,
    attendanceList,
    subCompany
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import counter from './modules/counter/index'
import attendanceList from './modules/attendanceList/index'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  modules: {
    counter,
    attendanceList
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

import Vue from 'vue'
import Vuex from 'vuex'
import counter from './modules/counter/index'
import attendanceList from './modules/attendanceList/index'
import contactList from './modules/contactList/index'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  modules: {
    counter,
    attendanceList,
    contactList
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

import Vue from 'vue'
import Vuex from 'vuex'
import counter from './modules/counter/index'
import attendanceList from './modules/attendanceList/index'
import contactList from './modules/contactList/index'
import ownWorker from './modules/ownWorker/index'
import postList from './modules/postList/index'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  modules: {
    counter,
    attendanceList,
    contactList,
    ownWorker,
    postList
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

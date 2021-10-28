import Vue from 'vue'
import Vuex from 'vuex'
import counter from './modules/counter/index'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  modules: {
    counter
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

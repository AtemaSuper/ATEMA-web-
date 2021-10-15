const state = {
    count: 0
  }
  
  const getters = {
    count: state => state.count
  }
  
  const actions = {
    increment({ commit }) {
      commit('increment')
    },
    dicrement({ commit }) {
        commit('dicrement')
      }
  }
  
  const mutations = {
    increment (state) {
      state.count++ 
    },
    dicrement (state) {
        state.count--
      }
  }
  
  export default {
    state,
    getters,
    actions,
    mutations
  }

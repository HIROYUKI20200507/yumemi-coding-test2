import { createStore } from "vuex";
// import axios from "axios";

export default createStore({
  state: {
    resPref: [],
  },
  getters: {},
  mutations: {
    test(state: any, payload) {
      state.resPref = payload;
    },
  },
  actions: {
    async fetchPrefs({ commit }, payload) {
      console.log(payload);
      commit("test", payload);
      // const response = await axios.get(
      //   `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${pref.prefCode}&cityCode="-"`,
      //   {
      //     headers: { "X-API-KEY": api.key },
      //   }
      // );
      // commit("setTodos", response.data);
    },
  },
  modules: {},
});

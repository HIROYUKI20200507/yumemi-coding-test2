import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    resPref: [],
  },
  getters: {},
  mutations: {
    fetchPrefs(state: any, payload) {
      state.resPref = payload;
    },
  },
  actions: {
    fetchPrefs({ commit }, payload) {
      const fetchPerData: any = [];
      payload.isPref.forEach((element: any) => {
        axios
          .get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${element.prefCode}&cityCode=-`,
            {
              headers: { "X-API-KEY": "kwbyqq3VlUfx9c8DGb7YqA3a2E2C1iJ2xWgrtSmC" },
            }
          )
          .then((res) => {
            fetchPerData.push(res.data.result);
          });
      });
      commit("fetchPrefs", fetchPerData);
    },
  },
  modules: {},
});

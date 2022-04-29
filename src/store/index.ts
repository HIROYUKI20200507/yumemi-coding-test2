import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    resPref: [],
    year: [],
  },
  getters: {},
  mutations: {
    getPrefs(state: any, payload) {
      state.resPref = payload;
    },
    getYears(state: any, payload) {
      state.year = payload;
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
            const pram = res.data.result.data[0].data;
            const fetchYear: number[] = [];
            const fetchPramNum: number[] = [];

            pram.forEach((ele: any) => {
              fetchPramNum.push(ele.value);
              fetchYear.push(ele.year);
            });

            fetchPerData.push({
              label: element.prefName,
              backgroundColor: "#f87979",
              data: fetchPramNum,
            });
            commit("getPrefs", fetchPerData);
            commit("getYears", fetchYear);
          });
      });
    },
  },
  modules: {},
});

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

            // rgb値自動生成
            const min = 10000;
            const max = 19999;
            const NUM = Math.floor(Math.random() * (max + 1 - min)) + min;
            const NUM2 = ("" + NUM).slice(-10);

            fetchPerData.push({
              label: element.prefName,
              backgroundColor: `#f${NUM2}`,
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

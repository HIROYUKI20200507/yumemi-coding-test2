<template>
  <div v-if="isSidebar">
    <ul v-for="(pref, index) of prefData" :key="index" class="flex">
      <li class="m-auto mt-5">
        <label>
          <input type="checkbox" :value="pref" v-model="isActivePref" />
          {{ pref.prefName }}
        </label>
      </li>
    </ul>
  </div>

  <div @click="isSidebarActive"></div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import api from "../plugins/resas.js";
// import { useStore } from "vuex";

export default {
  setup() {
    // const store = useStore();
    const prefData = reactive([]);
    const isSidebar = ref(true);
    const isActivePref = reactive([]);

    const isSidebarActive = () => {
      if (isSidebar.value) {
        isSidebar.value = false;
      } else {
        isSidebar.value = true;
      }
    };

    onMounted(async () => {
      await axios
        .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
          headers: { "X-API-KEY": api.key },
        })
        .then((res) => {
          prefData.push(...res.data.result);
        });
    });

    // watch(isActivePref, () => {
    //   store.dispatch("fetchPrefs", { isActivePref });
    // });

    return {
      prefData,
      isSidebar,
      isSidebarActive,
      isActivePref,
    };
  },
};
</script>

<style></style>

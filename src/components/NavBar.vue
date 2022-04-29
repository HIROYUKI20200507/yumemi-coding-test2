<template>
  <div v-if="!isActive" class="absolute top-0 left-2">
    <img @click="isActive = !isActive" src="../assets/images/ellipsis-solid.svg" alt="" class="w-5 mt-8 ml-10" />
  </div>
  <div v-if="isActive" class="flex flex-col h-screen px-4 py-8 overflow-y-auto border-r w-96">
    <img @click="isActive = !isActive" src="../assets/images/arrow-left-solid.svg" alt="" class="w-5" />
    <h2 class="text-3xl font-semibold text-center text-blue-800">
      <img src="../assets/images/logo_b14.png" alt="" class="w-24 m-auto" />
    </h2>
    <div class="flex flex-col justify-between mt-6">
      <aside>
        <ul class="grid grid-cols-2 gap-1">
          <li class="mt-5" v-for="(pref, index) of prefData" :key="index">
            <label class="items-center px-2 py-1 text-gray-700">
              <input type="checkbox" @change="isActivePref(pref)" />
              <span class="mx-1 font-medium">{{ pref.prefName }}</span>
            </label>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import api from "../plugins/resas.js";
import { useStore } from "vuex";

export default {
  setup() {
    const isActive = ref(true);
    const store = useStore();
    const prefData = reactive([]);
    const isPref = reactive([]);

    onMounted(async () => {
      await axios
        .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
          headers: { "X-API-KEY": api.key },
        })
        .then((res) => {
          prefData.push(...res.data.result);
        });
    });

    const isActivePref = (val) => {
      const isExistencePref = isPref.indexOf(val);

      if (isExistencePref === -1) {
        isPref.push(val);
      } else {
        isPref.splice(isExistencePref, 1);
      }

      store.dispatch("fetchPrefs", { isPref });
    };

    return {
      prefData,
      isPref,
      isActive,
      isActivePref,
    };
  },
};
</script>

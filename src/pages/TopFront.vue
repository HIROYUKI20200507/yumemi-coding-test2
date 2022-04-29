<template>
  <div class="w-full h-full p-4 m-8 overflow-y-auto">
    <div class="text-xl bold">都道府県別の総人口推移グラフ</div>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  name: "BarChart",
  components: { Bar },

  setup() {
    const store = useStore();
    const chartOptions = {
      responsive: true,
    };
    const chartData = computed(() => {
      return {
        labels: store.state.year,
        datasets: store.state.resPref,
      };
    });

    const chartId = "bar-chart";
    const datasetIdKey = "label";
    const width = 400;
    const height = 200;

    return { chartOptions, chartData, chartId, datasetIdKey, width, height };
  },
});
</script>

<template>
  <div class="w-full h-full p-4 m-8 overflow-y-auto">
    <Chart :size="{ width: 1000, height: 400 }" :data="data" :margin="margin" :direction="direction" :axis="axis">
      <template #layers>
        <Grid strokeDasharray="2,2" />
        <Bar :dataKeys="['year', 'data']" :barStyle="{ fill: '#90e0ef' }" />
        <Line :dataKeys="['year', 'data']" />
        <Marker :value="1000" label="Avg." color="#e76f51" strokeWidth="2" strokeDasharray="6 6" />
      </template>

      <template #widgets>
        <Tooltip
          borderColor="#48CAE4"
          :config="{
            pl: { color: '#90e0ef' },
            avg: { color: '#0096c7' },
            inc: { color: '#48cae4' },
          }"
        />
      </template>
    </Chart>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Chart, Grid, Line, Bar } from "vue3-charts";

export default defineComponent({
  name: "LineChart",
  components: { Chart, Grid, Line, Bar },
  setup() {
    const data = ref([
      { year: "1900", data: 1000 },
      { year: "1901", data: 2000 },
      { year: "1902", data: 400 },
      { year: "1903", data: 3100 },
      { year: "1904", data: 200 },
      { year: "1905", data: 600 },
      { year: "1906", data: 500 },
    ]);
    const direction = ref("horizontal");
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    });

    const axis = ref({
      primary: {
        type: "band",
      },
      secondary: {
        domain: ["dataMin", "dataMax + 100"],
        type: "linear",
        ticks: 8,
      },
    });

    return { data, direction, margin, axis };
  },
});
</script>
<style></style>

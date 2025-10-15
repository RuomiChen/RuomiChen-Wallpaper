<script setup lang="ts">
import Chart from 'primevue/chart';
import { onMounted, ref, watch } from "vue";
import { useMyFetch } from '../../utils/request';

onMounted(() => {
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
// 从接口获取图表数据
const { data, isFinished, error } = useMyFetch('/api/creator/analytics').json()

// 一旦数据加载完成，就更新图表
watch(isFinished, (done) => {
  if (done && data.value) {
    chartData.value = setChartData(data.value)
  }
})

// 组件挂载时设置图表样式
onMounted(() => {
  chartOptions.value = setChartOptions()
})

// 根据接口数据构建 PrimeVue 图表结构
const setChartData = (apiData: any) => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: apiData.labels,
    datasets: apiData.datasets.map((ds, i) => ({
      type: 'bar',
      label: ds.label,
      backgroundColor: [
        documentStyle.getPropertyValue('--p-cyan-500'),
        documentStyle.getPropertyValue('--p-orange-500'),
        documentStyle.getPropertyValue('--p-gray-500'),
        documentStyle.getPropertyValue('--p-green-500')
      ][i % 4],
      data: ds.data
    }))
  }
}

// 图表样式
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        stacked: true,
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  }
}
</script>
<template>
    <div class="card p-10 h-[100vh] box-border">
         <Chart type="bar" :data="chartData" :options="chartOptions" class="h-full" />
    </div>
</template>
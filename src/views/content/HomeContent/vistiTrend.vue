<script setup>
  import * as echarts from 'echarts'
  import { onMounted } from 'vue';
  onMounted(() => {
    var chartDom = document.getElementById('home_chart');
    var myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
  })
  
  var option;
  option = {
    title: {
      text: '周访问趋势'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [
      {
        name: '浏览量',
        type: 'line',
        data: getNumber(),
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: '访客量',
        type: 'line',
        data: getNumber(),
        markPoint: {
          data: [
            // { name: '周最低', value: -2, xAxis: 1, yAxis: -2 },
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: 'Avg' },
          ]
        }
      }, 
      {
        name: 'IP量',
        type: 'line',
        data: getNumber(),
        markPoint: {
          data: [
            {type: 'max', name: 'Max'},
            {type: 'min', name: 'Min'}
          ]
        },
        markLine: {
          data: [{type: 'average', name: 'Avg'}]
        }
      },
    ]
  };
  function getNumber() {
    let arr = []
    if (arr.length === 0) {
      for (var i = 0; i < 7; i++) {
        arr.push(Math.round(Math.random() * 1000 ))
      }
    return arr
    }
  }
</script>

<template>
  <div id="home_chart"></div>
</template>

<style scoped>
  #home_chart {
    padding-top: 16px;
    width: 100%;
    height: 500px;
    background-color: #fff;
  }
</style>
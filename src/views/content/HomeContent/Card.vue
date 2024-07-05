<script setup>
import {UserOutlined, EyeFilled, ContactsFilled, CalendarFilled} from '@ant-design/icons-vue'
import { ref } from 'vue';
import { useTransition, TransitionPresets } from "@vueuse/core";



const onlineUserCount = ref(0);
const onlineUserCountOutput = useTransition(onlineUserCount, {
  duration: 5000,//延迟时间
  transition: TransitionPresets.easeOutExpo,
});
const pvCount = ref(0);
const pvCountOutput = useTransition(pvCount, {
  duration: 5000,
  transition: TransitionPresets.easeOutExpo,
})
const cardData = ref([
  {
    title: "在线用户",
    tagType: "orange",
    tagText: "-",
    count: onlineUserCountOutput,
    statistic: 1,
    totalCount: 3,
    dataDesc: "总用户数",
    iconClass: UserOutlined,
    bgcolor: '#89ddc9'
  },
  {
    title: "浏览量(PV)",
    tagType: "pink",
    tagText: "日",
    count: pvCountOutput,
    statistic: 1000,
    totalCount: 3000,
    dataDesc: "总浏览量",
    iconClass: EyeFilled,
    bgcolor: '#edc061'
  },
  {
    title: "访客数(UV)",
    tagType: "blue",
    tagText: "日",
    count: pvCountOutput,
    statistic: 1000,
    totalCount: 3000,
    dataDesc: "总访客数",
    iconClass: ContactsFilled,
    bgcolor: '#dd7740'
  },
  {
    title: "IP数",
    tagType: "green",
    tagText: "日",
    count: pvCountOutput,
    statistic: 1000,
    totalCount: 3000,
    dataDesc: "总IP数",
    iconClass: CalendarFilled,
    bgcolor: '#89dd60'
  },
]);
onlineUserCount.value = cardData.value[0].statistic;
pvCount.value = cardData.value[1].statistic
function request() {
  return new Promise((resolve) => {
   setTimeout(() => {
    resolve({
      data: [
  {
    title: "在线用户",
    tagType: "orange",
    tagText: "-",
    count: onlineUserCountOutput,
    statistic: 3,
    totalCount: 5,
    dataDesc: "总用户数",
    iconClass: UserOutlined,
    bgcolor: '#89ddc9'
  },
  {
    title: "浏览量(PV)",
    tagType: "pink",
    tagText: "日",
    count: pvCountOutput,
    statistic: 2000,
    totalCount: 3500,
    dataDesc: "总浏览量",
    iconClass: EyeFilled,
    bgcolor: '#edc061'
  },
  {
    title: "访客数(UV)",
    tagType: "blue",
    tagText: "日",
    count: pvCountOutput,
    statistic: 1000,
    totalCount: 3500,
    dataDesc: "总访客数",
    iconClass: ContactsFilled,
    bgcolor: '#dd7740'
  },
  {
    title: "IP数",
    tagType: "green",
    tagText: "日",
    count: pvCountOutput,
    statistic: 1000,
    totalCount: 3500,
    dataDesc: "总IP数",
    iconClass: CalendarFilled,
    bgcolor: '#89dd60'
  },
],
    success: true
    })
   }, 1000) 
  })
}
const loading = ref(false)
function refresh() {
  loading.value = true;
  request().then((res) => {
    if(res.success) {
      cardData.value = [...res.data]
      loading.value = false
      onlineUserCount.value = cardData.value[0].statistic;
      pvCount.value = cardData.value[1].statistic
    }
  })
}

</script>
<template>
  <a-button type="primary" style="margin-top: 16px; margin-left: 16px;" :loading="loading" @click="refresh">刷新</a-button>
  <div class="cards">
    <div style="padding: 16px" v-for="item in cardData">
      <a-card
        :title="item.title"
        :bordered="false"
      >
        <template #extra>
          <a-tag :color="item.tagType">{{item.tagText}}</a-tag>
        </template>
        <div style="display: flex; justify-content: space-between;">
          <div style="display: flex; flex-direction: column; align-items: center;">
          <span>{{ Math.round(item.count) }}</span>
          <div class="icon" :style="{background: item.bgcolor}">
            <component :is="item.iconClass"/>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <span>{{ item.dataDesc }}</span>
          <span>{{ item.totalCount }}</span>
        </div>
        </div>
      </a-card>
    </div>
  </div>
  
</template>

<style scoped>
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .icon {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: aqua;
  }
</style>
<script setup>
import { onMounted, ref } from 'vue';
import Card from '@/views/content/HomeContent/Card.vue';
import VistiTrend from '../HomeContent/VistiTrend.vue'
import {BellFilled, PushpinFilled, HddFilled} from '@ant-design/icons-vue'

  const say = ref('上午好')
  onMounted(() => {
    let date = new Date()
    if (date.getHours() >= 0 && date.getHours() < 6 ) {
      say.value = '凌晨了'
    } else if (date.getHours() >= 6 && date.getHours() < 12 ) {
      say.value = '上午好'
    } else if (date.getHours() >= 12 && date.getHours() < 18) {
      say.value = '下午好'
    } else {
      say.value = '晚上好'
    }
  })
  const statisticData = ref([
    {
      value: 99,
      title: "消息",
      key: "message",
      icon: BellFilled,
      iconColor: '#e7aa51'
    }, {
      value: 50,
      title: "代办",
      key: "upcoming",
      suffix: "/100",
      icon: PushpinFilled,
      iconColor: '#dd6f6d'
    }, {
      value: 10,
      title: "项目",
      key: "project",
      icon: HddFilled,
      iconColor: '#7dcba5'
    }
  ])
</script>

<template>
  <div class="header">
    <div class="img"><img src="../image/avatar-woman.jpg" style="width: 50px; height: 50px;" alt=""></div>
    <div class="hello">{{ say }},系统管理员</div>
    <div class="statistic">
      <div v-for=" item in statisticData" :key="item.key">  
        <div>
          <component :is="item.icon" :style="{color: item.iconColor}"/>
          {{ item.title }}
        </div>
        <div>
          {{ item.value }}
          <template v-if="item.suffix">{{ item.suffix }}</template>
        </div>
      </div>
    </div>
  </div>
  <div class="main">
    <Card />
  </div>
  <div class="footer">
    <VistiTrend />
  </div>
</template>

<style scoped>
  .header {
    height: 130px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px;
    border-radius: 5px;

    &:hover {
      & .img {
        transform: translateX(-5px);
      }
      & .img::after {
        transform: translateY(200%) translateX(100%) rotate(-45deg);
      }
    }
  }
  .img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    transition: all 1s;

    &::after {
      width: 120px;
      height: 10px;
      position: absolute;
      content: '';
      top: -20%;
      left: -100%;
      transform: rotate(-45deg);
      background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0));
      transition: all 1s;
    }
  }
  .hello {
    flex: 1;
    margin-left: 16px;
  }
  .statistic {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .statistic>div {
    padding: 10px;
    text-align: center;
  }
  .main {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    margin-top: 16px;
  }
  .footer {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    margin-top: 16px;
    padding: 16px;
  }
</style>
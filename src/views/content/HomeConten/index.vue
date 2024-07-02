<script setup>
import { onMounted, ref } from 'vue';
import Card from '@/views/content/HomeConten/Card.vue';
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
</script>

<template>
  <div class="header">
    <div class="img"><img src="../image/avatar-woman.jpg" style="width: 50px; height: 50px;" alt=""></div>
    <div class="hello">{{ say }},系统管理员</div>
    <div class="msg">
      <div>
        <div>消息</div>
        <div>99</div>
      </div>
      <div>
        <div>代办</div>
        <div>50/100</div>
      </div>
      <div>
        <div> 项目</div>
        <div>9</div>
      </div>
    </div>
  </div>
  <div class="main">
    <Card />
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
  .msg {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .msg>div {
    padding: 10px;
    text-align: center;
  }
  .main {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    margin-top: 16px;
  }
</style>
<script setup lang="ts">
import {SmileTwoTone} from '@ant-design/icons-vue'
import { ref } from 'vue';

import { useRouter } from 'vue-router';

  const router = useRouter();
  function goIndex() {
    router.push('/')
  }

  const routerList = [{
    path: '/home',
    text: '首页'
  }, {
    path: '/home/about',
    text: '关于'
  }, {
    path: '/home/shop',
    text: '商城'
  }, {
    path: '/home/active',
    text: '活动'
  }]

  const current = ref(0)

  function navhander(item: any, i: number) {
    current.value = i
  }
</script>

<template>
  <main>
    <div class="header">
      <div class="logo" @click="goIndex">
        <smile-two-tone style="font-size: 30px;"/>
        <span style="margin-left: 5px;">Logo</span>
      </div>
      <div class="nav">
        <div v-for="(item, index) in routerList" >
        <RouterLink id="nav_btn" :class="{active: current === index}" @click="() => navhander(item, index)" :to="item.path" >{{item.text}}</RouterLink>
        </div>
        <div class="nav_side"></div>
      </div>
    </div>
    <RouterView />
  </main>
</template>

<style scoped>
  .header {
    width: 100vmax;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    position: fixed;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 3;

  }
  .logo {
    width: 150px;
    height: 60px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #3778f7;
    font-size: 25px;
  }
  .nav {
    flex: 1;
    height: 60px;
    display: flex;
    align-items: center
  }
  #nav_btn {
    padding: 16px;
    text-decoration: none;
    cursor: pointer;
    color: black;
    &.active {
      color: #3778f7;
      font-weight: bolder;
      border-bottom: 2px solid #3778f7;
    }
    &:hover {
      color: #3778f7;
      font-weight: bolder;
      border-bottom: 2px solid #3778f7;
    }
  }
  .nav-side {
    flex: 1;

  }
</style>

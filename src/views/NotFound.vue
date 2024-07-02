<script setup lang="ts">
import { useRouter } from 'vue-router';

   const router = useRouter()
   function gohome() {
    router.push('/home')
   }
</script>

<template>
  <div class="notfound">
    <div class="container">
      <h1>您访问的页面不存在!</h1>
      <a-button type="primary" @click="gohome">返回首页</a-button>
    </div>
  </div>
</template>

<style>
  .notfound {
    width: 100vmax;
    height: 100vh;
    background-image: url('../image/error.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
  }
  .container {
    width: 300px;
    height: 300px;
    border-radius: 10px;
    color: #fff;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    backdrop-filter: invert(30%);
    position: fixed;
    right: 10%;
    padding: 16px;
  }
</style>
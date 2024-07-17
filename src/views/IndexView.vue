

<script setup lang="ts">
import { useRouter } from 'vue-router';

   const router = useRouter()
   function gohome() {
    router.push('/vueresume/home')
   }
</script>

<template>
  <div class="index">
    <div class="interface">
      <h1>个人网站</h1>
      <div> 这是一个练习的个人网站</div>
      <a-button type="primary" @click="gohome" >进入首页</a-button>
    </div>
  </div>
</template>

<style scoped>
  .index {
    width: 100vmax;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../image/home.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .interface {
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
    left: 10%;
  }
  
</style>

<script setup lang="ts">
import {SmileTwoTone} from '@ant-design/icons-vue'
import { onMounted, onUnmounted, ref } from 'vue';
import {CloseOutlined} from '@ant-design/icons-vue'
import Main from '@/views/Main.vue';
import { useRouter } from 'vue-router';

  const router = useRouter();
  function goIndex() {
    router.push('/vueresume/')
  }

 
  const routerList = ref([
    {
      path: '/vueresume/home',
      title: '首页',
      key: 'home'
    }
  ])
  const selectKey = ref('')
  function pushrouter(menu: any) {
    let obj = {path: menu.item.path, title: menu.item.title, key: menu.key}
    let newlist = routerList.value.find(item => item.path === obj.path)
    if(!newlist) {
      routerList.value.push(obj)
    }
  }
  function onSwitch(key: any) {
    selectKey.value = key
  }
  function onDelete(i: number) {
    if (routerList.value.length -1 === i) {
      selectKey.value = routerList.value[i -1].key
      router.push(routerList.value[i -1].path)
      routerList.value.splice(i, 1)
    } else {
      routerList.value.splice(i, 1)
      selectKey.value = routerList.value[i].key
      router.push(routerList.value[i].path)
    }
  }
  function getValue(value: any) {
    if ( value[0].title !== '首页') {
      routerList.value.push(...value)
      selectKey.value = value[0].key
    }
  }
  
</script>

<template>
  <div>
    <div class="header">
      <div class="logo" @click="goIndex">
        <smile-two-tone style="font-size: 30px;"/>
        <span style="margin-left: 5px;">Logo</span>
      </div>
      <div class="nav">
        <div class="nav_btn" v-for="(item, index) in routerList">
          <RouterLink
            id="nav_a"
            exactActiveClass="exact"
            :to="item.path"
            @click="onSwitch(item.key)"
            :style="item.title !== '首页' && { paddingRight: '35px'}"
          >{{item.title}}
          </RouterLink>
          <div v-if="item.title !== '首页'" class="routerClose" @click="onDelete(index)">
            <CloseOutlined />
          </div>
        </div>
        <div class="nav_side"></div>
      </div>
    </div>
    <!-- 页面内容 -->
    <Main @on-router="pushrouter" :keys="selectKey" @on-default="getValue"/>
  </div>
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
  
  .nav_btn {
    margin-left: 5px;
    padding: 0.1px;
    display: flex;
    align-items: center;
    transition: all 0.5s;

    & #nav_a {
      padding: 5px;
      text-decoration: none;
      cursor: pointer;
      color: black;
      border: 1px solid #0a0a0a;
      border-radius: 4px;
    
      &.exact {
        color: #fff;
        font-weight: bolder;
        background-color:  #3778f7;
      
        &:hover {
          font-weight: bolder;
          color: #fff;
        }
      }
      &:hover {
        font-weight: bolder;
        color: #3778f7;
      }
    }
  }
  .routerClose {
    margin-left: -20px;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
    }
  }
  .nav-side {
    flex: 1;

  }
</style>

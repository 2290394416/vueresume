<script lang="ts" setup>

  import { reactive, watch, h, onMounted } from 'vue';
  import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  } from '@ant-design/icons-vue';
  const state = reactive({
    collapsed: false,
    selectedKeys: ['home'],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
  });
  const items = reactive([
    {
      key: 'home',
      icon: () => h(PieChartOutlined),
      label: '首页',
      title: '首页',
      path: '/vueresume/home'
    },
    {
      key: 'sub1',
      icon: () => h(DesktopOutlined),
      label: '系统管理',
      title: '系统管理',
      children: [
        {
          key:'system1',
          label: '用户管理',
          title: '用户管理',
          path: '/vueresume/home/system/user'
        }, {
          key: 'system2',
          label: '职位管理',
          title: '职位管理',
          path: '/vueresume/home/system/role'
        }, {
          key: 'system3',
          label: '菜单管理',
          title: '菜单管理',
          path: '/system/menu'
        }, {
          key: 'system4',
          label: '部门管理',
          title: '部门管理',
          path: '/vueresume/home/system/dept'
        }, {
          key: 'system5',
          label: '字典管理',
          title: '字典管理',
          path: '/system/dept'
        }
      ]
    },
    {
      key: 'sub2',
      icon: () => h(InboxOutlined),
      label: '接口文档',
      title: '接口文档',
      children: [
        {
          key: 'apl',
          label: 'Aplfox',
          title: 'Aplfox'
        }
      ]
    },
    {
      key: 'sub3',
      icon: () => h(MailOutlined),
      label: '平台文档',
      title: '平台文档',
      children: [
        {
          key: 'doc1',
          label: '内嵌',
          title: '内嵌',
        },
        {
          key: 'doc2',
          label: '外链',
          title: '外链',
        },
      ],
    },
    {
      key: 'sub4',
      icon: () => h(AppstoreOutlined),
      label: '组件封装',
      title: '组件封装',
      children: [
        {
          key: 'module1',
          label: '增删改查',
          title: '增删改查',
        },
        {
          key: 'module2',
          label: '列表选择器',
          title: '列表选择器',
        },
        {
          key: 'module3',
          label: '富文本选择器',
          title: '富文本选择起',
        },
        {
          key: 'module4',
          label: '图片上传',
          title: '图片上传',
        },
        {
          key: 'module5',
          label: '图标选择器',
          title: '图标选择器',
        },
      ],
    },
    {
      key: 'sub5',
      icon: () => h(AppstoreOutlined),
      label: '功能展示',
      title: '功能展示',
      children: [
        {
          key: 'icon',
          label: 'icons',
          title: 'icons'
        }
      ],
    }, {
      key: 'sub6',
      icon: () => h(AppstoreOutlined),
      label: '敬请期待...',
      title: '敬请期待...'
    }
  ]);
  watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    },
  );
  const toggleCollapsed = () => {
    state.collapsed = !state.collapsed;
    state.openKeys = state.collapsed ? [] : state.preOpenKeys;
  };

  const emit = defineEmits(['onRouter', 'onDefault'])
  const props = defineProps(['keys'])
  watch(props, (props) => {
    state.selectedKeys = [props.keys]
  })

  import { useRouter } from 'vue-router';
  const router = useRouter()
  function handleclick(select: any) {
    router.push(select.item.path)
    emit('onRouter', select)
  }
  onMounted(() => {
    let arr = flatten(items)
    let defaultList = arr.filter((item: any) => item.path === router.currentRoute.value.fullPath)
    emit('onDefault', defaultList)
  })
  
  function flatten(arr: any) {
    return arr.reduce((result: any, item: any) => {
      return result.concat(item,(Array.isArray(item.children) ? flatten(item.children) : []))
    }, [])
  }
</script>

<template>
    <main>
      <div class="carousel">
        <div class="light"></div>
      </div>
      <div class="carouselTop"></div>
      <div class="light" style="left: 100px; animation-delay: 1s;"></div>

      <div class="menu" style="width: 256px">
          <a-button type="primary"  style="margin-bottom: 16px" @click="toggleCollapsed">
            <MenuUnfoldOutlined v-if="state.collapsed" />
            <MenuFoldOutlined v-else />
          </a-button>
          <a-menu
            v-model:openKeys="state.openKeys"
            v-model:selectedKeys="state.selectedKeys"
            mode="inline"
            theme="light"
            :inline-collapsed="state.collapsed"
            :items="items"
            @click="handleclick"
            scroll
          ></a-menu>
        </div>
      <div class="content">
        <RouterView v-slot="{Component}">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </div>

    </main>
</template>

<style scoped>
.carousel,.carouselTop {
  background-image: url('../image/carousel.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vmax;
  min-width: 900px;
  height: 100vh;
  position: absolute;
  top: 0;
  transform-style: preserve-3d;
}
.carouselTop {
  background-image: url('../image/carouselTop.png');
  z-index: 2;
  background-position: calc(50% + 54px) center;
}
.light {
  position: absolute;
  width: 8px;
  left: 150px;
  height: 150px;
  background: linear-gradient(0deg, #edeffd 0, transparent 100%);
  transform: rotate(-25deg);
  z-index: 1;
  animation: shank 5s infinite linear;

  &::after {
    content: '';
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #edeffd;
    filter: blur(1.8px);
    bottom: -6px;
    left: 50%;
    transform: translate(-50%);
  }
}

@keyframes shank {
  0% {
    transform: rotate(-25deg) translateZ(0px) translateY(-100px) scale(0.5);
  }
  25% {
    transform: rotate(-25deg) translateZ(-100px) translateY(100px) scale(1.1);
  }
  50% {
    transform: rotate(-25deg) translateZ(-300px) translateY(200px) scale(1.1);
  }
  75% {
    transform: rotate(-25deg) translateZ(-500px) translateY(300px) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: rotate(-25deg) translateZ(-700px) translateY(400px) scale(1.1);
  }
}

.menu {
  position: fixed;
  top: 80px;
  z-index: 4;
  border-radius: 10px;
  overflow-y: scroll;

  & .ant-menu {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    overflow: auto;
    height: calc(100vh - 200px);
  }
}
.content {
  background-color: rgba(255, 255, 255, 0.7);
  width: 900px;
  /* min-width: 600px; */
  height: calc(100vh - 100px);
  z-index: 3;
  position: fixed;
  left: 300px;
  top: 100px;
  border-radius: 10px;
  padding: 16px;
  overflow: scroll;
}

</style>

<script lang="ts" setup>
  import { ref } from 'vue';
  const value = ref<string>('');
</script>

<template>
  <a-space direction="vertical">
    <a-input v-model:value="value" placeholder="Basic usage" />
    <a-button type="primary">搜索</a-button>
    <a-button>重置</a-button>
  </a-space>
</template>

<style scoped>

</style>
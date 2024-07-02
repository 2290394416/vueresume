<script lang="ts" setup>
  import { ref, watch } from 'vue';
  const value = ref<string>('');

  
  const activeKey = ref(['deparment']);
  watch(value, (value: any) => {
    select.value = deparments.filter(item => item.depar.search(value) !== -1)
  })
  const deparments = [
    {
      key: "depar1",
      depar: '研发部门',
      select: false
    }, {
      key: "depar2",
      depar: '测试部门',
      select: false
    }]
  const select = ref(deparments)
  const props = defineProps(['data'])
  const emit = defineEmits(['filterList'])

  function selectDepar(depar: string) {
    let arr = props.data.filter((item: any) => item.deparment === depar)
    emit("filterList", arr)
  }

</script>

<template>
  <div class="deparment">
      <a-input v-model:value="value" placeholder="部门名称" />
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="deparment" header="部门">
          <a-menu>
            <a-menu-item
              v-for="item in select"
              :key="item.key"
              @click="selectDepar(item.depar)"
            >
              {{ item.depar }}
            </a-menu-item>
          </a-menu>
        </a-collapse-panel>
      </a-collapse>
    </div>
</template>

<style scoped>
  
</style>
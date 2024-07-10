<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import type { TreeProps } from 'ant-design-vue';

  const open = ref(false)
  const props = defineProps(['show'])
  const emit = defineEmits(['onClose'])
  watch(() => props.show,(show) => {
    open.value = show
  })

  const treeData: TreeProps['treeData'] = [
    {
      title: '系统管理',
      key: '0-0',
      children: [
        {
          title: '用户管理',
          key: '0-0-0',
          // disabled: true,
          children: [
            { title: '用户查询', key: '0-0-0-0' },
            { title: '用户新增', key: '0-0-0-1' },
          ],
        },
        {
          title: '职位管理',
          key: '0-0-1',
          children: [
            { title: '职位查询', key: '0-0-1-0' },
            { title: '职位新增', key: '0-0-1-1' }
          ],
        },
      ],
    },
  ];

const expandedKeys = ref<string[]>(['0-0-0', '0-0-1']);
const selectedKeys = ref<string[]>(['0-0-0', '0-0-1']);
const checkedKeys = ref<string[]>(['0-0-0', '0-0-1']);
watch(expandedKeys, () => {
  console.log('expandedKeys', expandedKeys);
});
watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys);
});
watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys);
});

function onClose() {
  open.value = false
  emit('onClose')
}
</script>

<template>
  <a-drawer
    title="权限分配"
    :width="350"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-tree
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      v-model:checkedKeys="checkedKeys"
      checkable
      :tree-data="treeData"
    >
      <template #title="{ title, key }">
        <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
        <template v-else>{{ title }}</template>
      </template>
    </a-tree>
  </a-drawer>
</template>
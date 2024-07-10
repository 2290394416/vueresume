<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { Form } from 'ant-design-vue';
import PositionEditor from '@/views/content/Role/PositionEditor.vue';
import Permissions from '@/views/content/Role/Permissions.vue'

  const open = ref(false)

  //获取唯一 key 值
  function getUniqueKey(){
      let idStr = Date.now().toString(36)
      idStr += Math.random().toString(36).substr(2)
      return idStr
  }
  //设置表格的属性
  const columns = [
    {
      title: '职位名称',
      dataIndex: 'name',
      key: 'name',
    }, 
    {
      title: '职位编码',
      dataIndex: 'encoding',
      key: 'encoding',
    },
    {
      title: ' 状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '排序',
      dataIndex: ' number',
      key: 'number'
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: '200px'
    },
  ];
  //设置数据源
    let data = [
      {
        key: '1',
        name: '系统管理员',
        encoding: '000',
        status: '启用',
        edit: false,
        permissions: false
      }
    ];
    for (var i = 1; i <= 12; i++) {
      data.push({
        key: getUniqueKey(),
        name: '系统管理员' + i,
        encoding: i >= 10 ? '0' + i : '00' + i,
        status: '启用',
        edit: false,
        permissions: false
      })
    }
    const newData = ref(data)

  //获取搜索表单数据
  const useForm = Form.useForm;
  const modelRef = reactive({name: ''})
  const {validate, resetFields} = useForm(modelRef)

  //搜索
  function onSearch() {
    validate()
    .then(() => {
      //判断输入框是否有值
      if (modelRef.name) {
        newData.value = data.filter((item) => item.name === modelRef.name )
      }
    })
    .catch((error) => {
      console.log('error',error)
    })
  }
  //重置
  function onReset() {
    resetFields()
    newData.value = data
  }

  //定义全选的属性类型以及 key 值类型以及它们的初始值
  type Key = string | number;
  const state = reactive<{
    selectedRowKeys: Key[];
    loading: boolean;
  }>({
    selectedRowKeys: [],
    loading: false,
  });
  //当勾选按钮时，把它的 key 值记录下来
  const onSelectChange = (selectedRowKeys: Key[]) => {
      state.selectedRowKeys = selectedRowKeys;
  };
  //在勾选列表前面的删除标记时，会把这条数据的 key 值放入到这个 RowKeys 中
  //然后在这里做判断，如果数组为空就禁用上方的删除按钮(下面的 disabled判断取的反值(!)号)
  const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    
  function onClose() {
    open.value = false
  }
  function onCreate(add: any) {
    let obj = {key: getUniqueKey(), Edit: false, Permissions: false, ...add}
    newData.value.push(obj)
    if(newData.value.length !== data.length) {
      data.push(obj)
    }
  }
  function checkDel() {
    state.loading = true
    setTimeout(() => {
      let newArr = newData.value.filter((item) => !state.selectedRowKeys.includes(item.key))
      newData.value = newArr
      data = newData.value
      state.loading = false;
      state.selectedRowKeys = [];
    }, 1000);
  }
  function onEdit(state: any, index: number) {
    newData.value.splice(index, 1, state)
    data=newData.value
  }
  function onDelete(key: any) {
    newData.value = newData.value.filter((item: any) => item.key !== key)
    data = newData.value
  }
</script>

<template>
  <div class="search">
    <a-form
      layout="inline"
    >
      <a-form-item
        label="关键字"
        name="关键字"
      >
        <a-input v-model:value="modelRef.name" placeholder="职位名称" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="onSearch">搜索</a-button>
          <a-button @click="onReset">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
  <div class="rolelist">
    <a-space style="margin-bottom: 16px;">
      <a-button type="primary" @click="() => open = true">新增</a-button>
      <PositionEditor :show="open" @close-drawer="onClose" @on-change="onCreate"/>
      <a-button type="primary" danger :disabled="!hasSelected" :loading="state.loading" @click="checkDel">删除</a-button>
    </a-space>
    <a-table
      :columns="columns"
      :data-source="newData"
      :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange, columnWidth: '60px' }"

    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'number'">
          <div>
            {{ newData.indexOf(record) + 1 }}
          </div>
        </template>
        <template v-else-if="column.key === 'name'">
          <div>
            {{ record.name }}
          </div>
        </template>
        <template v-else-if="column.key === 'status'">
          <span>
            <a-tag
              :color="record.status === '禁用' ? 'volcano' :  'green'"
            >
              {{ record.status.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a @click="record.permissions = true">分配权限</a>
            <Permissions :show="record.permissions" @on-close="record.permissions=false"/>
            <a-divider type="vertical" />
            <a @click="record.show = true">编辑</a>
            <PositionEditor :show='record.show' :edit="record" @close-drawer="record.show = false" :index="index" @on-change="onEdit"/>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link" @click="onDelete(record.key)">删除</a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
  .search, .rolelist {
    border: 1px dashed black;
    padding: 16px;
    border-radius: 5px;
  }
  .rolelist {
    margin-top: 16px;
  }
</style>
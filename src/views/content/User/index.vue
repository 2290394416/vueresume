<script lang="ts" setup>

  import { computed, reactive, ref } from 'vue';
  import Deparment from '@/views/content/User/Deparment.vue';
  import Filter from '@/views/content/User/Filter.vue'
  import Edit from '@/views/content/User/Edit.vue'
  import { UploadOutlined } from '@ant-design/icons-vue'
    const columns = [
      {
        title: '编号',
        dataIndex: 'number',
        key: 'number',
        align: "center",
        width: '60px'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align: "center",
        width: '60px'
      }, 
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        align: "center",
        width: '60px'
      },
      {
        title: ' 职位',
        dataIndex: 'position',
        key: 'position'
      },
      {
        title: '部门',
        dataIndex: 'deparment',
        key: 'deparment'
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '创建时间',
        dataIndex: 'creationTime',
        key: 'creationTime'
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: '200px'
      },
    ];

    let data = [
      {
        key: '1',
        name: '小明',
        gender: '男',
        position: '系统管理员',
        deparment: '研发部门',
        phone: '17621210366',
        status: '启用',
        creationTime: '2019-10-10',
        show: false,
      },
      {
        key: '2',
        name: '小美',
        gender: '女',
        position: '测试人员',
        deparment: '测试部门',
        phone: '17621210366',
        status: '启用',
        creationTime: '2021-9-9',
        show: false,
      },
      {
        key: '3',
        name: '小帅',
        gender: '男',
        position: '测试人员',
        deparment: '测试部门',
        phone: '17621210366',
        status: '禁用',
        creationTime: '2020-1-20',
        show: false,
      }
    ];
    function getUniqueKey(){
      let idStr = Date.now().toString(36)
      idStr += Math.random().toString(36).substr(2)
      return idStr
    }
    type Key = string | number;
    const state = reactive<{
      selectedRowKeys: Key[];
      loading: boolean;
    }>({
      selectedRowKeys: [],
      loading: false,
    });
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    
    const onSelectChange = (selectedRowKeys: Key[]) => {
      state.selectedRowKeys = selectedRowKeys;
    };
    const checkDel = () => {
      state.loading = true;
      var newArr = newData.value.filter((item) => !state.selectedRowKeys.includes(item.key))
      newData.value = newArr
      setTimeout(() => {
        state.loading = false;
        state.selectedRowKeys = [];
      }, 1000);
    };
    
    const newData = ref(data)
    const search = ref()
    const onChange = (list: any) => {
      newData.value = list
    }
    const open = ref(false)
    function closeDrawer() {
      open.value=false
    }
    function create(add: any) {
      let obj = { key: getUniqueKey(), show: false, ...add}
      newData.value.push(obj)
      data.push(obj)
    }
    const onEdit = (state: any, index: number) => {
      newData.value.splice(index, 1, state)
      data=newData.value
    }
    const onDelete = (key: string) => {
      newData.value = newData.value.filter(item => item.key !== key);
    };
</script>
<template>
  <div>
    <Edit :show="open" @close-drawer="closeDrawer" @on-change="create"/>
    <Deparment :data="data" @filter-list="onChange"/>
    <div class="user">
      <Filter :data='data' @filter-list="onChange"/>
      <div class="user_list">
        <div class="operation">
          <a-space>
            <a-button type="primary" @click="() => open = true">新增</a-button>
            <a-button type="primary" danger :disabled="!hasSelected" :loading="state.loading" @click="checkDel">删除</a-button>
          </a-space>
          <a-space>
            <a-upload>
              <a-button>
                <upload-outlined></upload-outlined>
                导入
              </a-button>
            </a-upload>
            <a-button>导出</a-button>
          </a-space>
        </div>
        <div style="margin-top: 16px;">
          <a-table
            :columns="columns"
            :data-source="newData"
            :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange, columnWidth: '60px' }"
            :scroll="{x: 1200}"
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
                  <!-- <a>重置密码</a> -->
                  <a-divider type="vertical" />
                  <a @click="record.show = true">编辑</a>
                  <Edit :show='record.show' :edit="record" @close-drawer="record.show = false" :index="index" @on-change="onEdit"/>
                  <a-divider type="vertical" />
                  <a class="ant-dropdown-link" @click="onDelete(record.key)">删除</a>
                </span>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .deparment,.filter,.user_list {
    border: 1px dashed black;
    padding: 16px;
    border-radius: 5px;
  }
  .user {
    margin-top: 16px;
  }
  .user_list {
    margin-top: 16px;
  }
  .operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
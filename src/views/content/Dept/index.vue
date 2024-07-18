<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import { Form } from 'ant-design-vue';
  import DeptEdit from '@/views/content/Dept/DeptEdit.vue';
  import DeptNew from '@/views/content/Dept/DeptNew.vue';
  import { deleteOptions } from '@/views/content/Dept/store';

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
        title: '部门名称',
        dataIndex: 'name',
        key: 'name',
      }, 
      {
        title: '部门编码',
        dataIndex: 'encoding',
        key: 'encoding',
      },
      {
        title: ' 状态',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: '200px'
      },
    ];


    //设置数据源
      let data= [
        {
          name: '未来科技',
          encoding: '001',
          status: '启用',
          key: '0-0',
          edit: false,
          new: false,
          children: [
            {
              name: '研发部门',
              encoding: '002',
              status: '启用',
              key: '0-0-0',
              edit: false,
              new: false,
            }, {
              name: '测试部门',
              encoding: '003',
              status: '启用',
              key: '0-0-1',
              edit: false,
              new: false,
            },
          ],
        }, {
          name: '复兴科技',
          encoding: '004',
          status: '禁用',
          key: '0-1',
          edit: false,
          new: false,
          children: [
            {
              name: '投资部门',
              encoding: '005',
              status: '禁用',
              key: '0-1-0',
              edit: false,
              new: false
            }
          ]
        }
      ];
      
    const newData = ref(data)

    //获取搜索表单数据
    const useForm = Form.useForm;
    const modelRef = reactive({name: '', status: '全部'})
    const {validate, resetFields} = useForm(modelRef)
    
    //搜索
    function onSearch() {
      validate()
      .then(() => {
        //判断输入框是否有值
        if (modelRef.name) {
          searchData(data, 'name', modelRef.name)
        }
        //如果name 有值，则从 name 过滤后的数据里查找
        if (modelRef.name) {
          //‘全部’为默认情况，所以不操作
          if (modelRef.status !== '全部') {
            searchData(newData.value, 'status', modelRef.status)
          }
          //如果name没有值，则从原数据中搜索
        } else if(!modelRef.name) {
          searchData(data, 'status', modelRef.status)
        }
      })
      .catch((error) => {
        console.log('error',error)
      })
    }
    function searchData(data: Array<any>,type: any, value: any) {
      let found = false
      const find = (data: Array<any>, value: any) => {
        data.forEach((item) => {
          if (item[type] === value) {
            found = true
            newData.value = [item]
          } else if (item.children) {
            find(item.children, value)
          }
        })
      }
      find(data, value)
      if (!found) newData.value = []
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
    //当勾选按钮框时，把它的 key 值记录下来
    const onSelectChange = (selectedRowKeys: Key[]) => {
      state.selectedRowKeys = selectedRowKeys;
    };
    //在勾选列表前面的删除标记时，会把这条数据的 key 值放入到这个 RowKeys 中
    //然后在这里做判断，如果数组为空就禁用上方的删除按钮(下面的 disabled判断取的反值(!)号)
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
      
    function onClose() {
      open.value = false
    }
    function onCreate(add: any, higher: any) {
      let obj = {key: getUniqueKey(), edit: false, new: false, ...add}
      addedTo(newData.value, higher, obj)
      if(newData.value.length !== data.length) {
        addedTo(data, higher, obj)
      }
    }
    //删除多选的数据
    function checkDel() {
      state.loading = true
      setTimeout(() => {
        state.selectedRowKeys.forEach((item) => {
          updateCheck(newData.value, item)
          delData(newData.value, item)
        })
        data = newData.value
        state.loading = false;
        state.selectedRowKeys = [];
      }, 1000);
    }
    function updateCheck(data: Array<any>, key: any) {
      data.forEach((item) => {
        if(item.key === key) {
          deleteOptions(item.name)
        } else if (item.children) {
          updateCheck(item.children, key)
        }
      })
    }

    function onEdit(state: any, preHigher: any, higher: any, preKey: any) {
      //编辑分两种情况，上级部门发生变化的，上级部门没有发生变化的
      //如果现在的层级 higher 不等于打开时的层级 preHigher 说明编辑改变了上级部门
      if (higher !== preHigher ) {
        delData(newData.value, preKey)
        addedTo(newData.value, higher, state)
      } 
    }
    function onDelete(props: any) {
      delData(newData.value, props.key)
      deleteOptions(props.name)
      data = newData.value
    }
    
    function addedTo(data: Array<any>, layer: string, obj: object) {
      let top = true
      const find = (arr: Array<any>, layer: string, obj: object) => {
        arr.forEach((item) => {
        if (!top) return
        if (layer === item.name ) {
          top = false
          if (item.children) {
            item.children.push(obj)
          } else {
            item.children = [obj]
          }
        } else if (item.children) {
          find(item.children, layer, obj)
        }
      })
      }
      find(data, layer, obj)
      if (top) {
        data.push(obj)
      }
    }

    //这里只判断上级部门没有发生变化的编辑情况
    function delData(data: Array<any>, key: any) {
      let found = false
      data.forEach((item, index) => {
        if (found) return
        if(key === item.key) {
          found = true
          data.splice(index, 1)
        } else if (item.children) {
          delData(item.children, key)
        }
      })
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
      <a-form-item
        label="部门状态"
        name="部门状态"
      >
        <a-select
          ref="select"
          v-model:value="modelRef.status"
          style="width: 120px"
          :allowClear="true"
        >
          <a-select-option value="启用">启用</a-select-option>
          <a-select-option value="禁用">禁用</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="onSearch">搜索</a-button>
          <a-button @click="onReset">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
  <div class="deptlist">
    <a-space style="margin-bottom: 16px;">
      <a-button type="primary" @click="() => open = true">新增</a-button>
      <DeptEdit :show="open" :data="newData" @close-drawer="onClose" @on-change="onCreate"/>
      <a-button type="primary" danger :disabled="!hasSelected" :loading="state.loading" @click="checkDel">删除</a-button>
    </a-space>
    <a-table
      :columns="columns"
      :data-source="newData"
      :row-selection="{ 
        selectedRowKeys: state.selectedRowKeys, 
        onChange: onSelectChange, 
        columnWidth: '60px', 
        checkStrictly: false,
      }"
      :defaultExpandAllRows = "true"
    >

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
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
            <a @click="record.new = true">新增</a>
            <DeptNew :show="record.new" :edit="record" @close-drawer="record.new = false" @on-change="onCreate"/>
            <a-divider type="vertical" />
            <a @click="record.edit = true">编辑</a>
            <DeptEdit :show='record.edit' :edit="record" @close-drawer="record.edit = false" @on-change="onEdit"/>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link" @click="onDelete(record)">删除</a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style>
   .search, .rolelist {
    border: 1px dashed black;
    padding: 16px;
    border-radius: 5px;
  }
  .deptlist {
    margin-top: 16px;
  }
</style>
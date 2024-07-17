<script lang="ts" setup>
import { computed, ref, toRaw, watch } from 'vue';
import { Form } from 'ant-design-vue';
import {RedoOutlined} from '@ant-design/icons-vue'
import { office, deleteOptions } from '@/views/content/Dept/store';

const form = ref({
  higherOffice: '',
  name: '',
  encoding: '',
  status: '',
});

//是否是提交状态
const push = ref(false)
//如果表单这几个值为空，禁用提交按钮
const disabled = computed(() => {
  return !(form.value.name && form.value.encoding && form.value.status)
})

const open = ref<boolean>(false);
const props = defineProps(['show', 'edit', 'index'])
const emit = defineEmits(['onChange', 'closeDrawer'])
if (props.edit) {
  form.value = props.edit
}

watch(() =>props.show,(show) => {
  open.value = show
  if (props.edit) {
    getHigher(office.value)
    form.value.higherOffice = higherOffice.value
  }
})

const useForm = Form.useForm
const { validate, resetFields} = useForm(form)

const onClose = () => {
  open.value = false
  emit("closeDrawer")
  //push为 true 表示事件是提交
  if (props.edit && !push.value) {
    form.value = props.edit
  }
};
function reset() {
  form.value = {
    higherOffice: '',
    name: '',
    encoding: '',
    status: '',
  }
}
function submit() {
  validate()
  .then(() => {
    push.value = true;
    if(props.edit) {
      //编辑
      emit('onChange', form.value, higherOffice.value, form.value.higherOffice, props.edit.key)
      if (higherOffice.value !== form.value.higherOffice ) {
        deleteOptions(props.edit.name)
        updateOptions(office.value, form.value.higherOffice)
      }
    } else {
      //新增
      emit('onChange', form.value, form.value.higherOffice)
      updateOptions( office.value, form.value.higherOffice)
    }
    
    console.log('表单提交数据',toRaw(form.value));
    onClose()
    if(!props.edit) {
      resetFields()
    }
  })
  .catch(err => {
    console.log('error',err)
  })
  push.value = false
}

  const higherOffice = ref('顶级部门')

  //获取上级部门的信息
  const getHigher = (data: Array<any>) => {
    let layer: any[] = []
    let found = false
    const find = ((data: Array<any>) => {
      data.forEach((item) => {
      if (found) return
      layer.push(item.value)
      if (item.value === props.edit.name ) {
        found = true
      } else if (item.children) {
        find(item.children)
      } else {
        layer.pop()
        higherOffice.value = ''
      }
    })
    if (!found) layer.pop()
  })
  find(data)
  higherOffice.value = layer[layer.indexOf(props.edit.name) - 1]
}

//更新部门层级选项
function updateOptions(arr: Array<any>, higher: string) {
  arr.forEach((item) => {
    if (item.value === higher) {
      let obj = { value: form.value.name, label: form.value.name }
      if (item.children) {
        item.children.push(obj)
      } else {
        item.children = [obj]
      }
    } else if (item.children) {
      updateOptions(item.children, higher)
    }
  })
}

</script>

<template>
  <a-modal
    title="新增职位"
    centered
    :open="open"
    @cancel="onClose"
  >
    <a-form :model="form" layout="horizontal">
      <a-form-item label="上级部门" name="higherOffice">
        <a-tree-select
          v-model:value="form.higherOffice"
          show-search
          placeholder="请选择该部门的上级部门"
          :defaultValue="higherOffice"
          allow-clear
          tree-default-expand-all
          :tree-data="office"
          tree-node-filter-prop="label"
          @change=""
        >
        </a-tree-select>
      </a-form-item>
      <a-form-item label="部门名称" name="name">
        <a-input v-model:value="form.name" placeholder="请输入部门名称" />
      </a-form-item>
      <a-form-item label="部门编码" name="encoding">
        <a-input v-model:value="form.encoding" placeholder="请输入部门编码" />
      </a-form-item>
      <a-col :span="24">
        <a-form-item label="状态" name="status">
          <a-radio-group v-model:value="form.status">
            <a-radio value="启用">启用</a-radio>
            <a-radio value="禁用">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-form>
    <template #footer>
      <a-space>
        <a-button @click="reset"><RedoOutlined />重置</a-button>
        <a-button type="primary" @click="submit" :disabled="disabled">提交</a-button>
      </a-space>
    </template>
  </a-modal>
</template>
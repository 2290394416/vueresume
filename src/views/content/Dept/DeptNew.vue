<script lang="ts" setup>
import { computed, ref, toRaw, watch } from 'vue';
import { Form } from 'ant-design-vue';
import {RedoOutlined} from '@ant-design/icons-vue'
import { office } from '@/views/content/Dept/store';

const form = ref({
  higherOffice: '',
  name: '',
  encoding: '',
  status: '',
});

const push = ref(false)
const disabled = computed(() => {
  return !(form.value.name && form.value.encoding && form.value.status)
})

const open = ref<boolean>(false);
const props = defineProps(['show', 'edit', 'index'])
const emit = defineEmits(['onChange', 'closeDrawer'])

const higherOffice = ref('顶级部门')

watch(() =>props.show,(show) => {
  open.value = show
  higherOffice.value = props.edit.name
  form.value.higherOffice = props.edit.name

})

const useForm = Form.useForm
const { validate, resetFields} = useForm(form)

const onClose = () => {
  open.value = false
  emit("closeDrawer")
  // //push为 true 表示事件是提交
  // if (props.edit && !push.value) {
  //   form.value = props.edit
  // }
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
    emit('onChange', form.value, form.value.higherOffice)
    updateOptions( office.value, form.value.higherOffice)
    console.log(toRaw(form.value));
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


 function updateOptions(arr: Array<any>, higher: string) {
  arr.forEach((item) => {
    if (item.value === higher) {
      let obj = {value: form.value.name, label: form.value.name}
      if(item.children) {
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
      <a-form-item label="上级部门" name="higherOffice" :disabled="true">
        <a-tree-select
          v-model:value="form.higherOffice"
          show-search
          placeholder="请选择该部门的上级部门"
          :defaultValue="higherOffice"
          allow-clear
          tree-default-expand-all
          :tree-data="office"
          tree-node-filter-prop="label"
          :disabled="true"
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
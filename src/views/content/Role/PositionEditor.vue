<script lang="ts" setup>
import { computed, ref, toRaw, watch } from 'vue';
import { Form } from 'ant-design-vue';
import {RedoOutlined} from '@ant-design/icons-vue'

const form = ref({
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
if (props.edit) {
  form.value = props.edit
}

watch(props,(props) => {
  open.value = props.show
})

const useForm = Form.useForm
const { validate, resetFields} = useForm(form)

const onClose = () => {
  open.value = false
  emit("closeDrawer")
  if (props.edit && !push.value) {
    console.log('执行力')
    form.value = props.edit
  }
};
function reset() {
  form.value = {
    name: '',
    encoding: '',
    status: '',
  }
}
function submit() {
  validate()
  .then(() => {
    push.value = true;
    emit('onChange', form.value, props.index)
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
</script>

<template>
  <a-modal
    title="新增职位"
    centered
    :open="open"
    @cancel="onClose"
  >
    <a-form :model="form" layout="horizontal">
      <a-form-item label="职位名称" name="name">
        <a-input v-model:value="form.name" placeholder="请输入职位名称" />
      </a-form-item>
      <a-form-item label="职位编码" name="encoding">
        <a-input v-model:value="form.encoding" placeholder="请输入职位编码" />
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
<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw, watch } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { Form } from 'ant-design-vue';

const form = ref({
  name: '',
  gender: '',
  position: '',
  deparment: '',
  phone: '',
  creationTime: null,
  status: '',
});

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please enter user name' }],
  gender: [{ required: true, message: 'please enter url' }],
  position: [{ required: true, message: 'Please select an owner' }],
  deparment: [{ required: true, message: 'Please choose the type' }],
  phone: [{ required: true, message: 'Please choose the approver' }],
  // creationTime: [{ required: true, message: 'Please choose the dateTime', type: 'array' }],
  status: [{ required: true, message: 'Please enter url description' }],
};

const open = ref<boolean>(false);
const props = defineProps(['show', 'edit', 'index'])
const emit = defineEmits(['onChange', 'closeDrawer'])
if (props.edit) {
  form.value = props.edit
}
const useForm = Form.useForm

watch(props,(props) => {
  open.value = props.show
})

const { validate, resetFields} = useForm(form)

const onClose = () => {
  open.value = false
  emit("closeDrawer")
};
function reset() {
  resetFields()
}
function submit() {
  validate()
  .then(() => {
    emit('onChange', form.value, props.index)
    console.log(toRaw(form.value));
    if(!props.edit) {
      resetFields()
    }
  })
  .catch(err => {
    console.log('error',err)
  })
  onClose()
}
</script>

<template>
  <a-drawer
    title="新增用户"
    :width="350"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="horizontal">
      <a-form-item label="用户名" name="name">
        <a-input v-model:value="form.name" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="性别" name="gender">
        <a-select v-model:value="form.gender" placeholder="请选择性别">
          <a-select-option value="男">男</a-select-option>
          <a-select-option value="女">女</a-select-option>
        </a-select>
      </a-form-item>
        <a-form-item label="职位" name="position">
          <a-select v-model:value="form.position" placeholder="请选择职位">
            <a-select-option value="系统管理员">系统管理员</a-select-option>
            <a-select-option value="测试人员">测试人员</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="部门" name=" deparment">
          <a-select v-model:value="form.deparment" placeholder="请选择部门">
            <a-select-option value="开发部门">开发部门</a-select-option>
            <a-select-option value="测试部门">测试部门</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="手机号码" name="phone">
          <a-input v-model:value="form.phone" placeholder="请输入手机号码" />
        </a-form-item>
        <a-form-item label="创建时间" name="creationTime">
          <a-date-picker
            v-model:value="form.creationTime"
            style="width: 100%"
            :get-popup-container="(trigger: any) => trigger.parentElement"
            valueFormat="YYYY-MM-DD"
          />
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
        <a-button @click="reset">重置</a-button>
        <a-button type="primary" @click="submit">提交</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
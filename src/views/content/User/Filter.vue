<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { Form } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';

  
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  import type { Dayjs } from 'dayjs';
  type RangeValue = [Dayjs, Dayjs];
  const value1 = ref<RangeValue>();

  watch(value1,(value1) => {
    console.log(value1?.[0])
  })

  const status = ref('全部')
  const choiceStatu = (statu: string) => {
    status.value = statu;
  }
  const useForm = Form.useForm;
  const modelRef = reactive({
    name: '',
    status: status.value,
    date: []
  });
  const { validate, resetFields} = useForm(modelRef);
  const props = defineProps(['data'])
  const emit = defineEmits(['filterList'])

  const onSubmit = () => {
     validate()
    .then(() => {
      let newdata = []
      if (modelRef.name) {
        newdata.push(...props.data.filter((item: any) => item.name === modelRef.name))
        // newdata.push(...props.data.filter((item: any) => item.position === modelRef.name))
      }
      if (modelRef.status) {
        if (status.value !== '全部') {
          if(newdata.length !== 0) {
            let arr = newdata.filter((item: any) => item.status == status.value)
            if(arr.length === 0 ) {
              newdata = []
            } else {
              newdata = arr
            }
          } else {
            newdata.push(...props.data.filter((item: any) => item.status === status.value))
          }
        } else {
          if (newdata.length === 0 ) {
            if (!modelRef.name || !modelRef.date){
              newdata = props.data
            }
          }
        }
      }
      if (modelRef.date.length !== 0) {
        if(newdata.length !== 0) {
          let arr = newdata.filter((item: any) => item.creationTime >= modelRef.date[0] && item.creationTime <= modelRef.date[1])
          if(arr.length === 0 ) {
            newdata = []
          } else {
            newdata = arr
          }
        } else {
          newdata.push(...props.data.filter((item: any) => item.creationTime >= modelRef.date[0] && item.creationTime <= modelRef.date[1]))
        }
      }
      emit("filterList", newdata)
    })
    .catch(err => {
      console.log('error', err);
    });
  };
  function reset() {
    resetFields()
    status.value = '全部'
    emit("filterList",props.data)
  }

</script>

<template>
  <div class="filter">
        <a-form
        name="filter"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        hideRequiredMark
        layout="inline"
      >
        <a-form-item
          label="关键字"
          name="关键字"
          :rules="[{ required: false, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="modelRef.name" placeholder="用户名/职位/手机号" />
        </a-form-item>
        <a-form-item
          label="状态"
          name="状态"
        >
          <a-dropdown :trigger="['click']">
            <a-button class="ant-dropdown-link" @click.prevent>
              {{ status }}
              <DownOutlined />
            </a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="choiceStatu('启用')">启用</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="choiceStatu('禁用')">禁用</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-form-item>
        <a-form-item
          label="创建时间"
          name="创建时间"
        >
          <a-range-picker v-model:value="modelRef.date" valueFormat="YYYY-MM-DD"/>
        </a-form-item>
        <a-form-item style="margin: 16px;" :wrapper-col="{ span: 16, offset: 12 }">
          <a-space>
            <a-button type="primary"  @click="onSubmit">搜索</a-button>
            <a-button @click="reset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
      </div>
</template>

<style scoped>
  
</style>
import { ref } from 'vue';

export const office = ref([{
  // key: '0-0',
  value: '顶级部门',
  label: '顶级部门',
  children: [
    {
      // key: '0-0-0',
      value: '未来科技',
      label: '未来科技',
      children: [
        {
          // key: '0-0-0-0',
          value: '研发部门',
          label: '研发部门',
        }, {
          // key: '0-0-0-1',
          value: '测试部门',
          label: '测试部门',
        }
      ]
    }, {
      // key: '0-0-1',
      value: '复兴科技',
      label: '复兴科技',
      children: [
        {
          // key: '0-0-0-1',
          value: '投资部门',
          label: '投资部门',
        }
      ]
    }
  ]
}])

//删除选中的选项
export function deleteOptions(name: string) {
  let found = false
  const find = (data: Array<any>, name: string) => {
    data.forEach((item, index) => {
      if (found) return
      if (name === item.value) {
        found = true
        data.splice(index, 1)
      } else if (item.children) {
        find(item.children, name)
      }
    })
  }
  find(office.value, name)
}
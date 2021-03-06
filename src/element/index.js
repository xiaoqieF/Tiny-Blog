// 导入自己需要的组件
import { Form, FormItem, Input, Button, Menu, MenuItem, Row, Col,
  Avatar, Card, Link, Pagination, Tag, Timeline, TimelineItem, Radio,
  Select, Option, Checkbox, Upload, Table, TableColumn, Message, Dropdown, 
  DropdownMenu, DropdownItem, Dialog, MessageBox} from 'element-ui'
import Vue from 'vue'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

const element = {
  install: function (Vue) {
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Avatar)
    Vue.use(Card)
    Vue.use(Link)
    Vue.use(Pagination)
    Vue.use(Tag)
    Vue.use(Timeline)
    Vue.use(TimelineItem)
    Vue.use(Radio)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Checkbox)
    Vue.use(Upload)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Dropdown)
    Vue.use(DropdownItem)
    Vue.use(DropdownMenu)
    Vue.use(Dialog)
  }
}
export default element
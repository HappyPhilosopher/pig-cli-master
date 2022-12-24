// 引入的不再是Vue构造函数，而是一个名为createApp的工厂函数
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import { Button, Layout, Row, Col, Card } from 'ant-design-vue';

// createApp(App) —— 创建应用实例对象-app（类似于Vue2中的vm）
const app = createApp(App);
app.use(router);
app.use(store);
app.use(Antd);

// app.use(Button);
// app.use(Layout);
// app.use(Row);
// app.use(Col);
// app.use(Card);

// 挂载
app.mount('#app');

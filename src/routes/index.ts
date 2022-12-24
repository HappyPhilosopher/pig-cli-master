import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Index from '@/views/Index.vue';
import TemplateDetail from '@/views/TemplateDetail.vue';
import Editor from '@/views/Editor.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index,
			children: [
				{
					path: '',
					name: 'home',
					component: Home,
					meta: {
						title: '欢迎来到慕课乐高'
					}
				},
				{
					path: 'template/:id',
					name: 'template',
					component: TemplateDetail,
					meta: {
						title: '模板详情'
					}
				}
			]
		},
		{
			path: '/editor',
			name: 'editor',
			component: Editor
		}
	]
});

export default router;

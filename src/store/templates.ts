import { Module } from 'vuex';
import { GlobalDataProps } from './index';

export interface TemplateProps {
	id: number;
	title: string;
	coverImg: string;
	author: string;
	copiedCount: number;
}

export const testData: TemplateProps[] = [
	{
		id: 1,
		coverImg: require('../assets/1.png'),
		title: '前端架构师直播海报',
		author: 'painfulpig',
		copiedCount: 1
	},
	{
		id: 2,
		coverImg: require('../assets/2.png'),
		title: '前端架构师直播海报',
		author: 'painfulpig',
		copiedCount: 1
	},
	{
		id: 3,
		coverImg: require('../assets/3.png'),
		title: '前端架构师直播海报',
		author: 'painfulpig',
		copiedCount: 1
	},
	{
		id: 4,
		coverImg: require('../assets/4.png'),
		title: '前端架构师直播海报',
		author: 'painfulpig',
		copiedCount: 1
	},
	{
		id: 5,
		coverImg: require('../assets/5.png'),
		title: '前端架构师直播海报',
		author: 'painfulpig',
		copiedCount: 1
	},
	{
		id: 6,
		coverImg: require('../assets/6.png'),
		title: '前端架构师直播海报',
		author: 'painfulpig',
		copiedCount: 1
	}
];

export interface TemplatesProps {
	data: TemplateProps[];
}

const templates: Module<TemplatesProps, GlobalDataProps> = {
	state: () => ({ data: testData }),
	getters: {
		getTemplateById: state => (id: number) => state.data.find(item => item.id === id)
	}
};

export default templates;

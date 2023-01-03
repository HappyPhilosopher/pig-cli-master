import { Module } from 'vuex';
import { GlobalDataProps } from './index';
import { v4 as uuidv4 } from 'uuid';
import { TextComponentProps } from '@/common/defaultProps';

export interface EditorProps {
	// 供中间编辑器渲染的数组
	components: ComponentData[];
	// 当前编辑的是哪个元素，uuid
	currentElement: string;
}

export interface ComponentData {
	// 这个元素的属性，属性详情见下面
	props: { [key: string]: any };
	// id: uuid v4 生成
	id: string;
	// 业务组件库名称 l-text, l-image 等等
	name: string;
}

export const testComponents: ComponentData[] = [
	{
		id: uuidv4(),
		name: 'l-text',
		props: { text: 'hello', position: 'relative', lineHeight: '1', textAlign: 'left', fontFamily: '', color: '#000000' }
	},
	{
		id: uuidv4(),
		name: 'l-text',
		props: {
			text: 'hello2',
			fontSize: '20px',
			position: 'relative',
			lineHeight: '2',
			textAlign: 'left',
			fontFamily: ''
		}
	},
	{
		id: uuidv4(),
		name: 'l-text',
		props: {
			text: '你好',
			color: 'red',
			position: 'relative',
			lineHeight: '3',
			textAlign: 'right',
			fontFamily: 'KaiTi'
		}
	}
];

const editor: Module<EditorProps, GlobalDataProps> = {
	state: () => ({ components: testComponents, currentElement: '' }),
	getters: {
		getCurrentElement: state => state.components.find(component => component.id === state.currentElement)
	},
	mutations: {
		addComponent(state, props: Partial<TextComponentProps>) {
			const newComponent: ComponentData = {
				id: uuidv4(),
				name: 'l-text',
				props
			};
			state.components.push(newComponent);
		},
		setActive(state, currentId: string) {
			state.currentElement = currentId;
		},
		updateComponent(state, { key, value }) {
			const updatedComponent = state.components.find(component => component.id === state.currentElement);
			if (updatedComponent) {
				updatedComponent.props[key as keyof TextComponentProps] = value;
			}
		}
	}
};

export default editor;

import { mount, VueWrapper } from '@vue/test-utils';
import UserProfile from '@/components/UserProfile.vue';

jest.mock('ant-design-vue');
jest.mock('vuex');
jest.mock('vue-router');

let wrapper: VueWrapper<any>;
const mockComponent = {
	template: '<div><slot></slot></div>'
};
const mockComponent2 = {
	template: '<div><slot></slot><slot name="overlay"></slot></div>'
};
const globalComponents = {
	'a-button': mockComponent,
	'a-dropdown-button': mockComponent2,
	'router-link': mockComponent,
	'a-menu': mockComponent,
	'a-menu-item': mockComponent
};

describe('test UserProfile component', () => {
	beforeAll(() => {
		wrapper = mount(UserProfile, {
			props: {
				user: { isLogin: false }
			},
			global: {
				components: globalComponents
			}
		});
	});

	afterAll(() => {
		console.log('===> 测试完成');
	});

	it('should render login button when login is false', () => {
		expect(wrapper.get('.user-profile-component').text()).toBe('登录');
	});

	it.only('should render username when login is true', async () => {
		await wrapper.setProps({
			user: { isLogin: true, userName: 'painfulpig' }
		});
		expect(wrapper.html()).toContain('painfulpig');
		expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy();
	});
});

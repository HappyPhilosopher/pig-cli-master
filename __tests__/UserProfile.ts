import { mount, VueWrapper } from '@vue/test-utils';
import UserProfile from '@/components/UserProfile.vue';
import { message } from 'ant-design-vue';
import store from '@/store';

jest.mock('ant-design-vue', () => ({
	message: {
		success: jest.fn()
	}
}));
const mockedRoutes: string[] = [];
jest.mock('vue-router', () => ({
	useRouter: () => ({
		push: (url: string) => mockedRoutes.push(url)
	})
}));

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
		jest.useFakeTimers();
		wrapper = mount(UserProfile, {
			props: {
				user: { isLogin: false }
			},
			global: {
				components: globalComponents,
				plugins: [store]
			}
		});
	});

	afterAll(() => {
		console.log('===> 测试完成');
	});

	afterEach(() => {
		(message as jest.Mocked<typeof message>).success.mockReset();
	});

	it('should render login button when login is false', async () => {
		expect(wrapper.get('.user-profile-component').text()).toBe('登录');
		await wrapper.find('.user-profile-component').trigger('click');
		expect(message.success).toHaveBeenCalledTimes(1);
		expect(store.state.user.userName).toBe('painful_pig');
	});

	it('should render username when login is true', async () => {
		await wrapper.setProps({
			user: { isLogin: true, userName: 'painfulpig' }
		});
		expect(wrapper.html()).toContain('painfulpig');
		expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy();
		await wrapper.find('.logout').trigger('click');
		expect(store.state.user.isLogin).toBeFalsy();
		jest.advanceTimersByTime(2000);
		expect(mockedRoutes).toContain('/');
	});
});

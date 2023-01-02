import { shallowMount, VueWrapper } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';
import flushPromises from 'flush-promises';

let wrapper: VueWrapper<any>;
const msg = 'new message';

describe('test HelloWorld.vue', () => {
	beforeAll(() => {
		wrapper = shallowMount(HelloWorld, {
			props: {
				msg
			}
		});
	});

	it('test HelloWorld.vue', async () => {
		const button = wrapper.get('button');
		await button.trigger('click');
		expect(button.text()).toBe('1');
	});

	it('test todo case', async () => {
		const todoContent = 'buy milk';
		const input = wrapper.get('input');
		await input.setValue(todoContent);
		expect(input.element.value).toBe(todoContent);
		const button = wrapper.get('.addTodo');
		await button.trigger('click');
		const lists = wrapper.findAll('li');
		expect(lists.length).toBe(1);
		expect(wrapper.get('li').text()).toBe(todoContent);
		expect(wrapper.emitted()).toHaveProperty('send');
		const events = wrapper.emitted('send') as string[][];
		expect(events[0]).toEqual([todoContent]);
	});

	it('asynchronous', async () => {
		jest.spyOn(axios, 'get').mockResolvedValue({ data: { username: 'painfulpig' } });
		await wrapper.get('.load-user').trigger('click');
		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(wrapper.find('.loading').exists()).toBeTruthy();
		await flushPromises();
		expect(wrapper.find('.loading').exists()).toBeFalsy();
		expect(wrapper.find('.userName').text()).toBe('painfulpig');
	});

	it('test rejected case', async () => {
		jest.spyOn(axios, 'get').mockRejectedValue({ error: 'error' });
		await wrapper.find('.load-user').trigger('click');
		await flushPromises();
		expect(wrapper.find('.error').exists()).toBeTruthy();
		expect(jest.spyOn(axios, 'get')).toBeCalledTimes(1);
	});

	afterEach(() => {
		console.log('test finished...');
		jest.spyOn(axios, 'get').mockReset();
	});
});

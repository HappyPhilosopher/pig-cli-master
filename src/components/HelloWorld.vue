<template>
	<h1>{{ msg }}</h1>
	<button @click="count++">{{ count }}</button>
	<input type="text" v-model="todo" />
	<button class="addTodo" @click="addTodo">add todo</button>
	<button class="load-user" @click="loadUser">load user</button>
	<p v-if="user.loading" class="loading">loading</p>
	<div v-else class="userName">{{ user.data && user.data.username }}</div>
	<p v-if="user.error" class="error">error</p>
	<ul>
		<li v-for="(todo, index) in todos" :key="index">{{ todo }}</li>
	</ul>
	<hello msg="1234"></hello>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Hello from './Hello.vue';
import axios from 'axios';

export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: String
	},
	components: {
		Hello
	},
	emits: ['send'],
	setup(props, ctx) {
		const count = ref(0);
		const todo = ref('');
		const todos = reactive<string[]>([]);
		const user = reactive({
			data: null as any,
			loading: false,
			error: false
		});
		const addTodo = () => {
			if (todo.value) {
				todos.push(todo.value);
				ctx.emit('send', todo.value);
			}
		};
		const loadUser = () => {
			user.loading = true;
			axios
				.get('https://jsonplaceholder.typicode.com/users/1')
				.then(res => {
					console.log(res);
					user.data = res.data;
				})
				.catch(() => {
					user.error = true;
				})
				.finally(() => {
					user.loading = false;
				});
		};

		return {
			count,
			todo,
			todos,
			addTodo,
			user,
			loadUser
		};
	}
});
</script>

<style scoped lang="scss"></style>

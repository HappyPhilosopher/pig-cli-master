<template>
	<router-link to="/" v-if="!user.isLogin">
		<a-button type="primary" class="user-profile-component" @click="login">登录</a-button>
	</router-link>

	<div v-else>
		<a-dropdown-button class="user-profile-component">
			<router-link to="/setting">{{ user.userName }}</router-link>
			<template #overlay>
				<a-menu class="user-profile-dropdown">
					<a-menu-item key="0">创建作品</a-menu-item>
					<a-menu-item key="1">
						<router-link to="/works">我的作品</router-link>
					</a-menu-item>
					<a-menu-item key="2" @click="logout">登出</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import { GlobalDataProps } from '@/store';
import { UserProps } from '@/store/user';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: 'user-profile',

	props: {
		user: {
			type: Object as PropType<UserProps>,
			required: true
		}
	},

	setup() {
		const router = useRouter();
		const store = useStore<GlobalDataProps>();
		const login = () => {
			store.commit('login');
			message.success('login success!', 2);
		};
		const logout = () => {
			store.commit('logout');
			message.success('logout success!', 2).then(() => {
				router.push('/');
			});
		};

		return {
			login,
			logout
		};
	}
});
</script>

<style scoped>
.user-profile-dropdown {
	border-radius: 2px !important;
}
.user-operation > * {
	margin-left: 30px !important;
}
</style>

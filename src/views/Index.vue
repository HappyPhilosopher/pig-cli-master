<template>
	<div class="homepage-container">
		<a-layout :style="{ background: '#fff' }">
			<a-layout-header class="header">
				<div class="page-title">
					<router-link to="/">慕课乐高</router-link>
				</div>
				<user-profile :user="user"></user-profile>
			</a-layout-header>

			<a-layout-content class="home-layout">
				<router-view></router-view>
			</a-layout-content>

			<a-layout-footer>@painfulpig版权所有 | 鄂ICP备2022017904号-1</a-layout-footer>
		</a-layout>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { GlobalDataProps } from '@/store';
import UserProfile from '@/components/UserProfile.vue';

export default defineComponent({
	name: 'index',

	setup() {
		const store = useStore<GlobalDataProps>();
		const user = computed(() => store.state.user);

		return {
			user
		};
	},

	components: {
		UserProfile
	}
});
</script>

<style>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.page-title {
	color: #fff;
}
</style>

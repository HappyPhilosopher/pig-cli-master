<template>
	<div class="content-container">
		<a-row :gutter="16">
			<TemplateList :list="testData"></TemplateList>
		</a-row>
		<a-row type="flex" justify="center">
			<a-button type="primary" size="large">加载更多</a-button>
		</a-row>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { GlobalDataProps } from '@/store';
import TemplateList from '@/components/TemplateList.vue';

export default defineComponent({
	name: 'home',

	setup() {
		const store = useStore<GlobalDataProps>();
		const testData = computed(() => store.state.templates.data);

		return {
			testData
		};
	},

	components: {
		TemplateList
	}
});
</script>

<style>
.page-title {
	color: #fff;
}
.content-container {
	background: #fff;
	padding: 0 24px 24px 30px;
	min-height: 85vh;
	max-width: 1200px;
	margin: 50px auto;
	width: 100%;
}
</style>

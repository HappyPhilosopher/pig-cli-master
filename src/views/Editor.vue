<template>
	<div class="editor-container">
		<a-layout>
			<a-layout-header class="header">
				<div class="page-title">
					<router-link to="/">
						<img src="../assets/logo-simple.png" alt="慕课乐高" class="logo-img" />
					</router-link>
				</div>
				<a-menu :selectable="false" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
					<a-menu-item key="1">
						<a-button type="primary" shape="round">预览和设置</a-button>
					</a-menu-item>
					<a-menu-item key="2">
						<a-button type="primary" shape="round">保存</a-button>
					</a-menu-item>
					<a-menu-item key="3">
						<a-button type="primary" shape="round">发布</a-button>
					</a-menu-item>
					<a-menu-item key="4">
						<user-profile :user="userInfo" shape="round"></user-profile>
					</a-menu-item>
				</a-menu>
			</a-layout-header>
		</a-layout>

		<a-layout>
			<a-layout-sider width="300" style="background: #fff">
				<div class="sidebar-container">
					组件列表
					<ComponentsList :list="defaultTextTemplates" @on-item-click="addItem"></ComponentsList>
				</div>
			</a-layout-sider>
			<a-layout style="padding: 0 24px 24px">
				<a-layout-content class="preview-container">
					<p>画布区域</p>
					<div class="preview-list" id="canvas-area">
						<edit-wrapper
							v-for="component in components"
							:key="component.id"
							:id="component.id"
							:active="component.id === (currentElement && currentElement.id)"
							@set-active="setActive(component.id)"
						>
							<component :is="component.name" v-bind="component.props"></component>
						</edit-wrapper>
					</div>
				</a-layout-content>
			</a-layout>
			<a-layout-sider width="300" style="background-color: #fff" class="setting-panel">
				组件属性
				<PropsTable
					v-if="currentElement && currentElement.props"
					:props="currentElement.props"
					@change="handleChange"
				></PropsTable>
			</a-layout-sider>
		</a-layout>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { GlobalDataProps } from '@/store';
import { useStore } from 'vuex';
import LText from '@/components/LText.vue';
import UserProfile from '@/components/UserProfile.vue';
import ComponentsList from '@/components/ComponentsList.vue';
import EditWrapper from '@/components/EditWrapper.vue';
import PropsTable from '@/components/PropsTable.vue';
import defaultTextTemplates from '@/common/defaultTemplates';
import { ComponentData } from '@/store/editor';

export default defineComponent({
	name: 'editor',

	setup() {
		const store = useStore<GlobalDataProps>();
		const components = computed(() => store.state.editor.components);
		const userInfo = computed(() => store.state.user);
		const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement);
		const addItem = (props: any) => {
			store.commit('addComponent', props);
		};
		const setActive = (id: string) => {
			store.commit('setActive', id);
		};
		const handleChange = (e: any) => {
			console.log('event', e);
			store.commit('updateComponent', e);
		};

		return {
			components,
			defaultTextTemplates,
			userInfo,
			currentElement,
			addItem,
			setActive,
			handleChange
		};
	},

	components: { LText, ComponentsList, UserProfile, EditWrapper, PropsTable }
});
</script>

<style>
.editor-container .preview-container {
	padding: 24px;
	margin: 0;
	min-height: 85vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
}
.editor-container .preview-list {
	padding: 0;
	margin: 0;
	min-width: 375px;
	min-height: 200px;
	border: 1px solid #efefef;
	background: #fff;
	overflow-x: hidden;
	overflow-y: auto;
	position: fixed;
	margin-top: 50px;
	max-height: 80vh;
}
.page-title {
	display: flex;
}
.page-title .inline-edit span {
	font-weight: 500;
	margin-left: 10px;
	font-size: 16px;
}
.preview-list.canvas-fix .edit-wrapper > * {
	box-shadow: none !important;
}
.preview-list.canvas-fix {
	position: absolute;
	max-height: none;
}
.ant-menu-item-active:hover {
	background-color: transparent;
}
</style>

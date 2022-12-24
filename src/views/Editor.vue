<template>
	<div class="editor" id="editor-layout-main">
		<a-layout :style="{ background: '#fff' }">
			<a-layout-header class="header">
				<div class="page-title" :style="{ color: '#fff' }">慕课乐高</div>
			</a-layout-header>
		</a-layout>

		<a-layout>
			<a-layout-sider width="300" style="background: yellow">
				<div class="sidebar-container">组件列表</div>
			</a-layout-sider>
			<a-layout style="padding: 0 24px 24px">
				<a-layout-content class="preview-container">
					<p>画布区域</p>
					<div class="preview-list" id="canvas-area"></div>
				</a-layout-content>
			</a-layout>
			<a-layout-sider class="setting-panel"> 组件属性 </a-layout-sider>
		</a-layout>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {};
	}
});
</script>

<style scoped></style>

<template>
	<div class="hello">{{ msg }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Hello',

	props: {
		msg: {
			type: String
		}
	},

	setup() {
		return {};
	}
});
</script>

<style scoped></style>

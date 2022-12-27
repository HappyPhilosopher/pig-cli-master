<template>
	<div class="props-table">
		<div v-for="(value, key) in finalProps" :key="key" class="prop-item">
			<span class="label" v-if="value.text">{{ value.text }}</span>
			<div class="prop-component">
				<component
					v-if="value"
					:is="value.component"
					:[value.valueProp]="value.value"
					v-bind="value.extraProps"
					v-on="value.events"
				>
					<template v-if="value.options">
						<component :is="value.subComponent" v-for="(option, k) in value.options" :key="k" :value="option.value">
							<render-vnode :v-node="option.text"></render-vnode>
						</component>
					</template>
				</component>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, VNode } from 'vue';
import { reduce } from 'lodash-es';
import { TextComponentProps } from '@/common/defaultProps';
import { mapPropsToForms } from '@/common/propsMap';
import RenderVnode from '@/components/RenderVnode';

interface FormProps {
	component: string;
	subComponent?: string;
	value: string;
	extraProps?: { [key: string]: any };
	text?: string;
	options?: { text: string | VNode; value: any }[];
	valueProp: string;
	eventName: string;
	events: { [key: string]: (e: any) => void };
}

export default defineComponent({
	name: 'props-table',

	props: {
		props: {
			type: Object as PropType<TextComponentProps>,
			required: true
		}
	},

	emits: ['change'],

	setup(props, context) {
		const finalProps = computed(() =>
			reduce(
				props.props,
				(result, value, key) => {
					const newKey = key as keyof TextComponentProps;
					const item = mapPropsToForms[newKey];
					if (item) {
						const { valueProp = 'value', eventName = 'change', initialTransform, afterTransfrom } = item;
						const newItem: FormProps = {
							...item,
							value: initialTransform ? initialTransform(value) : value,
							valueProp,
							eventName,
							events: {
								[eventName]: (e: any) => {
									context.emit('change', { key, value: afterTransfrom ? afterTransfrom(e) : e });
								}
							}
						};

						result[newKey] = newItem;
					}
					return result;
				},
				{} as { [key: string]: FormProps }
			)
		);

		return {
			finalProps
		};
	},

	components: {
		RenderVnode
	}
});
</script>

<style>
.prop-item {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}
.label {
	width: 28%;
}
.prop-component {
	width: 70%;
}
</style>

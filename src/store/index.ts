import { createStore } from 'vuex';
import templates, { TemplatesProps } from './templates';
import user, { UserProps } from './user';

export interface GlobalDataProps {
	user: UserProps;
	templates: TemplatesProps;
}

const store = createStore<GlobalDataProps>({
	modules: {
		user,
		templates
	}
});

export default store;

import { Roles } from './default';
export const operatorMenu = {
	projects: {
		id: 'Projects',
		text: 'Proyectos',
		path: 'home/projects',
		icon: 'LibraryBooks',
		subMenu: {
			projectList: {
				id: 'project-list',
				text: 'Lista de proyectos',
				path: 'home/projects',
				icon: 'LibraryBooks',
			},
			newProject: {
				id: 'new-project',
				text: 'Nuevo proyecto',
				path: 'home/projects/new',
				icon: 'Add',
			},
		},
	},
	calc: {
		id: 'Calculator',
		text: 'Calculadoras',
		path: 'home/calculators',
		icon: 'ConfirmationNumber',
		role: '*',
	},
};
export const pagesMenu = {
	projects: {
		id: 'Projects',
		text: 'Proyectos',
		path: 'home/projects',
		icon: 'LibraryBooks',
		subMenu: {
			projectList: {
				id: 'project-list',
				text: 'Lista de proyectos',
				path: 'home/projects',
				icon: 'LibraryBooks',
				role: '*',
			},
		},
		role: '*',
	},
	calc: {
		id: 'Calculator',
		text: 'Calculadoras',
		path: 'home/calculators',
		icon: 'ConfirmationNumber',
		role: '*',
	},
	config: {
		id: 'Configuration',
		text: 'Configuración',
		path: 'home/configuration',
		icon: 'Settings',
		role: Roles.supervisor,
	},
	dashboard: {
		id: 'Dashboard',
		text: 'Dashboard',
		path: 'home/dashboard',
		icon: 'Dashboard',
		role: Roles.supervisor,
	},
	manageUsers: {
		id: 'Access',
		text: 'Control de accesos',
		path: 'home/access',
		icon: 'Approval',
		role: Roles.supervisor,
	},
};

export const pageLayoutTypesPagesMenu = {
	layoutTypes: {
		id: 'layoutTypes',
		text: ' ',
	},

	pageLayout: {
		id: 'pageLayout',
		text: 'Page Layout',
		path: 'page-layouts',
		icon: 'BackupTable',
		subMenu: {
			onlySubheader: {
				id: 'onlySubheader',
				text: 'Only Subheader',
				path: 'page-layouts/only-subheader',
				icon: 'ViewStream',
			},
			onlyContent: {
				id: 'onlyContent',
				text: 'Only Content',
				path: 'page-layouts/only-content',
				icon: 'WebAsset',
			},
		},
	},
};

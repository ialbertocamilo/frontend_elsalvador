export const pagesMenu = {
	// location: {
	// 	id: 'Location',
	// 	text: 'Ubicación',
	// 	path: 'home/location',
	// 	icon: 'EditLocation',
	// },
	projects: {
		id: 'Projects',
		text: 'Proyectos',
		path: 'home',
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
	},
	packages: {
		id: 'Packages',
		text: 'Paquetes',
		path: 'home/data',
		icon: 'Backpack',
	},
	config: {
		id: 'Configuration',
		text: 'Configuración',
		path: 'home/configuration',
		icon: 'Settings',
	},
	dashboard: {
		id: 'Dashboard',
		text: 'Dashboard',
		path: 'home/dashboard',
		icon: 'Dashboard',
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

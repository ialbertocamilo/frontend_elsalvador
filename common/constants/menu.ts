export const pagesMenu = {
	auth: {
		id: 'menu',
		text: 'Menu',
		icon: 'Extension',
	},
	location: {
		id: 'Location',
		text: 'Ubicación',
		path: 'home/location',
		icon: 'EditLocation',
	},
	projects: {
		id: 'Projects',
		text: 'Proyectos',
		path: 'home',
		icon: 'FilePresent',
		subMenu: {
			projectList: {
				id: 'project-list',
				text: 'Lista de proyectos',
				path: 'home/projects',
				icon: 'FilePresent',
			},
			newProject: {
				id: 'new-project',
				text: 'Nuevo proyecto',
				path: 'home/projects/new',
				icon: 'FilePresent',
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
		path: 'home/packages',
		icon: 'Backpack',
	},
	config: {
		id: 'Configuration',
		text: 'Configuración',
		path: 'home/configuration',
		icon: 'PanTool',
	},
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/',
		icon: 'Dashboard',
		subMenu: null,
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

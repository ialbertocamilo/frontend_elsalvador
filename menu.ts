export const pagesMenu = {
	auth: {
		id: 'menu',
		text: 'Menu',
		icon: 'Extension',
	},
	location: {
		id: 'Location',
		text: 'Ubicación',
		path: 'location',
		icon: 'EditLocation',
	},
	projects: {
		id: 'Projects',
		text: 'Proyectos',
		path: 'projects',
		icon: 'FilePresent',
	},
	calc: {
		id: 'Calculator',
		text: 'Calculadoras',
		path: 'calculators',
		icon: 'ConfirmationNumber',
	},
	packages: {
		id: 'Packages',
		text: 'Paquetes',
		path: 'packages',
		icon: 'Backpack',
	},
	config: {
		id: 'Configuration',
		text: 'Configuración',
		path: 'configuration',
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
		text: 'Page Layout Types',
	},

	pageLayout: {
		id: 'pageLayout',
		text: 'Page',
		path: 'page-layouts',
		icon: 'BackupTable',
		subMenu: {
			headerAndSubheader: {
				id: 'headerAndSubheader',
				text: 'Header & Subheader',
				path: 'page-layouts/header-and-subheader',
				icon: 'ViewAgenda',
			},
			onlyHeader: {
				id: 'onlyHeader',
				text: 'Only Header',
				path: 'page-layouts/only-header',
				icon: 'ViewStream',
			},
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

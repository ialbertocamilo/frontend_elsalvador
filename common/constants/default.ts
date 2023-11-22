export enum StorageTypes {
	user = 'auth/user',
}

export enum RoutesList {
	geolocation = '/home/location',
	projects = '/home/projects',
	newProject = '/home/projects/new',
	calculators = '/home/calculators',
	calculatorProportion = '/home/calculators/proportion',
	calculatorTransmittance = '/home/calculators/transmittance',
	calculatorTransmittanceRoofs = '/home/calculators/transmittance-roofs',
	calculatorWindow = '/home/calculators/window',
	calculatorShading = '/home/calculators/shading',
	login = '/auth/login',
}

export const RoutesListWithParams = {
	calculatorProportion: (value: any) => `/home/calculators/${value}/proportion`,
	calculatorTransmittance: (value: any) => `/home/calculators/${value}/transmittance`,
	calculatorTransmittanceRoofs: (value: any) => `/home/calculators/${value}/transmittance-roofs`,
	calculatorWindow: (value: any) => `/home/calculators/${value}/window`,
	calculatorShading: (value: any) => `/home/calculators/${value}/shading`,
	geolocation: (value: any) => `/home/location/${value}`,
	calculators: (value: any) => `/home/calculators/${value}`,
	project: (value: any) => `/home/projects/${value}`,
	packages: (value: any) => `/home/packages/${value}`,
	configuration: (value: any) => `/home/configuration/${value}`,
};

export type ProjectStatus = {
	progress: 0;
	accepted: 1;
	denied: 0;
};

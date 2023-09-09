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
	calculatorWindow = '/home/calculators/window',
	calculatorShading = '/home/calculators/shading',
}

export const RoutesListWithParams = {
	calculatorProportion: (value: any) => `/home/calculators/${value}/proportion`,
	calculatorTransmittance: (value: any) => `/home/calculators/${value}/transmittance`,
	calculatorWindow: (value: any) => `/home/calculators/${value}/window`,
	calculatorShading: (value: any) => `/home/calculators/${value}/shading`,
	geolocation: (value: any) => `/home/location/${value}`,
	calculators: (value: any) => `/home/calculators/${value}`,
	project: (value: any) => `/home/projects/${value}`,
};

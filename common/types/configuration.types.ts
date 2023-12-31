import { BuildingClassification } from './building.types';

export interface IConfigurationType {
	proportion_wall_window: string;
	walls_u_value: string;
	walls_reflectance: string;
	roofs_u_value: string;
	roofs_reflectance: string;
	windows_u_value: string;
	shading_coefficient: string;
	shades: string;
	hvac: string;
	final_energy_reduction: string;
	package_name?: string;
	package_id?: string;
	package_status?: boolean;
	building_classification?: BuildingClassification;
}

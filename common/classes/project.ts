import { BuildingClassification, BuildingType } from '../types/building.types';

export class ProjectEntity {
	id?: number;
	user_id?: number;
	project_name?: string;
	owner_name?: string;
	owner_lastname?: string;
	profession?: string;
	nationality?: string;
	email?: string;
	phone?: string;
	department?: string;
	designer_name?: string;
	project_director?: string;
	address?: string;
	municipality?: string;
	energy_advisor?: string;
	latitude?: number;
	longitude?: number;
	levels?: number;
	offices?: number;
	surface?: number;
	extra?: string;
	is_public?: boolean;
	status?: number;
	building_type?: BuildingType;
	building_classification?: BuildingClassification;
	created_at?: Date;
	updated_at?: Date;

	constructor(params: unknown) {
		Object.assign(this, params);
	}
}
export class ProjectRequest extends ProjectEntity {
	constructor(params: unknown) {
		super(params);
		Object.assign(this, params);
	}
}

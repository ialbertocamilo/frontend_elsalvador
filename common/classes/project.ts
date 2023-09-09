export class ProjectRequest {
	project_name?: string;
	owner_name?: string;
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
	is_public?: boolean;

	constructor(params: {
		owner_name?: string;
		address?: string;
		surface?: number;
		latitude?: number;
		offices?: number;
		municipality?: string;
		energy_advisor?: string;
		designer_name?: string;
		project_name?: string;
		project_director?: string;
		levels?: number;
		longitude?: number;
		is_public?: boolean;
	}) {
		Object.assign(this, params);
	}
}

export class ProjectEntity {
	id?: number;
	user_id?: number;
	project_name?: string;
	owner_name?: string;
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
	created_at?: Date;
	updated_at?: Date;

	constructor(params: unknown) {
		Object.assign(this, params);
	}
}

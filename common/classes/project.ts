export class ProjectRequest {
	project_name: string;
	owner_name: string;
	designer_name: string;
	project_director: string;
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
		owner_name: string;
		address: string;
		surface: string;
		latitude: number;
		offices: string;
		municipality: string;
		energy_advisor: string;
		designer_name: string;
		project_name: string;
		project_director: string;
		levels: string;
		longitude: number;
		is_public: boolean;
	}) {
		Object.assign(this, params);
	}
}

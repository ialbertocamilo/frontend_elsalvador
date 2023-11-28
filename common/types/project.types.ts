import { ProjectEntity } from '../classes/project';

export interface IProjectFormType {
	id?: string;
	ownerName?: string;
	ownerLastName?: string;
	projectName?: string;
	profession?: string;
	nationality?: string;
	directorName?: string;
	designerName?: string;
	department?: string;
	phone?: string;
	email?: string;
	address?: string;
	municipality?: string;
	energyAdvisor?: string;
	levelsNumber?: number;
	offices?: number;
	surface?: number;
	public?: boolean;
	status?: number;
}

export interface IProjectListResponse {
	current_page: number;
	data: ProjectEntity[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: { url: string | null; label: string; active: boolean }[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
}

export interface IProjectDataGetterRequest {
	project_id: string;
	key: string;
}

export interface IProjectDataSavingRequest {
	project_id?: string | string[];
	key: string;
	payload: object | string;
}

export interface IProjectData extends IProjectDataSavingRequest {
	payload: Record<string, any>;
}
export interface IProjectDataTotalValues {
	wall_window_proportion: string;
	wall_u_value: string;
	roof_u_value: string;
	window_u_value: string;
	window_g_value: string;
	shades: string;
}

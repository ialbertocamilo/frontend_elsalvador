import { ProjectEntity } from '../classes/project';

export interface ProjectFormType {
	id?: string;
	ownerName?: string;
	projectName?: string;
	directorName?: string;
	designerName?: string;
	address?: string;
	municipality?: string;
	energyAdvisor?: string;
	levelsNumber?: number;
	offices?: number;
	surface?: number;
	public?: boolean;
}

export interface IProjectListResponse {
	current_page: string;
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

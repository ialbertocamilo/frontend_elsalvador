import axiosService from '../../lib/axios';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import {
	IProjectDataGetterRequest,
	IProjectDataSavingRequest,
	IProjectFormType,
	IProjectListResponse,
} from '../../common/types/project.types';
import { ProjectMapper } from '../../common/mapper/project.mapper';
import { ProjectEntity } from '../../common/classes/project';

export function useProjects() {
	async function getProject(id: string) {
		const response = await axiosService().get(`/projects/${id}`);
		if (response.status === 200) return new ProjectEntity(response.data);
		return null;
	}

	async function getProjects(pathParams: string) {
		const response = await axiosService().get(`/projects?${pathParams}`);
		return (response.data as IProjectListResponse) || null;
	}

	async function saveProject(params: IProjectFormType) {
		const payload = ProjectMapper.formToRequest(params);
		const response = await axiosService().post('/projects', payload);

		if (!response?.data) return false;
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>Proyecto</span>
			</span>,
			'Se ha guardado correctamente.',
			'success',
		);
		return true;
	}

	async function updateProject(params: IProjectFormType) {
		const payload = ProjectMapper.formToRequest(params);
		const response = await axiosService().patch(`/projects/${params.id}`, payload);

		if (!response?.data) return false;
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>Proyecto</span>
			</span>,
			'Se ha guardado correctamente.',
			'success',
		);
		return true;
	}

	async function getProjectData(params: IProjectDataGetterRequest): Promise<unknown> {
		if (params.project_id && params.key) {
			const result = await axiosService().post(`/projects/get-data`, params);
			return result?.data;
		}
		return null;
	}

	async function saveProjectData(params: IProjectDataSavingRequest) {
		if (!params.project_id || !params.key) return false;
		const response = await axiosService().post(`/projects/save-data`, params);

		if (!response?.data) return false;
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>Datos de proyecto</span>
			</span>,
			'Se ha guardado correctamente.',
			'success',
		);
		return true;
	}

	return {
		getProject,
		getProjects,
		updateProject,
		saveProject,
		saveProjectData,
		getProjectData,
	};
}

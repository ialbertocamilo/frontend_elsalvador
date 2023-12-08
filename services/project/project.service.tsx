import axiosService from '../../lib/axios';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import {
	IProjectDataGetterRequest,
	IProjectDataSavingRequest,
	IProjectFormType,
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
		return (response.data as ProjectEntity[]) || null;
	}

	async function saveProject(params: IProjectFormType) {
		const payload = ProjectMapper.formToRequest(params);
		const response = await axiosService().post('/projects', payload);

		if (!response?.data) return false;
		const { data } = response?.data;
		return new ProjectEntity(data);
	}

	async function updateProject(params: IProjectFormType) {
		const payload = ProjectMapper.formToRequest(params);

		const response = await axiosService().patch(`/projects/${params.id}`, payload);

		if (!response?.data) return false;
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>Información almacenada</span>
			</span>,
			'Los datos se han guardado exitosamente.',
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
	async function getAllProjectData(projectId: string): Promise<unknown> {
		if (projectId) {
			const result = await axiosService().post(`/projects/get-all-data`, {
				project_id: projectId,
			});
			return result?.data;
		}
		return null;
	}

	async function saveProjectData(params: IProjectDataSavingRequest) {
		let response;
		if (!params.project_id) response = await axiosService().post(`/data`, params);
		else if (!params.key) return false;
		else response = await axiosService().post(`/projects/save-data`, params);

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

	async function searchProject(
		value: string,
		created_at_filter = false,
		updated_at_filter = false,
		id_filter = false,
	) {
		const response = await axiosService().post(
			`/projects/search?value=${value}
			&created_at_filter=${created_at_filter}
			&updated_at_filter=${updated_at_filter}
			&id_filter=${id_filter}`,
		);
		if (response.data) return response.data;

		return null;
	}

	async function uploadFile(projectId: string, file: File, key: string) {
		const response = await axiosService().post(
			`/projects/save-file`,
			{ project_id: projectId, project_file: file, key },
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		if (response.data) return response.data;

		return null;
	}

	async function getFiles(projectId: string, key: string) {
		const response = await axiosService().post(`/projects/get-files`, {
			project_id: projectId,
			key,
		});
		if (response.data) return response.data;
	}

	return {
		getFiles,
		searchProject,
		getProject,
		getProjects,
		updateProject,
		saveProject,
		saveProjectData,
		getProjectData,
		uploadFile,
		getAllProjectData,
	};
}

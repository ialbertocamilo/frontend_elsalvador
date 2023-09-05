import axiosService from '../../lib/axios';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import { IProjectListResponse, ProjectFormType } from '../../common/types/project.types';
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

	async function saveProject(params: ProjectFormType) {
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

	async function updateProject(params: ProjectFormType) {
		console.log(params);
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

	return {
		getProject,
		getProjects,
		updateProject,
		saveProject,
	};
}

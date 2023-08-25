import axiosService from '../../lib/axios';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import { ProjectFormType } from '../../common/types/project.types';
import { ProjectMapper } from '../../common/mapper/project.mapper';

export function getProjects() {}

export async function saveProject(params: ProjectFormType) {
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

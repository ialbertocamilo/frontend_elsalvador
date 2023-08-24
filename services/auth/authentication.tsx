import { AuthUser } from '../../common/classes/user';
import axiosService from '../../lib/axios';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';

export async function login(email: string, password: string) {
	const response = await axiosService().post('/login', { username: email, password });

	if (response?.data) {
		showNotification(
			<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Autenticación</span>
					</span>,
			'Se inició sesión correctamente.',
			'success',
		);
		return new AuthUser(response.data);
	}
	return null;
}

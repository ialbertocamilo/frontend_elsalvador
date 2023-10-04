import { AuthUser } from '../../common/classes/user';
import axiosService from '../../lib/axios';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import { IUserRegister } from '../../common/types/user.types';

export async function login(email: string, password: string) {
	const response = await axiosService().post('/login', { username: email, password });

	if (response?.data) {
		return new AuthUser(response.data);
	}
	return null;
}

export async function checkAuth(): Promise<null | AuthUser> {
	const response = await axiosService().get('/verify-token');
	if (!response.data) return null;
	return response.data as AuthUser;
}

export async function register(params: IUserRegister) {
	const response = await axiosService().post('/register', params);
	if (response?.data) {
		return response.data.data as string;
	}
	return false;
}

export async function logout() {
	const response = await axiosService().post('/logout');
	if (response?.data) {
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>Autenticación</span>
			</span>,
			'Se ha cerrado la sesión.',
			'danger',
		);
		return true;
	}
	return false;
}

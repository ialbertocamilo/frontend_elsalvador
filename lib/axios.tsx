import axios, { AxiosError } from 'axios';
import showNotification from '../components/extras/showNotification';
import Icon from '../components/icon/Icon';

const axiosService = () => {
	const axiosInstance = axios.create({
		baseURL: process.env.BACKEND_URL + '/api',
		headers: {
			'Content-Type': 'application/json',
			// origin: process.env.NEXTAUTH_URL,
			Accept: 'application/json',
			withCredentials: true,
		},
		withCredentials: false,
	});
	axiosInstance.interceptors.response.use(
		(value) => value,
		(error: AxiosError) => {
			console.error(error);
			if (error?.response?.status == 401) {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Error de autenticación</span>
					</span>,
					'Credenciales incorrectas',
					'danger',
				);
			}
			if (error?.response?.status == 500) {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Error</span>
					</span>,
					'Error desconocido interno.',
					'danger',
				);
			}

			return error;
		},
	);
	axiosInstance.interceptors.request.use((value) => {
		console.log('interceptor2');
		console.log(value);
		return value;
	});
	return axiosInstance;
};

export default axiosService;

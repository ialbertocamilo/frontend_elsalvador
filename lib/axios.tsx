import axios, { AxiosError } from 'axios';
import showNotification from '../components/extras/showNotification';
import Icon from '../components/icon/Icon';
import { ClientStorage } from '../common/classes/storage';
import { RoutesList } from '../common/constants/default';

const axiosService = () => {
	const user = ClientStorage.getUser();
	const axiosInstance = axios.create({
		baseURL: process.env.BACKEND_URL + '/api',
		headers: {
			'Content-Type': 'application/json',
			// origin: process.env.NEXTAUTH_URL,
			Accept: 'application/json',
			withCredentials: true,
			Authorization: `Bearer ${user?.token}`,
		},
		withCredentials: false,
	});
	axiosInstance.interceptors.response.use(
		(value) => {
			switch (value?.status) {
				case 201:
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Información almacenada</span>
						</span>,
						'Los datos se han guardado exitosamente.',
						'success',
					);
					break;
				default:
					break;
			}
			return value;
		},
		(error: AxiosError) => {
			switch (error?.response?.status) {
				case 400:
					if (error?.response?.data) {
						const dataError = Object.values(
							error?.response?.data,
						) as unknown as string[];
						if (dataError.length > 0) {
							dataError.forEach((value) =>
								showNotification(
									<span className='d-flex align-items-center'>
										<Icon icon='Info' size='lg' className='me-1' />
										<span>Error de validación</span>
									</span>,
									value,
									'danger',
								),
							);
						} else {
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>Error de validación</span>
								</span>,
								JSON.stringify(error.response.data),
								'danger',
							);
						}
					}
					break;
				case 401:
					if (error?.response?.data) {
						const dataError = Object.values(
							error?.response?.data,
						) as unknown as string[];
						if (dataError.length > 0) {
							dataError.forEach((value) =>
								showNotification(
									<span className='d-flex align-items-center'>
										<Icon icon='Info' size='lg' className='me-1' />
										<span>Error de autorización</span>
									</span>,
									value,
									'danger',
								),
							);
						} else {
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>Error de validación</span>
								</span>,
								JSON.stringify(error.response.data),
								'danger',
							);
						}
					}
					location.href = RoutesList.login;
					break;
				case 500:
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Error</span>
						</span>,
						'Error desconocido interno.',
						'danger',
					);

					break;
				case 422:
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Error</span>
						</span>,
						'Ocurrió un error de validación, verificar datos enviados.',
						'danger',
					);
					break;
			}
			return error;
		},
	);
	axiosInstance.interceptors.request.use((value) => {
		return value;
	});
	return axiosInstance;
};

export default axiosService;

import axios from 'axios';

const axiosService = () => {
	const axiosInstance = axios.create({
		baseURL: process.env.BACKEND_URL + '/api',
		headers: {
			'Content-Type': 'application/json',
			// origin: process.env.NEXTAUTH_URL,
			Accept: 'application/json',
		},
		withCredentials: false,
	});
	return axiosInstance;
};

export default axiosService;

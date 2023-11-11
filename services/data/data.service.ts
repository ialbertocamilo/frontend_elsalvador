import axiosService from '../../lib/axios';
import { IConfigurationType } from '../../common/types/configuration.types';

export default class DataService {
	static async getPackagesConfig() {
		const result = await axiosService().post('/data/get-one', { key: 'package-configuration' });
		if (!result?.data?.data?.payload) return false;
		if (result?.data) return JSON.parse(result?.data?.data?.payload);
	}

	static async getAllPackages(): Promise<IConfigurationType[]> {
		const result = await axiosService().post('/data/get-one', {
			key: 'package-configuration',
		});
		if (!result?.data?.data?.payload) return [];
		return JSON.parse(result?.data?.data?.payload)?.config as IConfigurationType[];
	}
}

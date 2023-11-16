import axiosService from '../../lib/axios';
import { IConfigurationType } from '../../common/types/configuration.types';
import { keyList } from '../../common/constants/lists';
import { ITechnicalSupport } from '../../common/types/package.types';

export default class DataService {
	static async getPackagesConfig() {
		const result = await axiosService().post('/data/get-one', {
			key: keyList.packageConfiguration,
		});
		if (!result?.data?.data?.payload) return false;
		if (result?.data) return JSON.parse(result?.data?.data?.payload);
	}

	static async loadPackageByProjectId(projectId: string | string[]) {
		const result = await axiosService().post('/projects/get-data', {
			key: keyList.package,
			project_id: projectId,
		});
		if (!result?.data?.payload) return false;
		if (result?.data) return result?.data?.payload as ITechnicalSupport;
	}
}

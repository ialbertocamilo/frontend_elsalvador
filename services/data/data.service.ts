import axiosService from '../../lib/axios';
import { IConfigurationType } from '../../common/types/configuration.types';
import { keyList } from '../../common/constants/lists';
import { ITechnicalSupport } from '../../common/types/package.types';
import { IQuestion } from '../../common/types/question.types';

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

	static async savePackageConfig(payload: IConfigurationType[]) {
		const result = await axiosService().post('/data', {
			key: keyList.packageConfiguration,
			payload: { config: payload },
		});
		return !!result?.data;
	}

	static async saveQuestionsConfig(payload: IQuestion[]) {
		const result = await axiosService().post('/data', {
			key: keyList.packageConfiguration,
			payload: { questions: payload },
		});
		return !!result?.data;
	}

	static async setProjectStatus(projectId: string, status: number) {
		const result = await axiosService().post('/projects/set-status', {
			project_id: projectId,
			status,
		});
		return !!result?.data;
	}
	static async getProjectStatus(projectId: string): Promise<number> {
		const result = await axiosService().post('/projects/get-status', {
			project_id: projectId,
		});
		return result?.data?.result;
	}
}

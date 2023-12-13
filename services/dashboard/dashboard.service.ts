import axiosService from '../../lib/axios';
import { ChartSeriesObject, ObjClassification } from '../../common/types/dashboard.types';

export class DashboardService {
	static async getDesignCompliancesReport(year: number) {
		const result = await axiosService().post('projects/report', {
			type: 'design-compliances',
			year,
		});
		return result.data as {
			approved: {
				households: number;
				offices: number;
				tertiary: number;
				total: number;
			};
			denied: {
				households: number;
				offices: number;
				tertiary: number;
				total: number;
			};
		};
	}
	static async getDesignCompliancesReportExcel(year: number) {
		const result = await axiosService().post('projects/report-excel', {
			type: 'design-compliances',
			year,
		});
		return result.data;
	}

	static async getBuildingsByUserReport(year: number) {
		const result = await axiosService().post('projects/report', {
			type: 'user-buildings',
			year,
		});
		return result.data as {
			users: {
				id: number;
				name: string;
				lastname: string;
				projects_count: number;
				role_id: number;
				email: string;
			}[];
			total: number;
		};
	}
	static async getBuildingsByUserReportExcel(year: number) {
		const result = await axiosService().post('projects/report-excel', {
			type: 'user-buildings',
			year,
		});
		return result.data;
	}

	static async getBuildingsBySystemReport(year: number) {
		const result = await axiosService().post('projects/report', {
			type: 'system-buildings',
			year,
		});
		return result.data as ObjClassification[];
	}
	static async getBuildingsBySystemReportExcel(year: number) {
		const result = await axiosService().post('projects/report-excel', {
			type: 'system-buildings',
			year,
		});
		return result.data;
	}
	static async getBuildingsByParametersReport(year: number) {
		const result = await axiosService().post('projects/report', {
			type: 'buildings-parameters',
			year,
		});
		return result.data as ChartSeriesObject[];
	}
	static async getBuildingsByParametersReportExcel(year: number) {
		const result = await axiosService().post('projects/report-excel', {
			type: 'buildings-parameters',
			year,
		});
		return result.data;
	}
}

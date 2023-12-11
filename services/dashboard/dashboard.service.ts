import axiosService from '../../lib/axios';

export class DashboardService {
	static async getDesignCompliancesReport() {
		const result = await axiosService().post('projects/report', { type: 'design-compliances' });
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

	static async getBuildingsByUserReport() {
		const result = await axiosService().post('projects/report', { type: 'user-buildings' });
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

	static async getBuildingsBySystemReport(year: number) {
		const result = await axiosService().post('projects/report', {
			type: 'system-buildings',
			year,
		});
		return result.data as ObjClassification[];
	}
}

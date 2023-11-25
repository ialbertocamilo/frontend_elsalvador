import axiosService from '../../lib/axios';
import { IUser } from '../../common/types/user.types';
import { RoleType } from '../../common/types/role.types';

export class UserService {
	static async getAll() {
		const result = await axiosService().get('/users/get-all');

		if (result?.status === 200) return result.data as IUser[];

		return [] as IUser[];
	}

	static async changeActive(userId: string, activeStatus: boolean) {
		const result = await axiosService().post('/users/change-active', {
			user_id: userId,
			active: activeStatus,
		});
		return result?.data as boolean;
	}
	static async changeRole(userId: string, role: RoleType) {
		const result = await axiosService().post('/users/change-role', {
			user_id: userId,
			role_id: role,
		});
		return result?.data as boolean;
	}
}

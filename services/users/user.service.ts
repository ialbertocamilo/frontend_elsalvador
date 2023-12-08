import axiosService from '../../lib/axios';
import { IUser } from '../../common/types/user.types';
import { RoleType } from '../../common/types/role.types';

export class UserService {
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

	static async getOne(userId: string) {
		const result = await axiosService().post('/users/get-one', {
			user_id: userId,
		});
		return result?.data as IUser;
	}
	static async updateUser(user: IUser) {
		const result = await axiosService().post('/users/update-user', user);
		return result?.data as IUser;
	}

	static async search(value: unknown) {
		const result = await axiosService().post('/users/search', { value });
		return result?.data as IUser[];
	}
}

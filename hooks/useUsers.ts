import { useEffect, useState } from 'react';
import { IUser } from '../common/types/user.types';
import { UserService } from '../services/users/user.service';

export const useUsers = () => {
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		getAllUsers();
	}, []);

	function getAllUsers() {
		UserService.getAll().then((data) => setUsers(data));
	}
	return {
		users,
		setUsers,
		getAllUsers,
	};
};

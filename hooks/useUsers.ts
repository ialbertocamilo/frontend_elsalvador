import { useEffect, useState } from 'react';
import { IUser } from '../common/types/user.types';
import { UserService } from '../services/users/user.service';

export const useUsers = () => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		getAllUsers();
	}, []);

	useEffect(() => {
		getAllUsers();
	}, [searchValue]);

	function getAllUsers() {
		UserService.search(searchValue).then((data) => setUsers(data));
	}
	return {
		users,
		setUsers,
		getAllUsers,
		setSearchValue,
		searchValue,
	};
};

import { AuthUser } from './user';
import { StorageTypes } from '../constants/default';
import { UserStorage } from '../types/user.types';
import showNotification from '../../components/extras/showNotification';

export class ClientStorage {
	static saveUser(user: AuthUser) {
		localStorage.setItem(StorageTypes.user, JSON.stringify(user));
	}

	static getUser(): UserStorage | null {
		const data = localStorage.getItem(StorageTypes.user);
		if (data) return JSON.parse(data) as UserStorage;
		return null;
	}
	static deleteAll() {
		localStorage.removeItem(StorageTypes.user);
	}
}

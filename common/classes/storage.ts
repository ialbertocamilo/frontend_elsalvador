import { AuthUser } from './user';
import { StorageTypes } from '../constants/default';
import { IUserStorage } from '../types/user.types';
import showNotification from '../../components/extras/showNotification';

export class ClientStorage {
	static saveUser(user: AuthUser) {
		localStorage.setItem(StorageTypes.user, JSON.stringify(user));
		return user as IUserStorage;
	}

	static getUser(): IUserStorage | null {
		const data = localStorage.getItem(StorageTypes.user);
		if (data) return JSON.parse(data) as IUserStorage;
		return null;
	}
	static deleteAll() {
		localStorage.removeItem(StorageTypes.user);
	}
}

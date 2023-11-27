'use client';
import { AuthUser } from './user';
import { StorageTypes } from '../constants/default';
import { IUserStorage } from '../types/user.types';

import userStore from '../../stores/userStore';

export class ClientStorage {
	private static userStore: IUserStorage;

	constructor() {
		ClientStorage.userStore = userStore.value;
	}

	static saveUser(user: AuthUser) {
		localStorage.setItem(StorageTypes.user, JSON.stringify(user));
		return user as IUserStorage;
	}

	static getUser(): IUserStorage | null {
		if (ClientStorage.userStore?.id) return ClientStorage.userStore;
		const data = localStorage.getItem(StorageTypes.user);
		if (data) return JSON.parse(data) as IUserStorage;
		return null;
	}

	static deleteAll() {
		localStorage.removeItem(StorageTypes.user);
	}
}

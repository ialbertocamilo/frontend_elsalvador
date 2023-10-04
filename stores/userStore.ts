import { IUserStorage } from '../common/types/user.types';
import { makeAutoObservable } from 'mobx';

export class UserStore {
	value: IUserStorage = { name: '', email: '', token: '', id: '' };

	constructor() {
		makeAutoObservable(this);
	}

	setUser(user: IUserStorage) {
		Object.assign(this.value, user);
	}
}

const userStore = new UserStore();
export default userStore;

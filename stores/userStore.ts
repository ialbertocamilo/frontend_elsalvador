import { UserStorage } from '../common/types/user.types';
import { makeAutoObservable } from 'mobx';

export class UserStore {
	value: UserStorage = { name: '', email: '', token: '', id: '' };

	constructor() {
		makeAutoObservable(this);
	}

	setUser(user: UserStorage) {
		Object.assign(this.value, user);
	}
}

const userStore = new UserStore();
export default userStore;

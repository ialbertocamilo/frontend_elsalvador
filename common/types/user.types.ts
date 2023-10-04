export interface IUserStorage {
	id: string;
	name: string;
	email: string;
	token: string;
}
export interface IUserRegister {
	name?: string;
	lastname?: string;
	profession?: string;
	nationality?: string;
	department?: string;
	municipality?: string;
	address?: string;
	phone?: string;
	email?: string;
	password?: string;
}

import { RoleType } from './role.types';

export interface IUserStorage {
	id: string;
	name: string;
	email: string;
	token: string;
	role: number;
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

export interface IUser {
	id: string;
	name: string;
	lastname: string;
	profession: string;
	nationality: string;
	department: string;
	municipality: string;
	role_id: RoleType;
	address: string;
	phone: string;
	email: string;
	email_verified_at?: Date;
	role: { id: RoleType; name: string; code: string };
	active: boolean;
	created_at?: Date;
	updated_at?: Date;
}

export class AuthUser {
	name: string | undefined;
	email: string | undefined;
	token?: string;
	createdAt?: string;

	constructor(params: any) {
		Object.assign(this, params);
	}
}

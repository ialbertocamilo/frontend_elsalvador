export class AuthUser {
	name: string | undefined;
	email: string | undefined;
	createdAt?: string;

	constructor(params: any) {
		Object.assign(this, params);
	}
}

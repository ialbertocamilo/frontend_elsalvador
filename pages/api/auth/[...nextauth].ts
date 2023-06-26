import NextAuth, { RequestInternal, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axiosService from '../../../lib/axios';

export default NextAuth({
	providers: [
		CredentialsProvider({
			async authorize(
				credentials: Record<any, any> | undefined,
				req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>,
			): Promise<User | null> {
				console.log('authorizing');
				try {
					const resp = await axiosService().post('/login', {
						username: credentials?.username,
						password: credentials?.password,
					});
					if (resp.data) {
						console.log(resp.data);
						return Promise.resolve(resp.data);
					}
				} catch (e) {
					console.log(e);
					return Promise.reject(null);
				}
				return Promise.reject(null);
			},
			name: 'credentials',
			credentials: {
				username: {
					label: 'Nombre de usuario o email',
					type: 'text',
					placeholder: 'jsmith',
				},
				password: {
					label: 'Contraseña',
					type: 'password',
					placeholder: '********',
				},
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return Promise.resolve(token);
		},
		async session({ session, user }) {
			session.user = user;
			return Promise.resolve(session);
		},
		signIn({ user, email, credentials, profile }) {
			const isTrue = true;
			if (isTrue) return true;

			return false;
		},
	},
});

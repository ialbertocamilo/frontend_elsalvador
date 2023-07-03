import NextAuth, { RequestInternal, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axiosService from '../../../lib/axios';
import { useContext } from 'react';
import AuthContext from '../../../context/authContext';

export default NextAuth({
	providers: [
		CredentialsProvider({
			async authorize(
				credentials: Record<any, any> | undefined,
				req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>,
			) {
				console.log('authorizing');
				const resp = await axiosService().post('/login', {
					username: credentials?.username,
					password: credentials?.password,
				});
				console.log(resp?.data);
				if (!resp?.data) {
					throw new Error('Error en el servidor al tratar de logearse');
				}
				console.log(resp.data);
				return resp.data;
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
		async session({ session, user, token }) {
			if (session.user) Object.assign(session.user, token);
			console.log(token);
			return session;
		},
		signIn({ user, email, credentials, profile }) {
			const isTrue = true;
			if (isTrue) return true;

			return false;
		},
	},
});

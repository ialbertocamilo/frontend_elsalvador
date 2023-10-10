'use client';
import React, { useEffect } from 'react';
import './styles/styles.scss';
import { ClientStorage } from '../common/classes/storage';
import userStore from '../stores/userStore';
import { usePathname, useRouter } from 'next/navigation';
import { checkAuth } from '../services/auth/authentication';
import 'react-notifications-component/dist/theme.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const navi = usePathname();
	useEffect(() => {
		const user = ClientStorage.getUser();
		if (user) userStore.setUser(user);

		if (navi !== '/auth/login')
			checkAuth().then((data) => {
				if (!data) router.replace('/auth/login');
			});
	}, []);
	return (
		<html>
			<head>
				<link
					rel='stylesheet'
					href='https://unpkg.com/maplibre-gl@3.3.1/dist/maplibre-gl.css'
				/>
				<title>El Salvador APP</title>
			</head>
			<body>{children}</body>
		</html>
	);
};
export default RootLayout;

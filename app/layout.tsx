'use client';
import React, { useEffect } from "react";

import "./styles/styles.scss";
import { ClientStorage } from "../common/classes/storage";
import { ReactNotifications } from "react-notifications-component";
// eslint-disable-next-line react/function-component-definition
export default function RootLayout({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const user = ClientStorage.getUser();
		console.log(user);
	}, []);
	return (
		<html>
			<body>
				{children}
				<ReactNotifications />
			</body>
		</html>
	);
}

"use client"
import React from 'react';
import { useRouter,usePathname } from 'next/navigation';
import headers from '../../routes/headerRoutes';
import { pathToRoute } from '../../helpers/helpers';
import Mounted from '../../components/Mounted';

const HeaderRoutes = () => {
	const router = useRouter();
	const pathname = usePathname() as string;

	const PAGE = headers.find((key) => {
		return key.path.substring(key.path?.length - 2) === '/*'
			? pathname?.includes(key.path.substring(0, key.path?.length - 2))
			: key.path === pathToRoute(pathname);
	});

	if (PAGE) return <Mounted>{PAGE?.element}</Mounted>;
	return null;
};

export default HeaderRoutes;

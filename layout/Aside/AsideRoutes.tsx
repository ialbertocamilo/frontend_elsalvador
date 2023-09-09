import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import asides from '../../routes/asideRoutes';
import { pathToRoute } from '../../helpers/helpers';
import Mounted from '../../components/Mounted';

const AsideRoutes = () => {
	const router = useRouter();

	const pathName = usePathname() as string;
	const PAGE = asides.find((key) => {
		return key.path.substring(key.path?.length - 2) === '/*'
			? pathName?.includes(key.path.substring(0, key.path?.length - 2))
			: key.path === pathToRoute(pathName);
	});

	if (PAGE) return <Mounted>{PAGE?.element}</Mounted>;
	return null;
};

export default AsideRoutes;

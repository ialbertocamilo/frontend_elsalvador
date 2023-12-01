import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Brand from '../Brand/Brand';
import Navigation, { NavigationLine } from '../Navigation/Navigation';
import User from '../User/User';
import ThemeContext from '../../context/themeContext';
import useDarkMode from '../../hooks/useDarkMode';
import { GetStaticProps } from 'next';
import Aside, { AsideBody, AsideFoot, AsideHead } from './Aside';
import { ClientStorage } from '../../common/classes/storage';
import { menuByRole } from '../../helpers/helpers';
import { pagesMenu } from '../../common/constants/menu';

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	const [doc, setDoc] = useState(
		(typeof window !== 'undefined' &&
			localStorage.getItem('facit_asideDocStatus') === 'true') ||
			false,
	);

	const { t } = useTranslation(['common', 'menu']);

	const { darkModeStatus } = useDarkMode();

	const user = ClientStorage.getUser();
	const [menu, setMenu] = useState(pagesMenu);
	useEffect(() => {
		if (user) setMenu(menuByRole(user));
	}, []);
	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				<NavigationLine />
				{!doc && (
					<>
						<Navigation menu={menu} id='aside-demo-pages' />
						<NavigationLine />
					</>
				)}

				{asideStatus && doc}
			</AsideBody>
			<AsideFoot>
				<div className='row '>
					<div className='col align-items-center text-center'>
						<User />
					</div>
				</div>
			</AsideFoot>
		</Aside>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default DefaultAside;

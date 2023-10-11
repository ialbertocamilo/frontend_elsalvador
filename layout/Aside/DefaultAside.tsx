import React, { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Brand from '../Brand/Brand';
import Navigation, { NavigationLine } from '../Navigation/Navigation';
import User from '../User/User';
import { pagesMenu } from '../../common/constants/menu';
import ThemeContext from '../../context/themeContext';
import useDarkMode from '../../hooks/useDarkMode';
import { GetStaticProps } from 'next';
import Aside, { AsideBody, AsideFoot, AsideHead } from './Aside';
import Button from '../../components/bootstrap/Button';
import { types } from 'sass';
import Image from 'next/image';

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	const [doc, setDoc] = useState(
		(typeof window !== 'undefined' &&
			localStorage.getItem('facit_asideDocStatus') === 'true') ||
			false,
	);

	const { t } = useTranslation(['common', 'menu']);

	const { darkModeStatus } = useDarkMode();

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				<NavigationLine />
				{!doc && (
					<>
						<Navigation menu={pagesMenu} id='aside-demo-pages' />
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

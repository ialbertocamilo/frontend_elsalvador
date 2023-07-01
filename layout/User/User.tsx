import React, { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { pagesMenu } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';
import Collapse from '../../components/bootstrap/Collapse';
import { NavigationLine } from '../Navigation/Navigation';
import Icon from '../../components/icon/Icon';
import useNavigationItemHandle from '../../hooks/useNavigationItemHandle';
import AuthContext from '../../context/authContext';

import { useRouter } from 'next/router';
import Popovers from '../../components/bootstrap/Popovers';

const User = () => {
	const { userData, setUser } = useContext(AuthContext);

	const router = useRouter();

	const handleItem = useNavigationItemHandle();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	const [collapseStatus, setCollapseStatus] = useState<boolean>(false);

	const { t } = useTranslation(['translation', 'menu']);

	console.log(userData);
	return (
		<>
			<div
				className={classNames('user', { open: collapseStatus }, 'bg-primary')}
				role='presentation'
				onClick={() => setCollapseStatus(!collapseStatus)}>
				<div className='user-avatar'>
					{!!userData?.src && (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={userData?.src} alt='Avatar' width={128} height={128} />
					)}
				</div>
				<div className='user-info '>
					<div className='user-name text-dark'>
						<Popovers title='User.tsx' desc={<code>layout/User/User.tsx</code>}>
							{`${userData?.username} ${userData?.surname}`}
						</Popovers>
					</div>
				</div>
			</div>

			<Collapse isOpen={collapseStatus} className='user-menu'>
				<nav aria-label='aside-bottom-user-menu'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() =>
								router.push(
									`/`,
									// @ts-ignore
									handleItem(),
								)
							}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon icon='AccountBox' className='navigation-icon' />
									<span className='navigation-text'>{t('menu:Profile')}</span>
								</span>
							</span>
						</div>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								setDarkModeStatus(!darkModeStatus);
								handleItem();
							}}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon
										icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
										color={darkModeStatus ? 'info' : 'warning'}
										className='navigation-icon'
									/>
									<span className='navigation-text'>
										{darkModeStatus ? t('menu:DarkMode') : t('menu:LightMode')}
									</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
				<NavigationLine />
				<nav aria-label='aside-bottom-user-menu-2'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								if (setUser) {
									setUser('');
								}
								router.push(`/${demoPagesMenu.login.path}`);
							}}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon icon='Logout' className='navigation-icon' />
									<span className='navigation-text'>{t('menu:Logout')}</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
			</Collapse>
		</>
	);
};

export default User;

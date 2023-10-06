import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import useDarkMode from '../../hooks/useDarkMode';
import Collapse from '../../components/bootstrap/Collapse';
import { NavigationLine } from '../Navigation/Navigation';
import Icon from '../../components/icon/Icon';
import useNavigationItemHandle from '../../hooks/useNavigationItemHandle';

import { useRouter } from 'next/navigation';
import { logout } from '../../services/auth/authentication';
import { ClientStorage } from '../../common/classes/storage';
import { RoutesList } from '../../common/constants/default';
import InstagramIcon from '../../components/icon/svg-icons/InstagramIcon';
import TwitterIcon from '../../components/icon/svg-icons/TwitterIcon';
import Button from '../../components/bootstrap/Button';
import SvgFacebook from '../../components/icon/material-icons/Facebook';
import ThemeContext from '../../context/themeContext';
import useAsideTouch from '../../hooks/useAsideTouch';
import SvgCircle from '../../components/icon/material-icons/Circle';

const User = () => {
	const router = useRouter();

	const { asideStyle, touchStatus, hasTouchButton, asideWidthWithSpace, x } = useAsideTouch();
	const handleItem = useNavigationItemHandle();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	const [user, setUser] = useState<any>({ name: '', email: '', id: '' });

	const [collapseStatus, setCollapseStatus] = useState<boolean>(true);

	const { t } = useTranslation(['translation', 'menu']);

	const doLogout = useCallback(() => {
		logout().then((r) => {
			if (r) {
				setTimeout(() => {
					ClientStorage.deleteAll();
					setUser('');
					router.replace(RoutesList.login);
				}, 800);
			}
		});
	}, []);
	const { asideStatus } = useContext(ThemeContext);

	return (
		<>
			<Collapse isOpen={collapseStatus} className='user-menu'>
				<nav aria-label='aside-bottom-user-menu'>
					<div className='navigation '>
						<div className='social-icon'>
							<Button>
								<SvgFacebook className='cursor-pointer social-icon' height={25} />
							</Button>
							<Button>
								<InstagramIcon className='cursor-pointer social-icon' height={25} />
							</Button>
							<Button>
								<TwitterIcon className=' cursor-pointer social-icon' height={25} />
							</Button>
							<Button>
								<SvgCircle className=' cursor-pointer social-icon' height={25} />
							</Button>
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
										{darkModeStatus ? 'DarkMode' : 'LightMode'}
									</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
				<NavigationLine />
				<nav aria-label='aside-bottom-user-menu-2'>
					<div className='navigation'>
						<div role='presentation' className='navigation-item cursor-pointer'>
							<span
								className='navigation-link navigation-link-pill'
								onClick={doLogout}>
								<span className='navigation-link-info'>
									<Icon icon='Logout' className='navigation-icon' />
									<span className='navigation-text'>Cerrar sesión</span>
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

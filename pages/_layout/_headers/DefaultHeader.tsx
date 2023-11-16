import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../layout/Header/Header';
import Navigation from '../../../layout/Navigation/Navigation';
import { pageLayoutTypesPagesMenu } from '../../../common/constants/menu';
import useDeviceScreen from '../../../hooks/useDeviceScreen';
import { observer } from 'mobx-react-lite';
import userStore from '../../../stores/userStore';
import useDarkMode from '../../../hooks/useDarkMode';

const DefaultHeader = observer(() => {
	const deviceScreen = useDeviceScreen();

	const { themeStatus } = useDarkMode();
	return (
		<Header>
			<HeaderLeft>Proyecto El Salvador</HeaderLeft>
			<HeaderRight>
				<span className={themeStatus == 'dark' ? 'text-white-50' : 'text-black-50'}>
					Usuario:
				</span>{' '}
				<b> {userStore.value.name}</b>
			</HeaderRight>
		</Header>
	);
});

export default DefaultHeader;

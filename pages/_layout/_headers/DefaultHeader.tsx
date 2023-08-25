import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../layout/Header/Header';
import Navigation from '../../../layout/Navigation/Navigation';
import { pageLayoutTypesPagesMenu } from '../../../common/constants/menu';
import useDeviceScreen from '../../../hooks/useDeviceScreen';
import { observer } from 'mobx-react-lite';
import userStore from '../../../stores/userStore';

const DefaultHeader = observer(() => {
	const deviceScreen = useDeviceScreen();

	return (
		<Header>
			<HeaderLeft>
			</HeaderLeft>
			<HeaderRight>
				<span className={'text-black-50 '}>Usuario:</span> <b> {userStore.value.name}</b>
			</HeaderRight>
		</Header>
	);
});

export default DefaultHeader;

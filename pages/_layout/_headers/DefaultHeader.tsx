import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../layout/Header/Header';
import useDeviceScreen from '../../../hooks/useDeviceScreen';
import { observer } from 'mobx-react-lite';
import userStore from '../../../stores/userStore';
import useDarkMode from '../../../hooks/useDarkMode';
import Icon from '../../../components/icon/Icon';
import { RoleType } from '../../../common/types/role.types';
import { selectRoleName } from '../../../helpers/helpers';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Button from '../../../components/bootstrap/Button';
import { useRouter } from 'next/navigation';
import { RoutesListWithParams } from '../../../common/constants/default';

const RoleIcon = () => {
	if (userStore.value.role === RoleType.agent) {
		return <Icon icon='Person' className='text-success'></Icon>;
	}

	return <Icon icon='VerifiedUser' className='text-success'></Icon>;
};
const DefaultHeader = observer(() => {
	const deviceScreen = useDeviceScreen();

	const router = useRouter();
	const { themeStatus } = useDarkMode();
	return (
		<Header>
			<HeaderLeft>
				<b>Plataforma electrónica para la certificación de Construcción Sostenible</b>
			</HeaderLeft>
			<HeaderRight>
				<span className={themeStatus == 'dark' ? 'text-white-50' : 'text-black-50'}></span>

				<Dropdown isButtonGroup>
					<DropdownToggle hasIcon={false}>
						<div className='row d-flex cursor-pointer'>
							<div className='col-2 h-100'>
								<Icon
									icon='PersonPin'
									size='lg'
									style={{ fontSize: 35 }}
									className='h-100'></Icon>
							</div>
							<div className='col-auto'>
								<ul style={{ listStyleType: 'none' }}>
									<li>
										<b>
											{userStore.value?.name} {userStore.value?.lastname}
										</b>
									</li>
									<li>
										<RoleIcon /> {selectRoleName(userStore.value?.role)}
									</li>
								</ul>
							</div>
						</div>
					</DropdownToggle>

					<DropdownMenu isAlignmentEnd>
						<DropdownItem>
							<Button
								size='sm'
								isLight
								onClick={() =>
									router.push(RoutesListWithParams.access(userStore.value.id))
								}>
								{'Perfil'}
							</Button>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</HeaderRight>
		</Header>
	);
});

export default DefaultHeader;

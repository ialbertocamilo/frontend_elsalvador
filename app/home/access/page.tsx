'use client';

import React, { useEffect, useState } from 'react';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import { useRouter } from 'next/navigation';
import { RoutesListWithParams } from '../../../common/constants/default';
import { selectDepartmenFromJson, selectMunicipalityFromJson } from '../../../helpers/helpers';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import Icon from '../../../components/icon/Icon';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import { useUsers } from '../../../hooks/useUsers';
import { IUser } from '../../../common/types/user.types';
import { UserService } from '../../../services/users/user.service';
import Select from '../../../components/bootstrap/forms/Select';
import { RoleType } from '../../../common/types/role.types';
import moment, { Moment } from 'moment';
import Popover from '@reactour/popover';
import Popovers from '../../../components/bootstrap/Popovers';

const AccessTable = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['50']);

	const [value, setValue] = useState('');
	const { users, setUsers, getAllUsers, setSearchValue, searchValue } = useUsers();
	const router = useRouter();
	useEffect(() => {}, [perPage]);

	const myMoment = moment();
	async function changeActive(userId: string, value: boolean) {
		await UserService.changeActive(userId, value);
		getAllUsers();
	}

	const initRoles = [
		{ value: RoleType.agent.toString(), text: 'Operador' },
		{ value: RoleType.supervisor.toString(), text: 'Administrador' },
	];

	async function changeRole(userId: string, roleId: RoleType) {
		await UserService.changeRole(userId, roleId);
		getAllUsers();
	}

	const [roles, setRoles] = useState<{ value: string; text: string }[]>(initRoles);
	const SelectRole = ({ roleId, userId }: { roleId: number; userId: string }) => {
		return (
			<Select
				list={roles}
				ariaLabel='select-role'
				value={roleId.toString()}
				onChange={(e: any) => changeRole(userId, e.target.value)}></Select>
		);
	};
	const ActivateButton = ({ userId, value }: { userId: string; value: boolean }) => {
		if (value)
			return (
				<Button
					isLight
					className='bg-danger text-white'
					size='sm'
					onClick={() => changeActive(userId, false)}>
					Desactivar
				</Button>
			);
		return (
			<Button
				isLight
				className='bg-primary text-white'
				size='sm'
				onClick={() => changeActive(userId, true)}>
				Activar
			</Button>
		);
	};

	function detectKey(e: any) {
		if (e.key == 'Enter') setSearchValue(value);
	}

	const IsRecentlyActive = ({ date }: { date: string }) => {
		if (date) {
			const userDate = moment(date);
			const diff = myMoment?.diff(userDate, 'minutes');
			if (diff >= 0 && diff < 6)
				return (
					<Popovers
						desc={'Conectado recientemente ' + userDate.startOf('minutes').fromNow()}
						trigger='hover'>
						<Icon icon={'Circle'} color={'success'}></Icon>
					</Popovers>
				);
		}
		return (
			<Popovers desc={'Desconectado'} trigger='hover'>
				<Icon icon={'Circle'} color={'danger'}></Icon>
			</Popovers>
		);
	};
	function refreshSearch() {
		setValue('');
		getAllUsers();
	}

	return (
		<>
			<div className='col-12'>
				<div className='display-4 fw-bold py-3 text-primary-emphasis'>
					Lista de usuarios
				</div>
			</div>
			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Buscar usuarios...(Presionar <Enter>)'
						value={value}
						onChange={(e: any) => setValue(e.target.value)}
						onKeyDown={detectKey}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<SubheaderSeparator />
					<Button icon='Refresh' onClick={refreshSearch}></Button>
				</SubHeaderRight>
			</SubHeader>
			<div className='row h-100'>
				<div className='col-12 mx-0 px-0'>
					<Card stretch isCompact>
						<CardBody isScrollable className='table-responsive'>
							<table className='table table-modern table-hover scrollable-table'>
								<thead>
									<tr>
										<th className='text-primary'>Actividad</th>
										<th className='text-primary'>Correo electrónico</th>
										<th className='text-primary'>Nombres y apellidos</th>
										<th className='text-primary'>Profesión</th>
										<th className='text-primary'>Nacionalidad</th>
										<th className='text-primary'>Departamento</th>
										<th className='text-primary'>Municipalidad</th>
										<th className='text-primary'>Rol</th>
										<th className='text-primary'>Acciones</th>
									</tr>
								</thead>
								<tbody>
									{dataPagination(users, currentPage, perPage)?.map(
										(i: IUser) => (
											<tr key={i.id} style={{ cursor: 'pointer' }}>
												<td
													onClick={() =>
														router.push(
															RoutesListWithParams.access(i.id),
														)
													}
													className='fw-semibold'>
													<IsRecentlyActive
														date={
															i?.tokens && i?.tokens?.length > 0
																? i?.tokens[0].updated_at
																: ''
														}></IsRecentlyActive>
												</td>
												<td
													onClick={() =>
														router.push(
															RoutesListWithParams.access(i.id),
														)
													}
													className='fw-semibold'>
													{i.email}
												</td>
												<td
													onClick={() =>
														router.push(
															RoutesListWithParams.access(i.id),
														)
													}
													className='fw-semibold'>
													{i.name} {i.lastname}
												</td>
												<td
													onClick={() =>
														router.push(
															RoutesListWithParams.access(i.id),
														)
													}>
													<div>{i.profession || '-'}</div>
												</td>
												<td
													onClick={() =>
														router.push(
															RoutesListWithParams.access(i.id),
														)
													}>
													<div>{i.nationality || '-'}</div>
												</td>
												<td
													onClick={() =>
														router.push(
															RoutesListWithParams.access(i.id),
														)
													}>
													<div>
														{selectDepartmenFromJson(
															Number(i.department),
														)}
													</div>
												</td>
												<td
													onClick={() =>
														router.push(
															RoutesListWithParams.access(i.id),
														)
													}>
													<div>
														{selectMunicipalityFromJson(
															Number(i.municipality),
															Number(i.department),
														)}
													</div>
												</td>
												<td>
													<div>
														<SelectRole
															roleId={i.role?.id}
															userId={i.id}
														/>
													</div>
												</td>
												<td>
													<div>
														<ActivateButton
															userId={i.id}
															value={i.active}
														/>
													</div>
												</td>
											</tr>
										),
									)}
								</tbody>
							</table>
						</CardBody>
						<PaginationButtons
							data={users}
							label='Usuarios'
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
							perPage={perPage}
							setPerPage={setPerPage}
						/>
					</Card>
				</div>
			</div>
		</>
	);
};
const AccessPage = () => {
	return (
		<PageWrapper>
			<Page>
				<AccessTable />
			</Page>
		</PageWrapper>
	);
};

export default AccessPage;

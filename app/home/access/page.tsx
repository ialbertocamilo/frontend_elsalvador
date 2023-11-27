'use client';

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import { useRouter } from 'next/navigation';
import { useProjects } from '../../../services/project/project.service';
import { RoutesList, RoutesListWithParams } from '../../../common/constants/default';
import { getItemFromDepartmentList, getItemFromMunicipalityList } from '../../../helpers/helpers';
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

const AccessTable = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['50']);

	const { users, setUsers, getAllUsers } = useUsers();
	const router = useRouter();
	useEffect(() => {}, [perPage]);

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

	return (
		<>
			<div className='row h-100'>
				<div className='col-12 mx-0 px-0'>
					<Card stretch isCompact>
						<CardBody isScrollable className='table-responsive'>
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th className='text-primary'>Correo electrónico</th>
										<th className='text-primary'>Nombres y apellidos</th>
										<th className='text-primary'>Profesión</th>
										<th className='text-primary'>Nacio`nalidad</th>
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
														{getItemFromDepartmentList(
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
														{getItemFromMunicipalityList(
															Number(i.municipality),
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

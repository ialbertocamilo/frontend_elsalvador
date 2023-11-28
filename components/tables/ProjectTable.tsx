import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../layout/SubHeader/SubHeader';
import PAYMENTS from '../../common/data/enumPaymentMethod';
import Card, { CardBody } from '../bootstrap/Card';
import PaginationButtons, { dataPagination, PER_COUNT } from '../PaginationButtons';
import Button from '../bootstrap/Button';
import Icon from '../icon/Icon';
import Input from '../bootstrap/forms/Input';
import { ProjectEntity } from '../../common/classes/project';
import { useRouter } from 'next/navigation';
import { useProjects } from '../../services/project/project.service';
import { getItemFromMunicipalityList } from '../../helpers/helpers';
import { ProjectStatus } from '../../common/constants/lists';
import { ClientStorage } from '../../common/classes/storage';
import DataService from '../../services/data/data.service';
import { RoutesList } from '../../common/constants/default';
import { Roles } from '../../common/types/role.types';
import Popovers from '../bootstrap/Popovers';

const ProjectTable = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['50']);

	const project = useProjects();
	const formik = useFormik({
		initialValues: {
			searchInput: '',
			payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
		},
		onSubmit: (values) => {},
	});

	const projectService = useProjects();
	const router = useRouter();
	const goToProject = (id: number) => {
		router.push(`/home/projects/${id}`);
	};

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);

	const [projects, setProjects] = useState<ProjectEntity[]>([]);

	function findProjects() {
		project.searchProject(formik.values.searchInput).then((data) => {
			setProjects(data);
		});
	}

	const user = ClientStorage.getUser();

	function detectKey(e: any) {
		if (e.key == 'Enter') findProjects();
	}

	const goTo = (route: string) => {
		router.push(route);
	};
	useEffect(() => {
		projectService.searchProject(formik.values.searchInput).then((result) => {
			setProjects(result);
		});
	}, []);

	useEffect(() => {}, [perPage]);

	const Status = ({ status }: { status?: number }) => {
		if (status == ProjectStatus.inRevision)
			return <span className='text-info'>En revisión</span>;
		if (status == ProjectStatus.accepted)
			return <span className='text-success'>✅ Aceptado</span>;
		if (status == ProjectStatus.denied)
			return <span className='text-danger'>❌ Rechazado </span>;
		return <span className='text-muted'>En progreso</span>;
	};

	async function projectEnable(projectId: string, status: number) {
		await DataService.setProjectStatus(projectId, status);
		findProjects();
	}

	const ActionSupervisor = ({ project }: { project: ProjectEntity }) => {
		if (project.status == ProjectStatus.accepted || project.status == ProjectStatus.denied)
			return (
				<div
					className='text-center'
					onClick={() => {
						if (project.id) goToProject(project.id);
					}}>
					-
				</div>
			);

		if (user?.role == Roles?.supervisor)
			return (
				<div className='row'>
					<Button
						size='sm'
						className='text-success '
						onClick={() => projectEnable(String(project?.id), ProjectStatus.accepted)}>
						Aprobar
					</Button>
					<Button
						size='sm'
						className='text-danger'
						onClick={() => projectEnable(String(project.id), ProjectStatus.denied)}>
						Rechazar
					</Button>
				</div>
			);
		return (
			<div className='row align-self-center'>
				<span
					className='text-center'
					onClick={() => {
						if (project.id) goToProject(project.id);
					}}>
					-
				</span>
			</div>
		);
	};
	return (
		<>
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
						placeholder='Buscar proyectos...(Presionar <Enter>)'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
						onKeyDown={detectKey}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<SubheaderSeparator />
					{user?.role == Roles.agent && (
						<Button
							icon='Add'
							color='primary'
							isLight
							onClick={() => goTo(RoutesList.newProject)}>
							Nuevo proyecto
						</Button>
					)}
				</SubHeaderRight>
			</SubHeader>
			<div className='row h-100'>
				<div className='col-12 mx-0 px-0'>
					<Card stretch isCompact>
						<CardBody isScrollable className='table-responsive'>
							<table className='table table-modern table-hover scrollable-table'>
								<thead>
									<tr>
										<th className='text-primary'>Id</th>
										<th className='text-primary'>Estado de proyecto</th>
										<th className='text-primary'>Nombre del proyecto</th>
										<th className='text-primary'>Nombre del propietario</th>
										<th className='text-primary'>Nombre del Diseñador</th>
										<th className='text-primary'>
											Director responsable de obra
										</th>
										<th className='text-primary'>Dirección</th>
										<th className='text-primary'>Municipio</th>
										<th className='text-primary text-center'>Acciones</th>
									</tr>
								</thead>
								<tbody>
									{dataPagination(projects, currentPage, perPage)?.map(
										(i: ProjectEntity) => (
											<Popovers
												desc={'Entrar al proyecto ' + i.project_name}
												trigger='hover'
												key={i.id}>
												<tr key={i.id} style={{ cursor: 'pointer' }}>
													<td>{i.id}</td>
													<td>
														<Status status={i.status} />
													</td>
													<td
														className='bold h5'
														onClick={() => {
															if (i.id) goToProject(i.id);
														}}>
														{i.project_name}
													</td>
													<td
														onClick={() => {
															if (i.id) goToProject(i.id);
														}}>
														<div>{i.owner_name}</div>
														<small className='text-muted'>
															Propietario
														</small>
													</td>
													<td
														onClick={() => {
															if (i.id) goToProject(i.id);
														}}>
														<div>{i.designer_name}</div>
														<div>
															<small className='text-muted'>
																Diseñador
															</small>
														</div>
													</td>
													<td
														onClick={() => {
															if (i.id) goToProject(i.id);
														}}>
														<div>{i.project_director}</div>
														<div>
															<small className='text-muted'>
																Director
															</small>
														</div>
													</td>
													<td
														onClick={() => {
															if (i.id) goToProject(i.id);
														}}>
														<div>{i.address}</div>
													</td>
													<td
														onClick={() => {
															if (i.id) goToProject(i.id);
														}}>
														<div>
															{getItemFromMunicipalityList(
																Number(i.municipality) - 1,
															)}
														</div>
													</td>
													<td>
														<ActionSupervisor project={i} />
													</td>
												</tr>
											</Popovers>
										),
									)}
								</tbody>
							</table>
						</CardBody>
						<PaginationButtons
							data={projects}
							label='proyectos'
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

export default ProjectTable;

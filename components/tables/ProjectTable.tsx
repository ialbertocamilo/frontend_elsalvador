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
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import data from '../../common/data/dummyCustomerData';
import { IProjectListResponse } from '../../common/types/project.types';
import { ProjectEntity } from '../../common/classes/project';
import { useRouter } from 'next/navigation';
import { useProjects } from '../../services/project/project.service';
import { RoutesList } from '../../common/constants/default';

const ProjectTable = () => {
	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

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
		router.replace(`/home/projects/${id}`);
	};
	const filteredData = data?.filter(
		(f) =>
			// Name
			f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase()) &&
			// Price
			(formik.values.minPrice === '' || f.balance > Number(formik.values.minPrice)) &&
			(formik.values.maxPrice === '' || f.balance < Number(formik.values.maxPrice)) &&
			// Payment Type
			formik.values.payment.includes(f.payout),
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);

	const [projects, setProjects] = useState<IProjectListResponse>({
		current_page: '',
		data: [],
		first_page_url: '',
		from: 0,
		last_page: 0,
		last_page_url: '',
		links: [],
		next_page_url: '',
		path: '',
		per_page: 0,
		prev_page_url: '',
		to: 0,
		total: 0,
	});

	function findProjects() {
		project.searchProject(formik.values.searchInput).then((data) => {
			setProjects(data);
		});
	}

	function detectKey(e: any) {
		if (e.key == 'Enter') findProjects();
	}

	const goTo = (route: string) => {
		router.push(route);
	};
	useEffect(() => {
		projectService.getProjects('').then((result) => setProjects(result));
	}, []);

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
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => goTo(RoutesList.newProject)}>
						Nuevo proyecto
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<div className='row h-100'>
				<div className='col-12 mx-0 px-0'>
					<Card stretch isCompact>
						<CardBody isScrollable className='table-responsive'>
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th
											onClick={() => requestSort('id')}
											className='cursor-pointer text-decoration-underline'>
											Id
											<Icon size='lg' icon='FilterList' />
										</th>
										<th
											onClick={() => requestSort('project')}
											className='cursor-pointer text-decoration-underline'>
											Nombre del proyecto
										</th>
										<th
											onClick={() => requestSort('owner')}
											className='cursor-pointer text-decoration-underline'>
											Nombre del propietario{' '}
										</th>
										<th
											onClick={() => requestSort('designer')}
											className='cursor-pointer text-decoration-underline'>
											Nombre del Diseñador{' '}
										</th>
										<th
											onClick={() => requestSort('project_director')}
											className='cursor-pointer text-decoration-underline'>
											Director responsable de obra{' '}
										</th>
										<th
											onClick={() => requestSort('address')}
											className='cursor-pointer text-decoration-underline'>
											Dirección{' '}
										</th>
										<th
											onClick={() => requestSort('municipality')}
											className='cursor-pointer text-decoration-underline'>
											Municipio{' '}
										</th>
										<th
											onClick={() => requestSort('actions')}
											className='cursor-pointer text-decoration-underline'>
											Acciones
										</th>
										<td />
									</tr>
								</thead>
								<tbody>
									{dataPagination(projects?.data, currentPage, perPage)?.map(
										(i: ProjectEntity) => (
											<tr key={i.id}>
												<td>{i.id}</td>
												<td className='bold h5'>{i.project_name}</td>
												<td>
													<div>{i.owner_name}</div>
													<small className='text-muted'>
														Propietario
													</small>
												</td>
												<td>
													<div>{i.designer_name}</div>
													<div>
														<small className='text-muted'>
															Diseñador
														</small>
													</div>
												</td>
												<td>
													<div>{i.project_director}</div>
												</td>
												<td>
													<div>{i.address}</div>
												</td>
												<td>
													<div>{i.municipality}</div>
												</td>
												<td>
													<Button
														onClick={() => {
															if (i.id) goToProject(i.id);
														}}>
														Ir <Icon icon='ArrowRight'></Icon>
													</Button>
												</td>
											</tr>
										),
									)}
								</tbody>
							</table>
						</CardBody>
						<PaginationButtons
							data={filteredData}
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

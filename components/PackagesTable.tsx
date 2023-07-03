import React, { useState } from 'react';
import { useFormik } from 'formik';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../layout/SubHeader/SubHeader';
import PAYMENTS from '../common/data/enumPaymentMethod';
import Card, { CardBody } from '../components/bootstrap/Card';
import { getFirstLetter, priceFormat } from '../helpers/helpers';
import PaginationButtons, { dataPagination, PER_COUNT } from '../components/PaginationButtons';
import Button from '../components/bootstrap/Button';
import Icon from '../components/icon/Icon';
import Input from '../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../components/bootstrap/Dropdown';
import FormGroup from '../components/bootstrap/forms/FormGroup';
import Checks, { ChecksGroup } from '../components/bootstrap/forms/Checks';
import useSortableData from '../hooks/useSortableData';
import InputGroup, { InputGroupText } from '../components/bootstrap/forms/InputGroup';
import Popovers from '../components/bootstrap/Popovers';
import { getColorNameWithIndex } from '../common/data/enumColors';
import useDarkMode from '../hooks/useDarkMode';
import { demoPagesMenu } from '../pages/menu';
import data from '../common/data/dummyCustomerData';

const PackagesTable = () => {
	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
		},
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

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

	return (
		<>
			<div className='row h-100'>
				<div className='col-12'>
					<Card stretch>
						<CardBody isScrollable className='table-responsive'>
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th
											onClick={() => requestSort('name')}
											className='cursor-pointer text-decoration-underline'>
											Id{' '}
											<Icon
												size='lg'
												className={getClassNamesFor('name')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('balance')}
											className='cursor-pointer text-decoration-underline'>
											Tipo de fachada
											<Icon
												size='lg'
												className={getClassNamesFor('balance')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('payout')}
											className='cursor-pointer text-decoration-underline'>
											Superficie opaca{' '}
											<Icon
												size='lg'
												className={getClassNamesFor('payout')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('payout')}
											className='cursor-pointer text-decoration-underline'>
											Superficie vidriada{' '}
											<Icon
												size='lg'
												className={getClassNamesFor('payout')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('payout')}
											className='cursor-pointer text-decoration-underline'>
											Proporcion opaca vidriada{' '}
											<Icon
												size='lg'
												className={getClassNamesFor('payout')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('payout')}
											className='cursor-pointer text-decoration-underline'>
											Dirección{' '}
											<Icon
												size='lg'
												className={getClassNamesFor('payout')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('payout')}
											className='cursor-pointer text-decoration-underline'>
											Municipio{' '}
											<Icon
												size='lg'
												className={getClassNamesFor('payout')}
												icon='FilterList'
											/>
										</th>
										<td />
									</tr>
								</thead>
								<tbody>
									{dataPagination(items, currentPage, perPage).map((i) => (
										<tr key={i.id}>
											<td>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<div
															className='ratio ratio-1x1 me-3'
															style={{ width: 48 }}>
															<div
																className={`bg-l${
																	darkModeStatus ? 'o25' : '25'
																}-${getColorNameWithIndex(
																	i.id,
																)} text-${getColorNameWithIndex(
																	i.id,
																)} rounded-2 d-flex align-items-center justify-content-center`}>
																<span className='fw-bold'>
																	{getFirstLetter(i.name)}
																</span>
															</div>
														</div>
													</div>
													<div className='flex-grow-1'>
														<div className='fs-6 fw-bold'>{i.name}</div>
														<div className='text-muted'>
															<Icon icon='Label' />{' '}
															<small>{i.type}</small>
														</div>
													</div>
												</div>
											</td>
											<td>
												<Button
													isLink
													color='light'
													icon='Email'
													className='text-lowercase'
													tag='a'
													href={`mailto:${i.email}`}>
													{i.email}
												</Button>
											</td>
											<td>
												<div>{i.membershipDate.format('ll')}</div>
												<div>
													<small className='text-muted'>
														{i.membershipDate.fromNow()}
													</small>
												</div>
											</td>
											<td>{priceFormat(i.balance)}</td>
											<td>
												<Icon
													size='lg'
													icon={`custom ${i.payout.toLowerCase()}`}
												/>{' '}
												{i.payout}
											</td>
											<td>
												<Dropdown>
													<DropdownToggle hasIcon={false}>
														<Button
															icon='MoreHoriz'
															color='dark'
															isLight
															shadow='sm'
															aria-label='More actions'
														/>
													</DropdownToggle>
													<DropdownMenu isAlignmentEnd>
														<DropdownItem>
															<Button
																icon='Visibility'
																tag='a'
																to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}>
																View
															</Button>
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</CardBody>
						<PaginationButtons
							data={filteredData}
							label='customers'
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
							perPage={perPage}
							setPerPage={setPerPage}
						/>
						<Button className='col-3 m-2' color='dark'>
							Siguiente
						</Button>
					</Card>
				</div>
			</div>
		</>
	);
};

export default PackagesTable;

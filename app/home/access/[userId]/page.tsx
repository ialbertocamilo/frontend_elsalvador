'use client';

import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Button from '../../../../components/bootstrap/Button';
import Input from '../../../../components/bootstrap/forms/Input';
import Card, { CardBody, CardFooter } from '../../../../components/bootstrap/Card';
import Select from '../../../../components/bootstrap/forms/Select';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Label from '../../../../components/bootstrap/forms/Label';
import { arrayToList, fillMunicipalitiesByDepartment } from '../../../../helpers/helpers';
import { departmentList, municipalityList } from '../../../../common/constants/lists';
import { useFormik } from 'formik';
import { IUser } from '../../../../common/types/user.types';
import { UserService } from '../../../../services/users/user.service';
import { useParams } from 'next/navigation';

const AccessIdPage = () => {
	const params = useParams();
	useEffect(() => {
		UserService.getOne(params?.userId as string).then((data) => {
			formik.setValues(data);
		});
	}, []);

	const user: IUser = {
		name: '',
		lastname: '',
		profession: '',
		nationality: '',
		id: '',
		email: '',
		active: false,
		role: { id: 1, name: '', code: '' },
		role_id: 1,
		department: '',
		municipality: '',
		address: '',
		phone: '',
	};
	const formik = useFormik({
		initialValues: user,
		onSubmit: () => {
			UserService.updateUser(formik.values);
		},
	});

	const [municipalites, setMunicipalites] = useState<any[]>();
	useEffect(() => {
		formik.setFieldValue('department', 0);
		const municipalitiesByDepartment = fillMunicipalitiesByDepartment(
			Number(formik.values.department),
		);
		if (municipalitiesByDepartment) {
			setMunicipalites(arrayToList(municipalitiesByDepartment));
		}
	}, []);
	useEffect(() => {
		const array = fillMunicipalitiesByDepartment(Number(formik.values.department));
		if (array) {
			setMunicipalites(arrayToList(array));
		}
	}, [formik.values.department]);
	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<div className='display-4 fw-bold py-3 text-primary-emphasis'>
							Información de usuario
						</div>
						<span>
							{formik.values.name} {formik.values.lastname}
						</span>
					</div>
					<div className=''>
						<Card>
							<CardBody>
								<div className='row'>
									<FormGroup className='col-6 my-1' id='propietario'>
										<Label className={'border-2'}>Nombre </Label>
										<Input
											id='name'
											name='name'
											type='text'
											invalidFeedback={formik.errors?.name}
											value={formik.values.name}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.name && (
												<span className='text-danger caption-top'>
													{formik.errors?.name}
												</span>
											)}
										</div>
									</FormGroup>
									<FormGroup className='col-6 my-1'>
										<Label className={'border-2'}>Apellidos</Label>
										<Input
											name='lastname'
											type='text'
											invalidFeedback={formik.errors?.lastname}
											value={formik.values.lastname}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.lastname && (
												<span className='text-danger caption-top'>
													{formik.errors?.lastname}
												</span>
											)}
										</div>
									</FormGroup>
									<FormGroup className='col-6 my-1' id='proyecto'>
										<Label>Profesión u oficio</Label>
										<Input
											type='text'
											name='profession'
											value={formik.values.profession}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.profession && (
												<span className='text-danger caption-top'>
													{formik.errors?.profession}
												</span>
											)}
										</div>
									</FormGroup>
									<FormGroup className='col-6 my-1' id='proyecto'>
										<Label>Nacionalidad</Label>
										<Input
											type='text'
											name='nationality'
											value={formik.values.nationality}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.nationality && (
												<span className='text-danger caption-top'>
													{formik.errors?.nationality}
												</span>
											)}
										</div>
									</FormGroup>
								</div>
								<div className='row'>
									<FormGroup className='col-6 my-1' id='disenador'>
										<Label>Teléfono</Label>
										<Input
											type='text'
											name='phone'
											value={formik.values.phone}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.phone && (
												<span className='text-danger caption-top'>
													{formik.errors?.phone}
												</span>
											)}
										</div>
									</FormGroup>
									<FormGroup className='col-6 my-1' id='disenador'>
										<Label>Email de contacto</Label>
										<Input
											type='text'
											name='email'
											value={formik.values.email}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.email && (
												<span className='text-danger caption-top'>
													{formik.errors?.email}
												</span>
											)}
										</div>
									</FormGroup>
								</div>
							</CardBody>
						</Card>
					</div>

					<div>
						<Card>
							<CardBody>
								<div className='row'>
									<FormGroup className='col-6 my-1' id='direccion'>
										<Label>Dirección</Label>
										<Input
											type='text'
											name='address'
											value={formik.values.address}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.address && (
												<span className='text-danger caption-top'>
													{formik.errors?.address}
												</span>
											)}
										</div>
									</FormGroup>
									<FormGroup className='col-6 my-1'>
										<Label>Departamento</Label>
										<Select
											name='department'
											value={formik.values.department}
											onChange={formik.handleChange}
											list={arrayToList(departmentList)}
											ariaLabel='department'></Select>
									</FormGroup>
									<div>
										{formik.errors?.department && (
											<span className='text-danger caption-top'>
												{formik.errors?.department}
											</span>
										)}
									</div>
								</div>
								<div className='row'>
									<FormGroup className='col-6' id='municipio'>
										<Label>Municipio</Label>
										<Select
											name='municipality'
											value={formik.values.municipality}
											onChange={formik.handleChange}
											list={municipalites}
											ariaLabel='municipality'></Select>
									</FormGroup>
									<div>
										{formik.errors?.municipality && (
											<span className='text-danger caption-top'>
												{formik.errors?.municipality}
											</span>
										)}
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-xxl-12'>
						<Card>
							<CardFooter>
								<div className='row '>
									<Button
										className='col-auto mx-2'
										color='info'
										isLight
										type='submit'
										onClick={formik.handleSubmit}
										icon='Save'>
										Guardar datos
									</Button>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default AccessIdPage;

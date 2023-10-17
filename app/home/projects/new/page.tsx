// generate code sample for tsx
'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Card, { CardBody, CardFooter } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Label from '../../../../components/bootstrap/forms/Label';
import Input from '../../../../components/bootstrap/forms/Input';
import Button from '../../../../components/bootstrap/Button';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { useProjects } from '../../../../services/project/project.service';
import { IProjectFormType } from '../../../../common/types/project.types';
import { RoutesListWithParams } from '../../../../common/constants/default';
import Select from '../../../../components/bootstrap/forms/Select';
import { departmentList, municipalityList } from '../../../../common/constants/lists';
import { arrayToList } from '../../../../helpers/helpers';

const ProjectsPage = () => {
	const router = useRouter();
	const projects = useProjects();

	const [project, setProject] = useState<IProjectFormType>({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [buttonActive, setButtonActive] = useState(true);
	const formik = useFormik({
		initialValues: project,
		validateOnChange: false,
		validate: (values) => {
			const errors: {
				ownerName?: string;
				ownerLastName?: string;
				projectName?: string;
				profession?: string;
				nationality?: string;
				directorName?: string;
				phone?: string;
				designerName?: string;
				address?: string;
				municipality?: string;
				department?: string;
				email?: string;
			} = {};
			if (!values?.ownerName) errors.ownerName = 'Especificar nombre de propietario';
			if (!values?.ownerLastName)
				errors.ownerLastName = 'Especificar apellido de propietario';
			if (!values?.profession) errors.profession = 'Especificar profesión';
			if (!values?.nationality) errors.nationality = 'Especificar nacionalidad';
			if (!values?.projectName) errors.projectName = 'Especificar nombre de proyecto';
			const phoneRegex = /^(?:\+\d{1,3}\s?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

			if (!values?.phone) {
				errors.phone = 'Especificar teléfono';
			}
			if (values.phone)
				if (!phoneRegex.test(values.phone))
					errors.phone = 'Escribe un teléfono válido ejm. +1 (123) 456-7890';
			if (!values?.address) errors.address = 'Especificar dirección';
			if (!values?.municipality) errors.municipality = 'Especificar municipio';
			if (!values?.department) errors.department = 'Especificar departamento';
			if (!values?.directorName) errors.directorName = 'Especificar nombre de director';
			if (!values?.designerName) errors.designerName = 'Especificar nombre de diseñador';
			if (!values?.email) errors.email = 'Especificar email';

			return errors;
		},
		onSubmit: async (values) => {
			Object.assign(values, { ...values, public: buttonActive });
			const result = await projects.saveProject(values);
			if (result) router.push(RoutesListWithParams.geolocation(result.id));
		},
		enableReinitialize: true,
	});

	useEffect(() => {
		if (formik.values.levelsNumber)
			formik.setFieldValue('levelsNumber', Math.round(formik.values.levelsNumber));
	}, [formik.values.levelsNumber]);
	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardBody>
								<h4 className='fw-bold'>Información de proyecto</h4>
								<span>{formik.values.projectName}</span>
							</CardBody>
						</Card>
					</div>
					<div className='col-xl-8'>
						<Card>
							<CardBody>
								<div className='row'>
									<FormGroup className='col-6 my-1' id='propietario'>
										<Label className={'border-2'}>Nombre de Propietario</Label>
										<Input
											id='ownerName'
											name='ownerName'
											type='text'
											invalidFeedback={formik.errors?.ownerName}
											value={formik.values.ownerName}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.ownerName && (
												<span className='text-danger caption-top'>
													{formik.errors?.ownerName}
												</span>
											)}
										</div>
									</FormGroup>
									<FormGroup className='col-6 my-1'>
										<Label className={'border-2'}>
											Apellidos de Propietario
										</Label>
										<Input
											name='ownerLastName'
											type='text'
											invalidFeedback={formik.errors?.ownerLastName}
											value={formik.values.ownerLastName}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.ownerLastName && (
												<span className='text-danger caption-top'>
													{formik.errors?.ownerLastName}
												</span>
											)}
										</div>
									</FormGroup>
									<FormGroup className='col-3 my-1' id='proyecto'>
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
									<FormGroup className='col-3 my-1' id='proyecto'>
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
									<FormGroup name='directorName' className='col-6 my-1'>
										<Label>Director Responsable de la Obra</Label>
										<Input
											type='text'
											name='directorName'
											value={formik.values.directorName}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.directorName && (
												<span className='text-danger caption-top'>
													{formik.errors?.directorName}
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
								<div className='row'>
									<FormGroup className='col-6 my-1' id='proyecto'>
										<Label>Nombre del Proyecto</Label>
										<Input
											type='text'
											name='projectName'
											value={formik.values.projectName}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.projectName && (
												<span className='text-danger caption-top'>
													{formik.errors?.projectName}
												</span>
											)}
										</div>
									</FormGroup>
									<FormGroup className='col-6 my-1' id='disenador'>
										<Label>Nombre del Diseñador</Label>
										<Input
											type='text'
											name='designerName'
											value={formik.values.designerName}
											onChange={formik.handleChange}
										/>
										<div>
											{formik.errors?.designerName && (
												<span className='text-danger caption-top'>
													{formik.errors?.designerName}
												</span>
											)}
										</div>
									</FormGroup>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-xl-3'>
						<Card>
							<CardBody>
								<div className='row'>
									<div className='col-auto'>
										<div className='row g-1'>
											<Label>Tipo de edificación</Label>
											<div className='col-auto'>
												<Button
													onClick={() => setButtonActive(true)}
													className={classNames(
														'me-3 ',
														buttonActive ? 'bg-info text-white' : '',
													)}
													isLight
													color='info'>
													Pública
												</Button>
											</div>
											<div className='col-auto'>
												<Button
													onClick={() => setButtonActive(false)}
													className={classNames(
														'me-3 ',
														!buttonActive ? 'bg-info text-white' : '',
													)}
													isLight
													color='info'>
													Privada
												</Button>
											</div>
										</div>
									</div>
								</div>
								<div className='row mt-4'>
									<FormGroup id='lvls'>
										<Label>Número de niveles</Label>
										<Input
											className='my-2'
											name='levelsNumber'
											type='number'
											value={formik.values.levelsNumber}
											placeholder='Número de niveles'
											onChange={formik.handleChange}></Input>
									</FormGroup>
									<FormGroup id='offices'>
										<Label>Número de oficinas por nivel</Label>
										<Input
											className='my-2'
											name='offices'
											type='number'
											value={formik.values.offices}
											placeholder='Número de oficinas por nivel'
											onChange={formik.handleChange}></Input>
									</FormGroup>
									<Label>Superficie construida m2</Label>
									<FormGroup id='suirface'>
										<Input
											className='my-2'
											name='surface'
											type='number'
											value={formik.values.surface}
											placeholder='Superficie construida m2'
											onChange={formik.handleChange}></Input>
									</FormGroup>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-xl-8'>
						<Card>
							<CardBody>
								<FormGroup id='direccion'>
									<Label>Dirección</Label>
									<Input
										type='text'
										name='address'
										value={formik.values.address}
										onChange={formik.handleChange}
									/>
								</FormGroup>
								<div>
									{formik.errors?.address && (
										<span className='text-danger caption-top'>
											{formik.errors?.address}
										</span>
									)}
								</div>
								<FormGroup>
									<Label>Departamento</Label>
									<Select
										name='department'
										value={formik.values.department}
										onChange={formik.handleChange}
										list={arrayToList(departmentList())}
										ariaLabel='department'></Select>
								</FormGroup>
								<div>
									{formik.errors?.department && (
										<span className='text-danger caption-top'>
											{formik.errors?.department}
										</span>
									)}
								</div>
								<FormGroup id='municipio'>
									<Label>Municipio</Label>
									<Select
										name='municipality'
										value={formik.values.municipality}
										onChange={formik.handleChange}
										list={arrayToList(municipalityList())}
										ariaLabel='municipality'></Select>
								</FormGroup>
								<div>
									{formik.errors?.municipality && (
										<span className='text-danger caption-top'>
											{formik.errors?.municipality}
										</span>
									)}
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-xxl-8'>
						<Card>
							<CardBody>
								<FormGroup id='asesor'>
									<Label>Nombre del Asesor Energético</Label>
									<Input
										type='text'
										name='energyAdvisor'
										value={formik.values.energyAdvisor}
										onChange={formik.handleChange}
									/>
								</FormGroup>
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

export default ProjectsPage;

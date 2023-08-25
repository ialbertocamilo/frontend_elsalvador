// generate code sample for tsx
'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Label from '../../../../components/bootstrap/forms/Label';
import Input from '../../../../components/bootstrap/forms/Input';
import Button from '../../../../components/bootstrap/Button';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { saveProject } from '../../../../services/project/project.service';

const ProjectsPage = () => {
	const router = useRouter();

	const [buttonActive, setButtonActive] = useState(true);
	const formik = useFormik({
		initialValues: {
			ownerName: '',
			projectName: '',
			directorName: '',
			designerName: '',
			address: '',
			municipality: '',
			energyAdvisor: '',
			levelsNumber: '',
			offices: '',
			surface: '',
		},
		validateOnChange: false,
		validate: (values) => {
			const errors: {
				ownerName?: string;
				projectName?: string;
				directorName?: string;
				designerName?: string;
			} = {};
			if (!values?.ownerName) errors.ownerName = 'Especificar nombre de propietario';
			if (!values?.projectName) errors.projectName = 'Especificar nombre de proyecto';
			if (!values?.directorName) errors.directorName = 'Especificar nombre de director';
			if (!values?.designerName) errors.designerName = 'Especificar nombre de diseñador';

			return errors;
		},
		onSubmit: async (values) => {
			Object.assign(values, { ...values, public: buttonActive });
			await saveProject(values);
		},
		enableReinitialize: true,
	});

	return (
		<PageWrapper>
			<Page>
				<Card className='row'>
					<CardBody>
						<h4 className='fw-bold'>Información de proyecto</h4>
					</CardBody>
				</Card>

				<div className='row align-items-start'>
					<div className='col-8'>
						<Card tag='form'>
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
								<FormGroup id='municipio'>
									<Label>Municipio</Label>
									<Input
										type='text'
										name='municipality'
										value={formik.values.municipality}
										onChange={formik.handleChange}
									/>
								</FormGroup>
							</CardBody>
						</Card>
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
					<br />
					<Card className='col'>
						<CardBody>
							<div className='row'>
								<div className='col-auto'>
									<div className='row g-1'>
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
							<Input
								className='my-2'
								name='levelsNumber'
								value={formik.values.levelsNumber}
								placeholder='Numero de niveles'
								onChange={formik.handleChange}></Input>
							<Input
								className='my-2'
								name='offices'
								value={formik.values.offices}
								placeholder='Numero de oficinas por nivel'
								onChange={formik.handleChange}></Input>
							<Input
								className='my-2'
								name='surface'
								value={formik.values.surface}
								placeholder='Superficie construida m2'
								onChange={formik.handleChange}></Input>
						</CardBody>
					</Card>
				</div>

				<div className='row'>
					<Card className='col-12'>
						<CardBody>
							<div className='row '>
								<Button
									className='col-auto mx-2'
									color='primary'
									type='submit'
									onClick={formik.handleSubmit}
									icon='Save'>
									Guardar datos
								</Button>
								<Button
									className='col-auto  mx-2'
									color='info'
									type='submit'
									icon='GpsFixed'>
									Geolocalización
								</Button>
								<div className='col-auto'></div>
							</div>
						</CardBody>
					</Card>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ProjectsPage;

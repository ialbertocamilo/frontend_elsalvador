import Card, { CardBody, CardFooter } from '../bootstrap/Card';
import FormGroup from '../bootstrap/forms/FormGroup';
import Label from '../bootstrap/forms/Label';
import Input from '../bootstrap/forms/Input';
import { BuildingClassificationButtons } from '../buttons/BuildingClassificationButtons';
import { BuildingClassification, BuildingType } from '../../common/types/building.types';
import { BuildingTypeButtons } from '../buttons/BuildingTypeButtons';
import Select from '../bootstrap/forms/Select';
import { arrayToList, fillMunicipalitiesByDepartment } from '../../helpers/helpers';
import { departmentList } from '../../common/constants/lists';
import Button from '../bootstrap/Button';
import { RoutesListWithParams } from '../../common/constants/default';
import BackToCalculatorsBtn from '../buttons/BackToCalculatorsBtn';
import Icon from '../icon/Icon';
import { NextButton } from '../buttons/NextButton';
import React, { useEffect, useState } from 'react';
import { IProjectFormType } from '../../common/types/project.types';
import { useFormik } from 'formik';
import { useProjects } from '../../services/project/project.service';
import { useRouter } from 'next/navigation';

export const ProjectComponent = ({
	projectId,
	globalReadonly,
	project,
}: {
	projectId: string;
	globalReadonly?: boolean;
	project: IProjectFormType;
}) => {
	const projects = useProjects();
	const router = useRouter();

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
				building_classification?: string;
				building_type?: string;
			} = {};
			if (!values?.ownerName) errors.ownerName = 'Especificar nombre de propietario';
			if (!values?.ownerLastName)
				errors.ownerLastName = 'Especificar apellido de propietario';
			if (!values?.profession) errors.profession = 'Especificar profesión';
			if (!values?.nationality) errors.nationality = 'Especificar nacionalidad';
			if (!values?.projectName) errors.projectName = 'Especificar nombre de proyecto';
			if (!values?.phone) errors.phone = 'Especificar teléfono';
			const phoneRegex = /^(?:\+\d{1,3}\s?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
			if (values.phone)
				if (!phoneRegex.test(values.phone))
					errors.phone = 'Escribe un teléfono válido ejm. +1 (123) 456-7890';
			if (!values?.address) errors.address = 'Especificar dirección';
			if (!values?.municipality) errors.municipality = 'Especificar municipio';
			if (!values?.department) errors.department = 'Especificar departamento';
			if (!values?.directorName) errors.directorName = 'Especificar nombre de director';
			if (!values?.designerName) errors.designerName = 'Especificar nombre de diseñador';
			if (!values?.email) errors.email = 'Especificar email';
			if (!values?.building_type) errors.building_type = 'Especificar tipo de edificación';
			if (!values?.building_classification)
				errors.building_classification = 'Especificar clasificación de edificación';

			return errors;
		},
		onSubmit: async (values) => {
			Object.assign(values, { ...values, id: projectId });
			if (values?.id) await projects.updateProject(values);
			else {
				projects.saveProject(values).then((data) => {
					if (data) router.push(RoutesListWithParams.project(data.id));
				});
			}
		},
		enableReinitialize: true,
	});

	useEffect(() => {
		if (formik.values.levelsNumber)
			formik.setFieldValue('levelsNumber', Math.round(formik.values.levelsNumber));
	}, [formik.values.levelsNumber]);
	useEffect(() => {
		if (formik.values.offices)
			formik.setFieldValue('offices', Math.round(formik.values.offices));
	}, [formik.values.offices]);

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
		<div className='row d-flex'>
			<div className='col-12'>
				<div className='display-4 fw-bold py-3 text-primary-emphasis'>
					Información de proyecto
				</div>
				<span>{formik.values.projectName}</span>
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
									disabled={globalReadonly}
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
							<FormGroup className='col-6 my-1' id='propietario'>
								<Label className={'border-2'}>Apellidos de Propietario</Label>
								<Input
									name='ownerLastName'
									type='text'
									disabled={globalReadonly}
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
									disabled={globalReadonly}
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
									disabled={globalReadonly}
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
									disabled={globalReadonly}
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
									disabled={globalReadonly}
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
									disabled={globalReadonly}
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
									disabled={globalReadonly}
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
									disabled={globalReadonly}
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
								readOnly={globalReadonly}
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
								disabled={globalReadonly}
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
						<FormGroup id='municipio'>
							<Label>Municipio</Label>
							<Select
								name='municipality'
								disabled={globalReadonly}
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
					</CardBody>
				</Card>
			</div>
			<div className='col-xl-4'>
				<Card>
					<CardBody>
						<Label>Clasificación de edificaciones</Label>
						<BuildingClassificationButtons
							readOnly={globalReadonly || false}
							selected={
								formik.values.building_classification ||
								BuildingClassification.households
							}
							onChange={(value: BuildingClassification) =>
								formik.setFieldValue('building_classification', value)
							}
						/>
						<div>
							{formik.errors?.building_classification && (
								<span className='text-danger caption-top'>
									{formik.errors?.building_classification}
								</span>
							)}
						</div>
						<br />
						<Label>Tipo de edificación</Label>
						<BuildingTypeButtons
							readOnly={globalReadonly || false}
							buttonPublicPrivate={
								formik.values.building_classification ==
								BuildingClassification.offices
							}
							selected={formik.values.building_type || BuildingType.single}
							onChange={(value: BuildingType) => {
								formik.setFieldValue('building_type', value);
							}}
						/>
						<div>
							{formik.errors?.building_type && (
								<span className='text-danger caption-top'>
									{formik.errors?.building_type}
								</span>
							)}
						</div>
						<div className='row mt-4'>
							<FormGroup id='lvls'>
								<Label>Número de niveles</Label>
								<Input
									className='my-2'
									name='levelsNumber'
									type='number'
									readOnly={globalReadonly}
									value={formik.values.levelsNumber}
									placeholder='Número de niveles'
									onChange={formik.handleChange}></Input>
							</FormGroup>
							<FormGroup id='offices'>
								<Label>Número de viviendas u oficinas por nivel</Label>
								<Input
									className='my-2'
									name='offices'
									readOnly={globalReadonly}
									type='number'
									value={formik.values.offices}
									placeholder='Número de viviendas u oficinas por nivel'
									onChange={formik.handleChange}></Input>
							</FormGroup>
							<Label>Superficie construida m2</Label>
							<FormGroup id='suirface'>
								<Input
									className='my-2'
									name='surface'
									readOnly={globalReadonly}
									type='number'
									value={formik.values.surface}
									placeholder='Superficie construida m2'
									onChange={formik.handleChange}></Input>
							</FormGroup>
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
								disabled={globalReadonly}
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
						<>
							{!globalReadonly && (
								<Button
									className='col-auto mx-2'
									color='info'
									isLight
									type='submit'
									onClick={formik.handleSubmit}
									icon='Save'>
									Guardar datos
								</Button>
							)}
						</>
						<Button
							className='col-auto  mx-2'
							color='storybook'
							isLight
							onClick={() => router.push(RoutesListWithParams.geolocation(projectId))}
							icon='GpsFixed'>
							Geolocalización
						</Button>
						<BackToCalculatorsBtn />
						<Button
							color='link'
							className='mx-1 col-2 m-0 p-0'
							onClick={() => router.push(RoutesListWithParams.packages(projectId))}>
							<span className='text-start'>
								<Icon icon='Backpack' />
								Paquetes
							</span>
						</Button>
						<NextButton
							route={RoutesListWithParams.calculatorProportion(projectId)}
							text='Siguiente'
						/>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

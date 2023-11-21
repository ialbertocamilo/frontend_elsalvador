// generate code sample for tsx
'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import React, { useEffect, useState } from 'react';
import Card, { CardBody, CardFooter } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Select from '../../../../components/bootstrap/forms/Select';
import { useParams, useRouter } from 'next/navigation';
import DataService from '../../../../services/data/data.service';
import { IConfigurationType } from '../../../../common/types/configuration.types';
import { ToggleYesNoButton } from '../../../../components/buttons/ToggleYesNoButton';
import Button from '../../../../components/bootstrap/Button';
import { useProjectData } from '../../../../hooks/useProjectData';
import { useFormik } from 'formik';
import { getItemFromMunicipalityList } from '../../../../helpers/helpers';
import InputGroup from '../../../../components/bootstrap/forms/InputGroup';
import { ResultSuccessModal } from '../../../../components/modals/ResultSuccessModal';
import { ResultErrorModal } from '../../../../components/modals/ResultErrorModal';
import { GoProjectButton } from '../../../../components/buttons/GoProjectButton';
import { IPackageOriginQuestions, ITechnicalSupport } from '../../../../common/types/package.types';
import { TechnicalSupportInfoModal } from '../../../../components/modals/TechnicalSupportInfoModal';
import { RoutesList } from '../../../../common/constants/default';
import Spinner from '../../../../components/bootstrap/Spinner';
import { keyList } from '../../../../common/constants/lists';
import { IQuestion } from '../../../../common/types/question.types';

const keyName = keyList.package;
const PackagesPage = () => {
	const [modalStatus, setModalStatus] = useState(false);
	const [packagesSelect, setPackagesSelect] = useState<any[]>();
	const [packages, setPackages] = useState<any[]>();
	const [packageInfo, setPackageInfo] = useState<IConfigurationType>();
	const [questions, setQuestions] = useState<IQuestion[]>();
	const params = useParams();

	const { projectEntity, totalCalculatedValues, setTotalCalculatedValues, setProjectData } =
		useProjectData(params?.projectId as string);
	const [globalReadOnly, setGlobalReadOnly] = useState(false);
	useEffect(() => {
		Promise.all([
			DataService.getPackagesConfig(),
			DataService.loadPackageByProjectId(params?.projectId as string), // Cargar paquete previamente guardado
		]).then((data) => {
			setLoading(false);
			if (data.length > 0) {
				if (data[0]) {
					const packages = data[0]?.config as IConfigurationType[];

					setPackagesSelect(
						packages?.map((val, index) => {
							return { value: index, text: `Paquete ${index + 1}` };
						}),
					);
					setPackages(packages);
					setQuestions(data[0]?.questions);
				}
				if (data[1]) {
					const packageFinded = data[1] as ITechnicalSupport;
					formik.setValues({
						shades: packageFinded.reportedValue.shades.toString(),
						cop: packageFinded.reportedValue.cop.toString(),
						walls_reflectance: packageFinded.reportedValue.wall_reflectance.toString(),
						roofs_reflectance: packageFinded.reportedValue.roof_reflectance.toString(),
					});
					setOriginQuestions(packageFinded?.valueOrigin);
					setQuestions(packageFinded?.questions);
				}
				setGlobalReadOnly(Boolean(data[1]));
			}
		});
	}, []);

	useEffect(() => {
		selectPackage(0);
	}, [packages]);
	const reportedValues = {
		walls_reflectance: '',
		roofs_reflectance: '',
		shades: '',
		cop: '',
	};
	const formik = useFormik({
		initialValues: reportedValues,
		onSubmit: async (values) => {},
	});

	const selection1 = [
		{ value: 0, text: '' },
		{
			value: 1,
			text: 'Calculado por asesor ',
		},
		{
			value: 2,
			text: 'Certificado producto (𝝺)',
		},
		{
			value: 3,
			text: 'Certificado producto (U)',
		},
	];
	const selection6 = [
		{ value: 0, text: '' },
		{
			value: 1,
			text: 'Calculado por asesor ',
		},
	];
	const selection5 = [
		{ value: 0, text: '' },
		{
			value: 1,
			text: 'Calculado por asesor ',
		},
		{
			value: 2,
			text: 'Certificado producto (U)',
		},
	];
	const selection2 = [
		{ value: 0, text: '' },
		{ value: 1, text: 'Certificado producto (%)' },
	];
	const selection3 = [
		{ value: 0, text: '' },
		{ value: 1, text: 'Certificado producto (g)' },
		{ value: 2, text: 'Certificado producto (CS)' },
	];
	const selection4 = [
		{ value: 0, text: '' },
		{ value: 1, text: 'Certificado producto' },
		{ value: 2, text: 'Ficha técnica' },
	];

	const [complies, setComplies] = useState({
		wall_window_proportion: false,
		wall_u_value: false,
		wall_reflectance: false,
		roof_u_value: false,
		roof_reflectance: false,
		window_u_value: false,
		window_g_value: false,
		shades: false,
		cop: false,
	});

	const [originQuestions, setOriginQuestions] = useState<IPackageOriginQuestions>({
		wall_window_proportion: '',
		wall_u_value: '',
		wall_reflectance: '',
		roof_u_value: '',
		roof_reflectance: '',
		window_u_value: '',
		window_g_value: '',
		shades: '',
		cop: '',
	});
	const [modalError, setModalError] = useState(false);

	const [canRequestTechnicalReport, setCanRequestTechnicalReport] = useState(false);
	const [lastResults, setLastResults] = useState<ITechnicalSupport>({
		packageName: '',
		metaValue: {
			wall_window_proportion: 0,
			wall_u_value: 0,
			wall_reflectance: 0,
			roof_u_value: 0,
			roof_reflectance: 0,
			window_u_value: 0,
			window_g_value: 0,
			shades: 0,
			cop: 0,
		},
		reportedValue: {
			wall_window_proportion: 0,
			wall_u_value: 0,
			wall_reflectance: 0,
			roof_u_value: 0,
			roof_reflectance: 0,
			window_u_value: 0,
			window_g_value: 0,
			shades: 0,
			cop: 0,
		},
		valueOrigin: {
			wall_window_proportion: '',
			wall_u_value: '',
			wall_reflectance: '',
			roof_u_value: '',
			roof_reflectance: '',
			window_u_value: '',
			window_g_value: '',
			shades: '',
			cop: '',
		},
		questions: [],
		meets: {},
	});

	function selectPackage(index: number) {
		if (packages) {
			setPackageInfo(packages[index]);
		}
	}

	useEffect(() => {
		if (packageInfo) {
			verifyIfComplies();
		}
	}, [packageInfo]);

	useEffect(() => {
		if (packages) verifyIfComplies();
	}, [packages]);
	useEffect(() => {
		if (totalCalculatedValues) verifyIfComplies();
	}, [totalCalculatedValues]);

	useEffect(() => {
		verifyIfComplies();
	}, [formik.values]);

	function requestResults() {
		if (checkResults()) {
			setCanRequestTechnicalReport(checkResults());
			setModalStatus(true);
			return;
		}
		setModalError(true);
	}

	function checkResults() {
		return (
			Number(formik.values.walls_reflectance) === Number(packageInfo?.walls_reflectance) &&
			Number(formik.values.roofs_reflectance) == Number(packageInfo?.roofs_reflectance) &&
			Number(formik.values.shades) == Number(packageInfo?.shades) &&
			Number(formik.values.cop) == Number(packageInfo?.hvac) &&
			Number(totalCalculatedValues?.roof_u_value) == Number(packageInfo?.roofs_u_value) &&
			Number(totalCalculatedValues?.wall_u_value) == Number(packageInfo?.walls_u_value) &&
			Number(totalCalculatedValues?.wall_window_proportion) ==
				Number(packageInfo?.proportion_wall_window) &&
			Number(totalCalculatedValues?.window_g_value) ==
				Number(packageInfo?.shading_coefficient) &&
			Number(totalCalculatedValues?.window_u_value) == Number(packageInfo?.windows_u_value)
		);
	}

	function verifyIfComplies() {
		setComplies({
			wall_window_proportion:
				Number(totalCalculatedValues?.wall_window_proportion) ===
				Number(packageInfo?.proportion_wall_window),
			wall_u_value:
				Number(totalCalculatedValues?.wall_u_value) == Number(packageInfo?.walls_u_value),
			wall_reflectance:
				Number(formik.values.walls_reflectance) === Number(packageInfo?.walls_reflectance),
			roof_u_value:
				Number(totalCalculatedValues?.roof_u_value) == Number(packageInfo?.roofs_u_value),
			roof_reflectance:
				Number(formik.values.roofs_reflectance) == Number(packageInfo?.roofs_reflectance),
			window_u_value:
				Number(totalCalculatedValues?.window_u_value) ==
				Number(packageInfo?.windows_u_value),
			window_g_value:
				Number(totalCalculatedValues?.window_g_value) ==
				Number(packageInfo?.shading_coefficient),
			shades: Number(formik.values.shades) == Number(packageInfo?.shades),
			cop: Number(formik.values.cop) == Number(packageInfo?.hvac),
		});
		setCanRequestTechnicalReport(checkResults());
	}

	const [technicalSupportModal, setTechnicalSupportModal] = useState(false);

	function requestTechnicalSupport() {
		setTechnicalSupportModal(true);

		setLastResults({
			valueOrigin: originQuestions,
			packageName: projectEntity?.project_name as string,
			questions: questions,
			metaValue: {
				wall_window_proportion: Number(packageInfo?.proportion_wall_window),
				wall_u_value: Number(packageInfo?.walls_u_value),
				wall_reflectance: Number(packageInfo?.walls_reflectance),
				roof_u_value: Number(packageInfo?.roofs_u_value),
				roof_reflectance: Number(packageInfo?.roofs_reflectance),
				window_u_value: Number(packageInfo?.windows_u_value),
				window_g_value: Number(packageInfo?.shading_coefficient),
				shades: Number(packageInfo?.shades),
				cop: Number(packageInfo?.hvac),
			},
			reportedValue: {
				wall_window_proportion: Number(totalCalculatedValues?.wall_window_proportion),
				wall_u_value: Number(totalCalculatedValues?.wall_u_value),
				wall_reflectance: Number(formik.values?.walls_reflectance),
				roof_u_value: Number(totalCalculatedValues?.roof_u_value),
				roof_reflectance: Number(formik.values?.roofs_reflectance),
				window_u_value: Number(totalCalculatedValues?.window_u_value),
				window_g_value: Number(totalCalculatedValues?.window_g_value),
				shades: Number(formik.values?.shades),
				cop: Number(formik.values?.cop),
			},
			meets: complies,
		});
	}

	const router = useRouter();

	function proceedToFinish() {
		if (params?.projectId) setProjectData(params.projectId, keyName, lastResults);
		router.push(RoutesList.projects);
	}

	function saveQuestionsResponse(index: number, state: boolean) {
		if (questions) {
			questions[index]['value'] = state;
			setQuestions([...questions]);
		}
	}

	const [loading, setLoading] = useState(true);
	const CheckLoad = () => {
		if (loading) {
			return (
				<>
					<Card>
						<CardBody>
							<div className='justify-content-center text-center align-content-center '>
								<Spinner color='primary'></Spinner>{' '}
								<span className='align-middle'>Cargando paquetes...</span>
							</div>
						</CardBody>
					</Card>
				</>
			);
		}
	};
	const ShowButtons = () => {
		if (globalReadOnly)
			return (
				<div className='justify-content-center text-center align-content-center'>
					<Spinner color={'danger'} inButton /> Esperando validación de supervisor...
				</div>
			);
		return (
			<div>
				<Button
					color='success'
					hidden={globalReadOnly}
					icon='CheckCircle'
					onClick={requestResults}>
					Solicitar resultados
				</Button>
				<Button
					color='storybook'
					icon='Analytics'
					hidden={globalReadOnly}
					className='ms-2'
					onClick={requestTechnicalSupport}
					isDisable={!canRequestTechnicalReport}>
					Solicitar Informe Técnico
				</Button>
			</div>
		);
	};

	const Questions = () => {
		const activated = questions?.filter((value) => !value.deactivated);

		return (
			<>
				{activated?.map((value, key) => (
					<tr key={key}>
						<th className='text-start pe-5'>
							<p>{value.title}</p>
						</th>
						<th>
							<ToggleYesNoButton
								blocked={globalReadOnly}
								keyName={value.id}
								forceYes={value?.value}
								emitValue={saveQuestionsResponse}
							/>
						</th>
					</tr>
				))}
			</>
		);
	};
	return (
		<PageWrapper>
			<Page className='mx-3'>
				{CheckLoad()}
				{!loading && (
					<div className='flex-row  justify-content-center text-center'>
						<Card>
							<CardBody>
								<div className='d-flex justify-content-between'>
									<h4 className='fw-bold'>
										Paquetes de medidas EE para oficinas
									</h4>
									<div className='col-6 text-end'>
										<GoProjectButton />
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardBody className='m-1'>
								<div className='row mb-1 row-cols-2  align-baseline align-items-center center justify-content-center '>
									<div className='col-2'>
										<p>Selecciona un paquete</p>
									</div>
									<div className='col'>
										<FormGroup>
											<Select
												ariaLabel='packages'
												list={packagesSelect}
												className='text-center'
												disabled={globalReadOnly}
												onChange={(e: any) => selectPackage(e.target.value)}
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardBody className='m-1'>
								<h5>Datos del proyecto</h5>
								<div className='row mb-1 row-cols-2  align-baseline align-items-center center justify-content-center '>
									<div className='col-2'>
										<p>Nombre del proyecto</p>
									</div>
									<div className='col'>
										<FormGroup>
											<Input
												type='text'
												className='text-center bg-info-subtle'
												value={projectEntity?.project_name}
											/>
										</FormGroup>
									</div>
								</div>
								<div className='row mb-1 row-cols-2  align-baseline align-items-center center justify-content-center '>
									<div className='col-2'>
										<p>Municipio</p>
									</div>
									<div className='col'>
										<FormGroup>
											<Input
												type='text'
												className='text-center bg-info-subtle'
												value={getItemFromMunicipalityList(
													Number(projectEntity?.municipality) - 1,
												)}
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row mb-1 row-cols-2 align-baseline align-items-center center justify-content-center  '>
									<div className='col-2'>
										<p>Evaluado por</p>
									</div>
									<div className='col'>
										<FormGroup>
											<Input
												type='text'
												className='text-center bg-info-subtle'
												readOnly
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row mb-1 row-cols-2 align-baseline align-items-center center justify-content-center '>
									<div className='col-2'>
										<p>Revisado por</p>
									</div>
									<div className='col'>
										<FormGroup>
											<Input
												type='text'
												className='text-center bg-info-subtle'
												readOnly
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<div className='d-flex justify-content-center '>
									<table>
										<thead>
											<tr>
												<th className='text-center'>Concepto</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className='p-4'>Proporcion muro ventana</td>
											</tr>
											<tr>
												<td className='p-4'>Valor U de muro (W/m2K)</td>
											</tr>
											<tr>
												<td className='p-4'>
													Reflectancia Muros (%) coeficiente absortividad
												</td>
											</tr>
											<tr>
												<td className='p-4'>Valor U de techo (W/m2K)</td>
											</tr>
											<tr>
												<td className='p-4'>
													Reflectancia Techos (%) coeficiente absortividad
												</td>
											</tr>
											<tr>
												<td className='p-4'>Valor U de ventana (W/m2K)</td>
											</tr>
											<tr>
												<td className='p-4'>Valor g de ventana</td>
											</tr>
											<tr>
												<td className='p-4'>
													Sombras (Ventanas exteriores)
												</td>
											</tr>
											<tr>
												<td className='p-4'>Aire acondicionado COP</td>
											</tr>
										</tbody>
									</table>
									<table>
										<thead>
											<tr>
												<th className='text-center px-2'>Valor meta</th>
											</tr>
										</thead>
										<tbody className='text-center bold h5'>
											<tr>
												<td>
													{packageInfo?.proportion_wall_window
														? packageInfo?.proportion_wall_window + '%'
														: '-'}
												</td>
											</tr>
											<tr>
												<td>{packageInfo?.walls_u_value || '-'}</td>
											</tr>
											<tr>
												<td>
													{packageInfo?.walls_reflectance
														? packageInfo?.walls_reflectance + '%'
														: '-'}
												</td>
											</tr>
											<tr>
												<td>{packageInfo?.roofs_u_value || '-'}</td>
											</tr>
											<tr>
												<td>
													{packageInfo?.roofs_reflectance
														? packageInfo?.roofs_reflectance + '%'
														: '-'}
												</td>
											</tr>
											<tr>
												<td>{packageInfo?.windows_u_value || '-'}</td>
											</tr>
											<tr>
												<td>{packageInfo?.shading_coefficient || '-'}</td>
											</tr>
											<tr>
												<td>{packageInfo?.shades || '-'}</td>
											</tr>
											<tr className='p-4'>
												<td>{packageInfo?.hvac || '-'}</td>
											</tr>
										</tbody>
									</table>
									<table className=' px-5 mx-2'>
										<thead>
											<tr>
												<th className='text-center'>Valor Reportado</th>
											</tr>
										</thead>
										<tbody className='text-center bold h5  px-5 container'>
											<tr>
												<td width='150'>
													<InputGroup>
														<Input
															size='sm'
															readOnly
															type='number'
															className='text-center bg-info-subtle'
															name='proportion_wall_window'
															value={
																totalCalculatedValues?.wall_window_proportion
															}></Input>
														<Button className='bg-light'>%</Button>
													</InputGroup>
												</td>
											</tr>
											<tr>
												<td width='150'>
													<Input
														readOnly
														type='number'
														className='text-center bg-info-subtle'
														name='walls_u_value'
														value={
															totalCalculatedValues?.wall_u_value
														}></Input>
												</td>
											</tr>
											<tr>
												<td width='150'>
													<InputGroup>
														<Input
															type='number'
															className='text-center'
															name='walls_reflectance'
															readOnly={globalReadOnly}
															onChange={formik.handleChange}
															value={
																formik.values.walls_reflectance
															}></Input>
														<Button className='bg-light'>%</Button>
													</InputGroup>
												</td>
											</tr>
											<tr>
												<td width='150'>
													<Input
														type='number'
														readOnly
														className='text-center bg-info-subtle'
														name='roofs_u_value'
														value={
															totalCalculatedValues?.roof_u_value
														}></Input>
												</td>
											</tr>
											<tr>
												<td width='150'>
													<InputGroup>
														<Input
															type='number'
															className='text-center'
															name='roofs_reflectance'
															readOnly={globalReadOnly}
															onChange={formik.handleChange}
															value={
																formik.values.roofs_reflectance
															}></Input>
														<Button className='bg-light'>%</Button>
													</InputGroup>
												</td>
											</tr>
											<tr>
												<td width='150'>
													<Input
														type='number'
														readOnly
														className='text-center bg-info-subtle'
														value={
															totalCalculatedValues?.window_u_value
														}></Input>
												</td>
											</tr>
											<tr>
												<td width='150'>
													<Input
														type='number'
														readOnly
														className='text-center bg-info-subtle'
														value={
															totalCalculatedValues?.window_g_value
														}></Input>
												</td>
											</tr>
											<tr>
												<td width='150'>
													<Input
														type='number'
														className='text-center'
														name='shades'
														readOnly={globalReadOnly}
														onChange={formik.handleChange}
														value={formik.values.shades}></Input>
												</td>
											</tr>
											<tr className='p-4'>
												<td width='150'>
													<Input
														type='number'
														className='text-center'
														name='cop'
														readOnly={globalReadOnly}
														onChange={formik.handleChange}
														value={formik.values.cop}></Input>
												</td>
											</tr>
										</tbody>
									</table>
									<table className=' px-5 mx-2'>
										<thead>
											<tr>
												<th className='text-center'>
													Origen de los valores
												</th>
											</tr>
										</thead>
										<tbody className='align-items-baseline'>
											<tr>
												<td>
													<Select
														ariaLabel={'selection'}
														list={selection6}
														disabled={globalReadOnly}
														value={
															originQuestions.wall_window_proportion
														}
														onChange={(e: any) =>
															setOriginQuestions({
																...originQuestions,
																wall_window_proportion:
																	e.target.value,
															})
														}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<Select
														ariaLabel={'selection'}
														list={selection1}
														disabled={globalReadOnly}
														value={originQuestions.wall_u_value}
														onChange={(e: any) =>
															setOriginQuestions({
																...originQuestions,
																wall_u_value: e.target.value,
															})
														}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<Select
														ariaLabel={'selection'}
														list={selection5}
														disabled={globalReadOnly}
														value={originQuestions.wall_reflectance}
														onChange={(e: any) =>
															setOriginQuestions({
																...originQuestions,
																wall_reflectance: e.target.value,
															})
														}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<Select
														ariaLabel={'selection'}
														list={selection1}
														disabled={globalReadOnly}
														value={originQuestions.roof_u_value}
														onChange={(e: any) =>
															setOriginQuestions({
																...originQuestions,
																roof_u_value: e.target.value,
															})
														}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<Select
														ariaLabel={'selection'}
														list={selection2}
														disabled={globalReadOnly}
														value={originQuestions.roof_reflectance}
														onChange={(e: any) =>
															setOriginQuestions({
																...originQuestions,
																roof_reflectance: e.target.value,
															})
														}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<Select
														ariaLabel={'selection'}
														list={selection5}
														disabled={globalReadOnly}
														value={originQuestions.window_u_value}
														onChange={(e: any) =>
															setOriginQuestions({
																...originQuestions,
																window_u_value: e.target.value,
															})
														}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<Select
														ariaLabel={'selection'}
														list={selection3}
														disabled={globalReadOnly}
														value={originQuestions.window_g_value}
														onChange={(e: any) =>
															setOriginQuestions({
																...originQuestions,
																window_g_value: e.target.value,
															})
														}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<Select
														ariaLabel={'selection'}
														disabled={globalReadOnly}
														list={selection4}
														value={originQuestions.shades}
														onChange={(e: any) =>
															setOriginQuestions({
																...originQuestions,
																shades: e.target.value,
															})
														}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<Select
														ariaLabel={'selection'}
														list={selection4}
														disabled={globalReadOnly}
														value={originQuestions.cop}
														onChange={(e: any) =>
															setOriginQuestions({
																...originQuestions,
																cop: e.target.value,
															})
														}
													/>
												</td>
											</tr>
										</tbody>
									</table>
									<table>
										<thead>
											<tr>
												<th className='text-center px-2'>Cumple</th>
											</tr>
										</thead>
										<tbody className='text-center bold h5'>
											<tr>
												<td>
													<ToggleYesNoButton
														blocked
														forceYes={complies.wall_window_proportion}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<ToggleYesNoButton
														blocked
														forceYes={complies.wall_u_value}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<ToggleYesNoButton
														blocked
														forceYes={complies.wall_reflectance}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<ToggleYesNoButton
														blocked
														forceYes={complies.roof_u_value}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<ToggleYesNoButton
														blocked
														forceYes={complies.roof_reflectance}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<ToggleYesNoButton
														blocked
														forceYes={complies.window_u_value}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<ToggleYesNoButton
														blocked
														forceYes={complies.window_g_value}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<ToggleYesNoButton
														blocked
														forceYes={complies.shades}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<ToggleYesNoButton
														blocked
														forceYes={complies.cop}
													/>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<div className='d-flex justify-content-center'>
									<table>
										<Questions />
									</table>
								</div>
							</CardBody>
						</Card>
						<ResultSuccessModal
							modalStatus={modalStatus}
							setModalStatus={setModalStatus}
							projectEntity={projectEntity}
						/>
						<ResultErrorModal
							modalStatus={modalError}
							setModalStatus={setModalError}
							projectEntity={projectEntity}
						/>
						<TechnicalSupportInfoModal
							modalStatus={technicalSupportModal}
							setModalStatus={setTechnicalSupportModal}
							projectEntity={projectEntity}
							onAccept={proceedToFinish}
						/>
						<Card>
							<CardFooter className='justify-content-center'>
								<ShowButtons />
							</CardFooter>
						</Card>
					</div>
				)}
			</Page>
		</PageWrapper>
	);
};

export default PackagesPage;

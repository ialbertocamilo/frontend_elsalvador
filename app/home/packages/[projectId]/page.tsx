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
import { ResultSuccessModal } from '../../../../components/modals/ResultSuccessModal';
import { ResultErrorModal } from '../../../../components/modals/ResultErrorModal';
import { GoProjectButton } from '../../../../components/buttons/GoProjectButton';
import { IPackageOriginQuestions, ITechnicalSupport } from '../../../../common/types/package.types';
import { TechnicalSupportInfoModal } from '../../../../components/modals/TechnicalSupportInfoModal';
import { RoutesList } from '../../../../common/constants/default';
import Spinner from '../../../../components/bootstrap/Spinner';
import { keyList, ProjectStatus } from '../../../../common/constants/lists';
import { IQuestion } from '../../../../common/types/question.types';
import { useGlobalStatus } from '../../../../hooks/useGlobalStatus';
import { BuildingClassification } from '../../../../common/types/building.types';
import { ResultValues } from '../../../../components/packages/ResultValues';
import { selectDepartmenFromJson, selectMunicipalityFromJson } from '../../../../helpers/helpers';

const keyName = keyList.package;
const PackagesPage = () => {
	const [modalStatus, setModalStatus] = useState(false);
	const [packagesSelect, setPackagesSelect] = useState<any[]>();
	const [packages, setPackages] = useState<any[]>();
	const [packageInfo, setPackageInfo] = useState<IConfigurationType>();
	const [questions, setQuestions] = useState<IQuestion[]>([]);
	const params = useParams();

	const { projectEntity, totalCalculatedValues, setProjectData } = useProjectData(
		params?.projectId as string,
	);

	const { globalReadonly } = useGlobalStatus(params?.projectId as string);

	useEffect(() => {
		if (projectEntity) {
			setDepartment(selectDepartmenFromJson(Number(projectEntity.department)));
			setMunicipalites(
				selectMunicipalityFromJson(
					Number(projectEntity.municipality),
					Number(projectEntity.department),
				),
			);
		}
	}, [projectEntity]);

	useEffect(() => {
		Promise.all([
			DataService.getPackagesConfig(),
			DataService.loadPackageByProjectId(params?.projectId as string), // Cargar paquete previamente guardado
			DataService.getProjectStatus(params?.projectId as string),
		]).then((data) => {
			setLoading(false);
			if (data.length > 0) {
				if (data[0]) {
					const packages = data[0]?.config as IConfigurationType[];
					const newPackages = packages?.filter(
						(value) =>
							Number(value?.building_classification) ==
							Number(projectEntity?.building_classification),
					);
					const questions = data[0]?.questions as IQuestion[];

					const questionsActivated = questions?.filter((value) => !value.deactivated);
					const packagesActivated = newPackages?.filter((value) => value.package_status);

					setPackagesSelect(
						packagesActivated?.map((val, index) => {
							return {
								value: index,
								text: `${val.package_id} - ${val.package_name}`,
							};
						}),
					);
					setPackages(packagesActivated);
					setQuestions(questionsActivated);
				}
				if (data[1]) {
					const packageFinded = data[1] as ITechnicalSupport;
					formik.setValues({
						cop: packageFinded.reportedValue.cop.toString(),
						walls_reflectance: packageFinded.reportedValue.wall_reflectance.toString(),
						roofs_reflectance: packageFinded.reportedValue.roof_reflectance.toString(),
						building_classification:
							packageFinded.reportedValue.building_classification,
					});
					setOriginQuestions(packageFinded?.valueOrigin);
					if (packageFinded?.questions) setQuestions(packageFinded?.questions);
				}
				if (data[2]) {
					setProjectStatus(data[2]);
				}
			}
		});
	}, [projectEntity]);

	const [projectStatus, setProjectStatus] = useState(0);
	useEffect(() => {
		selectPackage(0);
	}, [packages]);
	const reportedValues = {
		walls_reflectance: '',
		roofs_reflectance: '',
		cop: '',
		building_classification: 0,
	};
	const formik = useFormik({
		initialValues: reportedValues,
		onSubmit: async (values) => {},
	});

	const selection = [
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
		{
			value: 4,
			text: 'Certificado producto (%)',
		},
		{
			value: 5,
			text: 'Certificado producto (g)',
		},
		{
			value: 6,
			text: 'Certificado producto (CS)',
		},
		{
			value: 7,
			text: 'Certificado producto (CS)',
		},
		{
			value: 8,
			text: 'Ficha técnica',
		},
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
		building_classification: false,
	});

	const initialOriginQuestions = {
		wall_window_proportion: '1',
		wall_u_value: '1',
		wall_reflectance: '1',
		roof_u_value: '1',
		roof_reflectance: '1',
		window_u_value: '1',
		window_g_value: '1',
		shades: '1',
		cop: '1',
		building_classification: '1',
	};
	const [originQuestions, setOriginQuestions] =
		useState<IPackageOriginQuestions>(initialOriginQuestions);
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
			building_classification: BuildingClassification.households,
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
			building_classification: BuildingClassification.households,
		},
		valueOrigin: initialOriginQuestions,
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
		const resultQuestions = questionsResponse?.filter(
			(val) => Boolean(val?.value) != Boolean(val.response),
		);
		if (resultQuestions && resultQuestions?.length > 0) return false;
		return (
			Number(formik.values.walls_reflectance) <= Number(packageInfo?.walls_reflectance) &&
			Number(formik.values.roofs_reflectance) <= Number(packageInfo?.roofs_reflectance) &&
			Number(totalCalculatedValues?.shades) <= Number(packageInfo?.shades) &&
			Number(formik.values.cop) <= Number(packageInfo?.hvac) &&
			Number(totalCalculatedValues?.roof_u_value) <= Number(packageInfo?.roofs_u_value) &&
			Number(totalCalculatedValues?.wall_u_value) <= Number(packageInfo?.walls_u_value) &&
			Number(totalCalculatedValues?.wall_window_proportion) <=
				Number(packageInfo?.proportion_wall_window) &&
			Number(totalCalculatedValues?.window_g_value) <=
				Number(packageInfo?.shading_coefficient) &&
			Number(totalCalculatedValues?.window_u_value) <= Number(packageInfo?.windows_u_value)
		);
	}

	function verifyIfComplies() {
		setComplies({
			wall_window_proportion:
				Number(totalCalculatedValues?.wall_window_proportion) <=
				Number(packageInfo?.proportion_wall_window),
			wall_u_value:
				Number(totalCalculatedValues?.wall_u_value) <= Number(packageInfo?.walls_u_value),
			wall_reflectance: formik.values.walls_reflectance
				? Number(formik.values.walls_reflectance) <= Number(packageInfo?.walls_reflectance)
				: false,
			roof_u_value:
				Number(totalCalculatedValues?.roof_u_value) <= Number(packageInfo?.roofs_u_value),
			roof_reflectance: formik.values.roofs_reflectance
				? Number(formik.values.roofs_reflectance) <= Number(packageInfo?.roofs_reflectance)
				: false,
			window_u_value:
				Number(totalCalculatedValues?.window_u_value) <=
				Number(packageInfo?.windows_u_value),
			window_g_value:
				Number(totalCalculatedValues?.window_g_value) <=
				Number(packageInfo?.shading_coefficient),
			shades: Number(totalCalculatedValues?.shades) <= Number(packageInfo?.shades),
			cop: formik.values.cop ? Number(formik.values.cop) <= Number(packageInfo?.hvac) : false,
			building_classification:
				formik.values.building_classification === packageInfo?.building_classification,
		});
		setCanRequestTechnicalReport(false);
	}

	const [technicalSupportModal, setTechnicalSupportModal] = useState(false);

	function requestTechnicalSupport() {
		setTechnicalSupportModal(true);

		setLastResults({
			valueOrigin: originQuestions,
			packageName: projectEntity?.project_name as string,
			questions: questionsResponse,
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
				building_classification: Number(packageInfo?.building_classification),
			},
			reportedValue: {
				wall_window_proportion: Number(totalCalculatedValues?.wall_window_proportion),
				wall_u_value: Number(totalCalculatedValues?.wall_u_value),
				wall_reflectance: Number(formik.values?.walls_reflectance),
				roof_u_value: Number(totalCalculatedValues?.roof_u_value),
				roof_reflectance: Number(formik.values?.roofs_reflectance),
				window_u_value: Number(totalCalculatedValues?.window_u_value),
				window_g_value: Number(totalCalculatedValues?.window_g_value),
				shades: Number(totalCalculatedValues?.shades),
				cop: Number(formik.values?.cop),
				building_classification: Number(formik.values?.building_classification),
			},
			meets: complies,
		});
	}

	const router = useRouter();

	async function proceedToFinish() {
		if (params?.projectId) {
			await DataService.setProjectStatus(
				params.projectId as string,
				ProjectStatus.inRevision,
			);
			await setProjectData(params.projectId, keyName, lastResults);
		}
		router.push(RoutesList.projects);
	}

	const [questionsResponse, setQuestionsResponse] = useState<IQuestion[]>();

	useEffect(() => {
		if (questions) setQuestionsResponse(questions);
	}, [questions]);

	function saveQuestionsResponse(index: number, state: boolean) {
		if (questions) {
			if (questionsResponse) {
				const newQuestionsResponse = questionsResponse.map((val, ind) => {
					if (ind == index) val.response = state;
					return val;
				});
				setQuestionsResponse(newQuestionsResponse);
				setCanRequestTechnicalReport(false);
			}
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
		if (projectStatus === ProjectStatus.accepted)
			return (
				<div className='justify-content-center text-center align-content-center'>
					✔ El proyecto ha sido aprobado ...
				</div>
			);
		else if (projectStatus === ProjectStatus.denied)
			return (
				<div className='justify-content-center text-center align-content-center'>
					❌ El proyecto ha sido rechazado ...
				</div>
			);
		else if (projectStatus === ProjectStatus.inRevision)
			return (
				<div className='justify-content-center text-center align-content-center'>
					ℹ️ El proyecto está en revisión ...
				</div>
			);

		return (
			<div>
				<Button
					color='success'
					hidden={globalReadonly}
					icon='CheckCircle'
					onClick={requestResults}>
					Solicitar resultados
				</Button>
				<Button
					color='storybook'
					icon='Analytics'
					hidden={!canRequestTechnicalReport}
					className='ms-2'
					onClick={requestTechnicalSupport}>
					Solicitar Informe Técnico
				</Button>
			</div>
		);
	};

	const [municipalites, setMunicipalites] = useState<string>();
	const [department, setDepartment] = useState<string>();
	return (
		<PageWrapper>
			<Page className='mx-3'>
				{CheckLoad()}
				{!loading && (
					<div>
						<GoProjectButton />
						<div className='row '>
							<div className='col display-4 fw-bold py-3 text-primary-emphasis'>
								Paquetes de Medidas de Eficiencias Energéticas
							</div>
						</div>

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
												disabled={globalReadonly}
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
								<div className='row mb-1 row-cols-2 align-baseline align-items-center center justify-content-center  '>
									<div className='col-2'>
										<p>Departamento</p>
									</div>
									<div className='col'>
										<FormGroup>
											<Input
												type='text'
												className='text-center bg-info-subtle'
												readOnly
												value={department}
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
												value={municipalites}
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<div className='d-flex justify-content-center align-items-baseline'>
									<ResultValues
										packageInfo={packageInfo}
										totalCalculatedValues={totalCalculatedValues}
										globalReadonly={globalReadonly}
										formik={formik}
										selection={selection}
										originQuestions={originQuestions}
										setOriginQuestions={setOriginQuestions}
										complies={complies}
									/>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<div className='d-flex justify-content-center'>
									<table>
										{questions?.map((value, key) => (
											<tr key={key}>
												<th className='text-start pe-5'>
													<p>{value.title}</p>
												</th>
												<th>
													<ToggleYesNoButton
														blocked={globalReadonly}
														keyName={key}
														forceYes={value?.response}
														emitValue={(index: any, val: any) =>
															saveQuestionsResponse(index, val)
														}
													/>
												</th>
											</tr>
										))}
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

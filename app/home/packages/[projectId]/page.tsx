// generate code sample for tsx
'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import React, { useEffect, useState } from 'react';
import Card, { CardBody, CardFooter } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Select from '../../../../components/bootstrap/forms/Select';
import { useParams } from 'next/navigation';
import DataService from '../../../../services/data/data.service';
import { IConfigurationType } from '../../../../common/types/configuration.types';
import { ToggleYesNoButton } from '../../../../components/buttons/ToggleYesNoButton';
import Button from '../../../../components/bootstrap/Button';
import Alert, { AlertHeading } from '../../../../components/bootstrap/Alert';
import Rodal from 'rodal';
import { useProjectData } from '../../../../hooks/useProjectData';
import { useFormik } from 'formik';
import { getItemFromMunicipalityList } from '../../../../helpers/helpers';
import InputGroup from '../../../../components/bootstrap/forms/InputGroup';

const keyName = 'packages';
const PackagesPage = () => {
	const [modalStatus, setModalStatus] = useState({ visible: false });
	const [packagesSelect, setPackagesSelect] = useState<any[]>();
	const [packages, setPackages] = useState<any[]>();
	const [packageInfo, setPackageInfo] = useState<IConfigurationType>();
	const [questions, setQuestions] = useState([]);
	const params = useParams();

	const { projectEntity, totalCalculatedValues } = useProjectData(params?.projectId as string);

	useEffect(() => {
		DataService.getPackagesConfig().then((data) => {
			const packages = data?.config as IConfigurationType[];

			setPackagesSelect(
				packages?.map((val, index) => {
					return { value: index, text: `Paquete ${index + 1}` };
				}),
			);
			setPackages(packages);
			setQuestions(Object.values(data?.questions));
		});
	}, []);

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

	function requestResults() {
		if (totalCalculatedValues) {
			if (
				Object.keys(totalCalculatedValues).length ==
					Object.values(totalCalculatedValues).length &&
				Object.keys(formik.values).length ==
					Object.values(formik.values).filter((val) => val).length
			) {
				if (
					formik.values.walls_reflectance == packageInfo?.walls_reflectance &&
					formik.values.roofs_reflectance == packageInfo?.roofs_reflectance &&
					formik.values.shades == packageInfo?.shades &&
					formik.values.cop == packageInfo?.hvac &&
					totalCalculatedValues.roof_u_value == packageInfo?.roofs_u_value &&
					totalCalculatedValues.wall_u_value == packageInfo?.walls_u_value &&
					totalCalculatedValues.wall_window_proportion ==
						packageInfo?.proportion_wall_window &&
					totalCalculatedValues.window_g_value == packageInfo?.shading_coefficient &&
					totalCalculatedValues.window_u_value == packageInfo?.windows_u_value
				)
					setModalStatus({ visible: true });
			}
		}
	}

	return (
		<PageWrapper>
			<Page className='mx-3'>
				<Card>
					<CardBody>
						<h4 className='fw-bold'>Paquetes de medidas EE para oficinas</h4>
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
										onChange={(e: any) => {
											if (packages) {
												setPackageInfo(packages[e.target.value]);
											}
										}}
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
										className='text-center'
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
										className='text-center'
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
										<td className='p-4'>Sombras (Ventanas exteriores)</td>
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
												value={totalCalculatedValues?.wall_u_value}></Input>
										</td>
									</tr>
									<tr>
										<td width='150'>
											<InputGroup>
												<Input
													type='number'
													className='text-center'
													name='walls_reflectance'
													onChange={formik.handleChange}
													value={formik.values.walls_reflectance}></Input>
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
												value={totalCalculatedValues?.roof_u_value}></Input>
										</td>
									</tr>
									<tr>
										<td width='150'>
											<InputGroup>
												<Input
													type='number'
													className='text-center'
													name='roofs_reflectance'
													onChange={formik.handleChange}
													value={formik.values.roofs_reflectance}></Input>
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
												onChange={formik.handleChange}
												value={formik.values.cop}></Input>
										</td>
									</tr>
								</tbody>
							</table>
							<table className=' px-5 mx-2'>
								<thead>
									<tr>
										<th className='text-center'>Origen de los valores</th>
									</tr>
								</thead>
								<tbody className='align-items-baseline'>
									<tr>
										<td>
											<Select ariaLabel={'selection'} list={selection1} />
										</td>
									</tr>
									<tr>
										<td>
											<Select ariaLabel={'selection'} list={selection1} />
										</td>
									</tr>
									<tr>
										<td>
											<Select ariaLabel={'selection'} list={selection2} />
										</td>
									</tr>
									<tr>
										<td>
											<Select ariaLabel={'selection'} list={selection1} />
										</td>
									</tr>
									<tr>
										<td>
											<Select ariaLabel={'selection'} list={selection2} />
										</td>
									</tr>
									<tr>
										<td>
											<Select ariaLabel={'selection'} list={selection5} />
										</td>
									</tr>
									<tr>
										<td>
											<Select ariaLabel={'selection'} list={selection3} />
										</td>
									</tr>
									<tr>
										<td>
											<Select ariaLabel={'selection'} list={selection4} />
										</td>
									</tr>
									<tr>
										<td>
											<Select ariaLabel={'selection'} list={selection4} />
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
											<ToggleYesNoButton blocked />
										</td>
									</tr>
									<tr>
										<td>
											<ToggleYesNoButton blocked />
										</td>
									</tr>
									<tr>
										<td>
											<ToggleYesNoButton blocked />
										</td>
									</tr>
									<tr>
										<td>
											<ToggleYesNoButton blocked />
										</td>
									</tr>
									<tr>
										<td>
											<ToggleYesNoButton blocked />
										</td>
									</tr>
									<tr>
										<td>
											<ToggleYesNoButton blocked />
										</td>
									</tr>
									<tr>
										<td>
											<ToggleYesNoButton blocked />
										</td>
									</tr>
									<tr>
										<td>
											<ToggleYesNoButton blocked />
										</td>
									</tr>
									<tr>
										<td>
											<ToggleYesNoButton blocked />
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
								{questions.map((value, key) => (
									<tr key={key}>
										<th className='text-start pe-5'>
											<p>{value}</p>
										</th>
										<th>
											<ToggleYesNoButton />
										</th>
									</tr>
								))}
							</table>
						</div>
					</CardBody>

					<Rodal
						visible={modalStatus.visible}
						height={350}
						onClose={() => setModalStatus({ visible: false })}>
						<Alert
							icon='Verified'
							isLight
							color='primary'
							borderWidth={0}
							className='shadow-3d-primary'>
							<AlertHeading tag='h2' className='h4'>
								Aprobado! ✔
							</AlertHeading>
							<span>
								Proyecto{' '}
								<span className='bold h6'>{projectEntity?.project_name}</span> ha
								sido aprobado.
							</span>
						</Alert>
						<div>
							<h5>Detalles</h5>
							<p>
								Nombre del propietario:{' '}
								<span className='bold h5'>
									{projectEntity?.owner_name} {projectEntity?.owner_lastname}
								</span>
							</p>
							<p>
								Nombre del diseñador:{' '}
								<span className='bold h5'>{projectEntity?.designer_name}</span>
							</p>
							<p>
								Director de obra:{' '}
								<span className='bold h5'>{projectEntity?.project_director}</span>
							</p>
							<span className='text-muted'>
								El proyecto ha sido aprobado según los parametros registrados en la
								plataforma.
							</span>
						</div>
						<br />
					</Rodal>
				</Card>

				<Card>
					<CardFooter className='justify-content-center'>
						<div>
							<Button color='primary' icon='CheckCircle' onClick={requestResults}>
								Solicitar resultados
							</Button>
							<Button color='storybook' icon='Analytics' className='ms-2'>
								Solicitar Informe Técnico
							</Button>
						</div>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default PackagesPage;

// generate code sample for tsx
'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import React, { useEffect, useState } from 'react';
import Card, { CardBody, CardFooter } from '../../../../components/bootstrap/Card';
import { ButtonTypes, SaveProjectButton } from '../../../../components/buttons/SaveProjectButton';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Select from '../../../../components/bootstrap/forms/Select';
import { useParams } from 'next/navigation';
import DataService from '../../../../services/data/data.service';
import { IConfigurationType } from '../../../../common/types/configuration.types';
import { ToggleYesNoButton } from '../../../../components/buttons/ToggleYesNoButton';

const keyName = 'packages';
const PackagesPage = () => {
	const [packagesSelect, setPackagesSelect] = useState<any[]>();
	const [packages, setPackages] = useState<any[]>();
	const [packageInfo, setPackageInfo] = useState<IConfigurationType>();
	const [questions, setQuestions] = useState([]);
	useEffect(() => {
		DataService.getPackagesConfig().then((data) => {
			console.log(Object.values(data?.questions));
			setQuestions(Object.values(data?.questions));
		});
		DataService.getAllPackages().then((data) => {
			setPackagesSelect(
				data.map((val, index) => {
					return { value: index, text: `Paquete ${index + 1}` };
				}),
			);
			setPackages(data);
		});
	}, []);

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
	const params = useParams();
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
									<Input type='text' />
								</FormGroup>
							</div>
						</div>
						<div className='row mb-1 row-cols-2  align-baseline align-items-center center justify-content-center '>
							<div className='col-2'>
								<p>Municipio</p>
							</div>
							<div className='col'>
								<FormGroup>
									<Input type='text' />
								</FormGroup>
							</div>
						</div>

						<div className='row mb-1 row-cols-2 align-baseline align-items-center center justify-content-center '>
							<div className='col-2'>
								<p>Evaluado por</p>
							</div>
							<div className='col'>
								<FormGroup>
									<Input type='text' />
								</FormGroup>
							</div>
						</div>

						<div className='row mb-1 row-cols-2 align-baseline align-items-center center justify-content-center '>
							<div className='col-2'>
								<p>Revisado por</p>
							</div>
							<div className='col'>
								<FormGroup>
									<Input type='text' />
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
										<td>{packageInfo?.proportion_wall_window || '-'}</td>
									</tr>
									<tr>
										<td>{packageInfo?.walls_u_value || '-'}</td>
									</tr>
									<tr>
										<td>{packageInfo?.walls_reflectance || '-'}</td>
									</tr>
									<tr>
										<td>{packageInfo?.roofs_u_value || '-'}</td>
									</tr>
									<tr>
										<td>{packageInfo?.roofs_reflectance || '-'}</td>
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
											<Input
												type='number'
												className='text-center'
												name='walls_u_value'></Input>
										</td>
									</tr>
									<tr>
										<td width='150'>
											<Input
												type='number'
												className='text-center'
												name='walls_u_value'></Input>
										</td>
									</tr>
									<tr>
										<td width='150'>
											<Input
												type='number'
												className='text-center'
												name='walls_u_value'></Input>
										</td>
									</tr>
									<tr>
										<td width='150'>
											<Input
												type='number'
												className='text-center'
												name='walls_u_value'></Input>
										</td>
									</tr>
									<tr>
										<td width='150'>
											<Input
												type='number'
												className='text-center'
												name='walls_u_value'></Input>
										</td>
									</tr>
									<tr>
										<td width='150'>
											<Input
												type='number'
												className='text-center'
												name='walls_u_value'></Input>
										</td>
									</tr>
									<tr>
										<td width='150'>
											<Input
												type='number'
												className='text-center'
												name='walls_u_value'></Input>
										</td>
									</tr>
									<tr>
										<td width='150'>
											<Input
												type='number'
												className='text-center'
												name='walls_u_value'></Input>
										</td>
									</tr>
									<tr className='p-4'>
										<td width='150'>
											<Input
												type='number'
												className='text-center'
												name='walls_u_value'></Input>
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
					<CardFooter>
						<SaveProjectButton
							payload={{
								payload: {},
								key: keyName,
							}}
							type={ButtonTypes.packageConfig}
						/>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default PackagesPage;

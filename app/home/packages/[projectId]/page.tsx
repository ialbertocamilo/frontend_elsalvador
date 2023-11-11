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

const keyName = 'packages';
const PackagesPage = () => {
	const [packagesSelect, setPackagesSelect] = useState<any[]>();
	const [packages, setPackages] = useState<any[]>();
	const [packageInfo, setPackageInfo] = useState<IConfigurationType>();
	useEffect(() => {
		DataService.getAllPackages().then((data) => {
			setPackagesSelect(
				data.map((val, index) => {
					return { value: index, text: `Paquete ${index + 1}` };
				}),
			);
			setPackages(data);
		});
	}, []);

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
						<div className='d-flex'>
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
										<td className='p-4'>Muros valor U</td>
									</tr>
									<tr>
										<td className='p-4'>Muros reflactancia</td>
									</tr>
									<tr>
										<td className='p-4'>Techos valor U</td>
									</tr>
									<tr>
										<td className='p-4'>Techos reflectancia</td>
									</tr>
									<tr>
										<td className='p-4'>Ventanas valor U</td>
									</tr>
									<tr>
										<td className='p-4'>Ventanas valor G</td>
									</tr>
									<tr>
										<td className='p-4'>Sombras</td>
									</tr>
									<tr>
										<td className='p-4'>Aire acondicionado COP</td>
									</tr>
								</tbody>
							</table>
							<table>
								<thead>
									<tr>
										<th className='text-center'>Valor meta</th>
										<th className='text-center'>Valor Reportado</th>
										<th className='text-center'>Origen de los valores</th>
										<th className='text-center'>Cumple</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{packageInfo?.proportion_wall_window}</td>
									</tr>
									<tr>
										<td>{packageInfo?.walls_u_value}</td>
									</tr>
									<tr>
										<td>{packageInfo?.walls_reflectance}</td>
									</tr>
									<tr>
										<td>{packageInfo?.roofs_u_value}</td>
									</tr>
									<tr>
										<td>{packageInfo?.roofs_reflectance}</td>
									</tr>
									<tr>
										<td>{packageInfo?.windows_u_value}</td>
									</tr>
									<tr>
										<td>{packageInfo?.shading_coefficient}</td>
									</tr>
									<tr>
										<td>{packageInfo?.shades}</td>
									</tr>
									<tr>
										<td>{packageInfo?.hvac}</td>
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

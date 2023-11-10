// generate code sample for tsx
'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import React from 'react';
import Card, { CardBody, CardFooter } from '../../../../components/bootstrap/Card';
import { ButtonTypes, SaveProjectButton } from '../../../../components/buttons/SaveProjectButton';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Select from '../../../../components/bootstrap/forms/Select';
import { NextButton } from '../../../../components/buttons/NextButton';
import { RoutesListWithParams } from '../../../../common/constants/default';
import { useParams, useRouter } from 'next/navigation';
import Button from '../../../../components/bootstrap/Button';

const keyName = 'packages';
const PackagesPage = () => {
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
									<Select ariaLabel='packages' />
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
					<CardBody>dw</CardBody>
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

						<NextButton
							route={RoutesListWithParams.configuration(params?.projectId)}
							text='Siguiente (configuración)'
						/>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default PackagesPage;

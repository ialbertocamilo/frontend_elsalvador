'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import { RoutesList, RoutesListWithParams } from '../../../../common/constants/default';

const LocationPage = () => {
	const router = useRouter();

	const param = useParams();
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<h4 className='fw-bold'>Calculadoras</h4>
						<span>Selecciona una de las calculadoras que usarás</span>
					</CardBody>
				</Card>
				<Card>
					<CardBody>
						<div className='row justify-content-center '>
							<Card
								style={{ width: '175px', height: '100px' }}
								className='text-center p-2 mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover pointer-event'
								color='primary'
								onClick={() =>
									router.push(
										RoutesListWithParams.calculatorProportion(param?.projectId),
									)
								}>
								Calculo de proporcion muro ventana
							</Card>
							<Card
								style={{ width: '175px', height: '100px ' }}
								color='bg-primary'
								onClick={() =>
									router.push(
										RoutesListWithParams.calculatorTransmittance(
											param?.projectId,
										),
									)
								}
								className='text-center p-2 mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover pointer-event'>
								Calculo de transmitancia termica de muros
							</Card>
							<Card
								style={{ width: '175px', height: '100px' }}
								onClick={() =>
									router.push(
										RoutesListWithParams.calculatorWindow(param?.projectId),
									)
								}
								className='text-center mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover pointer-event'>
								Calculo de ventanas
							</Card>
							<Card
								style={{ width: '175px', height: '100px' }}
								onClick={() =>
									router.push(
										RoutesListWithParams.calculatorShading(param?.projectId),
									)
								}
								className='text-center mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover pointer-event'>
								Calculo elementos de sombreado
							</Card>
						</div>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default LocationPage;

'use client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { useRouter } from 'next/navigation';
import React from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import { RoutesList } from '../../../common/constants/default';

const LocationPage = () => {
	const router = useRouter();

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
								className='text-center p-2 mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover cursor-pointer'
								color='primary'
								onClick={() => router.push(RoutesList.calculatorProportion)}>
								Calculo de proporcion muro ventana
							</Card>
							<Card
								style={{ width: '175px', height: '100px ' }}
								color='bg-primary'
								onClick={() => router.push(RoutesList.calculatorTransmittance)}
								className='text-center p-2 mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover cursor-pointer'>
								Calculo de transmitancia termica de muros
							</Card>{' '}
							<Card
								style={{ width: '175px', height: '100px ' }}
								color='bg-primary'
								onClick={() => router.push(RoutesList.calculatorTransmittanceRoofs)}
								className='text-center p-2 mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover cursor-pointer'>
								Calculo de transmitancia termica de techos
							</Card>
							<Card
								style={{ width: '175px', height: '100px' }}
								onClick={() => router.push(RoutesList.calculatorWindow)}
								className='text-center mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover cursor-pointer'>
								Calculo de ventanas
							</Card>
							<Card
								style={{ width: '175px', height: '100px' }}
								onClick={() => router.push(RoutesList.calculatorShading)}
								className='text-center mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover cursor-pointer'>
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

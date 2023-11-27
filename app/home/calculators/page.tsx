'use client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { useRouter } from 'next/navigation';
import React from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { RoutesList } from '../../../common/constants/default';
import Button from '../../../components/bootstrap/Button';

const LocationPage = () => {
	const router = useRouter();

	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<div className='display-4 fw-bold py-3 text-primary-emphasis'>
							Calculadoras
						</div>
						<span>Selecciona una de las calculadoras que usarás</span>
					</CardBody>
				</Card>
				<div className='row '>
					<div className='col-md-3 h-50'>
						<Card
							className='shadow-3d-up-hover cursor-pointer card-stretch-full'
							onClick={() => router.push(RoutesList.calculatorProportion)}>
							<CardHeader>
								<CardLabel>
									<CardTitle>Calculo de proporcion muro ventana</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										icon='NavigateNext'
										className='btn btn-hover-shadow btn-only-icon'
										aria-label='read-more'></Button>
								</CardActions>
							</CardHeader>
						</Card>
					</div>
					<div className='col-md-3 h-50'>
						<Card
							onClick={() => router.push(RoutesList.calculatorTransmittance)}
							className='shadow-3d-up-hover cursor-pointer card-stretch-full'>
							<CardHeader>
								<CardLabel>
									<CardTitle>Calculo de transmitancia termica de muros</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										icon='NavigateNext'
										className='btn btn-hover-shadow btn-only-icon'
										aria-label='read-more'></Button>
								</CardActions>
							</CardHeader>
						</Card>
					</div>
					<div className='col-md-3 h-50'>
						<Card
							onClick={() => router.push(RoutesList.calculatorTransmittanceRoofs)}
							className='shadow-3d-up-hover cursor-pointer card-stretch-full'>
							<CardHeader>
								<CardLabel>
									<CardTitle>
										Calculo de transmitancia termica de techos
									</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										icon='NavigateNext'
										className='btn btn-hover-shadow btn-only-icon'
										aria-label='read-more'></Button>
								</CardActions>
							</CardHeader>
						</Card>
					</div>
					<div className='col-md-3 h-50'>
						<Card
							onClick={() => router.push(RoutesList.calculatorWindow)}
							className='shadow-3d-up-hover cursor-pointer card-stretch-full'>
							<CardHeader>
								<CardLabel>
									<CardTitle>Calculo de ventanas</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										icon='NavigateNext'
										className='btn btn-hover-shadow btn-only-icon'
										aria-label='read-more'></Button>
								</CardActions>
							</CardHeader>
						</Card>
					</div>
					<div className='col-md-3 h-50'>
						<Card
							onClick={() => router.push(RoutesList.calculatorShading)}
							className='shadow-3d-up-hover cursor-pointer card-stretch-full'>
							<CardHeader>
								<CardLabel>
									<CardTitle>Calculo elementos de sombreado</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										icon='NavigateNext'
										className='btn btn-hover-shadow btn-only-icon'
										aria-label='read-more'></Button>
								</CardActions>
							</CardHeader>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default LocationPage;

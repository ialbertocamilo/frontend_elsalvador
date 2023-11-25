'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import React from 'react';
import { ShadingTable } from '../../../../components/tables/ShadingTable';
import { CustomEditor } from '../../../../components/extras/CustomEditor';
import Label from '../../../../components/bootstrap/forms/Label';
import { GoProjectButton } from '../../../../components/buttons/GoProjectButton';

const ShadingPage = () => {
	return (
		<PageWrapper>
			<Page>
				<GoProjectButton />
				<div className='row '>
					<div className='col display-4 fw-bold py-3 text-primary-emphasis'>
						Cálculo elementos de sombreado
					</div>
					<span>Horizontales, verticales o combinados</span>
				</div>
				<br />
				<Card>
					<CardBody>
						<h5 className='fw-bold'>Detalles de los elementos de sombreado</h5>
						<Card>
							<CardBody>
								<Label className={'caption-top '}>
									Detalle fachada Norte. Sombra en ventanas
								</Label>
								<CustomEditor placeholder='Detalle fachada Norte. Sombra en ventanas' />
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<Label className={'caption-top '}>
									Detalle fachada Este. Sombra en ventanas
								</Label>
								<CustomEditor placeholder='Detalle fachada Este. Sombra en ventanas' />
							</CardBody>
						</Card>
						<Card>
							<Label className={'caption-top '}>
								Detalle fachada Sur. Sombra en ventanas
							</Label>
							<CardBody>
								<CustomEditor placeholder='Detalle fachada Sur. Sombra en ventanas' />
							</CardBody>
						</Card>
						<Card>
							<Label className={'caption-top '}>
								Detalle fachada Oeste. Sombra en ventanas
							</Label>
							<CardBody>
								<CustomEditor placeholder='Detalle fachada Oeste. Sombra en ventanas' />
							</CardBody>
						</Card>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default ShadingPage;

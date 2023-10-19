'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import React, { useState } from 'react';
import Input from '../../../../components/bootstrap/forms/Input';
import { TransmittanceTable } from '../../../../components/tables/TransmittanceTable';
import { useParams } from 'next/navigation';

const TransmittancePage = () => {
	const [wallName, setWallName] = useState('');

	const params = useParams();
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<h4 className='fw-bold'>Cálculo de transmitancia térmica de muros</h4>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<div className='row'>
							<div className='flex-column col-md-2 col-sm-12 align-self-center'>
								<span>Nombre de muro tipo 1</span>
							</div>
							<div className='col-md-6 col-sm-12'>
								<Input
									placeholder='Ingresa el nombre del muro'
									onChange={(e: any) => setWallName(e.target.value)}
									value={wallName}></Input>
							</div>
						</div>
					</CardBody>
				</Card>
				<Card className='col'>
					<CardBody className='align-self-center'>
						<TransmittanceTable />
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default TransmittancePage;

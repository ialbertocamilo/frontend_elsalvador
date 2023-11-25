'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import React, { useState } from 'react';
import Button from '../../../../components/bootstrap/Button';
import { ProportionTable } from '../../../../components/tables/ProportionTable';
import { useParams } from 'next/navigation';
import { GoProjectButton } from '../../../../components/buttons/GoProjectButton';

const ProportionPage = () => {
	const keyName = 'proportion';
	const params = useParams();
	const [data, setData] = useState({});
	return (
		<PageWrapper>
			<Page>
				<GoProjectButton />
				<div className='row '>
					<div className='col display-4 fw-bold py-3 text-primary-emphasis'>
						Cálculo de proporción muro ventana
					</div>
					<span>
						Ingresar Información requerida en las celdas indicadas. Considerar que la
						información introducida es responsabilidad de quien la reporta y será
						verificada por la entidad correspondiente.
					</span>
				</div>
				<br />
				<Card className='col'>
					<CardBody className='align-self-center'>
						<ProportionTable
							onData={(e: any) => {
								setData(e);
							}}
							keyName={keyName}
						/>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default ProportionPage;

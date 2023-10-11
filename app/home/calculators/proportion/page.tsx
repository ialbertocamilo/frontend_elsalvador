'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import React, { useState } from 'react';
import Button from '../../../../components/bootstrap/Button';
import { ProportionTable } from '../../../../components/tables/ProportionTable';
import { useParams } from 'next/navigation';

const ProportionPage = () => {
	const keyName = 'proportion';
	const params = useParams();
	const [data, setData] = useState({});
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<h4 className='fw-bold'>Proporción muro ventana</h4>
						<span>
							Ingresar Información requerida en las celdas indicadas. Considerar que
							la información introducida es responsabilidad de quien la reporta y será
							verificada por la entidad correspondiente.
						</span>
					</CardBody>
				</Card>
				<div className='row  px-2'>
					<Card className='col me-2'>
						<CardBody>
							<ProportionTable
								onData={(e: any) => {
									setData(e);
								}}
								keyName={keyName}
							/>
						</CardBody>
					</Card>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ProportionPage;

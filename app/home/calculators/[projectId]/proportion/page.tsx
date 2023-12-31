'use client';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../../layout/Page/Page';
import Card, { CardBody, CardFooter } from '../../../../../components/bootstrap/Card';
import React, { useState } from 'react';
import { ProportionTable } from '../../../../../components/tables/ProportionTable';
import {
	ButtonTypes,
	SaveProjectButton,
} from '../../../../../components/buttons/SaveProjectButton';
import { useParams, useRouter } from 'next/navigation';
import BackToCalculatorsBtn from '../../../../../components/buttons/BackToCalculatorsBtn';
import FileUploader from '../../../../../components/extras/FileUploader';
import Button from '../../../../../components/bootstrap/Button';
import { RoutesListWithParams } from '../../../../../common/constants/default';
import { NextButton } from '../../../../../components/buttons/NextButton';
import Icon from '../../../../../components/icon/Icon';
import { GoProjectButton } from '../../../../../components/buttons/GoProjectButton';
import { useGlobalStatus } from '../../../../../hooks/useGlobalStatus';

const ProportionPage = () => {
	const keyName = 'proportion';
	const params = useParams();
	const router = useRouter();

	const [data, setData] = useState<any>({});
	const { globalReadonly } = useGlobalStatus(params?.projectId as string);
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
				<div className='row align-content-between justify-content-between px-2'>
					<Card className='col me-2'>
						<CardBody>
							<ProportionTable
								readOnly={globalReadonly}
								onData={(e: any) => {
									setData(e);
								}}
								keyName={keyName}
							/>
						</CardBody>
					</Card>
					<Card className='col-md-3'>
						<CardBody>
							<h4>Documentación entregada</h4>
							<span>Planos de Fachada con dimensiones de ventanas y generales</span>
							<br />
							<FileUploader
								projectId={params?.projectId as string}
								keyName={keyName}
							/>
						</CardBody>
					</Card>
				</div>

				<Card>
					<CardFooter>
						<>
							{!globalReadonly && (
								<SaveProjectButton
									payload={{
										project_id: params?.projectId || '',
										payload: data,
										key: keyName,
									}}
									type={ButtonTypes.projectData}
								/>
							)}
						</>

						<BackToCalculatorsBtn />
						<Button
							color='link'
							className='mx-1 col-2 m-0 p-0'
							onClick={() =>
								router.push(RoutesListWithParams.packages(params?.projectId))
							}>
							<span className='text-start'>
								<Icon icon='Backpack' />
								Paquetes
							</span>
						</Button>
						<NextButton
							route={RoutesListWithParams.calculatorTransmittance(params?.projectId)}
							text='Siguiente'
						/>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default ProportionPage;

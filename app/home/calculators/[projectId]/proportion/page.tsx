'use client';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../../layout/Page/Page';
import Card, { CardBody, CardFooter } from '../../../../../components/bootstrap/Card';
import React, { useEffect, useState } from 'react';
import Button from '../../../../../components/bootstrap/Button';
import { ProportionTable } from '../../../../../components/tables/ProportionTable';
import {
	ButtonTypes,
	SaveProjectButton,
} from '../../../../../components/buttons/SaveProjectButton';
import { useParams } from 'next/navigation';
import BackToCalculatorsBtn from '../../../../../components/buttons/BackToCalculatorsBtn';
import { useProjects } from '../../../../../services/project/project.service';
import Input from '../../../../../components/bootstrap/forms/Input';
import { DownloadFileBtn } from '../../../../../components/buttons/DownloadFileBtn';
import UploadFileBtn from '../../../../../components/buttons/UploadFileBtn';

const ProportionPage = () => {
	const keyName = 'proportion';
	const params = useParams();
	const [data, setData] = useState<any>({});

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
				<div className='row align-content-between justify-content-between px-2'>
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
					<Card className='col-md-3'>
						<CardBody>
							<h4>Documentación entregada</h4>
							<span>Planos de Fachada con dimensiones de ventanas y generales</span>
							<br />
							<UploadFileBtn
								projectId={params?.projectId as string}
								keyName={keyName}
							/>
							<br />
							<DownloadFileBtn urlToFile='' />
						</CardBody>
					</Card>
				</div>

				<Card>
					<CardFooter>
						<SaveProjectButton
							payload={{
								project_id: params?.projectId || '',
								payload: data,
								key: keyName,
							}}
							type={ButtonTypes.projectData}
						/>

						<BackToCalculatorsBtn />
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default ProportionPage;

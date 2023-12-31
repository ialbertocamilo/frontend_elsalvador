'use client';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../../layout/Page/Page';
import Card, { CardBody, CardFooter } from '../../../../../components/bootstrap/Card';
import React, { useEffect, useRef, useState } from 'react';
import Input from '../../../../../components/bootstrap/forms/Input';
import { TransmittanceTable } from '../../../../../components/tables/TransmittanceTable';
import { CustomEditor } from '../../../../../components/extras/CustomEditor';
import {
	ButtonTypes,
	SaveProjectButton,
} from '../../../../../components/buttons/SaveProjectButton';
import { useParams, useRouter } from 'next/navigation';
import BackToCalculatorsBtn from '../../../../../components/buttons/BackToCalculatorsBtn';
import FileUploader from '../../../../../components/extras/FileUploader';
import { useProjects } from '../../../../../services/project/project.service';
import { NextButton } from '../../../../../components/buttons/NextButton';
import { RoutesListWithParams } from '../../../../../common/constants/default';
import Button from '../../../../../components/bootstrap/Button';

import Icon from '../../../../../components/icon/Icon';
import { GoProjectButton } from '../../../../../components/buttons/GoProjectButton';
import { ClientStorage } from '../../../../../common/classes/storage';
import { RoleType } from '../../../../../common/types/role.types';
import { useGlobalStatus } from '../../../../../hooks/useGlobalStatus';

const keyName = 'transmittance';
const TransmittancePage = () => {
	const params = useParams();
	const editor = useRef(null);
	const [wallName, setWallName] = useState('');

	const router = useRouter();
	const [data, setData] = useState();
	const [dataResult, setDataResult] = useState();
	const [editorText, setEditorText] = useState('');

	const projects = useProjects();
	const [initialData, setInitialData] = useState<any>({});

	const { globalReadonly } = useGlobalStatus(params?.projectId as string);
	useEffect(() => {
		projects
			.getProjectData({ project_id: params?.projectId as string, key: keyName })
			.then((data: any) => {
				if (data) {
					setInitialData(data.payload);
					setData(data?.payload?.data);
					setDataResult(data?.payload?.dataResult);
					setWallName(data?.payload?.wallName);
					setEditorText(data?.payload?.editorText);
				}
			});
	}, []);
	return (
		<PageWrapper>
			<Page>
				<GoProjectButton />
				<div className='row '>
					<div className='col display-4 fw-bold py-3 text-primary-emphasis'>
						Cálculo de transmitancia térmica de muros
					</div>
				</div>
				<br />
				<Card>
					<CardBody>
						<div className='row'>
							<div className='flex-column col-md-2 col-sm-12 align-self-center'>
								<span>Nombre de muro tipo 1</span>
							</div>
							<div className='col-md-6 col-sm-12'>
								<Input
									readOnly={globalReadonly}
									placeholder='Ingresa el nombre del muro'
									onChange={(e: any) => setWallName(e.target.value)}
									value={wallName}></Input>
							</div>
							RSI 0.13 RSE 0.04
						</div>
					</CardBody>
				</Card>
				<div className='row align-content-between justify-content-between px-2'>
					<Card className='col me-2'>
						<CardBody>
							<TransmittanceTable
								onData={(e: any) => {
									setData(e);
								}}
								data={data}
								readOnly={globalReadonly}
							/>
						</CardBody>
					</Card>
					<Card className='col-md-3'>
						<CardBody>
							<h4>Documentación entregada</h4>
							<span>Planos de Fachada con dimensiones de ventanas y generales</span>
							<FileUploader
								projectId={params?.projectId as string}
								keyName={keyName}
							/>
						</CardBody>
					</Card>
				</div>
				<Card>
					<CardBody>
						<CustomEditor
							readOnly={globalReadonly}
							placeholder='Detalle muro tipo'
							initialText={editorText}
							setText={(e: string) => {
								setEditorText(e);
							}}
						/>
					</CardBody>
				</Card>

				<Card>
					<CardFooter>
						<>
							{!globalReadonly && (
								<SaveProjectButton
									payload={{
										project_id: params?.projectId || '',
										payload: { wallName, data, dataResult, editorText },
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
							route={RoutesListWithParams.calculatorTransmittanceRoofs(
								params?.projectId,
							)}
							text='Siguiente'
						/>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default TransmittancePage;

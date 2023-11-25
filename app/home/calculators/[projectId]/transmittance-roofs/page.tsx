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
import { keyList } from '../../../../../common/constants/lists';
import { TransmittanceRoofTable } from '../../../../../components/tables/TransmittanceRoofTable';
import { GoProjectButton } from '../../../../../components/buttons/GoProjectButton';
import { ClientStorage } from '../../../../../common/classes/storage';
import { RoleType } from '../../../../../common/types/role.types';

const keyName = keyList.roofs;
const TransmittancePage = () => {
	const router = useRouter();
	const params = useParams();
	const editor = useRef(null);
	const [wallName, setWallName] = useState('');

	const [data, setData] = useState();
	const [dataResult, setDataResult] = useState();
	const [editorText, setEditorText] = useState('');

	const projects = useProjects();
	const user = ClientStorage.getUser();
	const [initialData, setInitialData] = useState<any>({});
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
				<Card>
					<CardBody>
						<div className='d-flex justify-content-between'>
							<h4 className='fw-bold'> Cálculo de transmitancia térmica de techos</h4>
							<div className='col-6 text-end'>
								<GoProjectButton />
							</div>
						</div>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<div className='row'>
							<div className='flex-column col-md-2 col-sm-12 align-self-center'>
								<span>Nombre de techo tipo 1</span>
							</div>
							<div className='col-md-6 col-sm-12'>
								<Input
									placeholder='Ingresa el nombre del techo'
									onChange={(e: any) => setWallName(e.target.value)}
									value={wallName}></Input>
							</div>
							RSI 0.17 RSE 0.04
						</div>
					</CardBody>
				</Card>
				<div className='row align-content-between justify-content-between px-2'>
					<Card className='col me-2'>
						<CardBody>
							<TransmittanceRoofTable
								onData={(e: any) => {
									setData(e);
								}}
								data={data}
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
							placeholder='Detalle techo tipo'
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
							{user?.role === RoleType.agent && (
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
							route={RoutesListWithParams.calculatorWindow(params?.projectId)}
							text='Siguiente'
						/>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default TransmittancePage;

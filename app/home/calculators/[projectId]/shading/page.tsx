'use client';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../../layout/Page/Page';
import Card, { CardBody, CardFooter } from '../../../../../components/bootstrap/Card';
import React, { useEffect, useState } from 'react';
import { ShadingTable } from '../../../../../components/tables/ShadingTable';
import { CustomEditor } from '../../../../../components/extras/CustomEditor';
import Label from '../../../../../components/bootstrap/forms/Label';
import {
	ButtonTypes,
	SaveProjectButton,
} from '../../../../../components/buttons/SaveProjectButton';
import BackToCalculatorsBtn from '../../../../../components/buttons/BackToCalculatorsBtn';
import { useParams, useRouter } from 'next/navigation';
import { useProjects } from '../../../../../services/project/project.service';
import { NextButton } from '../../../../../components/buttons/NextButton';
import { RoutesListWithParams } from '../../../../../common/constants/default';
import Button from '../../../../../components/bootstrap/Button';

import Icon from '../../../../../components/icon/Icon';
import { GoProjectButton } from '../../../../../components/buttons/GoProjectButton';
import { ClientStorage } from '../../../../../common/classes/storage';
import { RoleType } from '../../../../../common/types/role.types';
import { useGlobalStatus } from '../../../../../hooks/useGlobalStatus';

const keyName = 'shading';
const ShadingPage = () => {
	const params = useParams();
	const projects = useProjects();

	const router = useRouter();
	const [textA, setTextA] = useState('');
	const [textB, setTextB] = useState('');
	const [textC, setTextC] = useState('');
	const [textD, setTextD] = useState('');
	const [data, setData] = useState<any>();
	const [result, setResult] = useState();

	const user = ClientStorage.getUser();

	useEffect(() => {
		projects
			.getProjectData({ key: keyName, project_id: params?.projectId as string })
			.then((data: any) => {
				if (data.payload) {
					const payload = data.payload;
					setTextA(payload.textA);
					setTextB(payload.textB);
					setTextC(payload.textC);
					setTextD(payload.textD);
					setData(payload.data);
				}
			});
	}, []);

	const { globalReadonly } = useGlobalStatus(params?.projectId as string);
	return (
		<PageWrapper>
			<Page>
				<GoProjectButton />
				<div className='row '>
					<div className='col display-4 fw-bold py-3 text-primary-emphasis'>
						Cálculo de elementos de sombreado
					</div>
					<span>Horizontales, verticales o combinados</span>
				</div>
				<br />
				<Card>
					<CardBody>
						<ShadingTable
							setData={setData}
							data={data}
							setResult={setResult}
							readOnly={globalReadonly}
						/>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<h5 className='fw-bold'>Detalles de los elementos de sombreado</h5>
						<Card>
							<CardBody>
								<Label className={'caption-top '}>
									Detalle fachada Norte. Sombra en ventanas
								</Label>
								<CustomEditor
									placeholder='Detalle fachada Norte. Sombra en ventanas'
									setText={setTextA}
									readOnly={globalReadonly}
									initialText={textA}
								/>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<Label className={'caption-top '}>
									Detalle fachada Este. Sombra en ventanas
								</Label>
								<CustomEditor
									placeholder='Detalle fachada Este. Sombra en ventanas'
									setText={setTextB}
									readOnly={globalReadonly}
									initialText={textB}
								/>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<Label className={'caption-top '}>
									Detalle fachada Sur. Sombra en ventanas
								</Label>
								<CustomEditor
									initialText={textC}
									readOnly={globalReadonly}
									placeholder='Detalle fachada Sur. Sombra en ventanas'
									setText={setTextC}
								/>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<Label className={'caption-top '}>
									Detalle fachada Oeste. Sombra en ventanas
								</Label>
								<CustomEditor
									placeholder='Detalle fachada Oeste. Sombra en ventanas'
									initialText={textD}
									readOnly={globalReadonly}
									setText={setTextD}
								/>
							</CardBody>
						</Card>
					</CardBody>
				</Card>

				<Card>
					<CardFooter>
						<>
							{!globalReadonly && (
								<SaveProjectButton
									payload={{
										project_id: params?.projectId || '',
										payload: {
											textA,
											textB,
											textC,
											textD,
											data,
											result,
										},
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
							route={RoutesListWithParams.packages(params?.projectId)}
							text='Siguiente	'
						/>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default ShadingPage;

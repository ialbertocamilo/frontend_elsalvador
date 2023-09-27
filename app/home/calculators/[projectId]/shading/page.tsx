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
import { useParams } from 'next/navigation';
import { useProjects } from '../../../../../services/project/project.service';

const keyName = 'shading';
const ShadingPage = () => {
	const params = useParams();
	const projects = useProjects();

	const [textA, setTextA] = useState('');
	const [textB, setTextB] = useState('');
	const [textC, setTextC] = useState('');
	const [textD, setTextD] = useState('');
	const [data, setData] = useState<any>();

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
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<h4 className='fw-bold'>Cálculo elementos de sombreado</h4>
						<span>Horizontales, verticales o combinados</span>
					</CardBody>
				</Card>
				<Card>
					<CardBody>
						<ShadingTable setData={setData} data={data} />
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
									initialText={textB}
								/>
								{JSON.stringify(setTextB)}
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<Label className={'caption-top '}>
									Detalle fachada Sur. Sombra en ventanas
								</Label>
								<CustomEditor
									initialText={textC}
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
									setText={setTextD}
								/>
							</CardBody>
						</Card>
					</CardBody>
				</Card>

				<Card>
					<CardFooter>
						<SaveProjectButton
							payload={{
								project_id: params?.projectId || '',
								payload: {
									textA,
									textB,
									textC,
									textD,
									data,
								},
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

export default ShadingPage;

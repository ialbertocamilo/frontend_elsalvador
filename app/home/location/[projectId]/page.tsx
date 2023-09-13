'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import React, { useEffect, useState } from 'react';
import Card, { CardBody, CardFooter } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Label from '../../../../components/bootstrap/forms/Label';
import Textarea from '../../../../components/bootstrap/forms/Textarea';
import MapLibre from '../../../../components/maps/MapLibre';
import LocationSearch from '../../../../components/search/LocationSearch';
import { SearchForTextResult } from '@aws-sdk/client-location';
import { ButtonTypes, SaveProjectButton } from '../../../../components/buttons/SaveProjectButton';
import Button from '../../../../components/bootstrap/Button';
import { useParams, useRouter } from 'next/navigation';
import { RoutesListWithParams } from '../../../../common/constants/default';
import { useProjects } from '../../../../services/project/project.service';

const LocationPage = () => {
	const key = 'geoinformation';

	const [location, setLocation] = useState<SearchForTextResult | undefined>();

	const params = useParams();
	const project = useProjects();

	const router = useRouter();

	const [locationData, setLocationData] = useState('');
	const [fullInfoData, setFullInfoData] = useState('');

	useEffect(() => {
		project
			.getProjectData({ key: 'geoinformation', project_id: params?.projectId as string })
			.then((data: any) => {
				if (data.payload) {
					setFullInfoData(data.payload);
					setLocationData(data.payload.Label);
					setTimeout(() => {
						setLocation({ Place: data.payload });
					}, 900);
				}
			});
	}, []);
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<FormGroup>
							<LocationSearch
								placeholder={'Ingresa la direccion o coordenadas del proyecto'}
								goToPlace={(place: any) => {
									//{ Place, PlaceId}
									setLocation(place);
								}}
							/>
						</FormGroup>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<div className='row'>
							<div className='col'>
								<MapLibre
									location={location}
									locationInfo={(data: any) => {
										if (data) {
											setLocationData(data[0].Place.Label);
											setFullInfoData(data[0].Place);
										}
									}}
									setLocationMarker={location}
								/>
							</div>
							<div className='col'>
								<Label htmlFor='location'>Datos de ubicaciones encontradas</Label>
								<Textarea
									id='location'
									placeholder='Ubicacion'
									value={locationData}></Textarea>
							</div>
						</div>
					</CardBody>
					<CardFooter>
						<SaveProjectButton
							type={ButtonTypes.projectData}
							payload={{
								project_id: params?.projectId as string,
								payload: fullInfoData,
								key: key,
							}}></SaveProjectButton>
						<Button
							icon={'NavigateNext'}
							color={'link'}
							onClick={() =>
								router.push(RoutesListWithParams.project(params?.projectId))
							}>
							Regresar a proyecto
						</Button>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default LocationPage;

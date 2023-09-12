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
import { RoutesList, RoutesListWithParams } from '../../../../common/constants/default';

const LocationPage = () => {
	const key = 'geoinformation';

	const [location, setLocation] = useState<SearchForTextResult | undefined>();

	const params = useParams();
	const router = useRouter();
	useEffect(() => {
		if (location?.Place) setLocationData(location?.Place?.Label as string);
	}, [location]);

	const [locationData, setLocationData] = useState('');
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<FormGroup>
							<LocationSearch
								placeholder={'Ingresa la direccion o coordenadas del proyecto'}
								goToPlace={(place: any) => {
									console.log(place);
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
										console.log(data);
										if (data) setLocationData(data[0].Place.Label);
									}}
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
								project_id: '1',
								payload: locationData,
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

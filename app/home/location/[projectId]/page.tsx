'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import React, { useState } from 'react';
import Card, { CardBody, CardFooter } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Label from '../../../../components/bootstrap/forms/Label';
import Textarea from '../../../../components/bootstrap/forms/Textarea';
import MapLibre from '../../../../components/maps/MapLibre';
import LocationSearch from '../../../../components/search/LocationSearch';
import { SearchForTextResult } from '@aws-sdk/client-location';
import { useParams, useRouter } from 'next/navigation';
import Button from '../../../../components/bootstrap/Button';
import { RoutesListWithParams } from '../../../../common/constants/default';

const LocationPage = () => {
	const key = 'geoinformation';

	const [location, setLocation] = useState<SearchForTextResult | undefined>();

	const params = useParams();

	const router = useRouter();

	const [locationData, setLocationData] = useState('');
	const [fullInfoData, setFullInfoData] = useState('');

	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<FormGroup>
							<LocationSearch
								placeholder={'Ingresa la direccion o coordenadas del proyecto'}
								goToPlace={(place: any) => {
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
										if (data?.Place?.Label) {
											setLocationData(data?.Place?.Label);
										}
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
				</Card>

				<Card>
					<CardFooter>
						<div className={'col-auto'}></div>
						<Button
							color='link'
							icon='Info'
							onClick={() =>
								router.push(RoutesListWithParams.project(params?.projectId))
							}>
							Ir a proyecto
						</Button>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default LocationPage;

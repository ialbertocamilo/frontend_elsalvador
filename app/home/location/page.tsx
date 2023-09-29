'use client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import React, { useState } from 'react';
import Card, { CardBody, CardFooter } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import MapLibre from '../../../components/maps/MapLibre';
import LocationSearch from '../../../components/search/LocationSearch';
import { SearchForTextResult } from '@aws-sdk/client-location';
import useGeoposition from '../../../hooks/useGeoposition';

const LocationPage = () => {
	const [location, setLocation] = useState<SearchForTextResult>();

	const { geojson } = useGeoposition();
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
								<MapLibre location={location} geoJson={geojson} />
							</div>
							<div className='col'>
								<Label htmlFor='location'>Datos de ubicaciones encontradas</Label>
								<Textarea
									id='location'
									placeholder='Ubicación	'
									value={location?.Place?.Label}></Textarea>
							</div>
						</div>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default LocationPage;

// generate code sample for tsx
"use client"
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Map from '../../../components/Map';
import dynamic from 'next/dynamic';
import Label from '../../../components/bootstrap/forms/Label';
import Textarea from '../../../components/bootstrap/forms/Textarea';

const LocationPage = () => {

	const Map = React.useMemo(
		() =>
			dynamic(
				() => import('../../../components/Map'), // replace '@components/map' with your component's location
				{
					loading: () => <p>A map is loading</p>,
					ssr: false, // This line is important. It's what prevents server-side render
				},
			),
		[],
	);
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<FormGroup>
							<Input
								size='lg'
								placeholder='Ingresa la direccion o coordenadas del proyecto'></Input>
						</FormGroup>
						<br />
						<Button color='dark'>Buscar</Button>
					</CardBody>
				</Card>
				<div className='row'>
					<div className='col'>
						<Map />
					</div>
					<div className='col'>
						<Label htmlFor='location'>Datos de ubicaciones encontradas</Label>
						<Textarea id='location' placeholder='Ubicacion '></Textarea>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default LocationPage;

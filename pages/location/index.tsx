// generate code sample for tsx

import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Card, { CardBody, CardFooter } from '../../components/bootstrap/Card';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import SvgSearch from '../../components/icon/material-icons/Search';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import PropTypes from 'prop-types';
import Map from '../../components/Map';

const LocationPage = () => {
	const router = useRouter();
	useEffect(() => {
		let route = router.route;
		console.log(route);
	}, [router.route]);
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<FormGroup>
							<Input
								size={PropTypes.oneOf(['md', 'lg'])}
								placeholder='Ingresa la direccion o coordenadas del proyecto'></Input>
						</FormGroup>
					</CardBody>
					<CardFooter>
						<Button icon='FindInPage' color='dark'>
							Buscar
						</Button>
					</CardFooter>
				</Card>
				<Map />
			</Page>
		</PageWrapper>
	);
};

export default LocationPage;

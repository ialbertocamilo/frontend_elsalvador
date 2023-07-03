// generate code sample for tsx

import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Card, { CardBody, CardFooter } from '../../components/bootstrap/Card';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import SvgSearch from '../../components/icon/material-icons/Search';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import PropTypes from 'prop-types';
import Map from '../../components/Map';
import dynamic from 'next/dynamic';

const LocationPage = () => {
	const router = useRouter();
	useEffect(() => {
		let route = router.route;
		console.log(route);
	}, [router.route]);

	const Map = React.useMemo(
		() =>
			dynamic(
				() => import('../../components/Map'), // replace '@components/map' with your component's location
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
					<CardBody className=''>
						<div className='row g-5 justify-content-center  '>
							<Card
								style={{ width: '175px', height: '100px' }}
								className='text-center p-2 mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover'
								color='primary'>
								Calculo de proporcion muro ventana
							</Card>
							<Card
								style={{ width: '175px', height: '100px ' }}
								color='bg-primary'
								className='text-center p-2 mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover'>
								Calculo de transmitancia termica de muros
							</Card>
							<Card
								style={{ width: '175px', height: '100px' }}
								className='text-center mx-2 justify-content-center bg-dark-subtle shadow-3d-up-hover'>
								Calculo de ventanas
							</Card>
						</div>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default LocationPage;

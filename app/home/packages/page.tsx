// generate code sample for tsx
'use client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { useState } from 'react';

const PackagesPage = () => {
	const [propietario, setPropietario] = useState('');
	const [director, setDirector] = useState('');
	const [proyecto, setProyecto] = useState('');
	const [disenador, setDisenador] = useState('');
	const [direccion, setDireccion] = useState('');
	const [municipio, setMunicipio] = useState('');
	const [asesor, setAsesor] = useState('');

	return (
		<PageWrapper>
			<Page className='mx-3'>
				<br />
			</Page>
		</PageWrapper>
	);
};

export default PackagesPage;

// generate code sample for tsx
"use client"
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PackagesTable from '../../../components/PackagesTable';

const PackagesPage = () => {
	const [propietario, setPropietario] = useState('');
	const [director, setDirector] = useState('');
	const [proyecto, setProyecto] = useState('');
	const [disenador, setDisenador] = useState('');
	const [direccion, setDireccion] = useState('');
	const [municipio, setMunicipio] = useState('');
	const [asesor, setAsesor] = useState('');

	const router = useRouter();
	const handleSubmit = (e: any) => {
		// e.preventDefault();
		console.log({
			propietario,
			director,
			proyecto,
			disenador,
			direccion,
			municipio,
			asesor,
		});
	};
	return (
		<PageWrapper>
			<Page className='mx-3'>
				<br />
				<PackagesTable />
			</Page>
		</PageWrapper>
	);
};

export default PackagesPage;

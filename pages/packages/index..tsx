// generate code sample for tsx

import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import PackagesTable from '../../components/PackagesTable';
import Button from '../../components/bootstrap/Button';

const PackagesPage = () => {
	const session = useSession();

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
	useEffect(() => {
		console.log(session.data?.user);
	}, [session]);
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

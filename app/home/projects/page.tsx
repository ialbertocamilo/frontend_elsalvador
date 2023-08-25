// generate code sample for tsx
"use client"
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import DefaultTable from '../../../components/DefaultTable';

const ProjectsPage = () => {
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
		// Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor
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
				<DefaultTable />
			</Page>
		</PageWrapper>
	);
};

export default ProjectsPage;

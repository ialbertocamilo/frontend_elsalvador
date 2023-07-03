// generate code sample for tsx

import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Form } from 'formik';
import Card, { CardBody } from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Label from '../../components/bootstrap/forms/Label';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import DefaultTable from '../../components/DefaultTable';
import InputGroup, { InputGroupText } from '../../components/bootstrap/forms/InputGroup';

const ProjectsPage = () => {
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
	useEffect(() => {
		console.log(session.data?.user);
	}, [session]);
	return (
		<PageWrapper>
			<Page className='mx-3'>
				<div className='row '>
					<div className='col-8'>
						<Card>
							<CardBody>
								<div className='row'>
									<FormGroup className='col-6' id='propietario'>
										<Label>Nombre de Propietario</Label>
										<Input type='text' value={propietario} />
									</FormGroup>
									<FormGroup id='director' className='col-6'>
										<Label>Director Responsable de la Obra</Label>
										<Input type='text' value={director} />
									</FormGroup>
								</div>
								<div className='row'>
									<FormGroup className='col-6' id='proyecto'>
										<Label>Nombre del Proyecto</Label>
										<Input type='text' value={proyecto} />
									</FormGroup>
									<FormGroup className='col-6' id='disenador'>
										<Label>Nombre del Diseñador</Label>
										<Input type='text' value={disenador} />
									</FormGroup>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<FormGroup id='direccion'>
									<Label>Dirección</Label>
									<Input type='text' value={direccion} />
								</FormGroup>
								<FormGroup id='municipio'>
									<Label>Municipio</Label>
									<Input type='text' value={municipio} />
								</FormGroup>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<FormGroup id='asesor'>
									<Label>Nombre del Asesor Energético</Label>
									<Input type='text' value={asesor} />
								</FormGroup>
							</CardBody>
						</Card>
						<Button color='primary' type='submit'>
							Enviar
						</Button>
						<br />
					</div>
					<div className='col'>
						<Card>
							<CardBody>
								<Input
									className='my-2'
									placeholder='Nombre del propietario'></Input>
								<Input className='my-2' placeholder='Numero de niveles'></Input>
								<Input
									className='my-2'
									placeholder='Numero de oficinas por nivel'></Input>
								<Input
									className='my-2'
									placeholder='Superficie construida m2'></Input>
							</CardBody>
						</Card>
					</div>
				</div>
				<br />
				<DefaultTable />
			</Page>
		</PageWrapper>
	);
};

export default ProjectsPage;

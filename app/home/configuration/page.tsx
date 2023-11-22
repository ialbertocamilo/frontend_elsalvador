'use client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardFooter } from '../../../components/bootstrap/Card';
import React, { useEffect, useState } from 'react';
import { ConfigurationTable } from '../../../components/tables/ConfigurationTable';
import { ButtonTypes, SaveProjectButton } from '../../../components/buttons/SaveProjectButton';
import { IConfigurationType } from '../../../common/types/configuration.types';
import DataService from '../../../services/data/data.service';
import { IQuestion } from '../../../common/types/question.types';
import SelectQuestionsConfiguration from '../../../components/SelectQuestionsConfiguration';
import CreatePackagesConfiguration from '../../../components/CreatePackagesConfiguration';

const keyName = 'package-configuration';

const ConfigurationPage = () => {
	const [values, setValues] = useState<IConfigurationType[]>([]);
	const [questions, setQuestions] = useState<IQuestion[]>([
		{
			title: 'Los planos indican claramente la composición y valores de los muros exteriores',
			id: 1,
			deactivated: false,
		},
		{
			title: 'Los planos indican claramente los elementos de sombreado en ventanas Sur',
			id: 2,
			deactivated: false,
		},
		{
			title: 'Los planos indican claramente los elementos de sombreado en ventanas Oeste',
			id: 3,
			deactivated: false,
		},
		{
			title: 'Los planos indican claramente el área de elementos opacos y transparentes',
			id: 4,
			deactivated: false,
		},
		{
			title: 'Los planos indican claramente la composición y valores del techo',
			id: 5,
			deactivated: false,
		},
		{
			title: 'Los planos indican claramente la instalación del equipo de HVAC',
			id: 6,
			deactivated: false,
		},
		{
			title: 'Se entregan certificados y/o fichas técnicas de los materiales que componen los muros',
			id: 7,
			deactivated: false,
		},
		{
			title: 'Se entregan certificados y/o fichas técnicas de los materiales que componen las ventanas',
			id: 8,
			deactivated: false,
		},
		{
			title: 'Se entregan certificados y/o fichas técnicas de los materiales que componen el techo',
			id: 9,
			deactivated: false,
		},
		{
			title: 'Se entregan certificados y/o fichas técnicas del sistema de aire acondicionado',
			id: 10,
			deactivated: false,
		},
	]);
	const [packages, setPackages] = useState<IConfigurationType[]>([]);
	useEffect(() => {
		DataService.getPackagesConfig().then((data: { questions: any; config: any }) => {
			if (data?.config) setPackages(data.config);
			if (data?.questions) setQuestions(data?.questions);
		});
	}, []);
	return (
		<PageWrapper>
			<Page container='xl'>
				<Card>
					<CardBody>
						<h4 className='fw-bold'>Configuración de datos</h4>
						<span>
							Ingresar la información requerida en las celdas indicadas. Considerar
							que la información introducida cambiará los valores de los paquetes
							mencionados.
						</span>
					</CardBody>
				</Card>
				<div className='row g-3 h-100'>
					<div className='col '>
						<CreatePackagesConfiguration values={packages} emitValue={setValues} />
					</div>
					<div className='col'>
						<SelectQuestionsConfiguration
							questions={questions}
							emitValue={setQuestions}
						/>
					</div>
				</div>
				{/*<Card>*/}
				{/*	<CardBody className='d-flex row-cols-auto overflow-scroll align-self-center'>*/}
				{/*		<ConfigurationTable emitValue={setValues} />*/}
				{/*	</CardBody>*/}
				{/*</Card>*/}
				{/*<Card>*/}
				{/*	<CardFooter>*/}
				{/*		<SaveProjectButton*/}
				{/*			payload={{*/}
				{/*				payload: { config: values, questions },*/}
				{/*				key: keyName,*/}
				{/*			}}*/}
				{/*			type={ButtonTypes.packageConfig}*/}
				{/*		/>*/}
				{/*	</CardFooter>*/}
				{/*</Card>*/}
			</Page>
		</PageWrapper>
	);
};

export default ConfigurationPage;

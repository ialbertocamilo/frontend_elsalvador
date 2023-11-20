'use client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardFooter } from '../../../components/bootstrap/Card';
import React, { useEffect, useState } from 'react';
import { ConfigurationTable } from '../../../components/tables/ConfigurationTable';
import { ButtonTypes, SaveProjectButton } from '../../../components/buttons/SaveProjectButton';
import { IConfigurationType } from '../../../common/types/configuration.types';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import FormText from '../../../components/bootstrap/forms/FormText';
import Label from '../../../components/bootstrap/forms/Label';
import DataService from '../../../services/data/data.service';
import { IQuestion } from '../../../common/types/question.types';

const keyName = 'package-configuration';

const ConfigurationPage = () => {
	const [values, setValues] = useState<IConfigurationType[]>([]);

	const [questions, setQuestions] = useState<IQuestion[]>([
		{
			text: 'Los planos indican claramente la composición y valores de los muros exteriores',
			index: 0,
		},
		{
			text: 'Los planos indican claramente los elementos de sombreado en ventanas Sur',
			index: 1,
		},
		{
			text: 'Los planos indican claramente los elementos de sombreado en ventanas Oeste',
			index: 2,
		},
		{
			text: 'Los planos indican claramente el área de elementos opacos y transparentes',
			index: 3,
		},
		{ text: 'Los planos indican claramente la composición y valores del techo', index: 4 },
		{ text: 'Los planos indican claramente la instalación del equipo de HVAC', index: 5 },
		{
			text: 'Se entregan certificados y/o fichas técnicas de los materiales que componen los muros',
			index: 6,
		},
		{
			text: 'Se entregan certificados y/o fichas técnicas de los materiales que componen las ventanas',
			index: 7,
		},
		{
			text: 'Se entregan certificados y/o fichas técnicas de los materiales que componen el techo',
			index: 8,
		},
		{
			text: 'Se entregan certificados y/o fichas técnicas del sistema de aire acondicionado',
			index: 9,
		},
	]);

	function handleChange(value: any, key: number) {
		questions[key].text = value;
		setQuestions([...questions]);
	}

	useEffect(() => {
		DataService.getPackagesConfig().then((data) => {
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
				<Card>
					<CardBody className='d-flex row-cols-auto overflow-scroll align-self-center'>
						<ConfigurationTable emitValue={setValues} />
					</CardBody>
				</Card>
				<Card>
					<CardBody className='row gx-2'>
						{questions?.map((values, key) => (
							<FormText className='mb-2 ' key={key}>
								<Label>Pregunta {key + 1}</Label>
								<Textarea
									onChange={(e: any) => handleChange(e.target.value, key)}
									value={values.text}></Textarea>
							</FormText>
						))}
					</CardBody>
				</Card>
				<Card>
					<CardFooter>
						<SaveProjectButton
							payload={{
								payload: { config: values, questions },
								key: keyName,
							}}
							type={ButtonTypes.packageConfig}
						/>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default ConfigurationPage;

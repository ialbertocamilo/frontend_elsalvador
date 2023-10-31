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
import { useFormik } from 'formik';
import DataService from '../../../services/data/data.service';

const keyName = 'package-configuration';

interface Questions {
	question1: string;
	question2: string;
	question3: string;
	question4: string;
	question5: string;
	question6: string;
	question7: string;
	question8: string;
	question9: string;
	question10: string;
}

const ConfigurationPage = () => {
	const [values, setValues] = useState<IConfigurationType[]>([]);

	const initialQuestions = {
		question1: '',
		question2: '',
		question3: '',
		question4: '',
		question5: '',
		question6: '',
		question7: '',
		question8: '',
		question9: '',
		question10: '',
	};
	const [questions, setQuestions] = useState<Questions>(initialQuestions);
	const formik = useFormik({
		initialValues: initialQuestions,
		enableReinitialize: true,
		validateOnChange: true,
		onSubmit: () => {},
	});
	useEffect(() => {
		DataService.getPackagesConfig().then((data) => {
			setQuestions(data?.questions);
			formik.setValues(data?.questions);
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
					<CardBody className='d-flex align-self-center'>
						<ConfigurationTable emitValue={setValues} />
					</CardBody>
				</Card>
				<Card>
					<CardBody className='row gx-2'>
						<FormText className='mb-2 '>
							<Label>
								Los planos indican claramente la composición y valores de los muros
								exteriores
							</Label>
							<Textarea
								onChange={formik.handleChange}
								id='question1'
								value={formik.values.question1}></Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Los planos indican claramente los elementos de sombreado en ventanas
								Sur
							</Label>
							<Textarea
								onChange={formik.handleChange}
								name='question2'
								value={formik.values.question2}></Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Los planos indican claramente los elementos de sombreado en ventanas
								Oeste
							</Label>
							<Textarea
								onChange={formik.handleChange}
								name='question3'
								value={formik.values.question3}></Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Los planos indican claramente el área de elementos opacos y
								transparentes
							</Label>
							<Textarea
								onChange={formik.handleChange}
								name='question4'
								value={formik.values.question4}></Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Los planos indican claramente la composición y valores del techo
							</Label>
							<Textarea
								onChange={formik.handleChange}
								name='question5'
								value={formik.values.question5}></Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Los planos indican claramente la instalación del equipo de HVAC
							</Label>
							<Textarea
								onChange={formik.handleChange}
								name='question6'
								value={formik.values.question6}></Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Se entregan certificados y/o fichas técnicas de los materiales que
								componen los muros
							</Label>
							<Textarea
								onChange={formik.handleChange}
								name='question7'
								value={formik.values.question7}></Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Se entregan certificados y/o fichas técnicas de los materiales que
								componen las ventanas
							</Label>
							<Textarea
								onChange={formik.handleChange}
								name='question8'
								value={formik.values.question8}></Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Se entregan certificados y/o fichas técnicas de los materiales que
								componen el techo
							</Label>
							<Textarea
								onChange={formik.handleChange}
								name='question9'
								value={formik.values.question9}></Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Se entregan certificados y/o fichas técnicas del sistema de aire
								acondicionado
							</Label>
							<Textarea
								onChange={formik.handleChange}
								name='question10'
								value={formik.values.question10}></Textarea>
						</FormText>
					</CardBody>
				</Card>
				<Card>
					<CardFooter>
						<SaveProjectButton
							payload={{
								payload: { config: values, questions: formik.values },
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

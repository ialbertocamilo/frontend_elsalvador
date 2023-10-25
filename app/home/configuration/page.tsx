'use client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardFooter } from '../../../components/bootstrap/Card';
import React, { useState } from 'react';
import { ConfigurationTable } from '../../../components/tables/ConfigurationTable';
import { ButtonTypes, SaveProjectButton } from '../../../components/buttons/SaveProjectButton';
import { IConfigurationType } from '../../../common/types/configuration.types';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import FormText from '../../../components/bootstrap/forms/FormText';
import Label from '../../../components/bootstrap/forms/Label';

const keyName = 'package-configuration';
const ConfigurationPage = () => {
	const [values, setValues] = useState<IConfigurationType[]>([]);
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
							<Textarea></Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Los planos indican claramente los elementos de sombreado en ventanas
								Sur
							</Label>
							<Textarea> </Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Los planos indican claramente los elementos de sombreado en ventanas
								Oeste
							</Label>
							<Textarea> </Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Los planos indican claramente el área de elementos opacos y
								transparentes
							</Label>
							<Textarea> </Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Los planos indican claramente la composición y valores del techo
							</Label>
							<Textarea> </Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Los planos indican claramente la instalación del equipo de HVAC
							</Label>
							<Textarea> </Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Se entregan certificados y/o fichas técnicas de los materiales que
								componen los muros
							</Label>
							<Textarea> </Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Se entregan certificados y/o fichas técnicas de los materiales que
								componen las ventanas
							</Label>
							<Textarea> </Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Se entregan certificados y/o fichas técnicas de los materiales que
								componen el techo
							</Label>
							<Textarea> </Textarea>
						</FormText>
						<FormText className='mb-2'>
							<Label>
								Se entregan certificados y/o fichas técnicas del sistema de aire
								acondicionado
							</Label>
							<Textarea> </Textarea>
						</FormText>
					</CardBody>
				</Card>
				<Card>
					<CardFooter>
						<SaveProjectButton
							payload={{
								payload: values,
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

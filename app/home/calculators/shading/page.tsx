'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import React from 'react';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Textarea from '../../../../components/bootstrap/forms/Textarea';

const ShadingPage = () => {
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<h4 className='fw-bold'>Cálculo elementos de sombreado</h4>
						<span>Horizontales, verticales o combinados</span>
					</CardBody>
				</Card>
				<Card>
					<CardBody>
						<table>
							<thead>
								<tr className='text-center'>
									<th className='px-2'>Orientación ventana</th>
									<th className='px-2'>Tipo sombra</th>
									<th className='px-2'>Altura de la ventana(m)</th>
									<th className='px-2'>Anchura de la ventana(m)</th>
									<th className='px-2'>Profundidad del alero horizontal(m)</th>
									<th className='px-2'>Profundidad del alero vertical(m)</th>
									<th className='px-5'>Horizontal</th>
									<th className='px-5'>Vertical</th>
									<th className='px-5'>Combinada</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='p-2'>
										<FormGroup id='propietario'>
											<Input id='ownerName' name='ownerName' type='text' />
										</FormGroup>
									</td>
									<td className='p-2'>
										<FormGroup id='propietario'>
											<Input id='ownerName' name='ownerName' type='text' />
										</FormGroup>
									</td>
									<td className='p-2'>
										<FormGroup id='propietario'>
											<Input id='ownerName' name='ownerName' type='text' />
										</FormGroup>
									</td>
									<td className='p-2'>
										<FormGroup id='width-window'>
											<Input
												id='width-window'
												name='width-window'
												type='text'
											/>
										</FormGroup>
									</td>
									<td className='p-2'>
										<FormGroup id='propietario'>
											<Input id='ownerName' name='ownerName' type='text' />
										</FormGroup>
									</td>
									<td>
										<FormGroup id='propietario'>
											<Input id='ownerName' name='ownerName' type='text' />
										</FormGroup>
									</td>
									<td className='text-center'>555</td>
									<td className='text-center'>222</td>
									<td className='text-center'>123</td>
								</tr>
							</tbody>
						</table>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<Textarea placeholder='Detalle de ventana tipo'></Textarea>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default ShadingPage;

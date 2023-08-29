'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import React from 'react';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Button from '../../../../components/bootstrap/Button';

const TransmittancePage = () => {
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<h4 className='fw-bold'>Cálculo de transmitancia térmica de muros</h4>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<div className='row'>
							<div className='flex-column col-md-2 col-sm-12 align-self-center'>
								<span>Nombre de muro tipo 1</span>
							</div>
							<div className='col-md-6 col-sm-12'>
								<Input placeholder='Ingresa el nombre del muro'></Input>
							</div>
						</div>
					</CardBody>
				</Card>
				<div className='row align-content-between justify-content-between px-2'>
					<Card className='col me-2'>
						<CardBody>
							<table>
								<thead>
									<tr className='text-center'>
										<th className='px-2'>Superficie parcial</th>
										<th className='px-2'>Valor λ</th>
										<th className='px-2'>Superficie parcial 1(m)</th>
										<th className='px-2'>Valor λ</th>
										<th className='px-2'>Espesor</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className='p-2'>
											<FormGroup id='propietario'>
												<Input
													id='ownerName'
													name='ownerName'
													type='text'
												/>
											</FormGroup>
										</td>
										<td className='p-2'>
											<FormGroup id='propietario'>
												<div className="row">
													<Input
														id='ownerName'
														name='ownerName'
														type='text'
														className='col'
													/>
													<span className='col align-self-center'>W/mk</span>
												</div>
											</FormGroup>
										</td>
										<td className='p-2'>
											<FormGroup id='propietario'>
												<Input
													id='ownerName'
													name='ownerName'
													type='text'
												/>
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
												<Input
													id='ownerName'
													name='ownerName'
													type='text'
												/>
											</FormGroup>
										</td>
									</tr>
								</tbody>
							</table>
						</CardBody>
					</Card>
					<Card className='col-md-3'>
						<CardBody>
							<h4>Documentación entregada</h4>
							<span>Planos de Fachada con dimensiones de ventanas y generales</span>
							<div className='align-items-center text-center mt-2'>
								<Button color='info' icon='AttachFile'>
									Adjuntar
								</Button>
							</div>
						</CardBody>
					</Card>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default TransmittancePage;

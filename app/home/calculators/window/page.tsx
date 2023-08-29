'use client'
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import React from 'react';
import FormGroup from "../../../../components/bootstrap/forms/FormGroup";
import Label from "../../../../components/bootstrap/forms/Label";
import Input from "../../../../components/bootstrap/forms/Input";
import Textarea from "../../../../components/bootstrap/forms/Textarea";

const WindowPage = () => {
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<h4 className='fw-bold'>Calculadoras</h4>
					</CardBody>
				</Card>
				<Card>
					<CardBody>
						<div className="row">
							<FormGroup className='col-5 my-1' id='propietario'>
								<Label className={'border-2'}>Tipo de acristalamiento</Label>
								<Input
									id='ownerName'
									name='ownerName'
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-3 my-1' id='propietario'>
								<Label className={'border-2'}>Valor U</Label>
								<Input
									id='ownerName'
									name='ownerName'
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1' id='propietario'>
								<Label className={'border-2'}>Valor g</Label>
								<Input
									id='ownerName'
									name='ownerName'
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1' id='propietario'>
								<Label className={'border-2'}>Valor CS</Label>
								<Input
									id='ownerName'
									name='ownerName'
									type='text'
								/>
							</FormGroup>
						</div>
						<div className="row">
							<FormGroup className='col-4 my-1' id='propietario'>
								<Label className={'border-2'}>Tipo de marco</Label>
								<Input
									id='ownerName'
									name='ownerName'
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-4 my-1' id='propietario'>
								<Label className={'border-2'}>Valor U</Label>
								<Input
									id='ownerName'
									name='ownerName'
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-4 my-1' id='propietario'>
								<Label className={'border-2'}>Ancho de marco</Label>
								<Input
									id='ownerName'
									name='ownerName'
									type='text'
								/>
							</FormGroup>

							<div className="row">

								<FormGroup className='col-5 my-1' id='propietario'>
									<Label className={'border-2'}>Valor U de ventana</Label>
									<Input
										id='ownerName'
										name='ownerName'
										type='text'
									/>
								</FormGroup>

								<FormGroup className='col-2 my-1' id='propietario'>
									<Label className={'border-2'}>Largo vano</Label>
									<Input
										id='ownerName'
										name='ownerName'
										type='text'
									/>
								</FormGroup>
								<FormGroup className='col-2 my-1' id='propietario'>
									<Label className={'border-2'}>Alto vano</Label>
									<Input
										id='ownerName'
										name='ownerName'
										type='text'
									/>
								</FormGroup>
								<FormGroup className='col-1 my-1' id='propietario'>
									<Label className={'border-2'}>Area vano</Label>
									<Input
										id='ownerName'
										name='ownerName'
										type='text'
									/>
								</FormGroup>
								<FormGroup className='col-1 my-1' id='propietario'>
									<Label className={'border-2'}>Area marco</Label>
									<Input
										id='ownerName'
										name='ownerName'
										type='text'
									/>
								</FormGroup>
								<FormGroup className='col-1 my-1' id='propietario'>
									<Label className={'border-2'}>Area cristal</Label>
									<Input
										id='ownerName'
										name='ownerName'
										type='text'
									/>
								</FormGroup>
							</div>
						</div>
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

export default WindowPage;

// 'use client';
// import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
// import Page from '../../../../layout/Page/Page';
// import Card, { CardBody } from '../../../../components/bootstrap/Card';
// import React, { useEffect, useState } from 'react';
// import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
// import Input from '../../../../components/bootstrap/forms/Input';
// import Button from '../../../../components/bootstrap/Button';
//
// const ProportionPage = () => {
// 	const [opaqueSurface, setOpaqueSurface] = useState({
// 		opaque_surface_1: 0,
// 		opaque_surface_2: 0,
// 		opaque_surface_3: 0,
// 		opaque_surface_4: 0,
// 		opaque_surface_5: 0,
// 		opaque_surface_6: 0,
// 		opaque_surface_7: 0,
// 		opaque_surface_8: 0,
// 		opaque_surface_9: 0,
// 	});
//
// 	const [glazedSurface, setGlazedSurface] = useState({
// 		glazed_surface_1: 0,
// 		glazed_surface_2: 0,
// 		glazed_surface_3: 0,
// 		glazed_surface_4: 0,
// 		glazed_surface_5: 0,
// 		glazed_surface_6: 0,
// 		glazed_surface_7: 0,
// 		glazed_surface_8: 0,
// 		glazed_surface_9: 0,
// 	});
//
// 	const [totalOpaqueSurface, setTotalOpaqueSurface] = useState(0);
// 	useEffect(() => {
// 		const result = Object.values(opaqueSurface).reduce(
// 			(previousValue, currentValue) => Number(previousValue) + Number(currentValue),
// 			0,
// 		);
// 		setTotalOpaqueSurface(result);
// 	}, [opaqueSurface]);
// 	const [proportion, setProportion] = useState({
// 		one: 0,
// 		two: 0,
// 		tree: 0,
// 		four: 0,
// 		five: 0,
// 		six: 0,
// 		seven: 0,
// 		eight: 0,
// 		nine: 0,
// 	});
//
// 	function sum(one: any, two: any) {
// 		return Number(one) + Number(two);
// 	}
//
// 	// useEffect(() => {
// 	// 	setProportion((prevValues) => ({
// 	// 		...prevValues,
// 	// 		['one']: sum(opaqueSurface.opaque_surface_1, glazedSurface.glazed_surface_1),
// 	// 		['two']: sum(opaqueSurface.opaque_surface_2, glazedSurface.glazed_surface_2),
// 	// 		['tree']: sum(opaqueSurface.opaque_surface_3, glazedSurface.glazed_surface_3),
// 	// 		['four']: sum(opaqueSurface.opaque_surface_4, glazedSurface.glazed_surface_4),
// 	// 		['five']: sum(opaqueSurface.opaque_surface_5, glazedSurface.glazed_surface_5),
// 	// 		['six']: sum(opaqueSurface.opaque_surface_6, glazedSurface.glazed_surface_6),
// 	// 		['seven']: sum(opaqueSurface.opaque_surface_7, glazedSurface.glazed_surface_7),
// 	// 		['eight']: sum(opaqueSurface.opaque_surface_8, glazedSurface.glazed_surface_8),
// 	// 		['nine']: sum(opaqueSurface.opaque_surface_9, glazedSurface.glazed_surface_9),
// 	// 	}));
// 	// }, [glazedSurface, opaqueSurface]);
//
// 	const handleInputChange = (event: { target: { name: any; value: any } }) => {
// 		const { name, value } = event.target;
// 		setOpaqueSurface((prevValues) => ({
// 			...prevValues,
// 			[name]: value,
// 		}));
// 	};
// 	const handleInputChange2 = (event: { target: { name: any; value: any } }) => {
// 		const { name, value } = event.target;
// 		setGlazedSurface((prevValues) => ({
// 			...prevValues,
// 			[name]: value,
// 		}));
// 	};
// 	return (
// 		<PageWrapper>
// 			<Page>
// 				<Card>
// 					<CardBody>
// 						<h4 className='fw-bold'>Proporción muro ventana</h4>
// 						<span>
// 							Ingresar Información requerida en las celdas indicadas. Considerar que
// 							la información introducida es responsabilidad de quien la reporta y será
// 							verificada por la entidad correspondiente.
// 						</span>
// 					</CardBody>
// 				</Card>
// 				<div className='row align-content-between justify-content-between px-2'>
// 					<Card className='col me-2'>
// 						<CardBody>
// 							<table>
// 								<thead>
// 									<tr className=''>
// 										<th className='px-2 w-25'>Tipo fachada</th>
// 										<th className='px-2'>Superficie opaca</th>
// 										<th className='px-2'>Superficie vidriada</th>
// 										<th className='px-2'>Proporción opaca: Vidriada</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									<tr>
// 										<td className='p-2'>
// 											<span>Fachada Principal Tipo 1</span>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='propietario'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='opaque_surface_1'
// 														name='opaque_surface_1'
// 														type='number'
// 														className='me-2'
// 														value={opaqueSurface.opaque_surface_1}
// 														onChange={handleInputChange}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='glazed_surface_1'
// 														name='glazed_surface_1'
// 														type='number'
// 														className='me-2'
// 														value={glazedSurface.glazed_surface_1}
// 														onChange={handleInputChange2}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														type='text'
// 														className='me-2'
// 														value={proportion.one}
// 													/>
// 													<span className='col align-self-center '>
// 														%
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td className='p-2'>
// 											<span>Fachada Principal Tipo 2</span>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='propietario'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='opaque_surface_2'
// 														name='opaque_surface_2'
// 														type='number'
// 														className='me-2'
// 														value={opaqueSurface.opaque_surface_2}
// 														onChange={handleInputChange}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='glazed_surface_2'
// 														name='glazed_surface_2'
// 														type='number'
// 														className='me-2'
// 														value={glazedSurface.glazed_surface_2}
// 														onChange={handleInputChange2}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='opaque_surface_6'
// 														name='opaque_surface_6'
// 														type='text'
// 														className='me-2'
// 													/>
// 													<span className='col align-self-center '>
// 														%
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td className='p-2'>
// 											<span>Fachada Principal Tipo 3</span>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='propietario'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='opaque_surface_3'
// 														name='opaque_surface_3'
// 														type='number'
// 														className='me-2'
// 														value={opaqueSurface.opaque_surface_3}
// 														onChange={handleInputChange}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='glazed_surface_3'
// 														name='glazed_surface_3'
// 														type='number'
// 														className='me-2'
// 														value={glazedSurface.glazed_surface_3}
// 														onChange={handleInputChange2}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='glazed_surface_3'
// 														name='glazed_surface_3'
// 														type='number'
// 														className='me-2'
// 													/>
// 													<span className='col align-self-center '>
// 														%
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td className='p-2'>
// 											<span>Fachada Lateral Tipo 1</span>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='propietario'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='glazed_surface_4'
// 														name='glazed_surface_4'
// 														type='number'
// 														className='me-2'
// 														value={opaqueSurface.opaque_surface_4}
// 														onChange={handleInputChange}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='glazed_surface_4'
// 														name='glazed_surface_4'
// 														type='number'
// 														className='me-2'
// 														value={glazedSurface.glazed_surface_4}
// 														onChange={handleInputChange2}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='opaque_surface_6'
// 														name='opaque_surface_6'
// 														type='number'
// 														className='me-2'
// 													/>
// 													<span className='col align-self-center '>
// 														%
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td className='p-2'>
// 											<span>Fachada Lateral Tipo 2</span>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='propietario'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='opaque_surface_5'
// 														name='opaque_surface_5'
// 														type='number'
// 														className='me-2'
// 														value={opaqueSurface.opaque_surface_5}
// 														onChange={handleInputChange}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='glazed_surface_5'
// 														name='glazed_surface_5'
// 														type='number'
// 														className='me-2'
// 														value={glazedSurface.glazed_surface_5}
// 														onChange={handleInputChange2}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='ownerName'
// 														name='ownerName'
// 														type='text'
// 														className='me-2'
// 													/>
// 													<span className='col align-self-center '>
// 														%
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td className='p-2'>
// 											<span>Fachada Lateral Tipo 3</span>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='propietario'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='opaque_surface_6'
// 														name='opaque_surface_6'
// 														type='number'
// 														className='me-2'
// 														value={opaqueSurface.opaque_surface_6}
// 														onChange={handleInputChange}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='glazed_surface_6'
// 														name='glazed_surface_6'
// 														type='number'
// 														className='me-2'
// 														value={glazedSurface.glazed_surface_6}
// 														onChange={handleInputChange2}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='ownerName'
// 														name='ownerName'
// 														type='text'
// 														className='me-2'
// 													/>
// 													<span className='col align-self-center '>
// 														%
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td className='p-2'>
// 											<span>Fachada Lateral Tipo 4</span>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='propietario'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='opaque_surface_7'
// 														name='opaque_surface_7'
// 														type='number'
// 														className='me-2'
// 														value={opaqueSurface.opaque_surface_7}
// 														onChange={handleInputChange}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='glazed_surface_7'
// 														name='glazed_surface_7'
// 														type='number'
// 														className='me-2'
// 														value={glazedSurface.glazed_surface_7}
// 														onChange={handleInputChange2}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='ownerName'
// 														name='ownerName'
// 														type='text'
// 														className='me-2'
// 													/>
// 													<span className='col align-self-center '>
// 														%
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td className='p-2'>
// 											<span>Fachada Lateral Tipo 5</span>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='propietario'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='opaque_surface_8'
// 														name='opaque_surface_8'
// 														type='number'
// 														className='me-2'
// 														value={opaqueSurface.opaque_surface_8}
// 														onChange={handleInputChange}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='glazed_surface_8'
// 														name='glazed_surface_8'
// 														type='number'
// 														className='me-2'
// 														value={glazedSurface.glazed_surface_8}
// 														onChange={handleInputChange2}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='ownerName'
// 														name='ownerName'
// 														type='text'
// 														className='me-2'
// 													/>
// 													<span className='col align-self-center '>
// 														%
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td className='p-2'>
// 											<span>Fachada Lateral Tipo 6</span>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='propietario'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='opaque_surface_9'
// 														name='opaque_surface_9'
// 														type='number'
// 														className='me-2'
// 														value={opaqueSurface.opaque_surface_9}
// 														onChange={handleInputChange}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='glazed_surface_9'
// 														name='glazed_surface_9'
// 														type='number'
// 														className='me-2'
// 														value={glazedSurface.glazed_surface_9}
// 														onChange={handleInputChange2}
// 													/>
// 													<span className='col align-self-center '>
// 														m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='ownerName'
// 														name='ownerName'
// 														type='text'
// 														className='me-2'
// 													/>
// 													<span className='col align-self-center '>
// 														%
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 									</tr>
// 									<tr className='line-h'>
// 										<td className='p-2'>
// 											<b>Sumatoria total</b>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='propietario'>
// 												<div className='d-flex align-content-center text-center'>
// 													<span className='col align-self-center '>
// 														{totalOpaqueSurface} m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-center text-center'>
// 													<span className='col align-self-center '>
// 														0 m
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 										<td className='p-2'>
// 											<FormGroup id='width-window'>
// 												<div className='d-flex align-content-between'>
// 													<Input
// 														id='ownerName'
// 														name='ownerName'
// 														type='text'
// 														className='me-2 bg-info-subtle text-black'
// 													/>
// 													<span className='col align-self-center '>
// 														%
// 													</span>
// 												</div>
// 											</FormGroup>
// 										</td>
// 									</tr>
// 								</tbody>
// 							</table>
// 						</CardBody>
// 					</Card>
// 					<Card className='col-md-3'>
// 						<CardBody>
// 							<h4>Documentación entregada</h4>
// 							<span>Planos de Fachada con dimensiones de ventanas y generales</span>
// 							<div className='align-items-center text-center mt-2'>
// 								<Button
// 									color='info'
// 									isLight
// 									tag='a'
// 									to='/somefile.txt'
// 									target='_blank'
// 									icon='AttachFile'
// 									download>
// 									Adjuntar
// 								</Button>
// 							</div>
// 						</CardBody>
// 					</Card>
// 				</div>
// 				<Button
// 					color='info'
// 					isLight
// 					tag='a'
// 					to='/somefile.txt'
// 					target='_blank'
// 					className='col-4'
// 					icon='SkipNext'
// 					download>
// 					Siguiente
// 				</Button>
// 			</Page>
// 		</PageWrapper>
// 	);
// };
//
// export default ProportionPage;

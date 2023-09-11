'use client';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../../components/bootstrap/Card';
import React, { useCallback, useEffect } from 'react';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Label from '../../../../../components/bootstrap/forms/Label';
import Input from '../../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import { CustomEditor } from '../../../../../components/extras/CustomEditor';

const WindowPage = () => {
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			crystalType: '',
			frameType: '',
			windowUValue: '',
			uValue1: '',
			uValue2: '',
			gValue: '',
			csValue: '',
			calcGValue: '',
			frameWidth: '',
			longVain: '',
			highVain: '',
			areaVain: '',
			frameArea: '',
			crystalArea: '',
		},
		validateOnChange: true,
		onSubmit: () => {
			console.log('some');
		},
	});

	const calculateGValue = useCallback(() => {
		formik.setFieldValue('calcGValue', Number(formik.values.csValue) * 0.87);
	}, [formik]);

	const calculateCrystalArea = useCallback(() => {
		let areaVain = Number(formik.values.areaVain);
		let frameArea = Number(formik.values.frameArea);
		formik.setFieldValue('crystalArea', areaVain - frameArea);
	}, [formik]);

	const calculateUValue = useCallback(() => {
		let uValue = Number(formik.values.uValue1);
		let uValue2 = Number(formik.values.uValue2);
		let frameArea = Number(formik.values.frameArea);
		let crystalArea = Number(formik.values.crystalArea);
		let longVain = Number(formik.values.longVain);
		let highVain = Number(formik.values.highVain);

		formik.setFieldValue(
			'windowUValue',
			uValue * crystalArea +
				uValue2 * frameArea +
				(0.08 * (longVain * 2 + highVain * 2)) / (crystalArea + frameArea),
		);
	}, [formik]);

	useEffect(() => {
		calculateUValue();
		calculateGValue();
		calculateCrystalArea();
	}, [
		formik.values.uValue1,
		formik.values.uValue2,
		formik.values.longVain,
		formik.values.highVain,
		formik.values.frameArea,
		formik.values.crystalArea,
		calculateUValue,
		calculateGValue,
		calculateCrystalArea,
	]);

	function calculateFrameArea() {
		const largoVano = Number(formik.values.longVain);
		const altoVano = Number(formik.values.highVain);
		const anchoMarco = Number(formik.values.frameWidth);
		formik.setFieldValue(
			'frameArea',
			anchoMarco * largoVano * 2 + (altoVano - anchoMarco * 2) * anchoMarco,
		);
	}

	function handleChange(e: any) {
		formik.handleChange(e);
	}

	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<h4 className='fw-bold'>Cálculo de ventanas</h4>
					</CardBody>
				</Card>
				<Card>
					<CardBody>
						<div className='row align-items-end'>
							<FormGroup className='col-5 my-1'>
								<Label className={'border-2'}>Tipo de acristalamiento</Label>
								<Input
									type='text'
									name='crystalType'
									value={formik.values.crystalType}
									onChange={handleChange}
								/>
							</FormGroup>
							<FormGroup className='col-1 my-1'>
								<Label className={'border-2'}>Valor U (W/m2K)</Label>
								<Input
									type='number'
									name='uValue1'
									value={formik.values.uValue1}
									onChange={handleChange}
								/>
							</FormGroup>
							<FormGroup className='col-1 my-1'>
								<Label className={'border-2'}>Valor g</Label>
								<Input
									name='gValue'
									value={formik.values.gValue}
									type='number'
									onChange={handleChange}
								/>
							</FormGroup>
							<FormGroup className='col-1 my-1'>
								<Label className={'border-2'}>Valor CS</Label>
								<Input
									name='csValue'
									value={formik.values.csValue}
									onChange={(e) => {
										handleChange(e);
									}}
									type='number'
								/>
							</FormGroup>
							<FormGroup className='col-1 my-1'>
								<Label className={'border-2'}>Cálculo valor g</Label>
								<Input
									name='calcGValue'
									value={formik.values.calcGValue}
									type='number'
									className='bg-light'
								/>
							</FormGroup>
						</div>
						<div className='row align-items-end'>
							<FormGroup className='col-5 my-1'>
								<Label className={'border-2'}>Tipo de marco</Label>
								<Input
									name='frameType'
									value={formik.values.frameType}
									onChange={handleChange}
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-1 my-1'>
								<Label className={'border-2'}>Valor U (W/m2K)</Label>
								<Input
									name='uValue2'
									value={formik.values.uValue2}
									onChange={handleChange}
									type='number'
								/>
							</FormGroup>
							<FormGroup className='col-1 my-1'>
								<Label className={'border-2'}>Ancho de marco (metros)</Label>
								<Input
									name='frameWidth'
									value={formik.values.frameWidth}
									onChange={(e) => {
										handleChange(e);
										calculateFrameArea();
									}}
									type='number'
								/>
							</FormGroup>
						</div>
						<div className='row align-items-end'>
							<FormGroup className='col-5 my-1' id='propietario'>
								<Label className={'border-2'}>Valor U de ventana</Label>
								<Input
									name='windowUValue'
									value={formik.values.windowUValue}
									className='bg-light'
									type='number'
								/>
							</FormGroup>

							<FormGroup className='col-1 my-1' id='propietario'>
								<Label className={'border-2'}>Largo vano (metros)</Label>
								<Input
									name='longVain'
									value={formik.values.longVain}
									onChange={(e) => {
										handleChange(e);
										calculateFrameArea();
									}}
									type='number'
								/>
							</FormGroup>
							<FormGroup className='col-1 my-1' id='propietario'>
								<Label className={'border-2'}>Alto vano (metros)</Label>
								<Input
									name='highVain'
									value={formik.values.highVain}
									onChange={(e) => {
										handleChange(e);
										calculateFrameArea();
									}}
									type='number'
								/>
							</FormGroup>
							<FormGroup className='col-1 my-1' id='propietario'>
								<Label className={'border-2'}>Area vano (m2)</Label>
								<Input
									name='areaVain'
									value={formik.values.areaVain}
									onChange={(e) => {
										handleChange(e);
										calculateFrameArea();
									}}
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-1 my-1' id='propietario'>
								<Label className={'border-2'}>Area marco (m2)</Label>
								<Input
									name='frameArea'
									value={formik.values.frameArea}
									className='bg-light'
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-1 my-1' id='propietario'>
								<Label className={'border-2'}>Area cristal (m2)</Label>
								<Input
									name='crystalArea'
									value={formik.values.crystalArea}
									className='bg-light'
									type='text'
								/>
							</FormGroup>
						</div>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<CustomEditor placeholder='Detalle de ventana tipo' />
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default WindowPage;

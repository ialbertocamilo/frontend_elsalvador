'use client';

import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import React, { useEffect, useState } from 'react';
import Input from '../../../../components/bootstrap/forms/Input';
import { useParams } from 'next/navigation';
import { useFormik } from 'formik';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Label from '../../../../components/bootstrap/forms/Label';
import { useProjects } from '../../../../services/project/project.service';
import { Calculator } from '../../../../services/calculation/calculator';
import { GoProjectButton } from '../../../../components/buttons/GoProjectButton';

const keyName = 'window';
const WindowPage = () => {
	const projects = useProjects();

	const [initialData, setInitialData] = useState<any>({});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			crystalType: initialData?.crystalType,
			frameType: initialData?.frameType,
			windowUValue: initialData?.windowUValue,
			uValue1: initialData?.uValue1,
			uValue2: initialData?.uValue2,
			gValue: initialData?.gValue,
			csValue: initialData?.csValue,
			calcGValue: initialData?.calcGValue,
			frameWidth: initialData?.frameWidth,
			longVain: initialData?.longVain,
			highVain: initialData?.highVain,
			areaVain: initialData?.areaVain,
			frameArea: initialData?.frameArea,
			crystalArea: initialData?.crystalArea,
			windowDetailText: initialData?.windowDetailText,
		},
		validateOnChange: true,
		onSubmit: () => {},
	});

	useEffect(() => {
		const longVain = Number(formik.values.longVain);
		const highVain = Number(formik.values.highVain);
		const frameWidth = Number(formik.values.frameWidth);
		const uValue1 = Number(formik.values.uValue1);
		const uValue2 = Number(formik.values.uValue2);
		const csValue = Number(formik.values.csValue);
		const frameArea = Number(Calculator.calculateFrameArea(longVain, highVain, frameWidth));
		const vainArea = Calculator.calculateVainArea(longVain, highVain);
		const crystalArea = Number(Calculator.calculateCrystalArea(Number(vainArea), frameArea));
		const windowUValue = Calculator.calculateWindowUValue(
			uValue1,
			uValue2,
			frameArea,
			crystalArea,
			longVain,
			highVain,
		);
		const calcGValue = Calculator.calculateGValue(csValue);
		formik.setFieldValue('areaVain', isNaN(Number(vainArea)) ? '' : vainArea);
		formik.setFieldValue('frameArea', isNaN(Number(frameArea)) ? '' : frameArea);
		formik.setFieldValue('crystalArea', isNaN(Number(crystalArea)) ? '' : crystalArea);
		formik.setFieldValue('windowUValue', isNaN(Number(windowUValue)) ? '' : windowUValue);
		formik.setFieldValue('calcGValue', isNaN(Number(calcGValue)) ? '' : calcGValue);
	}, [formik.values]);

	const [customEditorText, setCustomEditorText] = useState('');

	function handleChange(e: any) {
		// e.target.value = to2Decimal(e.target.value);
		formik.handleChange(e);
	}

	return (
		<PageWrapper>
			<Page>
				<GoProjectButton />
				<div className='row '>
					<div className='col display-4 fw-bold py-3 text-primary-emphasis'>
						Cálculo de ventanas
					</div>
				</div>
				<br />
				<Card>
					<CardBody>
						<div className='row align-items-end'>
							<FormGroup className='col-4 my-1'>
								<Label className={'border-2'}>Tipo de acristalamiento</Label>
								<Input
									type='text'
									name='crystalType'
									value={formik.values.crystalType}
									onChange={handleChange}
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1'>
								<Label className={'border-2'}>Valor U (W/m²K)</Label>
								<Input
									type='number'
									name='uValue1'
									className='text-center'
									value={formik.values.uValue1}
									onChange={handleChange}
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1'>
								<Label className={'border-2'}>Valor g</Label>
								<Input
									name='gValue'
									className='text-center'
									value={formik.values.gValue}
									type='number'
									onChange={handleChange}
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1'>
								<Label className={'border-2'}>Valor CS</Label>
								<Input
									name='csValue'
									className='text-center'
									value={formik.values.csValue}
									onChange={handleChange}
									type='number'
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1'>
								<Label className={'border-2'}>Cálculo valor g</Label>
								<Input
									name='calcGValue'
									value={formik.values.calcGValue}
									onChange={handleChange}
									readOnly
									type='number'
									className='bg-info-subtle'
								/>
							</FormGroup>
						</div>
						<div className='row align-items-end'>
							<FormGroup className='col-4 my-1'>
								<Label className={'border-2'}>Tipo de marco</Label>
								<Input
									name='frameType'
									value={formik.values.frameType}
									onChange={handleChange}
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1'>
								<Label className={'border-2'}>Valor U (W/m²K)</Label>
								<Input
									name='uValue2'
									className='text-center'
									value={formik.values.uValue2}
									onChange={handleChange}
									type='number'
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1'>
								<Label className={'border-2'}>Ancho de marco (metros)</Label>
								<Input
									name='frameWidth'
									className='text-center'
									value={formik.values.frameWidth}
									onChange={handleChange}
									type='number'
								/>
							</FormGroup>
						</div>
						<div className='row align-items-end'>
							<FormGroup className='col-2 my-1' id='propietario'>
								<Label className={'border-2'}>Valor U de ventana</Label>
								<Input
									name='windowUValue'
									value={formik.values.windowUValue}
									className='bg-info-subtle text-center'
									onChange={handleChange}
									readOnly
									type='number'
								/>
							</FormGroup>

							<FormGroup className='col-2 my-1' id='propietario'>
								<Label className={'border-2'}>Largo vano (metros)</Label>
								<Input
									name='longVain'
									className='text-center'
									value={formik.values.longVain}
									onChange={handleChange}
									type='number'
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1' id='propietario'>
								<Label className={'border-2'}>Alto vano (metros)</Label>
								<Input
									name='highVain'
									className='text-center'
									value={formik.values.highVain}
									onChange={(e) => {
										handleChange(e);
									}}
									type='number'
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1' id='propietario'>
								<Label className={'border-2'}>Area vano (m2)</Label>
								<Input
									name='areaVain'
									value={formik.values.areaVain}
									onChange={handleChange}
									readOnly
									className='bg-info-subtle text-center'
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1' id='propietario'>
								<Label className={'border-2'}>Area marco (m2)</Label>
								<Input
									name='frameArea'
									value={formik.values.frameArea}
									onChange={(e) => {
										handleChange(e);
									}}
									readOnly
									className='bg-info-subtle text-center'
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1' id='propietario'>
								<Label className={'border-2'}>Area cristal (m2)</Label>
								<Input
									name='crystalArea'
									value={formik.values.crystalArea}
									onChange={(e) => {
										handleChange(e);
									}}
									readOnly
									className='bg-info-subtle text-center'
									type='text'
								/>
							</FormGroup>
						</div>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default WindowPage;

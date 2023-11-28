'use client';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../../layout/Page/Page';
import Card, { CardBody, CardFooter } from '../../../../../components/bootstrap/Card';
import React, { useEffect, useState } from 'react';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Label from '../../../../../components/bootstrap/forms/Label';
import Input from '../../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import { CustomEditor } from '../../../../../components/extras/CustomEditor';
import {
	ButtonTypes,
	SaveProjectButton,
} from '../../../../../components/buttons/SaveProjectButton';
import { useParams, useRouter } from 'next/navigation';
import { useProjects } from '../../../../../services/project/project.service';
import BackToCalculatorsBtn from '../../../../../components/buttons/BackToCalculatorsBtn';
import { Calculator } from '../../../../../services/calculation/calculator';
import { NextButton } from '../../../../../components/buttons/NextButton';
import { RoutesListWithParams } from '../../../../../common/constants/default';
import Button from '../../../../../components/bootstrap/Button';

import Icon from '../../../../../components/icon/Icon';
import { GoProjectButton } from '../../../../../components/buttons/GoProjectButton';
import { ClientStorage } from '../../../../../common/classes/storage';
import { useGlobalStatus } from '../../../../../hooks/useGlobalStatus';

const keyName = 'window';
const WindowPage = () => {
	const params = useParams();
	const router = useRouter();
	const projects = useProjects();

	const [initialData, setInitialData] = useState<any>({});
	useEffect(() => {
		projects
			.getProjectData({ project_id: params?.projectId as string, key: keyName })
			.then((data: any) => {
				setInitialData(data.payload);
			});
	}, []);
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

	const { globalReadonly } = useGlobalStatus(params?.projectId as string);
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
									readOnly={globalReadonly}
									name='crystalType'
									value={formik.values.crystalType}
									onChange={handleChange}
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1'>
								<Label className={'border-2'}>Valor U (W/m2K)</Label>
								<Input
									type='number'
									readOnly={globalReadonly}
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
									readOnly={globalReadonly}
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
									readOnly={globalReadonly}
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
									readOnly={globalReadonly}
									type='text'
								/>
							</FormGroup>
							<FormGroup className='col-2 my-1'>
								<Label className={'border-2'}>Valor U (W/m2K)</Label>
								<Input
									name='uValue2'
									className='text-center'
									value={formik.values.uValue2}
									onChange={handleChange}
									readOnly={globalReadonly}
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
									readOnly={globalReadonly}
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
									readOnly={globalReadonly}
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
									readOnly={globalReadonly}
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

				<Card>
					<CardBody>
						<CustomEditor
							readOnly={globalReadonly}
							placeholder='Detalle de ventana tipo'
							initialText={initialData?.customEditorText}
							setText={(e: string) => {
								setCustomEditorText(e);
							}}
						/>
					</CardBody>
				</Card>

				<Card>
					<CardFooter>
						<>
							{!globalReadonly && (
								<SaveProjectButton
									type={ButtonTypes.projectData}
									payload={{
										payload: { ...formik.values, customEditorText },
										project_id: params?.projectId as string,
										key: keyName,
									}}></SaveProjectButton>
							)}
						</>

						<BackToCalculatorsBtn />
						<Button
							color='link'
							className='mx-1 col-2 m-0 p-0'
							onClick={() =>
								router.push(RoutesListWithParams.packages(params?.projectId))
							}>
							<span className='text-start'>
								<Icon icon='Backpack' />
								Paquetes
							</span>
						</Button>
						<NextButton
							route={RoutesListWithParams.calculatorShading(params?.projectId)}
							text='Siguiente'
						/>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default WindowPage;

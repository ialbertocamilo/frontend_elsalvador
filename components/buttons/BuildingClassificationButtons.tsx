import React, { useEffect } from 'react';
import { BuildingClassification } from '../../common/types/building.types';
import Checks, { ChecksGroup } from '../bootstrap/forms/Checks';
import { useFormik } from 'formik';

export const BuildingClassificationButtons = ({
	readOnly,
	selected,
	onChange,
	id,
}: {
	readOnly: boolean;
	selected?: BuildingClassification;
	onChange?: Function;
	id?: string;
}) => {
	const formikClassificationRadios = useFormik({
		initialValues: {
			buildingClassification: selected || BuildingClassification.households,
		},
		onSubmit: () => {},
	});

	useEffect(() => {
		formikClassificationRadios.setFieldValue('buildingClassification', selected?.toString());
	}, [selected]);

	useEffect(() => {
		if (onChange) onChange(formikClassificationRadios.values.buildingClassification);
	}, [formikClassificationRadios.values]);
	return (
		<div className='row align-items-center justify-content-center align-self-center'>
			<ChecksGroup>
				<Checks
					type={'radio'}
					disabled={readOnly}
					name={id ? id : 'buildingClassification'}
					id={BuildingClassification.households.toString()}
					label={'Viviendas'}
					value={BuildingClassification.households.toString()}
					onChange={formikClassificationRadios.handleChange}
					checked={formikClassificationRadios.values.buildingClassification.toString()}
					ariaLabel={'select1'}
				/>
				<Checks
					type={'radio'}
					name={id ? id : 'buildingClassification'}
					disabled={readOnly}
					id={BuildingClassification.offices.toString()}
					label={'Oficinas'}
					value={BuildingClassification.offices.toString()}
					onChange={formikClassificationRadios.handleChange}
					checked={formikClassificationRadios.values.buildingClassification.toString()}
					ariaLabel={'select2'}
				/>
				<Checks
					name='buildingClassification'
					type={'radio'}
					disabled={readOnly}
					id={BuildingClassification.tertiary.toString()}
					label={'Terciarios'}
					value={BuildingClassification.tertiary.toString()}
					onChange={formikClassificationRadios.handleChange}
					checked={formikClassificationRadios.values.buildingClassification.toString()}
					ariaLabel={'select3'}
				/>
			</ChecksGroup>
		</div>
	);
};

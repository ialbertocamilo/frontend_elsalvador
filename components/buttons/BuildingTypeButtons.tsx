import React, { useEffect } from 'react';
import { BuildingType } from '../../common/types/building.types';
import Checks, { ChecksGroup } from '../bootstrap/forms/Checks';
import { useFormik } from 'formik';

export const BuildingTypeButtons = ({
	readOnly,
	selected,
	onChange,
	buttonPublicPrivate,
}: {
	readOnly: boolean;
	selected: BuildingType;
	onChange: Function;
	buttonPublicPrivate?: boolean;
}) => {
	const formikTypeRadios = useFormik({
		initialValues: {
			buildingType: selected,
		},
		onSubmit: () => {},
	});

	useEffect(() => {
		formikTypeRadios.setFieldValue('buildingType', selected?.toString());
	}, [selected]);

	useEffect(() => {
		if (onChange) onChange(formikTypeRadios.values.buildingType);
	}, [formikTypeRadios.values]);

	return (
		<div className='fw-bold'>
			{!buttonPublicPrivate && (
				<ChecksGroup>
					<Checks
						type={'radio'}
						disabled={readOnly}
						name='buildingType'
						id={'buildingType' + BuildingType.single.toString()}
						label={'Unifamiliar'}
						value={BuildingType.single.toString()}
						onChange={formikTypeRadios.handleChange}
						checked={formikTypeRadios.values.buildingType.toString()}
						ariaLabel={'select'}
					/>
					<Checks
						type={'radio'}
						name='buildingType'
						disabled={readOnly}
						id={'buildingType' + BuildingType.duplex.toString()}
						label={'Duplex'}
						value={BuildingType.duplex.toString()}
						onChange={formikTypeRadios.handleChange}
						checked={formikTypeRadios.values.buildingType.toString()}
						ariaLabel={'select'}
					/>
					<Checks
						name='buildingType'
						type={'radio'}
						disabled={readOnly}
						id={'buildingType' + BuildingType.department.toString()}
						label={'Vertical/Departamentos'}
						value={BuildingType.department.toString()}
						onChange={formikTypeRadios.handleChange}
						checked={formikTypeRadios.values.buildingType.toString()}
						ariaLabel={'select'}
					/>
				</ChecksGroup>
			)}
			{buttonPublicPrivate && (
				<ChecksGroup>
					<Checks
						type={'radio'}
						disabled={readOnly}
						name='buildingType'
						id={'buildingType' + BuildingType.public.toString()}
						label={'Público'}
						value={BuildingType.public.toString()}
						onChange={formikTypeRadios.handleChange}
						checked={formikTypeRadios.values.buildingType.toString()}
						ariaLabel={'select'}
					/>
					<Checks
						type={'radio'}
						name='buildingType'
						disabled={readOnly}
						id={'buildingType' + BuildingType.private.toString()}
						label={'Privado'}
						value={BuildingType.private.toString()}
						onChange={formikTypeRadios.handleChange}
						checked={formikTypeRadios.values.buildingType.toString()}
						ariaLabel={'select'}
					/>
				</ChecksGroup>
			)}
		</div>
	);
};

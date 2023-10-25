import Input from '../bootstrap/forms/Input';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { IConfigurationType } from '../../common/types/configuration.types';
import Button from '../bootstrap/Button';
import InputGroup from '../bootstrap/forms/InputGroup';
import DataService from '../../services/data/data.service';

const PackageItem = ({
	title,
	emitValues,
	values,
}: {
	title: string;
	keyName: string;
	emitValues: Function;
	values?: any;
}) => {
	const pack = useRef(null);
	const formik = useFormik({
		initialValues: {
			proportion_wall_window: values?.proportion_wall_window,
			walls_u_value: values?.walls_u_value,
			walls_reflectance: values?.walls_reflectance,
			roofs_u_value: values?.roofs_u_value,
			roofs_reflectance: values?.roofs_reflectance,
			windows_u_value: values?.windows_u_value,
			shading_coefficient: values?.shading_coefficient,
			shades: values?.shades,
			hvac: values?.hvac,
			final_energy_reduction: values?.final_energy_reduction,
		},
		enableReinitialize: true,
		validateOnChange: true,
		onSubmit: async (values) => {},
	});

	function handleChange(e: any) {
		formik.handleChange(e);
	}

	useEffect(() => {
		emitValues(formik.values);
	}, [formik.values]);
	return (
		<table className='mx-2'>
			<thead>
				<tr>
					<th className='text-center'>{title}</th>
				</tr>
			</thead>
			<tbody ref={pack}>
				<tr className='p-2 '>
					<td width='150'>
						<div className='d-flex align-content-between'>
							<InputGroup size='sm'>
								<Input
									type='number'
									className='text-center'
									name='proportion_wall_window'
									value={formik.values.proportion_wall_window}
									onChange={handleChange}></Input>
								<Button className='bg-light'>%</Button>
							</InputGroup>
						</div>
					</td>
				</tr>
				<tr>
					<td width='150'>
						<Input
							type='number'
							className='text-center'
							name='walls_u_value'
							value={formik.values.walls_u_value}
							onChange={handleChange}></Input>
					</td>
				</tr>
				<tr>
					<td width='150'>
						<div className='d-flex align-content-between'>
							<InputGroup size='sm'>
								<Input
									type='number'
									className='text-center'
									name='walls_reflectance'
									value={formik.values.walls_reflectance}
									onChange={handleChange}></Input>
								<Button className='bg-light'>%</Button>
							</InputGroup>
						</div>
					</td>
				</tr>
				<tr>
					<td width='150'>
						<Input
							type='number'
							className='text-center'
							name='roofs_u_value'
							value={formik.values.roofs_u_value}
							onChange={handleChange}></Input>
					</td>
				</tr>
				<tr>
					<td width='150'>
						<InputGroup size='sm'>
							<Input
								type='number'
								className='text-center'
								name='roofs_reflectance'
								value={formik.values.roofs_reflectance}
								onChange={handleChange}></Input>
							<Button className='bg-light'>%</Button>
						</InputGroup>
					</td>
				</tr>
				<tr>
					<td width='150'>
						<Input
							type='number'
							className='text-center'
							name='windows_u_value'
							value={formik.values.windows_u_value}
							onChange={handleChange}></Input>
					</td>
				</tr>
				<tr>
					<td width='150'>
						<Input
							type='number'
							className='text-center'
							name='shading_coefficient'
							value={formik.values.shading_coefficient}
							onChange={handleChange}></Input>
					</td>
				</tr>
				<tr>
					<td width='150'>
						<Input
							type='number'
							className='text-center'
							name='shades'
							value={formik.values.shades}
							onChange={handleChange}></Input>
					</td>
				</tr>
				<tr>
					<td width='150'>
						<Input
							type='number'
							className='text-center'
							name='hvac'
							value={formik.values.hvac}
							onChange={handleChange}></Input>
					</td>
				</tr>
				<tr>
					<td width='150'>
						<InputGroup size='sm'>
							<Input
								type='number'
								className='text-center'
								name='final_energy_reduction'
								value={formik.values.final_energy_reduction}
								onChange={handleChange}></Input>
							<Button className='bg-light'>%</Button>
						</InputGroup>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export const ConfigurationTable = ({ emitValue }: { emitValue: Function }) => {
	const [value1, setValue1] = useState<IConfigurationType>();
	const [value2, setValue2] = useState<IConfigurationType>();
	const [value3, setValue3] = useState<IConfigurationType>();

	const [packages, setPackages] = useState<{
		package_one: {};
		package_two: {};
		package_three: {};
	}>();
	useEffect(() => {
		DataService.getPackagesConfig().then((data) => {
			if (data) setPackages(data);
		});
	}, []);
	useEffect(() => {
		const newObj = {
			package_one: value1 ? value1 : packages?.package_one,
			package_two: value2 ? value2 : packages?.package_two,
			package_three: value3 ? value3 : packages?.package_three,
		};
		emitValue(newObj);
	}, [value1, value2, value3]);
	return (
		<>
			<table>
				<thead>
					<tr>
						<th className='text-center'>Parámetros</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='p-4'>Proporcion muro ventana</td>
					</tr>
					<tr>
						<td className='p-4'>Muros valor U</td>
					</tr>
					<tr>
						<td className='p-4'>Muros reflactancia</td>
					</tr>
					<tr>
						<td className='p-4'>Techos valor U</td>
					</tr>
					<tr>
						<td className='p-4'>Techos reflectancia</td>
					</tr>
					<tr>
						<td className='p-4'>Ventanas valor U</td>
					</tr>
					<tr>
						<td className='p-4'>Coeficiente de sombreado</td>
					</tr>
					<tr>
						<td className='p-4'>Sombras</td>
					</tr>
					<tr>
						<td className='p-4'>HVAC(sin unidad)</td>
					</tr>
					<tr>
						<td className='p-4 h5'>% Reducción Energia final</td>
					</tr>
				</tbody>
			</table>
			<PackageItem
				title='Paquete 1'
				keyName='package_one'
				emitValues={setValue1}
				values={packages?.package_one}
			/>
			<PackageItem
				title='Paquete 2'
				keyName='package_two'
				emitValues={setValue2}
				values={packages?.package_two}
			/>
			<PackageItem
				title='Paquete 3'
				keyName='package_three'
				emitValues={setValue3}
				values={packages?.package_three}
			/>
		</>
	);
};

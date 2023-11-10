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
	emitValues?: Function;
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
		if (emitValues) emitValues(formik.values);
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
								<Button className='bg-dark-subtle'>%</Button>
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
								<Button className='bg-dark-subtle'>%</Button>
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
							<Button className='bg-dark-subtle'>%</Button>
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
							<Button className='bg-dark-subtle'>%</Button>
						</InputGroup>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export const ConfigurationTable = ({ emitValue }: { emitValue: Function }) => {
	const packageEmptyData: IConfigurationType = {
		final_energy_reduction: '',
		hvac: '',
		roofs_reflectance: '',
		roofs_u_value: '',
		walls_reflectance: '',
		proportion_wall_window: '',
		shades: '',
		shading_coefficient: '',
		walls_u_value: '',
		windows_u_value: '',
	};
	const [packages, setPackages] = useState<IConfigurationType[]>([packageEmptyData]);
	useEffect(() => {
		DataService.getPackagesConfig().then((data) => {
			if (data?.config) setPackages(data?.config);
		});
	}, []);

	function addPackage() {
		setPackages([...packages, packageEmptyData]);
	}
	function sendData(val: any, key: number) {
		packages[key] = val;
		setPackages(packages);
		emitValue(packages);
	}

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
			{packages?.map((value, key) => (
				<PackageItem
					title={`Paquete ${key + 1}`}
					keyName='package_one'
					emitValues={(e: any) => sendData(e, key)}
					key={key}
					values={value}
				/>
			))}
			<Button
				icon='PlusOne'
				size='sm'
				onClick={addPackage}
				isLight
				className='bg-primary text-white'
			/>
		</>
	);
};

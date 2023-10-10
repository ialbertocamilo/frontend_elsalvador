'use client';
import Input from '../bootstrap/forms/Input';
import FormGroup from '../bootstrap/forms/FormGroup';
import Button from '../bootstrap/Button';
import React, { useEffect, useState } from 'react';
import Select from '../bootstrap/forms/Select';
import { to2Decimal } from '../../helpers/helpers';

interface Row {
	data: any;
	onInputChange: Function;
	onRemove: Function;
}

const Row = ({ data, onInputChange, onRemove }: Row) => {
	const windowOrientation = [
		{ value: 0, text: 'Norte' },
		{ value: 1, text: 'Noreste' },
		{ value: 2, text: 'Este' },
		{ value: 3, text: 'Sureste' },
		{ value: 4, text: 'Sur' },
		{ value: 5, text: 'Suroeste' },
		{ value: 6, text: 'Oeste' },
		{ value: 7, text: 'Noroeste' },
	];

	const shadowType = [
		{ value: 0, text: 'Horizontal' },
		{ value: 1, text: 'Vertical' },
		{ value: 2, text: 'Combinada' },
	];
	return (
		<tr>
			<td className='col-2 p-2'>
				<Select
					ariaLabel={'Seleccionar'}
					list={windowOrientation}
					value={data.column1}
					onChange={(e: any) => onInputChange('column1', e.target.value)}></Select>
			</td>
			<td className='col-2 p-2'>
				<Select
					ariaLabel={'Seleccionar'}
					list={shadowType}
					value={data.column2}
					onChange={(e: any) => onInputChange('column2', e.target.value)}
				/>
			</td>
			<td className='p-2'>
				<Input
					type='number'
					className='col'
					value={data.column3}
					onChange={(e: any) => onInputChange('column3', e.target.value)}
				/>
			</td>
			<td className='p-2'>
				<Input
					type='number'
					className='col'
					inputMode={'numeric'}
					value={data.column4}
					onChange={(e: any) => onInputChange('column4', e.target.value)}
				/>
			</td>
			<td className='p-2'>
				<Input
					type='number'
					className='col'
					value={data.column5}
					onChange={(e: any) => onInputChange('column5', e.target.value)}
				/>
			</td>
			<td className='p-2'>
				<Input
					type='number'
					className='col'
					value={data.column6}
					onChange={(e: any) => onInputChange('column6', e.target.value)}
				/>
			</td>
			<td className='text-center'>{data.result1}</td>
			<td className='text-center'>{data.result2}</td>
			<td className='text-center'>{data.result3}</td>
			<td className='p-2'>
				<FormGroup id='width-window'>
					<div className='d-flex align-content-between'>
						<Button color='storybook' onClick={(e) => onRemove(e)}>
							-
						</Button>
					</div>
				</FormGroup>
			</td>
		</tr>
	);
};

interface ShadingProps {
	setData?: Function;
	data?: any;
}

export const ShadingTable = ({ setData, data }: ShadingProps) => {
	const initialValueObj = {
		column1: '0',
		column2: '0',
		column3: '',
		column4: '',
		column5: '',
		column6: '',
		result1: 'x',
		result2: 'x',
		result3: 'x',
	};

	useEffect(() => {
		if (data) setRow(data);
	}, [data]);

	const [row, setRow] = useState<any[]>(data ? data : [initialValueObj]);

	function selectOrientation(orientation: string, shadingType: string, selectIndex: number) {
		let value: number[][] = [];
		let numberShadingType = Number(shadingType);
		switch (orientation) {
			case '0': //Norte
				value[0] = [0.32, 0.32, 0.36, 0.42, 0.47];
				value[1] = [0.15, 0.15, 0.17, 0.19, 0.21];
				value[2] = [0.47, 0.47, 0.53, 0.06, 0.69];
				break;
			case '1': //Noreste
				value[0] = [0.29, 0.29, 0.33, 0.38, 0.44];
				value[1] = [0.16, 0.16, 0.18, 0.21, 0.24];
				value[2] = [0.45, 0.45, 0.51, 0.59, 0.69];
				break;
			case '2': // Este
				value[0] = [0.29, 0.29, 0.31, 0.38, 0.47];
				value[1] = [0.12, 0.12, 0.14, 0.16, 0.2];
				value[2] = [0.39, 0.39, 0.45, 0.54, 0.67];
				break;
			case '3': // Sureste
				value[0] = [0.27, 0.27, 0.32, 0.4, 0.51];
				value[1] = [0.11, 0.11, 0.13, 0.16, 0.2];
				value[2] = [0.38, 0.38, 0.45, 0.56, 0.71];
				break;
			case '4': // Sur
				value[0] = [0.3, 0.3, 0.35, 0.43, 0.51];
				value[1] = [0.15, 0.15, 0.17, 0.21, 0.23];
				value[2] = [0.45, 0.45, 0.53, 0.64, 0.74];
				break;
			case '5': // Suroeste
				value[0] = [0.3, 0.3, 0.35, 0.42, 0.52];
				value[1] = [0.12, 0.12, 0.14, 0.15, 0.18];
				value[2] = [0.42, 0.42, 0.49, 0.57, 0.7];
				break;
			case '6': // Oeste
				value[0] = [0.3, 0.3, 0.34, 0.41, 0.49];
				value[1] = [0.13, 0.13, 0.15, 0.17, 0.2];
				value[2] = [0.43, 0.43, 0.5, 0.59, 0.7];
				break;
			case '7': // Noroeste
				value[0] = [0.32, 0.32, 0.35, 0.41, 0.47];
				value[1] = [0.15, 0.15, 0.16, 0.19, 0.21];
				value[2] = [0.46, 0.46, 0.52, 0.6, 0.68];
				break;
		}
		return value[numberShadingType][selectIndex];
	}

	function calculateShading(windowHeight: number, eaveDepth: number, combined = false) {
		let results = [];
		results[0] = 0.1;
		results[1] = windowHeight / 4;
		results[2] = windowHeight / 3;
		results[3] = windowHeight / 2;
		results[4] = windowHeight;

		let resultFinded = 0;
		let resultIndex = 0;
		for (const resultsKey in results) {
			if (results[resultsKey] <= eaveDepth) {
				resultFinded = results[resultsKey];
				resultIndex = Number(resultsKey);
			}
		}
		return resultIndex;
	}

	function manageOperations() {
		for (const rowKey in row) {
			if (row[rowKey]['column3'] && row[rowKey]['column5']) {
				const newRows = [...row];
				let resultType = 'result1';
				let number1 = Number(row[rowKey]['column3']);
				let number2 = Number(row[rowKey]['column5']);
				switch (
					newRows[rowKey]['column2'] //Verificar tipo de sombra horizontal, vertical, combinada
				) {
					case '0': // Horizontal
						newRows[rowKey]['result2'] = 'x';
						newRows[rowKey]['result3'] = 'x';
						resultType = 'result1';
						number1 = Number(row[rowKey]['column3']);
						number2 = Number(row[rowKey]['column5']);
						break;
					case '1': // Vertical
						newRows[rowKey]['result1'] = 'x';
						newRows[rowKey]['result3'] = 'x';
						resultType = 'result2';
						number1 = Number(row[rowKey]['column4']);
						number2 = Number(row[rowKey]['column6']);
						break;
					case '2': // Combinada
						newRows[rowKey]['result1'] = 'x';
						newRows[rowKey]['result2'] = 'x';
						resultType = 'result3';
						number1 = Number(row[rowKey]['column3']) + Number(row[rowKey]['column4']);
						number2 = Number(row[rowKey]['column5']) + Number(row[rowKey]['column6']);
						break;
				}
				let index = calculateShading(number1, number2);
				let result = selectOrientation(row[rowKey].column1, row[rowKey].column2, index);
				newRows[rowKey][resultType] = String(result);
				setRow(newRows);
			}
		}
	}

	useEffect(() => {
		if (setData) setData(row);
	}, [row]);
	const handleInputChange = (index: number, column: string | number, val: any) => {
		const newRows = [...row];
		newRows[index][column] = to2Decimal(val);
		setRow(newRows);
		manageOperations();
	};

	function addRow() {
		setRow([
			...row,
			{
				column1: '0',
				column2: '0',
				column3: '',
				column4: '',
				column5: '',
				column6: '',
				result1: 'x',
				result2: 'x',
				result3: 'x',
			},
		]);
	}

	function handleDelete(id: number) {
		let result: any = row.map((value, index, array) => {
			if (index != id) return value;
		});
		result = result.filter((values: any) => values);
		setRow(result);
	}

	return (
		<>
			<div className='m-2 my-4'>
				<Button color='primary' onClick={addRow}>
					Agregar fila
				</Button>
			</div>
			<table>
				<thead>
					<tr className='text-center'>
						<th className='px-2'>Orientación ventana</th>
						<th className='px-2'>Tipo sombra</th>
						<th className='px-2'>Altura de la ventana(m)</th>
						<th className='px-2'>Anchura de la ventana(m)</th>
						<th className='px-2'>Profundidad del alero horizontal(m)</th>
						<th className='px-2'>Profundidad del alero vertical(m)</th>
						<th colSpan={3}>
							Resultado Sombra (CS)
							<th className='px-5'>Horizontal</th>
							<th className='px-5'>Vertical</th>
							<th className='px-5'>Combinada</th>
						</th>
					</tr>
				</thead>
				<tbody>
					{row.map((value, index) => (
						<Row
							key={index}
							data={value}
							onRemove={() => handleDelete(index)}
							onInputChange={(column: string | number, val: any) =>
								handleInputChange(index, column, val)
							}></Row>
					))}
				</tbody>
			</table>
		</>
	);
};

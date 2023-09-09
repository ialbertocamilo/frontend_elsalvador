import Input from '../bootstrap/forms/Input';
import FormGroup from '../bootstrap/forms/FormGroup';
import Button from '../bootstrap/Button';
import React, { useState } from 'react';
import { Autosave } from '../extras/Autosave';

interface Row {
	data: any;
	onInputChange: Function;
}
const Row = ({ data, onInputChange }: Row) => {
	return (
		<tr>
			<td className='p-2'>
				<Autosave>
					<Input
						type='text'
						value={data.column1}
						onChange={(e: any) => onInputChange('column1', e.target.value)}
					/>
				</Autosave>
			</td>
			<td className='p-2'>
				<FormGroup>
					<div className='row'>
						<Input
							name='ownerName'
							type='text'
							className='col'
							value={data.column2}
							onChange={(e: any) => onInputChange('column2', e.target.value)}
						/>
						<span className='col align-self-center'>W/mk</span>
					</div>
				</FormGroup>
			</td>
			<td className='p-2'>
				<FormGroup>
					<Input
						type='text'
						className='col'
						value={data.column3}
						onChange={(e: any) => onInputChange('column3', e.target.value)}
					/>
				</FormGroup>
			</td>
			<td className='p-2'>
				<FormGroup>
					<div className='row'>
						<Input
							type='text'
							className='col'
							value={data.column4}
							onChange={(e: any) => onInputChange('column4', e.target.value)}
						/>
						<span className='col align-self-center'>W/mk</span>
					</div>
				</FormGroup>
			</td>
			<td className='p-2'>
				<FormGroup id='width-window'>
					<div className='row text-center'>
						<Input
							type='text'
							className='col'
							value={data.column5}
							onChange={(e: any) => onInputChange('column5', e.target.value)}
						/>
						<span className='col align-self-center'>m</span>
					</div>
				</FormGroup>
			</td>
			<td className='p-2'>
				<FormGroup id='width-window'>
					<div className='d-flex align-content-between'>
						<Button color='storybook'>-</Button>
					</div>
				</FormGroup>
			</td>
		</tr>
	);
};
export const TransmittanceTable = () => {
	const [row, setRow] = useState([
		{ column1: '', column2: '', column3: '', column4: '', column5: '' },
	]);
	const handleInputChange = (index: string | number, column: string | number, val: any) => {
		const newRows = [...row];
		// @ts-ignore
		newRows[index][column] = val;
		setRow(newRows);
	};

	function addRow() {
		setRow([...row, { column1: '', column2: '', column3: '', column4: '', column5: '' }]);
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
						<th className='px-2'>Superficie parcial 1</th>
						<th className='px-2'>Valor λ</th>
						<th className='px-2'>Superficie parcial 2</th>
						<th className='px-2'>Valor λ</th>
						<th className='px-2'>Espesor</th>
					</tr>
				</thead>
				<tbody>
					{row.map((value, index) => (
						<Row
							key={index}
							data={value}
							onInputChange={(column: string | number, val: any) =>
								handleInputChange(index, column, val)
							}></Row>
					))}
				</tbody>
			</table>
		</>
	);
};

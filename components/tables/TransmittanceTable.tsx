import Input from '../bootstrap/forms/Input';
import FormGroup from '../bootstrap/forms/FormGroup';
import Button from '../bootstrap/Button';
import React, { useEffect, useMemo, useState } from 'react';
import { Calculator } from '../../services/calculation/calculator';

interface RowProps {
	data: any;
	onInputChange: Function;
	onRemove: Function;
}

const Row = ({ data, onInputChange, onRemove }: RowProps) => {
	return (
		<tr>
			<td className='p-2'>
				<Input
					type='text'
					value={data.column1}
					onChange={(e: any) => onInputChange('column1', e.target.value)}
				/>
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
						<Button color='storybook' onClick={(e) => onRemove(e)}>
							-
						</Button>
					</div>
				</FormGroup>
			</td>
		</tr>
	);
};

interface Props {
	onData?: Function;
	data?: { rows: []; result: { surface2: number } };
	onDataResult?: Function;
	dataResult?: { totalSurface1: number; totalSurface2: number; totalThickness: number };
}

export const TransmittanceTable = ({ onData, data }: Props) => {
	const [row, setRow] = useState<any | []>([
		{ column1: '', column2: '', column3: '', column4: '', column5: '' },
	]);
	const [totalThickness, setTotalThickness] = useState(0);
	const [totalSurface1, setTotalSurface1] = useState(0);
	const [totalSurface2, setTotalSurface2] = useState(0);

	useEffect(() => {}, [totalSurface2]);
	useEffect(() => {
		if (data?.rows) setRow(data?.rows);
		if (data?.result) setTotalSurface2(data?.result.surface2);
	}, [data]);
	const handleInputChange = (index: number, column: string | number, val: any) => {
		const newRows = [...row];
		newRows[index][column] = val;
		const result = Calculator.calculateThickness(newRows, 'column5');
		setTotalThickness(result);
		setRow(newRows);
	};

	const calculateExpensive = useMemo(() => {
		setTotalSurface1(100 - totalSurface2);
		if (onData) onData({ rows: row, result: { surface2: totalSurface2 } });
		setTotalThickness(Calculator.calculateThickness(row, 'column5'));
		return Calculator.transmittanceUValue(row, totalSurface1, totalSurface2);
	}, [row, totalSurface2]);

	function handleDelete(id: number) {
		let result: any = row.map((value: any, index: number) => {
			if (index != id) return value;
		});
		result = result.filter((values: any) => values);
		setRow(result);
	}

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
					{row.map((value: any, index: number) => (
						<Row
							key={index}
							data={value}
							onRemove={() => handleDelete(index)}
							onInputChange={(column: string | number, val: any) =>
								handleInputChange(index, column, val)
							}></Row>
					))}
					<tr>
						<td className='p-2'>Porcentaje de superficie parcial</td>
						<td className='p-2'>
							<FormGroup>
								<div className='row'>
									<Input
										name='ownerName'
										type='text'
										className='col bg-info-subtle'
										readOnly
										value={totalSurface1}
									/>
									<span className='col align-self-center'>%</span>
								</div>
							</FormGroup>
						</td>
						<td className='p-2'>Porcentaje de superficie parcial 2</td>
						<td className='p-2'>
							<FormGroup>
								<div className='row'>
									<Input
										type='text'
										className='col'
										value={totalSurface2}
										onChange={(e: any) => {
											if (
												e.target.value.length <= 2 ||
												e.target.value == 100
											) {
												setTotalSurface2(e.target.value);
											}
										}}
									/>
									<span className='col align-self-center'>%</span>
								</div>
							</FormGroup>
						</td>
						<td className='p-2 '>
							<FormGroup id='width-window'>
								<div className='row text-center'>
									<span className='col align-self-center'>{totalThickness}</span>
									<span className='col align-self-center'>m</span>
								</div>
							</FormGroup>
						</td>
					</tr>

					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td className='p-2'>
							<FormGroup id='width-window'>
								<div className='row'>
									<span>Valor u</span>
									<Input
										type='text'
										className='col bg-info-subtle'
										value={calculateExpensive}
										readOnly
									/>
									<span className='col align-self-center'>W/m2K</span>
								</div>
							</FormGroup>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

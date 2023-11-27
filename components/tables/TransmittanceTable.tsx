import Input from '../bootstrap/forms/Input';
import FormGroup from '../bootstrap/forms/FormGroup';
import Button from '../bootstrap/Button';
import React, { useEffect, useMemo, useState } from 'react';
import { Calculator } from '../../services/calculation/calculator';
import { to2Decimal } from '../../helpers/helpers';
import { ClientStorage } from '../../common/classes/storage';
import { RoleType } from '../../common/types/role.types';
import { useGlobalReadOnly } from '../../hooks/useGlobalReadOnly';
import { useParams } from 'next/navigation';

interface RowProps {
	data: any;
	onInputChange: Function;
	onRemove: Function;
	readOnly: boolean;
}

const Row = ({ data, onInputChange, onRemove, readOnly }: RowProps) => {
	const params = useParams();
	const { globalReadonly } = useGlobalReadOnly(params?.projectId as string);
	return (
		<tr>
			<td className='p-2'>
				<Input
					type='text'
					readOnly={globalReadonly}
					value={data.column1}
					onChange={(e: any) => onInputChange('column1', e.target.value)}
				/>
			</td>
			<td className='p-2'>
				<Input
					name='ownerName'
					readOnly={globalReadonly}
					type={'number'}
					className=' text-center'
					value={data.column2}
					onChange={(e: any) => onInputChange('column2', e.target.value)}
				/>
			</td>
			<td className='p-2'>
				<Input
					type='text'
					readOnly={globalReadonly}
					value={data.column3}
					onChange={(e: any) => onInputChange('column3', e.target.value)}
				/>
			</td>
			<td className='p-2'>
				<Input
					className='col text-center'
					inputMode={'decimal'}
					readOnly={globalReadonly}
					value={data.column4}
					onChange={(e: any) => onInputChange('column4', e.target.value)}
				/>
			</td>
			<td className='p-2'>
				<Input
					className=' text-center'
					inputMode={'decimal'}
					value={data.column5}
					readOnly={globalReadonly}
					onChange={(e: any) => onInputChange('column5', e.target.value)}
				/>
			</td>
			<td className='p-2'>
				<FormGroup id='width-window'>
					<div className='d-flex align-content-between'>
						<Button color='storybook' onClick={(e) => onRemove(e)} isDisable={readOnly}>
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
	readOnly: boolean;
}

export const TransmittanceTable = ({ onData, data, readOnly }: Props) => {
	const calculator = new Calculator(0.13, 0.04);
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
		if (column == 'column2' || column == 'column4' || column == 'column5')
			newRows[index][column] = to2Decimal(val);
		else newRows[index][column] = val;
		const result = calculator.calculateThickness(newRows, 'column5');

		setTotalThickness(result);
		setRow(newRows);
	};

	const calculateExpensive = useMemo(() => {
		const surface1 = 100 - totalSurface2;
		setTotalSurface1(surface1);
		setTotalThickness(calculator.calculateThickness(row, 'column5'));
		const result = calculator.transmittanceUValue(row, surface1, totalSurface2);
		if (onData) onData({ rows: row, result: { surface2: totalSurface2, u_value: result } });
		return result;
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
				<Button color='primary' onClick={addRow} isDisable={readOnly}>
					Agregar fila
				</Button>
			</div>
			<table>
				<thead>
					<tr>
						<th className='px-2'>Superficie parcial 1</th>
						<th className='px-2'>Valor λ(W/mk)</th>
						<th className='px-2'>Superficie parcial 2</th>
						<th className='px-2 '>Valor λ(W/mk)</th>
						<th className='px-2 '>Espesor(m)</th>
					</tr>
				</thead>
				<tbody>
					{row.map((value: any, index: number) => (
						<Row
							key={index}
							data={value}
							readOnly={readOnly}
							onRemove={() => handleDelete(index)}
							onInputChange={(column: string | number, val: any) =>
								handleInputChange(index, column, val)
							}></Row>
					))}
					<tr>
						<td className='p-2'>Porcentaje de superficie parcial</td>
						<td className='p-2 align-self-center text-center'>
							<div className='w-100 bg-info-subtle h4 bold  px-3  py-2 rounded'>
								<span>{totalSurface1} %</span>
							</div>
						</td>
						<td className='p-2 align-self-center'>
							Porcentaje de superficie parcial 2
						</td>
						<td className='p-2 text-center   text-center'>
							<FormGroup>
								<div className='d-flex align-content-between'>
									<Input
										value={totalSurface2}
										placeholder='%'
										readOnly={readOnly}
										className='me-2 text-center '
										inputMode={'decimal'}
										onChange={(e: any) => {
											if (
												e.target.value.length <= 10 ||
												e.target.value == 100
											) {
												setTotalSurface2(e.target.value);
											}
										}}
									/>
									<span className='align-self-center'>%</span>
								</div>
							</FormGroup>
						</td>
						<td className='p-2 align-self-center text-center'>
							<div className='w-100 bg-info-subtle h4 bold  px-3 py-2 rounded'>
								<span>{totalThickness} m</span>
							</div>
						</td>
					</tr>

					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td className='text-center'>
							<span>Valor u</span>
						</td>
						<td className='p-2  text-center'>
							<div className='w-100 bg-info-subtle h4 bold  px-3  py-2 rounded'>
								<span className=''>{calculateExpensive} W/m²K</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

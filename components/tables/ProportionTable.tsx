import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import React, { useEffect, useState } from 'react';
import Button from '../bootstrap/Button';
import { useProjects } from '../../services/project/project.service';
import { useParams } from 'next/navigation';
import { to2Decimal } from '../../helpers/helpers';

function calculatePercentage(num1: number, num2: number): string | number {
	const res = Number((num1 / num2) * 100).toFixed(0);
	if (isNaN(Number(res)) || Number(res) === Infinity) return 0;

	return res;
}

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
					placeholder='Ingresar texto'
					value={data.column1}
					onChange={(e: any) => onInputChange('column1', e.target.value)}></Input>
			</td>
			<td className='p-2'>
				<FormGroup id='propietario'>
					<div className='d-flex align-content-between'>
						<Input
							id='opaque_surface_1'
							name='opaque_surface_1'
							type='number'
							className='me-2'
							value={data.column2}
							onChange={(e: any) => onInputChange('column2', e.target.value)}
						/>
						<span className='col align-self-center '>m</span>
					</div>
				</FormGroup>
			</td>
			<td className='p-2'>
				<FormGroup id='width-window'>
					<div className='d-flex align-content-between'>
						<Input
							id='glazed_surface_1'
							name='glazed_surface_1'
							type='number'
							className='me-2'
							value={data.column3}
							onChange={(e: any) => onInputChange('column3', e.target.value)}
						/>
						<span className='col align-self-center '>m</span>
					</div>
				</FormGroup>
			</td>
			<td className='p-2'>
				<FormGroup id='width-window'>
					<div className='d-flex align-content-between'>
						<Input
							type='text'
							className='me-2 bg-info-subtle'
							value={data.column4}
							readOnly
						/>
						<span className='col align-self-center '>%</span>
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

interface ProportiontableProps {
	onData: Function;
	keyName: string;
	loadedData?: unknown;
}

export const ProportionTable = ({ onData, keyName }: ProportiontableProps) => {
	const [row, setRow] = useState<Record<string, any>[]>([
		{ column1: '', column2: 0, column3: 0, column4: 0 },
	]);

	const projects = useProjects();
	const params = useParams();
	useEffect(() => {
		const resultData = {
			totalOpaqueSurface: totalOpaqueSurface,
			totalGlazedSurface: totalGlazedSurface,
			totalPercentage: totalPercentage,
		};

		const result = Object.assign({}, { rows: [...row], result: resultData });
		onData(result);
	}, [row]);

	useEffect(() => {
		projects
			.getProjectData({ key: keyName, project_id: params?.projectId as string })
			.then((res: any) => {
				const data = res?.payload;
				if (data) {
					setRow(data.rows);
					setTotalPercentage(data.result.totalPercentage);
					setTotalGlazedSurface(data.result.totalGlazedSurface);
					setTotalOpaqueSurface(data.result.totalOpaqueSurface);
				}
			});
	}, []);

	function addRow() {
		setRow([...row, { column1: '', column2: 0, column3: 0, column4: 0 }]);
	}

	const [totalOpaqueSurface, setTotalOpaqueSurface] = useState(0);
	const [totalGlazedSurface, setTotalGlazedSurface] = useState(0);
	const [totalPercentage, setTotalPercentage] = useState<string | number>();
	const handleInputChange = (index: number, column: string | number, val: any) => {
		const newRows = [...row];

		newRows[index][column] = to2Decimal(val);
		setRow(newRows);
		let sum1 = 0;
		let sum2 = 0;
		for (const newRowsKey in newRows) {
			sum1 += Number(newRows[newRowsKey]['column2']);
			sum2 += Number(newRows[newRowsKey]['column3']);
			newRows[newRowsKey]['column4'] = Number(
				calculatePercentage(newRows[newRowsKey]['column3'], newRows[newRowsKey]['column2']),
			);
		}
		setRow(newRows);

		setTotalOpaqueSurface(sum1);
		setTotalGlazedSurface(sum2);
		setTotalPercentage(calculatePercentage(sum2, sum1));
	};

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
					<tr className=''>
						<th className='px-2 w-25'>Tipo fachada</th>
						<th className='px-2'>Superficie opaca</th>
						<th className='px-2'>Superficie vidriada</th>
						<th className='px-2'>Proporción opaca: Vidriada</th>
					</tr>
				</thead>
				<tbody>
					{row.map((value, index) => (
						<Row
							data={value}
							onRemove={() => handleDelete(index)}
							onInputChange={(column: string | number, val: any) =>
								handleInputChange(index, column, val)
							}
							key={index}
						/>
					))}
					<tr className='line-h'>
						<td className='p-2'>
							<b>Sumatoria total</b>
						</td>
						<td className='p-2'>
							<FormGroup id='propietario'>
								<div className='d-flex align-content-center text-center'>
									<span className='col align-self-center '>
										{totalOpaqueSurface} m
									</span>
								</div>
							</FormGroup>
						</td>
						<td className='p-2'>
							<FormGroup id='width-window'>
								<div className='d-flex align-content-center text-center'>
									<span className='col align-self-center '>
										{totalGlazedSurface} m
									</span>
								</div>
							</FormGroup>
						</td>
						<td className='p-2'>
							<FormGroup id='width-window'>
								<div className='d-flex align-content-between'>
									<Input
										id='ownerName'
										name='ownerName'
										type='text'
										className='me-2 bg-info-subtle text-black'
										value={totalPercentage}
										readOnly
									/>
									<span className='col align-self-center '>%</span>
								</div>
							</FormGroup>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

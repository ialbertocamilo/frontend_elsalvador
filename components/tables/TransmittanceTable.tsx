import Input from '../bootstrap/forms/Input';
import FormGroup from '../bootstrap/forms/FormGroup';
import Button from '../bootstrap/Button';
import React, { useEffect, useMemo, useState } from 'react';

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
	data?: object;
	onDataResult?: Function;
	dataResult?: { totalSurface1: number; totalSurface2: number; totalThickness: number };
}

export const TransmittanceTable = ({ onData, data, onDataResult, dataResult }: Props) => {
	const [row, setRow] = useState<any | []>([
		{ column1: '', column2: '', column3: '', column4: '', column5: '' },
	]);
	const [totalThickness, setTotalThickness] = useState(0);
	const [totalSurface1, setTotalSurface1] = useState(0);
	const [totalSurface2, setTotalSurface2] = useState(0);

	const rsi = 0.13;
	const rse = 0.04;

	useEffect(() => {
		if (dataResult) {
			setTotalSurface1(dataResult?.totalSurface1);
			setTotalSurface2(dataResult?.totalSurface2);
			setTotalThickness(dataResult?.totalThickness);
		}
	}, [dataResult]);

	useEffect(() => {}, [totalSurface2]);
	useEffect(() => {
		if (data) setRow(data);
	}, [data]);
	const handleInputChange = (index: number, column: string | number, val: any) => {
		const newRows = [...row];
		// @ts-ignore
		newRows[index][column] = val;
		let totalSum = 0;
		if (column === 'column5') {
			for (const newRowsKey in newRows) {
				totalSum += Number(newRows[newRowsKey][column]);
				setTotalThickness(totalSum);
			}
		}

		setRow(newRows);
		if (onDataResult)
			onDataResult({
				totalSurface1,
				totalSurface2,
				totalThickness,
			});
		if (onData) onData(newRows);
	};

	const calculateExpensive = useMemo(() => {
		return calculeAll(row);
	}, [row]);

	function calculeAll(rows: any[]) {
		const lambda1 = rows[0].column2;
		const rtS1 = rows.map((value, index, array) => {
			const lambda1 = value.column2;
			const lambda2 = value.column4;
			const thickness = value.column5;
			return calculeRTS1(lambda2, thickness, lambda1);
		});
		const rtS2 = rows.map((value, index, array) => {
			const lambda1 = value.column2;
			const lambda2 = value.column4;
			const thickness = value.column5;
			return calculeRTS2(lambda2, thickness, totalSurface2, lambda1, totalSurface1);
		});
		const s1 = rows.map((value, index, array) => {
			const lambda1 = value.column2;
			const thickness = value.column5;
			return calculeS1(lambda1, thickness);
		});
		const s2 = rows.map((value, index, array) => {
			const lambda1 = value.column2;
			const lambda2 = value.column4;
			const thickness = value.column5;
			return calculeS2(
				lambda1,
				calculeSX(lambda1, thickness, lambda2, calculeS1(lambda1, thickness)),
			);
		});
		const rtSX = rows.map((value, index, array) => {
			const lambda1 = value.column2;
			const lambda2 = value.column4;
			const thickness = value.column5;
			return calculeRTSX(calculeRTS1(lambda2, thickness, lambda1));
		});
		const totalRTSX = calculeTotalRTSX(rtSX);
		calculeTotalRTS1(rtS1 as number[]);
		const totalRTS2 = calculeTotalRTS2(rtS2 as number[]);
		const totalS1 = calculeTotalS1(s1, rsi, rse);
		const totalS2 = calculeTotalS2(s2, rsi, rse);
		const rt = calculeRT(totalRTSX, totalRTS2);
		const RTtotalS2 = calculeRTtotalS2(lambda1, totalS1, totalS2, totalSurface1, totalSurface2);
		const RTtotalS1 = calculeRTtotalS1(lambda1, RTtotalS2, rt);
		const percentage = percentageRTtotalS1(lambda1, rt, RTtotalS1, RTtotalS2);
		const uValue = calculeUValue(lambda1, percentage, RTtotalS1, rt);
		// setUValue(uValue.toFixed(2));
		return uValue.toFixed(2);
	}

	function calculeRTS1(lambda2: number, thickness: number, lambda1: number) {
		if (lambda2 == 0) return thickness / lambda1;
		return false;
	}

	function calculeRTS2(
		lambdaValue2: number,
		thickness: number,
		totalSurface2: number,
		lambda1: number,
		totalSurface1: number,
	) {
		if (lambdaValue2 > 0.001) {
			return (thickness / (lambdaValue2 * totalSurface2 + lambda1 * totalSurface1)) * 100;
		}
		return false;
	}

	function calculeTotalRTS1(arrayRTS1: number[]) {
		return arrayRTS1.reduce((previousValue, currentValue) => previousValue + currentValue);
	}

	function calculeTotalRTS2(arrayRTS2: number[]) {
		return arrayRTS2.reduce((previousValue, currentValue) => previousValue + currentValue);
	}

	function calculeS1(lambda1: number, thickness: number) {
		if (lambda1 > 0) return thickness / lambda1;
		return 0;
	}

	function calculeSX(lambda1: number, thickness: number, lambda2: number, S1: number) {
		if (lambda1 > 0) return thickness / lambda2;
		return S1;
	}

	function calculeS2(S1: number, SX: number) {
		if (!S1 || !isNaN(S1)) return SX;
		return S1;
	}

	function calculeTotalS1(arrayS1: number[], rsi: number, rse: number) {
		const totalS1 = arrayS1.reduce(
			(previousValue, currentValue) => previousValue + currentValue,
		);
		return 1 / (totalS1 + rsi + rse);
	}

	function calculeTotalS2(arrayS2: number[], rsi: number, rse: number) {
		const totalS2 = arrayS2.reduce(
			(previousValue, currentValue) => previousValue + currentValue,
		);
		return 1 / (totalS2 + rsi + rse);
	}

	function calculeRTSX(rts1: unknown) {
		if (isNaN(rts1 as number) || !rts1) return 0;
		return rts1;
	}

	function calculeTotalRTSX(totalRTSX: any[]) {
		return totalRTSX.reduce((previousValue, currentValue) => previousValue + currentValue);
	}

	function calculeRT(totalrtsx: number, totalrts2: number) {
		return Number((totalrts2 + totalrtsx + rsi + rse).toFixed(2));
	}

	function calculeRTtotalS1(lambda1: number, RTtotalS2: number, calculeRT: number) {
		if (!isNaN(lambda1)) return (RTtotalS2 + calculeRT) / 2;
		return 0;
	}

	function calculeRTtotalS2(
		lambda1: number,
		totalS1: number,
		totalS2: number,
		totalSurface1: number,
		totalSurface2: number,
	): number {
		if (!isNaN(lambda1)) {
			return Number(
				((1 / (totalS1 * totalSurface1 + totalS2 * totalSurface2)) * 100).toFixed(4),
			);
		}
		return 0;
	}

	function percentageRTtotalS1(
		lambda1: number,
		calculeRT: number,
		calculeRTtotalS1: number,
		calculeRTtotalS2: number,
	) {
		if (!isNaN(lambda1)) {
			return Number(((calculeRTtotalS2 - calculeRT) / (2 * calculeRTtotalS1)).toFixed(5));
		}
		return 0;
	}

	function calculeUValue(
		lambda1: number,
		percentageRTtotalS1: number,
		RTtotalS1: number,
		calculeRT: number,
	) {
		if (!isNaN(lambda1)) {
			if (percentageRTtotalS1 < 0.1) return 1 / RTtotalS1;
			else return 1 / (calculeRT * 1.1);
		}
		console.log('error calcule u value');
		return 0;
	}

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
												setTotalSurface1(100 - e.target.value);
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

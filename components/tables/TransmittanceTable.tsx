import Input from '../bootstrap/forms/Input';
import FormGroup from '../bootstrap/forms/FormGroup';
import Button from '../bootstrap/Button';
import React, { useState } from 'react';

const Row = ({ data, onInputChange }) => {
	return (
		<tr>
			<td className='p-2'>
				<Input id='ownerName' name='ownerName' type='text' />
			</td>
			<td className='p-2'>
				<FormGroup>
					<div className='row'>
						<Input name='ownerName' type='text' className='col' />
						<span className='col align-self-center'>W/mk</span>
					</div>
				</FormGroup>
			</td>
			<td className='p-2'>
				<FormGroup>
						<Input name='ownerName' type='text' className='col' />
				</FormGroup>
			</td>
			<td className='p-2'>
				<FormGroup>
					<div className='row'>
						<Input name='ownerName' type='text' className='col' />
						<span className='col align-self-center'>W/mk</span>
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
	const [row, setRow] = useState([{ column1: '', column2: 0, column3: 0, column4: 0 }]);
	return (
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
					<Row key={index} data={undefined} onInputChange={undefined}></Row>
				))}
			</tbody>
		</table>
	);
};

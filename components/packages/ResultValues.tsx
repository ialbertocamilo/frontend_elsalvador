import InputGroup from '../bootstrap/forms/InputGroup';
import Input from '../bootstrap/forms/Input';
import Button from '../bootstrap/Button';
import { toDecimal } from '../../helpers/helpers';
import { BuildingClassificationButtons } from '../buttons/BuildingClassificationButtons';
import { IProjectDataTotalValues } from '../../common/types/project.types';
import { BuildingClassification } from '../../common/types/building.types';
import Select from '../bootstrap/forms/Select';
import React from 'react';
import { IPackageOriginQuestions } from '../../common/types/package.types';
import { ToggleYesNoButton } from '../buttons/ToggleYesNoButton';
import { IConfigurationType } from '../../common/types/configuration.types';

export const ResultValues = ({
	totalCalculatedValues,
	globalReadonly,
	formik,
	selection,
	packageInfo,
	originQuestions,
	setOriginQuestions,
	complies,
}: {
	totalCalculatedValues?: IProjectDataTotalValues;
	globalReadonly: boolean;
	formik: any;
	selection?: any[];
	originQuestions: IPackageOriginQuestions;
	setOriginQuestions: Function;
	complies: any;
	packageInfo?: IConfigurationType;
}) => {
	return (
		<table>
			<thead>
				<tr className={'text-center'}>
					<th className={'px-2'}>Concepto</th>
					<th>Valor meta</th>
					<th>Valor Reportado</th>
					<th>Origen de los valores</th>
					<th>Cumple</th>
				</tr>
			</thead>
			<tbody className='container '>
				<tr>
					<td>Proporcion muro ventana</td>
					<td className='h5 text-success fw-bold text-center'>
						{packageInfo?.proportion_wall_window
							? packageInfo?.proportion_wall_window + '%'
							: '-'}
					</td>
					<td className={'p-3'}>
						<InputGroup>
							<Input
								size='sm'
								readOnly
								type='number'
								className='text-center bg-info-subtle'
								name='proportion_wall_window'
								value={totalCalculatedValues?.wall_window_proportion}></Input>
							<Button className='bg-dark-subtle'>%</Button>
						</InputGroup>
					</td>
					<td>
						<Select
							ariaLabel={'selection'}
							list={selection}
							disabled={globalReadonly}
							value={originQuestions.wall_window_proportion}
							onChange={(e: any) => {
								setOriginQuestions({
									...originQuestions,
									wall_window_proportion: e.target.value,
								});
							}}
						/>
					</td>
					<td>
						<ToggleYesNoButton blocked forceYes={complies.wall_window_proportion} />
					</td>
				</tr>
				<tr>
					<td>Valor U de muro (W/m2K)</td>
					<td className='h5 text-success fw-bold text-center'>
						{packageInfo?.walls_u_value || '-'}
					</td>
					<td className={'p-3'}>
						<Input
							readOnly
							type='number'
							className='text-center bg-info-subtle'
							name='walls_u_value'
							value={totalCalculatedValues?.wall_u_value}></Input>
					</td>
					<td>
						<Select
							ariaLabel={'selection'}
							list={selection}
							disabled={globalReadonly}
							value={originQuestions.wall_u_value}
							onChange={(e: any) =>
								setOriginQuestions({
									...originQuestions,
									wall_u_value: e.target.value,
								})
							}
						/>
					</td>
					<td>
						<ToggleYesNoButton blocked forceYes={complies.wall_u_value} />
					</td>
				</tr>
				<tr>
					<td>Reflectancia Muros (%) coeficiente absortividad</td>
					<td className='h5 text-success fw-bold text-center'>
						{packageInfo?.walls_reflectance
							? packageInfo?.walls_reflectance + '%'
							: '-'}
					</td>
					<td className={'p-3'}>
						<InputGroup>
							<Input
								type='number'
								className='text-center'
								name='walls_reflectance'
								readOnly={globalReadonly}
								onChange={(e: any) => {
									e.target.value = toDecimal(e.target.value);
									formik.handleChange(e);
								}}
								value={formik.values.walls_reflectance}></Input>
							<Button className='bg-dark-subtle' isLight>
								%
							</Button>
						</InputGroup>
					</td>
					<td>
						<Select
							ariaLabel={'selection'}
							list={selection}
							disabled={globalReadonly}
							value={originQuestions.wall_reflectance}
							onChange={(e: any) =>
								setOriginQuestions({
									...originQuestions,
									wall_reflectance: e.target.value,
								})
							}
						/>
					</td>
					<td>
						<ToggleYesNoButton blocked forceYes={complies.wall_reflectance} />
					</td>
				</tr>
				<tr>
					<td>Valor U de techo (W/m2K)</td>

					<td className='h5 text-success fw-bold text-center'>
						{packageInfo?.roofs_u_value || '-'}
					</td>
					<td className={'p-3'}>
						<Input
							type='number'
							readOnly
							className='text-center bg-info-subtle'
							name='roofs_u_value'
							value={totalCalculatedValues?.roof_u_value}></Input>
					</td>
					<td>
						<Select
							ariaLabel={'selection'}
							list={selection}
							disabled={globalReadonly}
							value={originQuestions.roof_u_value}
							onChange={(e: any) =>
								setOriginQuestions({
									...originQuestions,
									roof_u_value: e.target.value,
								})
							}
						/>
					</td>
					<td>
						<ToggleYesNoButton blocked forceYes={complies.roof_u_value} />
					</td>
				</tr>
				<tr>
					<td>Reflectancia Techos (%) coeficiente absortividad</td>

					<td className='h5 text-success fw-bold text-center'>
						{packageInfo?.roofs_reflectance
							? packageInfo?.roofs_reflectance + '%'
							: '-'}
					</td>
					<td className={'p-3'}>
						<InputGroup>
							<Input
								type='number'
								className='text-center'
								name='roofs_reflectance'
								readOnly={globalReadonly}
								onChange={(e: any) => {
									e.target.value = toDecimal(e.target.value);
									formik.handleChange(e);
								}}
								value={formik.values.roofs_reflectance}></Input>
							<Button className='bg-dark-subtle'>%</Button>
						</InputGroup>
					</td>
					<td>
						<Select
							ariaLabel={'selection'}
							list={selection}
							disabled={globalReadonly}
							value={originQuestions.roof_reflectance}
							onChange={(e: any) =>
								setOriginQuestions({
									...originQuestions,
									roof_reflectance: e.target.value,
								})
							}
						/>
					</td>
					<td>
						<ToggleYesNoButton blocked forceYes={complies.roof_reflectance} />
					</td>
				</tr>
				<tr>
					<td>Valor U de ventana (W/m2K)</td>

					<td className='h5 text-success fw-bold text-center'>
						{packageInfo?.windows_u_value || '-'}
					</td>
					<td className={'p-3'}>
						<Input
							type='number'
							readOnly
							className='text-center bg-info-subtle'
							value={totalCalculatedValues?.window_u_value}></Input>
					</td>
					<td>
						<Select
							ariaLabel={'selection'}
							list={selection}
							disabled={globalReadonly}
							value={originQuestions.window_u_value}
							onChange={(e: any) =>
								setOriginQuestions({
									...originQuestions,
									window_u_value: e.target.value,
								})
							}
						/>
					</td>
					<td>
						<ToggleYesNoButton blocked forceYes={complies.window_u_value} />
					</td>
				</tr>
				<tr>
					<td>Valor g de ventana</td>

					<td className='h5 text-success fw-bold text-center'>
						{packageInfo?.shading_coefficient || '-'}
					</td>
					<td className={'p-3'}>
						<Input
							type='number'
							readOnly
							className='text-center bg-info-subtle'
							value={totalCalculatedValues?.window_g_value}></Input>
					</td>
					<td>
						<Select
							ariaLabel={'selection'}
							list={selection}
							disabled={globalReadonly}
							value={originQuestions.window_g_value}
							onChange={(e: any) =>
								setOriginQuestions({
									...originQuestions,
									window_g_value: e.target.value,
								})
							}
						/>
					</td>
					<td>
						<ToggleYesNoButton blocked forceYes={complies.window_g_value} />
					</td>
				</tr>
				<tr>
					<td>Sombras (Ventanas exteriores)</td>

					<td className='h5 text-success fw-bold text-center'>
						{packageInfo?.shades || '-'}
					</td>
					<td className={'p-3'}>
						<Input
							type='number'
							className='text-center bg-info-subtle'
							name='shades'
							readOnly
							onChange={(e: any) => {
								e.target.value = toDecimal(e.target.value);
								formik.handleChange(e);
							}}
							value={totalCalculatedValues?.shades}></Input>
					</td>
					<td>
						<Select
							ariaLabel={'selection'}
							disabled={globalReadonly}
							list={selection}
							value={originQuestions.shades}
							onChange={(e: any) =>
								setOriginQuestions({
									...originQuestions,
									shades: e.target.value,
								})
							}
						/>
					</td>
					<td>
						<ToggleYesNoButton blocked forceYes={complies.shades} />
					</td>
				</tr>
				<tr>
					<td>Aire acondicionado COP</td>

					<td className='h5 text-success fw-bold text-center'>
						{packageInfo?.hvac || '-'}
					</td>
					<td className={'p-3'}>
						<Input
							type='number'
							className='text-center '
							name='cop'
							readOnly={globalReadonly}
							onChange={(e: any) => {
								e.target.value = toDecimal(e.target.value);
								formik.handleChange(e);
							}}
							value={formik.values.cop}></Input>
					</td>
					<td>
						<Select
							ariaLabel={'selection'}
							list={selection}
							disabled={globalReadonly}
							value={originQuestions.cop}
							onChange={(e: any) =>
								setOriginQuestions({
									...originQuestions,
									cop: e.target.value,
								})
							}
						/>
					</td>
					<td>
						<ToggleYesNoButton blocked forceYes={complies.cop} />
					</td>
				</tr>
			</tbody>
		</table>
	);
};

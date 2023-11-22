import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle } from './bootstrap/Card';
import Button from './bootstrap/Button';
import Modal, { ModalBody, ModalHeader, ModalTitle } from './bootstrap/Modal';
import Input from './bootstrap/forms/Input';
import InputGroup from './bootstrap/forms/InputGroup';
import { IConfigurationType } from '../common/types/configuration.types';
import PackageList from './extras/PackageList';
import DataService from '../services/data/data.service';
import { codePackagePrefix } from '../common/constants/lists';

const SelectQuestionsConfiguration = ({
	emitValue,
	values,
}: {
	emitValue: Function;
	values: IConfigurationType[];
}) => {
	const initial: IConfigurationType = {
		hvac: '',
		shades: '',
		roofs_u_value: '',
		walls_u_value: '',
		windows_u_value: '',
		roofs_reflectance: '',
		walls_reflectance: '',
		shading_coefficient: '',
		final_energy_reduction: '',
		proportion_wall_window: '',
		package_name: '',
		package_id: '',
		package_status: true,
	};
	const formik = useFormik({
		initialValues: initial,
		enableReinitialize: true,
		validateOnChange: true,
		validate: (values) => {
			const error: {
				package_name?: string;
			} = {};
			if (values.package_name == '') {
				error.package_name = 'El nombre del paquete no puede estar vacío.';
			}
			return error;
		},
		onSubmit: async (values) => {
			let newPackage: IConfigurationType[] = [];
			if (isEditable) newPackage = editPackage(editableIndex, values);
			else newPackage = addPackage(values);
			emptyModal();
			setIsEditable(false);
			setModalStatus(false);
			await DataService.savePackageConfig(newPackage);
		},
	});
	const [list, setList] = useState<IConfigurationType[]>([]);
	const [modalStatus, setModalStatus] = useState(false);

	const [isEditable, setIsEditable] = useState(false);
	const [editableIndex, setEditableIndex] = useState(0);

	const addPackage = (_package: IConfigurationType) => {
		_package.package_id = codePackagePrefix + String(list.length + 1);
		const newList = [...list, _package];
		setList(newList);
		return newList;
	};
	const editPackage = (index: number, _package: IConfigurationType) => {
		list[index] = _package;
		setList(list);
		return list;
	};

	function emptyModal() {
		formik.setValues(initial);
	}

	useEffect(() => {
		setList(values);
	}, [values]);

	function editMode(val: number) {
		const values = list[val];
		formik.setValues(values);
		setEditableIndex(val);
		setIsEditable(true);
		setModalStatus(true);
	}

	function handleChange(e: any) {
		formik.handleChange(e);
	}

	function openNew() {
		setIsEditable(false);
		emptyModal();
		setModalStatus(!modalStatus);
	}

	async function deactivate() {
		await DataService.savePackageConfig(list);
	}

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='FolderShared' iconColor='success'>
					<CardTitle tag='div' className='h5'>
						Configurar paquetes
					</CardTitle>
				</CardLabel>
				<CardActions>
					<Button color='info' icon='Add' isLight onClick={openNew}>
						Nuevo
					</Button>
					<Modal setIsOpen={setModalStatus} isOpen={modalStatus} titleId='new-todo-modal'>
						<ModalHeader setIsOpen={setModalStatus}>
							<ModalTitle id='new-todo-modal'>Paquete</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<div className='row g-3'>
								<div className='row justify-content-between text-center fw-bold '></div>
								<table>
									<tbody>
										<tr>
											<td className='p-3 text-center fw-bold'>Parámetros</td>
											<td width='250' className='text-center fw-bold'>
												Valores
											</td>
										</tr>
										<tr>
											<td className='p-3'>
												Nombre del paquete
												<i className='text-danger '>*</i>
											</td>
											<td width='250' className='text-center'>
												<Input
													size='sm'
													type='text'
													className='text-center'
													name='package_name'
													isValid={formik.isValid}
													invalidFeedback={formik.errors.package_name}
													value={formik.values.package_name}
													onChange={handleChange}></Input>
											</td>
										</tr>
										<tr>
											<td className='p-3'>Proporcion muro ventana</td>
											<td width='250'>
												<InputGroup>
													<Input
														size='sm'
														type='number'
														className='text-center'
														name='proportion_wall_window'
														value={formik.values.proportion_wall_window}
														onChange={handleChange}></Input>
													<Button className='bg-dark-subtle'>%</Button>
												</InputGroup>
											</td>
										</tr>
										<tr>
											<td className='p-3'>Muros valor U</td>
											<td width='150'>
												<Input
													size='sm'
													type='number'
													className='text-center'
													name='walls_u_value'
													value={formik.values.walls_u_value}
													onChange={handleChange}></Input>
											</td>
										</tr>
										<tr>
											<td className='p-3'>Muros reflactancia</td>
											<td width='150'>
												<div className='d-flex align-content-between'>
													<InputGroup size='sm'>
														<Input
															type='number'
															className='text-center'
															name='walls_reflectance'
															value={formik.values.walls_reflectance}
															onChange={handleChange}></Input>
														<Button className='bg-dark-subtle'>
															%
														</Button>
													</InputGroup>
												</div>
											</td>
										</tr>
										<tr>
											<td className='p-3'>Techos valor U</td>
											<td width='150'>
												<Input
													size='sm'
													type='number'
													className='text-center'
													name='roofs_u_value'
													value={formik.values.roofs_u_value}
													onChange={handleChange}></Input>
											</td>
										</tr>
										<tr>
											<td className='p-3'>Techos reflectancia</td>
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
											<td className='p-3'>Ventanas valor U</td>
											<td width='150'>
												<Input
													size='sm'
													type='number'
													className='text-center'
													name='windows_u_value'
													value={formik.values.windows_u_value}
													onChange={handleChange}></Input>
											</td>
										</tr>
										<tr>
											<td className='p-3'>Coeficiente de sombreado</td>
											<td width='150'>
												<Input
													size='sm'
													type='number'
													className='text-center'
													name='shading_coefficient'
													value={formik.values.shading_coefficient}
													onChange={handleChange}></Input>
											</td>
										</tr>
										<tr>
											<td className='p-3'>Sombras</td>
											<td width='150'>
												<Input
													size='sm'
													type='number'
													className='text-center'
													name='shades'
													value={formik.values.shades}
													onChange={handleChange}></Input>
											</td>
										</tr>
										<tr>
											<td className='p-3'>HVAC(sin unidad)</td>
											<td width='150'>
												<Input
													size='sm'
													type='number'
													className='text-center'
													name='hvac'
													value={formik.values.hvac}
													onChange={handleChange}></Input>
											</td>
										</tr>
										<tr>
											<td className='p-3 h5'>% Reducción Energia final</td>
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

								<div className='col' />
								<div className='col-auto'>
									<Button onClick={formik.handleSubmit} color='info' isLight>
										Guardar
									</Button>
								</div>
							</div>
						</ModalBody>
					</Modal>
				</CardActions>
			</CardHeader>
			<CardBody isScrollable>
				<PackageList
					list={list}
					setList={setList}
					toggleModal={editMode}
					emitDeactivate={deactivate}
				/>
			</CardBody>
		</Card>
	);
};

export default SelectQuestionsConfiguration;

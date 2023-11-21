import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { TColor } from '../type/color-type';
import Todo from './extras/Todo';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from './bootstrap/Card';
import Progress from './bootstrap/Progress';
import Button from './bootstrap/Button';
import Modal, { ModalBody, ModalHeader, ModalTitle } from './bootstrap/Modal';
import FormGroup from './bootstrap/forms/FormGroup';
import Input from './bootstrap/forms/Input';
import { IQuestion } from '../common/types/question.types';

const SelectQuestionsConfiguration = ({
	questions,
	emitValue,
}: {
	questions: IQuestion[];
	emitValue: Function;
}) => {
	const TODO_BADGES: {
		[key: string]: {
			text: string;
			color?: TColor;
		};
	} = {
		NEW: { text: 'New', color: 'success' },
		UPDATE: { text: 'Update', color: 'info' },
		TEST: { text: 'Test', color: 'warning' },
		REPORT: { text: 'Report', color: 'info' },
		PRINT: { text: 'Print', color: 'danger' },
		CONTROL: { text: 'Control', color: 'primary' },
		MEETING: { text: 'Meeting', color: 'secondary' },
	};
	const getBadgeWithText = (text: string): string => {
		return TODO_BADGES[
			// @ts-ignore
			Object.keys(TODO_BADGES).filter((key) => TODO_BADGES[key].text === text)
		];
	};

	/**
	 * To/Do List
	 */
	const [list, setList] = useState<IQuestion[]>(questions);
	const listLength = list.length;
	const completeTaskLength = list.filter((i) => i.deactivated).length;

	/**
	 * Add New Modal Status
	 */
	const [modalStatus, setModalStatus] = useState(false);

	const addTodo = (title: string) => {
		const todo = [{ id: list.length + 1, title, deactivated: false }, ...list];
		setList(todo);
	};

	const validate = (values: { todoTitle: string }) => {
		const errors: { todoTitle: string } = {
			todoTitle: '',
		};
		if (!values.todoTitle) errors.todoTitle = 'Requerido';
		if (values.todoTitle.length < 5) errors.todoTitle = 'Debe contener al menos 5 caracteres';

		return errors;
	};
	const formik = useFormik({
		initialValues: {
			todoTitle: '',
		},
		validate,
		validateOnChange: true,
		onSubmit: (values, { resetForm }) => {},
	});

	useEffect(() => {
		emitValue(list);
	}, [list]);
	useEffect(() => {
		setList(questions);
	}, [questions]);

	function doChange() {
		addTodo(formik.values.todoTitle);
		formik.setFieldValue('todoTitle', '');
		setModalStatus(false);
	}

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='ViewList' iconColor='danger'>
					<CardTitle tag='div' className='h5'>
						Seleccionar preguntas
					</CardTitle>
					<CardSubTitle tag='div'>
						<Progress
							height={8}
							max={listLength}
							value={completeTaskLength}
							color={completeTaskLength === listLength ? 'success' : 'primary'}
						/>
					</CardSubTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='info'
						icon='Add'
						isLight
						onClick={() => setModalStatus(!modalStatus)}>
						Nuevo
					</Button>
					<Modal setIsOpen={setModalStatus} isOpen={modalStatus} titleId='new-todo-modal'>
						<ModalHeader setIsOpen={setModalStatus}>
							<ModalTitle id='new-todo-modal'>Nueva pregunta</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<form className='row g-3' onSubmit={formik.handleSubmit}>
								<div className='col-12'>
									<FormGroup id='todoTitle' label='Titulo'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.todoTitle}
											invalidFeedback={formik.errors.todoTitle}
											validFeedback='Bien!'
											value={formik.values.todoTitle}
										/>
									</FormGroup>
								</div>
								<div className='col' />
								<div className='col-auto'>
									<Button onClick={doChange} color='info' isLight>
										Agregar pregunta
									</Button>
								</div>
							</form>
						</ModalBody>
					</Modal>
				</CardActions>
			</CardHeader>
			<CardBody isScrollable>
				<Todo list={list} setList={setList} />
			</CardBody>
		</Card>
	);
};

export default SelectQuestionsConfiguration;

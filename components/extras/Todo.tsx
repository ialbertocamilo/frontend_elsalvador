import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../bootstrap/Button';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../bootstrap/Dropdown';
import useDarkMode from '../../hooks/useDarkMode';
import { IQuestion } from '../../common/types/question.types';
import { ToggleYesNoButton } from '../buttons/ToggleYesNoButton';
import Popovers from '../bootstrap/Popovers';

const TodoPropTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			deactivated: PropTypes.bool,
			title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
	),
};

interface ITodoItemProps {
	list: IQuestion[];
	index: number;
	toggleModal: Function;
	emitChange: Function;

	setList(...args: unknown[]): unknown;
}

export const TodoItem = forwardRef<HTMLDivElement, ITodoItemProps>(
	({ index, emitChange, list, setList, toggleModal, ...props }, ref) => {
		const itemData = list[index];

		const handleChange = (_index: number) => {
			const newTodos = [...list];
			newTodos[_index].deactivated = !newTodos[_index].deactivated;
			setList(newTodos);
			emitChange(_index);
		};

		function emitYesNo(keyName: number, val: unknown) {
			const newTodos = [...list];
			newTodos[keyName].value = !newTodos[keyName].value;
			setList(newTodos);
			emitChange(keyName);
		}
		const { themeStatus } = useDarkMode();

		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<div ref={ref} className={classNames('todo-item')} {...props}>
				<div className='todo-content'>
					<Popovers trigger='hover' title={itemData.title}>
						<div
							className={classNames('todo-title', {
								'text-decoration-line-through': list[index].deactivated,
							})}>
							{itemData.title}
						</div>
					</Popovers>
				</div>
				<div className='todo-extras'>
					<span className='me-2'>
						<Button
							size='sm'
							color='brand'
							isLight
							onClick={() => toggleModal(index)}
							icon='Edit'></Button>
					</span>
					<Popovers desc={'VALOR DE LA RESPUESTA CORRECTA'} trigger='hover'>
						<span className='me-2'>
							<ToggleYesNoButton
								keyName={index}
								emitValue={emitYesNo}
								forceYes={itemData?.value}
							/>
						</span>
					</Popovers>
					<span>
						<Dropdown>
							<DropdownToggle hasIcon={false}>
								<Button color={themeStatus} icon='MoreHoriz' />
							</DropdownToggle>
							<DropdownMenu isAlignmentEnd>
								<DropdownItem>
									<Button
										size='sm'
										isLight
										color={list[index].deactivated ? 'success' : 'danger'}
										onClick={() => handleChange(index)}>
										{list[index].deactivated ? 'Activar' : 'Desactivar'}
									</Button>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</span>
				</div>
			</div>
		);
	},
);
TodoItem.displayName = 'TodoItem';
TodoItem.propTypes = {
	// @ts-ignore
	list: TodoPropTypes.list.isRequired,
	setList: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};
TodoItem.defaultProps = {};

export interface ITodoProps {
	list: IQuestion[];
	className?: string;
	toggleModal: Function;
	emitDeactivate: Function;

	setList(...args: unknown[]): unknown;
}

const Todo = forwardRef<HTMLDivElement, ITodoProps>(
	({ className, emitDeactivate, list, setList, toggleModal, ...props }, ref) => {
		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<div ref={ref} className={classNames('todo', className)} {...props}>
				{list.map((i, index) => (
					<TodoItem
						key={i.id}
						index={index}
						list={list}
						emitChange={emitDeactivate}
						setList={setList}
						toggleModal={toggleModal}
					/>
				))}
			</div>
		);
	},
);
Todo.displayName = 'Todo';
Todo.propTypes = {
	className: PropTypes.string,
	// @ts-ignore
	list: TodoPropTypes.list.isRequired,
	setList: PropTypes.func.isRequired,
	toggleModal: PropTypes.func.isRequired,
};
Todo.defaultProps = {
	className: undefined,
};

export default Todo;

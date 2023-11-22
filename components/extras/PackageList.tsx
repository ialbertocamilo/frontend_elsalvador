import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../bootstrap/Button';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../bootstrap/Dropdown';
import useDarkMode from '../../hooks/useDarkMode';
import { IConfigurationType } from '../../common/types/configuration.types';

const PackagePropTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			deactivated: PropTypes.bool,
			title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
	),
};

interface IPackageItemProps {
	list: IConfigurationType[];
	toggleModal: Function;
	index: number;
	emitDeactivate: Function;
	setList(...args: unknown[]): unknown;
}

export const PackageItem = forwardRef<HTMLDivElement, IPackageItemProps>(
	({ index, list, emitDeactivate, setList, toggleModal, ...props }, ref) => {
		const itemData = list[index];

		const handleChange = (_index: number) => {
			list[_index].package_status = !list[_index].package_status;
			const newTodos = [...list];
			setList(newTodos);
			emitDeactivate(_index);
		};

		const { themeStatus } = useDarkMode();

		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<div ref={ref} className={classNames('todo-item')} {...props}>
				<div className='todo-content'>
					<div
						className={classNames('todo-title', {
							'text-decoration-line-through': !list[index]?.package_status,
						})}>
						{itemData?.package_id} - {itemData?.package_name}
					</div>
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
										color={list[index]?.package_status ? 'success' : 'danger'}
										onClick={() => handleChange(index)}>
										{list[index]?.package_status ? 'Desactivar' : 'Activar'}
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
PackageItem.displayName = 'PackageItem';
PackageItem.propTypes = {
	// @ts-ignore
	list: PackagePropTypes.list.isRequired,
	setList: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};
PackageItem.defaultProps = {};

export interface IPackageListProps {
	list: IConfigurationType[];
	className?: string;
	toggleModal: Function;
	emitDeactivate: Function;
	setList(...args: unknown[]): unknown;
}

const PackageList = forwardRef<HTMLDivElement, IPackageListProps>(
	({ className, emitDeactivate, list, setList, toggleModal, ...props }, ref) => {
		if (list?.length == 0) {
			return (
				<div>
					<span>No hay paquetes que mostrar</span>
				</div>
			);
		}

		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<div ref={ref} className={classNames('todo', className)} {...props}>
				{list.map((i, index) => (
					<PackageItem
						key={index}
						index={index}
						list={list}
						emitDeactivate={emitDeactivate}
						setList={setList}
						toggleModal={toggleModal}
					/>
				))}
			</div>
		);
	},
);
PackageList.displayName = 'PackageList';
PackageList.propTypes = {
	className: PropTypes.string,
	// @ts-ignore
	list: PackagePropTypes.list.isRequired,
	setList: PropTypes.func.isRequired,
	toggleModal: PropTypes.func.isRequired,
};
PackageList.defaultProps = {
	className: undefined,
};

export default PackageList;

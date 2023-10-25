import Button from '../bootstrap/Button';
import React, { useState } from 'react';
import { IProjectDataSavingRequest } from '../../common/types/project.types';
import { useProjects } from '../../services/project/project.service';

export enum ButtonTypes {
	projectData,
	projectInfo,
	packageConfig,
}

interface SaveButtonProps {
	type: ButtonTypes;
	payload: IProjectDataSavingRequest;
}

export const SaveProjectButton = ({ type, payload }: SaveButtonProps) => {
	const projects = useProjects();
	const [active, setActive] = useState(false);

	async function doClick() {
		setActive(true);

		switch (type) {
			case ButtonTypes.projectData:
				await projects.saveProjectData(payload);
				setActive(false);
				break;

			case ButtonTypes.projectInfo:
				setActive(false);
				break;
			case ButtonTypes.packageConfig:
				setActive(false);
				await projects.saveProjectData(payload);
				break;
		}
	}

	return (
		<Button
			color='info'
			isLight
			className='col-4'
			icon='Save'
			onClick={() => {
				doClick();
			}}
			isDisable={active}>
			Guardar
		</Button>
	);
};

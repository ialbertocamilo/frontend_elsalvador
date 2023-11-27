import { useEffect, useState } from 'react';
import DataService from '../services/data/data.service';
import { RoleType } from '../common/types/role.types';
import { ProjectStatus } from '../common/constants/lists';
import { ClientStorage } from '../common/classes/storage';

export const useGlobalReadOnly = (projectId: string) => {
	const [globalReadonly, setGlobalReadonly] = useState(false);

	const user = ClientStorage.getUser();
	useEffect(() => {
		DataService.getProjectStatus(projectId as string).then((data) => {
			if (user?.role === RoleType.supervisor) {
				setGlobalReadonly(true);
				return;
			}
			if (user?.role === RoleType.agent) {
				setGlobalReadonly(data == ProjectStatus.accepted || data == ProjectStatus.denied);
				return;
			}
			setGlobalReadonly(false);
		});
	}, []);
	return {
		globalReadonly,
		setGlobalReadonly,
	};
};

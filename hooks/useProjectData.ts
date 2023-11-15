import { useEffect, useState } from 'react';
import { ProjectEntity } from '../common/classes/project';
import { useProjects } from '../services/project/project.service';
import { IProjectDataTotalValues } from '../common/types/project.types';
import data from '../common/data/dummyCustomerData';
import { keyList } from '../common/constants/lists';

export const useProjectData = (projectId: string) => {
	const [projectEntity, setProjectEntity] = useState<ProjectEntity>();

	const [totalCalculatedValues, setTotalCalculatedValues] = useState<IProjectDataTotalValues>();
	const projects = useProjects();
	useEffect(() => {
		projects.getProject(projectId).then((data) => {
			if (data) setProjectEntity(data);
		});
		getTotals(projectId);
	}, []);

	function getTotals(projectId: string) {
		if (data) {
			let wall_window_proportion = '';
			let wall_u_value = '';
			let roof_u_value = '';
			let window_u_value = '';
			let window_g_value = '';

			Promise.all([
				projects.getProjectData({ project_id: projectId, key: keyList.proportion }),
				projects.getProjectData({ project_id: projectId, key: keyList.transmittance }),
				projects.getProjectData({ project_id: projectId, key: keyList.window }),
				projects.getProjectData({ project_id: projectId, key: keyList.roofs }),
			]).then((data: any[]) => {
				if (data[0]) wall_window_proportion = data[0]?.payload?.result?.totalPercentage;
				if (data[1]) wall_u_value = data[1]?.payload?.data?.result?.u_value;
				if (data[2]) window_u_value = data[2]?.payload?.windowUValue;
				if (data[2]) window_g_value = data[2]?.payload?.gValue;
				if (data[3]) roof_u_value = data[3]?.payload?.data?.result?.u_value;

				setTotalCalculatedValues({
					wall_window_proportion,
					wall_u_value,
					roof_u_value,
					window_u_value,
					window_g_value,
				});
			});
		}
	}

	return {
		setProjectEntity,
		projectEntity,
		totalCalculatedValues,
	};
};

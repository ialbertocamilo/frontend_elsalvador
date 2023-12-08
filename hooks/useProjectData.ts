import { useEffect, useState } from 'react';
import { ProjectEntity } from '../common/classes/project';
import { useProjects } from '../services/project/project.service';
import { IProjectDataTotalValues } from '../common/types/project.types';
import data from '../common/data/dummyCustomerData';
import { keyList } from '../common/constants/lists';
import DataService from '../services/data/data.service';
import { extractDataFromArrayProject } from '../helpers/helpers';

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
			let shades = '';
			let building_classification = '';

			Promise.all([
				projects.getAllProjectData(projectId),
				DataService.loadPackageByProjectId(projectId),
			]).then((data: any[]) => {
				const result = data[0];
				const packageDetected = data[1];
				const temporalPackage = result?.data;
				// Si encuentra un proyecto con datos de un paquete toma los datos y ya no de las calculadoras
				if (packageDetected) {
					wall_window_proportion =
						packageDetected.reportedValue?.wall_window_proportion.toString();
					wall_u_value = packageDetected.reportedValue.wall_u_value.toString();
					window_g_value = packageDetected.reportedValue.window_g_value.toString();
					roof_u_value = packageDetected.reportedValue.roof_u_value.toString();
					window_u_value = packageDetected.reportedValue.window_u_value.toString();
					shades = packageDetected.reportedValue.shades.toString();
					building_classification =
						packageDetected.reportedValue.building_classification.toString();
				} else {
					wall_window_proportion = extractDataFromArrayProject(
						keyList.proportion,
						temporalPackage,
					)?.result?.totalPercentage;
					window_g_value = extractDataFromArrayProject(
						keyList.window,
						temporalPackage,
					)?.gValue;
					window_u_value = String(
						extractDataFromArrayProject(keyList.window, temporalPackage)?.windowUValue,
					);
					wall_u_value = extractDataFromArrayProject(
						keyList.transmittance,
						temporalPackage,
					)?.result?.u_value;
					roof_u_value = extractDataFromArrayProject(keyList.roofs, temporalPackage)
						?.result?.u_value;
					shades = extractDataFromArrayProject(keyList.shading, temporalPackage)?.result;
					building_classification = result?.building_classification;
				}
				setTotalCalculatedValues({
					wall_window_proportion,
					wall_u_value,
					roof_u_value,
					window_g_value,
					window_u_value,
					shades,
					building_classification,
				});
			});
		}
	}

	async function setProjectData(projectId: string | string[], keyName: string, payload: object) {
		await projects.saveProjectData({ payload, project_id: projectId, key: keyName });
	}

	return {
		setProjectEntity,
		projectEntity,
		totalCalculatedValues,
		setProjectData,
		setTotalCalculatedValues,
	};
};

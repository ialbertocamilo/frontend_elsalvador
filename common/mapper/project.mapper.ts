import { ProjectFormType } from '../types/project.types';
import { ProjectEntity, ProjectRequest } from '../classes/project';

export class ProjectMapper {
	static formToRequest(form: ProjectFormType) {
		return new ProjectRequest({
			project_name: form.projectName,
			owner_name: form.ownerName,
			designer_name: form.designerName,
			project_director: form.directorName,
			address: form.address,
			municipality: form.municipality,
			energy_advisor: form.energyAdvisor,
			latitude: 41.40338,
			longitude: 2.17403,
			levels: form.levelsNumber,
			offices: form.offices,
			surface: form.surface,
			is_public: form.public,
		});
	}

	static entityToForm(projectEntity: ProjectEntity): ProjectFormType {
		return {
			projectName: projectEntity.project_name,
			ownerName: projectEntity.owner_name,
			designerName: projectEntity.designer_name,
			directorName: projectEntity.project_director,
			address: projectEntity.address,
			municipality: projectEntity.municipality,
			energyAdvisor: projectEntity.energy_advisor,
			levelsNumber: projectEntity.levels,
			offices: projectEntity.offices,
			surface: projectEntity.surface,
			public: projectEntity.is_public,
		};
	}
}

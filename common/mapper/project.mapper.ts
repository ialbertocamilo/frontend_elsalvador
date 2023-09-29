import { IProjectFormType } from '../types/project.types';
import { ProjectEntity, ProjectRequest } from '../classes/project';

export class ProjectMapper {
	static formToRequest(form: IProjectFormType) {
		return new ProjectRequest({
			project_name: form.projectName,
			owner_name: form.ownerName,
			owner_lastname: form.ownerLastName,
			profession: form.profession,
			nationality: form.nationality,
			email: form.email,
			phone: form.phone,
			department: form.department,
			designer_name: form.designerName,
			project_director: form.directorName,
			address: form.address,
			municipality: form.municipality,
			energy_advisor: form.energyAdvisor,
			levels: form.levelsNumber,
			offices: form.offices,
			surface: form.surface,
			is_public: form.public,
		});
	}

	static entityToForm(projectEntity: ProjectEntity): IProjectFormType {
		return {
			projectName: projectEntity.project_name,
			ownerName: projectEntity.owner_name,
			ownerLastName: projectEntity.owner_lastname,
			profession: projectEntity.profession,
			nationality: projectEntity.nationality,
			email: projectEntity.email,
			phone: projectEntity.phone,
			department: projectEntity.department,
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

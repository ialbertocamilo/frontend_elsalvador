import { ProjectFormType } from '../types/project.types';
import { ProjectRequest } from '../classes/project';

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
}

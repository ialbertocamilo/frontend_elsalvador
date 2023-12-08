'use client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import ProjectTable from '../../../components/tables/ProjectTable';
import userStore from '../../../stores/userStore';
import { RoleType } from '../../../common/types/role.types';

const ProjectsPage = () => {
	const validate = userStore.value.role == RoleType.supervisor ? 'a validar' : '';
	return (
		<PageWrapper>
			<Page>
				<div className='display-4 fw-bold py-3 text-primary-emphasis'>
					Lista de proyectos {validate}
				</div>
				<ProjectTable />
			</Page>
		</PageWrapper>
	);
};

export default ProjectsPage;

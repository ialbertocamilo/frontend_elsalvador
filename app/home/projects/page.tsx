'use client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import ProjectTable from '../../../components/tables/ProjectTable';
import Card, { CardTitle } from '../../../components/bootstrap/Card';

const ProjectsPage = () => {
	return (
		<PageWrapper>
			<Page>
				<div className='display-4 fw-bold py-3 text-primary-emphasis'>
					Lista de proyectos
				</div>
				<ProjectTable />
			</Page>
		</PageWrapper>
	);
};

export default ProjectsPage;

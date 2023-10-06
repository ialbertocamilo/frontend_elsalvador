'use client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import ProjectTable from '../../../components/tables/ProjectTable';

const ProjectsPage = () => {
	return (
		<PageWrapper>
			<Page>
				<ProjectTable />
			</Page>
		</PageWrapper>
	);
};

export default ProjectsPage;

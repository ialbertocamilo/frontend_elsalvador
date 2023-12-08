'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { ProjectComponent } from '../../../../components/project/ProjectComponent';
import { useGlobalStatus } from '../../../../hooks/useGlobalStatus';
import { IProjectFormType } from '../../../../common/types/project.types';

const ProjectsPage = () => {
	const param = useParams();
	const [project, setProject] = useState<IProjectFormType>({});
	return (
		<PageWrapper>
			<Page container='fluid'>
				<ProjectComponent projectId={param?.projectId as string} project={project} />
			</Page>
		</PageWrapper>
	);
};

export default ProjectsPage;

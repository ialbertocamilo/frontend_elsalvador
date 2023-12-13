'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IProjectFormType } from '../../../../common/types/project.types';
import { ProjectMapper } from '../../../../common/mapper/project.mapper';
import { useProjects } from '../../../../services/project/project.service';
import { useGlobalStatus } from '../../../../hooks/useGlobalStatus';
import { ProjectStatusAlert } from '../../../../components/alert/ProjectStatusAlert';
import { ProjectComponent } from '../../../../components/project/ProjectComponent';
import { RoutesList } from '../../../../common/constants/default';

const GetProject = () => {
	const param = useParams();
	const router = useRouter();
	const projects = useProjects();
	const projectId = param?.projectId as string;
	const [project, setProject] = useState<IProjectFormType>({});
	const { globalReadonly } = useGlobalStatus(projectId);
	useEffect(() => {
		if (!projectId) router.replace(RoutesList.projects);
		projects.getProject(projectId).then((result) => {
			if (result) {
				const projectTransform = ProjectMapper.entityToForm(result);
				setProject(projectTransform);
			}
		});
	}, [projectId]);
	return (
		<PageWrapper>
			<Page container='fluid'>
				<ProjectStatusAlert status={project.status as number} />
				<ProjectComponent
					projectId={param?.projectId as string}
					globalReadonly={globalReadonly}
					project={project}
				/>
			</Page>
		</PageWrapper>
	);
};

export default GetProject;

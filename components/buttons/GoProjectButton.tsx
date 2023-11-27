import Button from '../bootstrap/Button';
import Icon from '../icon/Icon';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RoutesListWithParams } from '../../common/constants/default';

export const GoProjectButton = () => {
	const params = useParams();
	const router = useRouter();

	return (
		<Button
			color='link'
			onClick={() => router.push(RoutesListWithParams.project(params?.projectId))}>
			<span>
				<Icon icon='Link' />
				Información de proyecto
			</span>
		</Button>
	);
};

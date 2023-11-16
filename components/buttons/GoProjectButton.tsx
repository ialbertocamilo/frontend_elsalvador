import Button from '../bootstrap/Button';
import Icon from '../icon/Icon';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RoutesListWithParams } from '../../common/constants/default';

export const GoProjectButton = () => {
	// use only if exist param /{projectId} in route param
	const params = useParams();
	const router = useRouter();

	return (
		<Button
			color='link'
			className='col-4 m-0 p-0'
			onClick={() => router.push(RoutesListWithParams.project(params?.projectId))}>
			<span>
				<Icon icon='Link' />
				Información de proyecto
			</span>
		</Button>
	);
};

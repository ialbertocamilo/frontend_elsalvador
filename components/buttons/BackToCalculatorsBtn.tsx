import Button from '../bootstrap/Button';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RoutesListWithParams } from '../../common/constants/default';

export const BackToCalculatorsBtn = () => {
	const router = useRouter();
	const params = useParams();
	return (
		<Button
			color='link'
			className='mx-1 col-2 m-0 p-0'
			icon='MenuBook'
			onClick={() => router.push(RoutesListWithParams.calculators(params?.projectId))}>
			Ir a calculadoras
		</Button>
	);
};

export default BackToCalculatorsBtn;

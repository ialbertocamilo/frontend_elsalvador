import Button from '../bootstrap/Button';
import React from 'react';
import { useRouter } from 'next/navigation';

export const NextButton = ({ route, text }: { route: string; text: string }) => {
	const router = useRouter();
	return (
		<Button
			color='link'
			icon='NavigateNext'
			onClick={() => router.push(route)}
			className='m-0 p-0'>
			{text}
		</Button>
	);
};

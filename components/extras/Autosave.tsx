import React, { Children, ReactElement, ReactNode, useEffect, useState } from 'react';
import showNotification from './showNotification';
import Icon from '../icon/Icon';

interface AutosaveProps {
	children: ReactNode;
	time?: number;
	endpoint?: string;
}

export const Autosave = ({ children, time, endpoint }: AutosaveProps) => {
	time = 2000;

	const childArr = Children.toArray(children)[0] as ReactElement;
	const [text, setText] = useState('');
	const [timeRetarded, setTimeRetarded] = useState<NodeJS.Timeout | null>(null);

	function save(newText: string) {
		if (timeRetarded) clearTimeout(timeRetarded);
		const nuevoTimeout = setTimeout(() => {
			if (endpoint) {
				console.log('Sending data :', newText);
			}
			console.log('guardado  data :', newText);

			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Autoguardado</span>
				</span>,
				'Datos guardados exitosamente.',
				'success',
			);
		}, time);

		setTimeRetarded(nuevoTimeout);
	}

	function handleChange(e: { target: { value: React.SetStateAction<string> } }) {
		setText(e.target.value);
	}

	useEffect(() => {
		save(text);
	}, [text]);
	return (
		<>
			{React.cloneElement(childArr, {
				onInput: handleChange,
			})}
		</>
	);
};

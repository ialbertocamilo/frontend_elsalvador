import Button from '../bootstrap/Button';
import { useState } from 'react';

export const ToggleYesNoButton = ({ blocked }: { blocked?: boolean }) => {
	const [toggle, setToggle] = useState(false);

	return (
		<Button
			isDisable={blocked}
			onClick={() => setToggle(!toggle)}
			size='sm'
			className={toggle ? 'col-sm bg-primary text-white' : 'bg-primary-subtle text-black-50'}>
			{toggle ? 'Yes' : 'No'}
		</Button>
	);
};

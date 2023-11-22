import Button from '../bootstrap/Button';
import { useEffect, useState } from 'react';

export const ToggleYesNoButton = ({
	blocked,
	forceYes,
	keyName,
	emitValue,
}: {
	blocked?: boolean;
	forceYes?: boolean;
	keyName?: number;
	emitValue?: Function;
}) => {
	const [toggle, setToggle] = useState(forceYes);

	useEffect(() => {
		setToggle(forceYes);
	}, [forceYes]);

	function saveToggle(val: boolean, keyName?: number) {
		setToggle(val);
		if (emitValue) emitValue(keyName, val);
	}

	return (
		<Button
			isDisable={blocked}
			onClick={() => saveToggle(!toggle, keyName)}
			size='sm'
			style={{ width: '4em' }}
			className={toggle ? 'col-sm bg-primary text-white' : 'bg-primary-subtle text-black-50'}>
			{toggle ? 'Si' : 'No'}
		</Button>
	);
};

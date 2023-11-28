import Alert, { AlertHeading } from '../bootstrap/Alert';
import React, { useEffect, useState } from 'react';

enum Status {
	inProgress,
	inRevision,
	accepted,
	denied,
}

export const ProjectStatusAlert = ({ status }: { status: Status }) => {
	const [text, setText] = useState<any>(null);
	useEffect(() => {
		setText(StatusText(status));
	}, [status]);
	const StatusText = (status: Status) => {
		switch (Number(status)) {
			case Status.accepted:
				return (
					<Alert isLight color='success' borderWidth={0} className='shadow-3d-primary'>
						<AlertHeading tag='h2' className='h5'>
							Aprobado ✔
						</AlertHeading>
					</Alert>
				);
				break;
			case Status.denied:
				return (
					<Alert isLight color='danger' borderWidth={0} className='shadow-3d-primary'>
						<AlertHeading tag='h2' className='h5'>
							Rechazado ❌
						</AlertHeading>
					</Alert>
				);
				break;
			case Status.inRevision:
				return (
					<Alert isLight color='info' borderWidth={0} className='shadow-3d-primary'>
						<AlertHeading tag='h2' className='h5'>
							En revisión ℹ️
						</AlertHeading>
					</Alert>
				);
				break;

			default:
				return <></>;
		}
	};
	return <>{text}</>;
};

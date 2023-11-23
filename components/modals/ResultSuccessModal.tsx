import Rodal from 'rodal';
import Alert, { AlertHeading } from '../bootstrap/Alert';
import React from 'react';

export const ResultSuccessModal = ({
	modalStatus,
	setModalStatus,
	projectEntity,
}: {
	modalStatus: boolean;
	setModalStatus: Function;
	projectEntity: any;
}) => {
	return (
		<Rodal visible={modalStatus} height={350} onClose={() => setModalStatus(false)}>
			<Alert
				icon='Verified'
				isLight
				color='primary'
				borderWidth={0}
				className='shadow-3d-primary'>
				<AlertHeading tag='h2' className='h4'>
					Aprobado! ✔
				</AlertHeading>
				<span>
					Proyecto <span className='bold h6'>{projectEntity?.project_name}</span> ha sido
					aprobado.
				</span>
			</Alert>
			<div className='text-black-50'>
				<h5>Detalles</h5>
				<p>
					Nombre del propietario:{' '}
					<span className='bold h5'>
						{projectEntity?.owner_name} {projectEntity?.owner_lastname}
					</span>
				</p>
				<p>
					Nombre del diseñador:{' '}
					<span className='bold h5'>{projectEntity?.designer_name}</span>
				</p>
				<p>
					Director de obra:{' '}
					<span className='bold h5'>{projectEntity?.project_director}</span>
				</p>
				<span>
					El proyecto ha sido aprobado según los parametros registrados en la plataforma.
				</span>
			</div>
			<br />
		</Rodal>
	);
};

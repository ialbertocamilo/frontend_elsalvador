import Rodal from 'rodal';
import Alert, { AlertHeading } from '../bootstrap/Alert';
import React from 'react';

export const ResultErrorModal = ({
	modalStatus,
	setModalStatus,
	projectEntity,
}: {
	modalStatus: boolean;
	setModalStatus: Function;
	projectEntity: any;
}) => {
	return (
		<Rodal visible={modalStatus} height={400} onClose={() => setModalStatus(false)}>
			<Alert isLight color='danger' borderWidth={0} className='shadow-3d-primary'>
				<AlertHeading tag='h2' className='h5'>
					Rechazado! ❌
				</AlertHeading>
				<span>
					Proyecto <span className='bold h6'>{projectEntity?.project_name}</span> no ha
					podido ser aprobado, debido a que los valores reportados y valores meta no son
					iguales.
				</span>
			</Alert>
			<div>
				<h4 className='bold'>Detalles</h4>
				<br />
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
				<span className='text-muted'>
					El proyecto ha sido rechazado según los parametros registrados en la plataforma.
				</span>
			</div>
			<br />
		</Rodal>
	);
};

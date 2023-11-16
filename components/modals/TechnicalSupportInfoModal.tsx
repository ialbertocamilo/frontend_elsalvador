import Rodal from 'rodal';
import Alert, { AlertHeading } from '../bootstrap/Alert';
import React, { useState } from 'react';
import Button from '../bootstrap/Button';
import Spinner from '../bootstrap/Spinner';

export const TechnicalSupportInfoModal = ({
	modalStatus,
	setModalStatus,
	projectEntity,
	onAccept,
}: {
	modalStatus: boolean;
	setModalStatus: Function;
	projectEntity: any;
	onAccept?: Function;
}) => {
	const [isAccept, setIsAccept] = useState(false);

	function accept() {
		setIsAccept(true);
		setTimeout(() => {
			if (onAccept) onAccept();
			setModalStatus(false);
		}, 2000);
	}

	const AcceptDeclineButton = () => {
		if (!isAccept)
			return (
				<div className='row justify-content-between'>
					<Button
						size='sm'
						color='success'
						className='col me-1'
						onClick={() => {
							accept();
						}}>
						Aprobar y enviar
					</Button>
					<Button
						size='sm'
						color='danger'
						className='col ms-1'
						onClick={() => setModalStatus(false)}>
						Rechazar y continuar editando.
					</Button>
				</div>
			);

		return (
			<div className='justify-content-center text-center align-content-center'>
				<Spinner color={'info'} inButton /> Loading...
			</div>
		);
	};

	return (
		<Rodal visible={modalStatus} height={350} onClose={() => setModalStatus(false)}>
			<Alert icon='InfoOutline' isLight color='info' className=''>
				<AlertHeading tag='h2' className='h4'>
					Importante!
				</AlertHeading>
			</Alert>
			<span>
				El Proyecto <span className='bold h5'>{projectEntity?.project_name}</span> está
				preparado para su aprobación, tomar en cuenta los siguiente puntos.
			</span>
			<ul>
				<li>
					El proyecto cambiará su estado a solo visible y no se podrá editar por el
					usuario.
				</li>
				<li>El proyecto se permitirá visualizar por el supervisor.</li>
				<li>
					El proyecto se aparecerá en la bandeja de proyectos por aprobar por el
					supervisor.
				</li>
				<li>El supervisor podrá desbloquear el proyecto para la edición del usuario.</li>
			</ul>
			<AcceptDeclineButton />

			<br />
		</Rodal>
	);
};

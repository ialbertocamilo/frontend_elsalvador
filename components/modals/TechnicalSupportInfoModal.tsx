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
		<Rodal visible={modalStatus} height={270} onClose={() => setModalStatus(false)}>
			<Alert icon='InfoOutline' isLight color='info' className=''>
				<AlertHeading tag='h2' className='h4'>
					Importante!
				</AlertHeading>
			</Alert>
			<span className='fw-semibold text-black-50'>
				Para el proyecto <span className='fw-bold'>{projectEntity?.project_name}</span>{' '}
				tomar en cuenta lo siguiente.
			</span>
			<br />
			<ul className='fw-semibold text-black-50'>
				<li>
					El proyecto no se podrá editar salvo habilitación del responsable de la
					evaluación técnica.
				</li>
			</ul>
			<AcceptDeclineButton />
		</Rodal>
	);
};

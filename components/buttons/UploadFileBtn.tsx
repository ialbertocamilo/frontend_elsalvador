import Input from '../bootstrap/forms/Input';
import React from 'react';
import { InputEvent } from 'maplibre-gl';
import { useProjects } from '../../services/project/project.service';
import showNotification from '../extras/showNotification';
import Icon from '../icon/Icon';

interface UploadFileBtnProps {
	projectId: string;
	keyName: string;
	checkUpload?: Function;
}
export const UploadFileBtn = ({ projectId, keyName, checkUpload }: UploadFileBtnProps) => {
	const projects = useProjects();
	function uploadFile(ev: React.ChangeEvent<HTMLInputElement>) {
		if (ev.currentTarget.files) {
			const file = ev.currentTarget.files[0];
			projects.uploadFile(projectId, file, keyName).then((data) => {
				if (data) {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Archivo</span>
						</span>,
						'El archivo se subió exitosamente.',
						'info',
					);
					if (checkUpload) checkUpload(data);
				}
			});
		}
	}
	return (
		<Input
			type='file'
			autoComplete='photo'
			ariaLabel='Adjuntar archivo'
			color='info'
			onInput={uploadFile}
		/>
	);
};

export default UploadFileBtn;

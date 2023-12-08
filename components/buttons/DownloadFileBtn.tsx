import Button from '../bootstrap/Button';
import React from 'react';

export interface DownloadFileProps {
	urlToFile: string;
	fileName?: string;
}
export const DownloadFileBtn = ({ urlToFile, fileName }: DownloadFileProps) => {
	return (
		<Button
			color='info'
			isLight
			tag='a'
			to={urlToFile}
			target='_blank'
			icon='Download'
			className={'rbc-ellipsis'}
			aria-label={fileName}
			download>
			Descargar {fileName}
		</Button>
	);
};

import Button from '../bootstrap/Button';
import React from 'react';

export interface DownloadFileProps {
	urlToFile: string;
}
export const DownloadFileBtn = ({ urlToFile }: DownloadFileProps) => {
	return (
		<Button
			color='info'
			isLight
			tag='a'
			to={urlToFile}
			target='_blank'
			icon='Download'
			download>
			Descargar
		</Button>
	);
};

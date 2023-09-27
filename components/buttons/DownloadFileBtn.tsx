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
			download>
			Descargar {fileName}
		</Button>
	);
};

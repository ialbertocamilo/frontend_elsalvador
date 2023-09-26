import UploadFileBtn from '../buttons/UploadFileBtn';
import { DownloadFileBtn } from '../buttons/DownloadFileBtn';
import React, { useEffect } from 'react';
import { useProjects } from '../../services/project/project.service';

interface FileUploaderProps {
	keyName: string;
	projectId: string;
}

const FileUploader = ({ keyName, projectId }: FileUploaderProps) => {
	const { getFiles } = useProjects();
	useEffect(() => {
		getFiles(projectId, keyName).then((data) => {
			console.log(data);
		});
	}, []);
	return (
		<>
			<UploadFileBtn projectId={projectId} keyName={keyName} />
			<br />
			<DownloadFileBtn urlToFile='' />
		</>
	);
};

export default FileUploader;

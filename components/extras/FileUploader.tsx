import UploadFileBtn from '../buttons/UploadFileBtn';
import { DownloadFileBtn } from '../buttons/DownloadFileBtn';
import React, { useEffect, useState } from 'react';
import { useProjects } from '../../services/project/project.service';

interface FileUploaderProps {
	keyName: string;
	projectId: string;
}

interface DownloadedFile {
	custom_properties: [];
	extension: string;
	file_name: string;
	name: string;
	order: number;
	original_url: string;
	uuid: string;
}

const FileUploader = ({ keyName, projectId }: FileUploaderProps) => {
	const { getFiles } = useProjects();

	const [hasDownload, setHasDownload] = useState(false);
	const [downloadUrl, setDownloadUrl] = useState('');

	const [fileName, setFileName] = useState('');
	useEffect(() => {
		getFiles(projectId, keyName).then((data: []) => {
			if (data.length <= 0) {
				setHasDownload(false);
				return;
			}
			const obj = Object.values(data)[0] as DownloadedFile;
			setHasDownload(true);
			setDownloadUrl(obj?.original_url);
			const name = obj?.name + '.' + obj?.extension;
			setFileName(name);
		});
	}, []);
	return (
		<>
			<UploadFileBtn projectId={projectId} keyName={keyName} />
			<br />
			{hasDownload && <DownloadFileBtn urlToFile={downloadUrl} fileName={fileName} />}
		</>
	);
};

export default FileUploader;

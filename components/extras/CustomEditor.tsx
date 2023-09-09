'use client';
import { Editor } from 'react-draft-wysiwyg';
import React, { useRef } from 'react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface CustomEditorProps {
	placeholder?: string;
}

export const CustomEditor = ({ placeholder }: CustomEditorProps) => {
	const editor = useRef(null);
	return <Editor placeholder={placeholder} ref={editor} />;
};

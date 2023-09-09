'use client';
import { Editor } from 'react-draft-wysiwyg';
import React from 'react';

interface CustomEditorProps {
	placeholder?: string;
}

export const CustomEditor = ({ placeholder }: CustomEditorProps) => {
	return (
		<section>
			<Editor placeholder={placeholder} />
		</section>
	);
};

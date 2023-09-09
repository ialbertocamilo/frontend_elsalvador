'use client';
import React from 'react';
import dynamic from 'next/dynamic';

interface CustomEditorProps {
	placeholder?: string;
}

export const CustomEditor = ({ placeholder }: CustomEditorProps) => {
	const MyEditor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
		ssr: false,
	});
	return <MyEditor placeholder={placeholder}></MyEditor>;
};

'use client';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface CustomEditorProps {
	placeholder?: string;
	setText?: (e: any) => void;
	initialText?: string;
}

export const CustomEditor = ({ placeholder, setText, initialText }: CustomEditorProps) => {
	const [value, setValue] = useState(initialText ? initialText : '');

	useEffect(() => {
		if (initialText) setValue(initialText);
	}, [initialText]);
	useEffect(() => {
		if (setText) {
			setText(value);
		}
	}, [value]);

	return <ReactQuill theme='snow' value={value} onChange={setValue} placeholder={placeholder} />;
};

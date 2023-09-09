import React from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';

export interface IPageProps {
	children: any;
}

const Page = ({ children }: IPageProps) => {
	return <body className={`px-0`}>{children}</body>;
};

export default Page;

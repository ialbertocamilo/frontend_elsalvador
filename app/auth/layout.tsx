import React, { forwardRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export interface IPageProps {
	children: ReactNode;
	container?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid';
	className?: string;
}
const Page = forwardRef<HTMLDivElement, IPageProps>(
	({ children, className, container, ...props }, ref) => {
		//@ts-ignore
		return (
			<div
				ref={ref}
				style={{padding:"0 0 0 0"}}
				className={`container-fluid`}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</div>
		);
	},
);
Page.displayName = 'Page';

export default Page;

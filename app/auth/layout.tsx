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
		return (
			<div
				ref={ref}
				style={{padding:"0 0 0 0"}}
				className={classNames('page', className, {
					[`container-fluid`]: container,
				})}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</div>
		);
	},
);
Page.displayName = 'Page';
Page.propTypes = {
	children: PropTypes.node.isRequired,
	// @ts-ignore
	container: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf([null, 'sm', 'md', 'lg', 'xl', 'xxl', 'fluid']),
	]),
	className: PropTypes.string,
};
Page.defaultProps = {
	container: 'xxl',
	className: undefined,
};

export default Page;

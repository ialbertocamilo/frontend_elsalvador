'use client';
import React, { forwardRef, ReactElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ISubHeaderProps } from '../SubHeader/SubHeader';
import { IPageProps } from '../Page/Page';
import Mounted from '../../components/Mounted';

interface IPageWrapperProps {
	isProtected?: boolean;
	children:
		| ReactElement<ISubHeaderProps>[]
		| ReactElement<IPageProps>
		| ReactElement<IPageProps>[];
	className?: string;
}

const PageWrapper = forwardRef<HTMLDivElement, IPageWrapperProps>(
	({ isProtected, className, children }, ref) => {
		return (
			<div ref={ref} className={classNames('page-wrapper', 'container-fluid', className)}>
				<Mounted>{children}</Mounted>
			</div>
		);
	},
);
PageWrapper.displayName = 'PageWrapper';
PageWrapper.propTypes = {
	isProtected: PropTypes.bool,
	// @ts-ignore
	// @ts-ignore
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
PageWrapper.defaultProps = {
	isProtected: true,
	className: undefined,
};

export default PageWrapper;

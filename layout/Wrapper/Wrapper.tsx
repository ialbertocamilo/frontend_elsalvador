import React, {FC, ReactNode, StrictMode, useContext} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Content from '../Content/Content';
import WrapperOverlay from './WrapperOverlay';
import HeaderRoutes from '../Header/HeaderRoutes';
import ThemeContext from '../../context/themeContext';

interface IWrapperContainerProps {
	children: ReactNode;
	className?: string;
}

export const WrapperContainer: FC<IWrapperContainerProps> = ({ children, className, ...props }) => {
	const { rightPanel } = useContext(ThemeContext);
	return (
		<div
			className={classNames(
				'wrapper',
				{ 'wrapper-right-panel-active': rightPanel },
				className,
			)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</div>
	);
};
WrapperContainer.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
WrapperContainer.defaultProps = {
	className: undefined,
};

interface IWrapper {
	children: ReactNode;
}

const Wrapper: FC<IWrapper> = ({ children }) => {
	return (
		<>
			<WrapperContainer>
				<StrictMode>
				<HeaderRoutes /></StrictMode>
				<Content>{children}</Content>
			</WrapperContainer>
			<WrapperOverlay />
		</>
	);
};

export default Wrapper;

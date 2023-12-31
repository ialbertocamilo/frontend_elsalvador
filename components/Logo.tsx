import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

interface ILogoProps {
	width?: number;
	height?: number;
}

const Logo: FC<ILogoProps> = ({ width, height }) => {
	return (
		<Image
			src='/logo1.png'
			width={height !== 854 && !!height ? height * (2155 / 854) : width}
			height={width !== 2155 && !!width ? width * (854 / 2155) : height}
			className={'logo'}
			alt='logo'
		/>
	);
};
Logo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};
Logo.defaultProps = {
	width: 2155,
	height: 854,
};

export default Logo;

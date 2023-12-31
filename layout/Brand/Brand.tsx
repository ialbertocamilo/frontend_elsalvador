import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../components/icon/Icon';
import Logo from '../../components/Logo';
import Link from 'next/link';
import { RoutesList } from '../../common/constants/default';
import Image from 'next/image';

interface IBrandProps {
	asideStatus: boolean;
	setAsideStatus(...args: unknown[]): unknown;
}
const Brand: FC<IBrandProps> = ({ asideStatus, setAsideStatus }) => {
	return (
		<div className='brand w-100'>
			<Image
				className='brand-logo-min'
				src='/logo2.png'
				alt='logo'
				width={35}
				height={35}></Image>
			<div className='brand-logo w-100 mt-4'>
				<h1 className='brand-title '>
					<Link href={RoutesList.projects} aria-label='Logo'>
						<Logo width={200} height={100} />
					</Link>
				</h1>
			</div>
			<button
				type='button'
				className='btn brand-aside-toggle'
				aria-label='Toggle Aside'
				onClick={() => setAsideStatus(!asideStatus)}>
				<Icon icon='FirstPage' className='brand-aside-toggle-close' />
				<Icon icon='LastPage' className='brand-aside-toggle-open' />
			</button>
		</div>
	);
};
Brand.propTypes = {
	asideStatus: PropTypes.bool.isRequired,
	setAsideStatus: PropTypes.func.isRequired,
};

export default Brand;

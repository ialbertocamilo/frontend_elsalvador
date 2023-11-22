import React, { useContext, useEffect } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../layout/SubHeader/SubHeader';
import { useTour } from '@reactour/tour';
import ThemeContext from '../context/themeContext';
import useDarkMode from '../hooks/useDarkMode';
import Page from '../layout/Page/Page';
import Popovers from '../components/bootstrap/Popovers';

const Indexxxxxxxxxxxxx: NextPage = () => {
	const { mobileDesign } = useContext(ThemeContext);
	/**
	 * Tour Start
	 */
	const { setIsOpen } = useTour();
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			localStorage.getItem('tourModalStarted') !== 'shown' &&
			!mobileDesign
		) {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 3000);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { themeStatus } = useDarkMode();

	return (
		<PageWrapper>
			<Head>
				<title>Dashboard Page</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Popovers title='page.tsx' desc={<code>pages/page.tsx</code>}>
						SubHeaderLefts
					</Popovers>
					<code>page.tsx</code>
					<SubheaderSeparator />
				</SubHeaderLeft>
				<SubHeaderRight>
					<Popovers title='page.tsx' desc={<code>pages/page.tsx</code>}>
						SubHeaderRight
					</Popovers>
					<code>index.tsxs</code>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12 mb-3'>
						<Popovers title='page.tsx' desc={<code>pages/page.tsx</code>}>
							Page
						</Popovers>
						<code className='ps-3'>page.tsx</code>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default Indexxxxxxxxxxxxx;

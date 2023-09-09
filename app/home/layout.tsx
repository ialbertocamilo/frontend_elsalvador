'use client';
import React from 'react';
import { getOS } from '../../helpers/helpers';
import useDarkMode from '../../hooks/useDarkMode';
import COLORS from '../../common/data/enumColors';
import { ThemeContextProvider } from '../../context/themeContext';
import { ThemeProvider } from 'react-jss';
import { ToastProvider } from 'react-toast-notifications';
import { Toast, ToastContainer } from '../../components/bootstrap/Toasts';
import { TourProvider } from '@reactour/tour';
import steps, { styles } from '../steps';
import App from '../../layout/App/App';
import AsideRoutes from '../../layout/Aside/AsideRoutes';
import Wrapper from '../../layout/Wrapper/Wrapper';
// eslint-disable-next-line react/function-component-definition
export default function RootLayout({ children }: { children: React.ReactNode }) {
	getOS();

	/**
	 * Dark Mode
	 */
	const { themeStatus } = useDarkMode();
	const theme = {
		theme: themeStatus,
		primary: COLORS.PRIMARY.code,
		secondary: COLORS.SECONDARY.code,
		success: COLORS.SUCCESS.code,
		info: COLORS.INFO.code,
		warning: COLORS.WARNING.code,
		danger: COLORS.DANGER.code,
		dark: COLORS.DARK.code,
		light: COLORS.LIGHT.code,
	};
	return (
		<ThemeContextProvider>
			<ThemeProvider theme={theme}>
				<ToastProvider components={{ ToastContainer, Toast }}>
					<TourProvider
						steps={steps}
						styles={styles}
						showNavigation={false}
						showBadge={false}>
						<App>
							<AsideRoutes />
							<Wrapper>{children}</Wrapper>
						</App>
					</TourProvider>
				</ToastProvider>
			</ThemeProvider>
		</ThemeContextProvider>
	);
}

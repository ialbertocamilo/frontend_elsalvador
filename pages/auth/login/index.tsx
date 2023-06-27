import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { FC, useCallback, useContext, useState } from 'react';
import AuthContext from '../../../context/authContext';
import useDarkMode from '../../../hooks/useDarkMode';
import USERS, { getUserDataWithUsername } from '../../../common/data/userDummyData';
import { useFormik } from 'formik';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import PropTypes from 'prop-types';
import { signIn, useSession } from 'next-auth/react';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}

const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Crear cuenta</div>
				<div className='text-center h4 text-muted mb-5'>
					A continuación ingresa tus datos
				</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>¡Bienvenido!</div>
			<div className='text-center h4 text-muted mb-5'>
				A continuación ingresa con tu usuario
			</div>
		</>
	);
};

interface ILoginProps {
	isSignUp?: boolean;
}

const Login: NextPage<ILoginProps> = ({ isSignUp }) => {
	const router = useRouter();

	const { setUser } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);

	const handleOnClick = useCallback(() => router.push('/'), [router]);

	const { data: session } = useSession();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: USERS.JOHN.username,
			loginPassword: USERS.JOHN.password,
		},
		validate: (values) => {
			const errors: { loginUsername?: string; loginPassword?: string } = {};

			if (!values.loginUsername) {
				errors.loginUsername = 'Required';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			console.log('process Login');
			await signIn('credentials', {
				username: values.loginUsername,
				password: values.loginPassword,
				redirect: true,
				callbackUrl: '/',
			});
			if (setUser) {
				setUser(values.loginUsername);
			}
			// handleOnClick();
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<PageWrapper
			isProtected={false}
			title={singUpStatus ? 'Registro' : 'Iniciar sesión'}
			className={'bg-primary'}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 '>
						<Card
							stretch={'semi'}
							style={{ borderRadius: '5px' }}
							data-tour='login-page'>
							<CardBody className='py-5'>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Ingresar
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Registrate
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={singUpStatus} />

								<form className='row g-4'>
									{singUpStatus ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='signup-email'
													isFloating
													label='Correo'>
													<Input type='email' autoComplete='email' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-name'
													isFloating
													label='Nombres completos'>
													<Input autoComplete='given-name' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='username'
													isFloating
													label='Nombre de usuario'>
													<Input autoComplete='family-name' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='password'
													isFloating
													label='Contraseña'>
													<Input
														type='password'
														autoComplete='password'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													color='dark'
													className='w-100 py-3'
													onClick={handleOnClick}>
													Registrate
												</Button>
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='loginUsername'
													isFloating
													label='Usuario o email'>
													<Input
														autoComplete='username'
														value={formik.values.loginUsername}
														isTouched={formik.touched.loginUsername}
														invalidFeedback={
															formik.errors.loginUsername
														}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
											</div>

											<div className='col-12'>
												<FormGroup
													id='loginPassword'
													isFloating
													label='Contraseña'>
													<Input
														type='password'
														autoComplete='current-password'
														value={formik.values.loginPassword}
														isTouched={formik.touched.loginPassword}
														invalidFeedback={
															formik.errors.loginPassword
														}
														validFeedback='Looks good!'
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													color='dark'
													className='w-100 py-3'
													onClick={formik.handleSubmit}>
													Continuar
												</Button>
											</div>
										</>
									)}
								</form>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default Login;
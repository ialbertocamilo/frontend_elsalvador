'use client';
import React, { FC, useCallback, useEffect, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import { useFormik } from 'formik';
import classNames from 'classnames';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { login, register } from '../../../services/auth/authentication';
import { ClientStorage } from '../../../common/classes/storage';
import { useRouter } from 'next/navigation';
import { RoutesList } from '../../../common/constants/default';
import { ReactNotifications } from 'react-notifications-component';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import Logo from '../../../components/Logo';
import userStore from '../../../stores/userStore';
import Select from '../../../components/bootstrap/forms/Select';
import { arrayToList, fillMunicipalitiesByDepartment } from '../../../helpers/helpers';
import { departmentList } from '../../../common/constants/lists';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}

const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5 text-primary'>Crear cuenta</div>
				<div className='text-center h4 text-muted mb-5'>
					Por favor, introduce tus credenciales para ingresar.
				</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5 text-primary'>¡Bienvenido!</div>
			<div className='text-center h4 text-muted mb-5'>
				Por favor, introduce tus credenciales para ingresar.
			</div>
		</>
	);
};

const Login = () => {
	const router = useRouter();

	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(false);

	const handleOnClick = useCallback(() => router.push('/'), [router]);

	const [loginError, setLoginError] = useState(false);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: '',
			loginPassword: '',
		},
		validate: (values) => {
			const errors: {
				loginUsername?: string;
				loginPassword?: string;
			} = {};
			if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.loginUsername))
				errors.loginUsername = 'Email inválido';
			if (!values.loginUsername) {
				errors.loginUsername = 'Requerido';
			}
			if (!values.loginPassword) {
				errors.loginPassword = 'Requerido';
			}

			return errors;
		},
		validateOnChange: true,
		onSubmit: async (values) => {
			const result = await login(values.loginUsername, values.loginPassword);
			if (!result) setLoginError(true);
			else {
				const user = ClientStorage.saveUser(result);
				userStore.setUser(user);
				router.replace(RoutesList.projects);
				setLoginError(false);
			}
		},
	});
	const formik1 = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: '',
			lastname: '',
			profession: '',
			nationality: '',
			department: '0',
			municipality: '0',
			address: '',
			phone: '',
			email: '',
			password: '',
			password2: '',
		},
		validate: (values) => {
			const errors: {
				name?: string;
				lastname?: string;
				profession?: string;
				nationality?: string;
				department?: string;
				municipality?: string;
				address?: string;
				phone?: string;
				email?: string;
				password?: string;
				password2?: string;
			} = {};

			if (!values.name) {
				errors.name = 'Requerido';
			}
			if (!values.lastname) {
				errors.lastname = 'Requerido';
			}
			if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email))
				errors.email = 'Email inválido ejm. john@doe.com';
			if (!values.email) {
				errors.email = 'Requerido';
			}
			const phoneRegex = /^(?:\+\d{1,3}\s?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
			if (values.phone)
				if (!phoneRegex.test(values.phone))
					errors.phone = 'Escribe un teléfono válido ejm. +1 (123) 456-7890';
			if (!values.password) {
				errors.password = 'Requerido';
			}
			if (values.password.length < 6) {
				errors.password = 'El password debe tener al menos 6 carateres.';
			}
			if (values.password != values.password2 || !values.password) {
				errors.password2 = 'Las contraseñas no son iguales.';
			}
			return errors;
		},
		validateOnChange: true,
		onSubmit: async (values) => {
			const name = await register(values);
			if (name)
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Registro</span>
					</span>,
					'Se ha creado el usuario ' + name,
					'success',
				);

			setSingUpStatus(false);
			await formik.setFieldValue('loginUsername', values.email);
		},
	});

	function keyPress(ev: any) {
		if (ev.code == 'Enter') {
			formik.submitForm();
		}
	}

	const [municipalites, setMunicipalites] = useState<any[]>();
	useEffect(() => {
		formik1.setFieldValue('department', 0);
		const municipalitiesByDepartment = fillMunicipalitiesByDepartment(
			Number(formik1.values.department),
		);
		if (municipalitiesByDepartment) {
			setMunicipalites(arrayToList(municipalitiesByDepartment));
		}
	}, []);
	useEffect(() => {
		const array = fillMunicipalitiesByDepartment(Number(formik1.values.department));
		if (array) {
			setMunicipalites(arrayToList(array));
		}
	}, [formik1.values.department]);
	return (
		<div className={'bg-primary h-100'}>
			<ReactNotifications />
			<div className='row h-100 overflow-scroll'>
				<div className='col-xxl-3 col-lg-3 col-12 align-content-center align-self-center justify-content-center text-center'>
					<Logo height={100} width={200} />
				</div>
				<div className='col-xxl-9 col-lg-9 col-12 bg-white p-0'>
					<div className='d-flex justify-content-center align-items-center g-3 h-100'>
						<div className='align-self-center'>
							<LoginHeader isNewUser={singUpStatus} />
							<div
								className={classNames('rounded-3', {
									'bg-l10-primary': !darkModeStatus,
									'bg-dark': darkModeStatus,
								})}>
								<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
									<div className='col'>
										<Button
											color={'primary'}
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
											color={'primary'}
											isLight={!singUpStatus}
											className='rounded-1 w-100'
											size='lg'
											onClick={() => {
												setSignInPassword(false);
												setSingUpStatus(!singUpStatus);
											}}>
											Regístrate
										</Button>
									</div>
								</div>
							</div>
							<br />
							<form className='row g-3'>
								{singUpStatus ? (
									<div>
										<div className='col-12 my-1'>
											<FormGroup id='name' isFloating label='Nombres '>
												<Input
													autoComplete='name'
													onBlur={formik.handleBlur}
													isValid={formik1.isValid}
													isTouched={formik1.touched.name}
													invalidFeedback={formik1.errors.name}
													value={formik1.values.name}
													onChange={formik1.handleChange}
												/>
											</FormGroup>
										</div>
										<div className='col-12 my-1'>
											<FormGroup isFloating id='lastname' label='Apellidos'>
												<Input
													autoComplete='lastname'
													onBlur={formik.handleBlur}
													isValid={formik1.isValid}
													invalidFeedback={formik1.errors.lastname}
													isTouched={formik1.touched.lastname}
													value={formik1.values.lastname}
													onChange={formik1.handleChange}
												/>
											</FormGroup>
										</div>
										<div className='col-12 my-1'>
											<FormGroup
												id='profession'
												isFloating
												label='Profesión u oficio'>
												<Input
													autoComplete='profession'
													onBlur={formik.handleBlur}
													value={formik1.values.profession}
													onChange={formik1.handleChange}
												/>
											</FormGroup>
										</div>
										<div className='col-12 my-1'>
											<FormGroup
												id='nationality'
												isFloating
												label='Nacionalidad'>
												<Input
													autoComplete='nationality'
													onBlur={formik.handleBlur}
													value={formik1.values.nationality}
													onChange={formik1.handleChange}
												/>
											</FormGroup>
										</div>
										<div className='col-12 my-1'>
											<FormGroup
												id='department'
												isFloating
												label='Departamento'>
												<Select
													name='department'
													value={formik1.values.department}
													onChange={formik1.handleChange}
													list={arrayToList(departmentList)}
													ariaLabel='department'></Select>
											</FormGroup>
										</div>
										<div className='col-12 my-1'>
											<FormGroup
												id='municipality'
												isFloating
												label='Municipio'>
												<Select
													name='municipality'
													value={formik1.values.municipality}
													onChange={formik1.handleChange}
													list={municipalites}
													ariaLabel='municipality'></Select>
											</FormGroup>
										</div>
										<div className='col-12 my-1'>
											<FormGroup isFloating id='address' label='Dirección'>
												<Input
													autoComplete='address'
													onBlur={formik.handleBlur}
													value={formik1.values.address}
													onChange={formik1.handleChange}
												/>
											</FormGroup>
										</div>
										<div className='col-12 my-1'>
											<FormGroup isFloating id='phone' label='Teléfono'>
												<Input
													autoComplete='phone'
													onBlur={formik.handleBlur}
													value={formik1.values.phone}
													onChange={formik1.handleChange}
												/>
											</FormGroup>
										</div>
										<div className='col-12 my-1'>
											<FormGroup isFloating id='email' label='Email'>
												<Input
													type='email'
													autoComplete='email'
													inputMode={'email'}
													onBlur={formik.handleBlur}
													isValid={formik1.isValid}
													invalidFeedback={formik1.errors.email}
													isTouched={formik1.touched.email}
													value={formik1.values.email}
													onChange={formik1.handleChange}
												/>
											</FormGroup>
										</div>
										<div className='col-12 my-1'>
											<FormGroup
												isFloating
												id='password'
												name='password'
												label='Contraseña'>
												<Input
													type='password'
													autoComplete='current-password'
													isTouched={formik1.touched.password}
													invalidFeedback={formik1.errors.password}
													value={formik1.values.password}
													placeholder={'*********'}
													validFeedback='Se ve bien!'
													isValid={formik1.isValid}
													onChange={formik1.handleChange}
													onBlur={formik1.handleBlur}
												/>
											</FormGroup>
										</div>
										<div className='col-12 my-1'>
											<FormGroup
												isFloating
												id='password2'
												name='password2'
												label='Repetir Contraseña'>
												<Input
													type='password'
													autoComplete='current-password'
													isTouched={formik1.touched.password2}
													invalidFeedback={formik1.errors.password2}
													value={formik1.values.password2}
													placeholder={'*********'}
													validFeedback='Se ve bien!'
													isValid={formik1.isValid}
													onChange={formik1.handleChange}
													onBlur={formik1.handleBlur}
												/>
											</FormGroup>
										</div>
										<br />
										<div className='col-12'>
											<Button
												color='primary'
												className='w-100 py-3'
												onClick={formik1.handleSubmit}>
												Regístrate
											</Button>
										</div>
									</div>
								) : (
									<>
										<div className='col-12'>
											<FormGroup
												id='loginUsername'
												isFloating
												label='Correo electrónico o usuario'>
												<Input
													autoComplete='username'
													isTouched={formik.touched.loginUsername}
													invalidFeedback={formik.errors.loginUsername}
													placeholder={'john@correo.com'}
													inputMode={'email'}
													value={formik.values.loginUsername}
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
													isTouched={formik.touched.loginPassword}
													invalidFeedback={formik.errors.loginPassword}
													value={formik.values.loginPassword}
													placeholder={'*********'}
													isValid={formik.isValid}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													onKeyPress={keyPress}
												/>
											</FormGroup>

											{loginError && (
												<span className='text-danger'>
													Error credenciales incorrectas
												</span>
											)}
										</div>
										<div className='col-12 align-items-end'>
											<Button
												color='primary'
												className='w-25 py-3 me-2'
												onClick={formik.handleSubmit}>
												Ingresar
											</Button>
											{/*<span*/}
											{/*	color='link '*/}
											{/*	className='cursor-pointer text-primary'>*/}
											{/*	¿Olvidaste tu contraseña?*/}
											{/*</span>*/}
										</div>
									</>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;

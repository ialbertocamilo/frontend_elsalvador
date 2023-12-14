import Chart, { IChartOptions } from '../extras/Chart';
import { FC, useCallback, useEffect, useState } from 'react';
import Card, { CardBody, CardFooter, CardHeader, CardLabel, CardTitle } from '../bootstrap/Card';
import { TColor } from '../../type/color-type';
import Avatar from '../Avatar';
import Popovers from '../bootstrap/Popovers';
import Button from '../bootstrap/Button';
import classNames from 'classnames';
import useDarkMode from '../../hooks/useDarkMode';
import Link from 'next/link';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { exportExcel, getLastFiveYearsFormatted, selectRoleName } from '../../helpers/helpers';
import dayjs from 'dayjs';
import Select from '../bootstrap/forms/Select';
import showNotification from '../extras/showNotification';
import Icon from '../icon/Icon';

interface IAnswerCustomerProps {
	id: string | number;
	imgWebp: string;
	img: string;
	name: string;
	job: string;
	value: number;
	color: TColor | 'link' | 'brand' | 'brand-two' | 'storybook';
	projectsCount: number;
	projectsTotal: number;
	email: string;
}

const AnswerCustomer: FC<IAnswerCustomerProps> = (props: IAnswerCustomerProps) => {
	const { id, imgWebp, img, email, name, job, value, color, projectsTotal, projectsCount } =
		props;
	const { darkModeStatus } = useDarkMode();
	const [state] = useState<IChartOptions>({
		series: [value],
		options: {
			chart: {
				type: 'radialBar',
				width: 50,
				height: 50,
				sparkline: {
					enabled: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			plotOptions: {
				radialBar: {
					hollow: {
						margin: 0,
						size: '50%',
					},
					track: {
						margin: 0,
					},
					dataLabels: {
						show: false,
					},
				},
			},
			stroke: {
				lineCap: 'round',
			},
			colors: ['#B7361B'],
		},
	});
	return (
		<div className='col-12'>
			<div className='row g-2'>
				<div className='col d-flex'>
					<div className='flex-shrink-0'>
						<Avatar src={img} size={54} userName={name} color={color} />
					</div>
					<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
						<div>
							<Link
								href={``}
								className={classNames('fw-bold fs-6 mb-0', {
									'link-dark': !darkModeStatus,
									'link-light': darkModeStatus,
								})}>
								{name}
							</Link>
							<div className='text-muted mt-n1'>
								<small>{job}</small>
							</div>
						</div>
					</div>
				</div>
				<div className='col-auto'>
					<div className='d-flex align-items-center'>
						<Popovers
							desc={projectsCount + ' de ' + projectsTotal + ' proyectos'}
							trigger='hover'>
							<span className='me-3'>{value ? value : 0}%</span>
						</Popovers>
						<Chart
							series={state.series}
							options={state.options}
							type={'radialBar'}
							height={35}
							width={35}
							className='me-3'
						/>
						<Popovers desc={`Enviar un correo a ${email}`} trigger='hover'>
							<Button
								color='info'
								isLight
								icon='ScheduleSend'
								className='text-nowrap'
								tag='a'
								href={'mailto:' + email}>
								Send
							</Button>
						</Popovers>
					</div>
				</div>
			</div>
		</div>
	);
};

export const BuildingsPerUser = ({ title }: { title: string }) => {
	const [users, setUsers] = useState<
		{
			id: number;
			name: string;
			lastname: string;
			projects_count: number;
			role_id: number;
			email: string;
		}[]
	>();
	const [total, setTotal] = useState(0);
	const [year, setYear] = useState(Number(dayjs().format('YYYY')));
	const [selectYear, setSelectYear] = useState(year);
	useEffect(() => {
		DashboardService.getBuildingsByUserReport(selectYear).then((data) => {
			setUsers(data.users);
			setTotal(data.total);
		});
	}, [selectYear]);

	const doReport = useCallback(async () => {
		const report = await DashboardService.getBuildingsByUserReportExcel(selectYear);

		let date = dayjs().unix();
		if (
			!exportExcel(
				report,
				`Reporte Top Ten de edificaciones registrados por el usuario ${date} .xlsx`,
				'REPORTE DE EDIFICACIONES REGISTRADOS POR EL USUARIO',
			)
		)
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Error en reporte</span>
				</span>,
				'No se puede descargar el siguiente reporte debido a que no existen datos.',
				'danger',
			);
	}, [selectYear]);

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='SupervisedUserCircle' iconColor='secondary'>
					<CardTitle tag='div' className='h5'>
						{title}
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody isScrollable>
				<Select
					ariaLabel={'select year'}
					value={selectYear.toString()}
					list={getLastFiveYearsFormatted()}
					onChange={(e: any) => setSelectYear(e.target.value)}
				/>
				<br />
				<div className='row g-3'>
					{users?.map((value, key) => (
						<AnswerCustomer
							key={key}
							id={value.id}
							img={
								'https://www.4me.com/wp-content/uploads/2018/01/4me-icon-person.png'
							}
							imgWebp={'assets/img/person.png'}
							name={value.name + ' ' + value?.lastname}
							color={'primary'}
							job={selectRoleName(value.role_id) as string}
							projectsTotal={total}
							projectsCount={value.projects_count}
							email={value.email}
							value={Number(((value.projects_count / total) * 100).toFixed(2))}
						/>
					))}
				</div>
			</CardBody>
			<CardFooter>
				<div className='row g-3 w-100'>
					<div className='col-12 d-flex justify-content-between'>
						<span>Total: {total} proyecto(s)</span>
						<span>Total: {users?.length} usuario(s)</span>
					</div>
					<div className='col-12'>
						<Button className={''} color='primary' onClick={doReport}>
							Descargar reporte
						</Button>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

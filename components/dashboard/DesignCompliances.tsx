import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../bootstrap/Card';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import PercentComparison from '../extras/PercentComparison';
import useDarkMode from '../../hooks/useDarkMode';
import { useEffect, useState } from 'react';
import { DashboardService } from '../../services/dashboard/dashboard.service';

export const Box = ({
	title,
	color,
	data,
}: {
	title: string;
	color: string;
	data?: { households: number; offices: number; tertiary: number; total: number };
}) => {
	const { darkModeStatus } = useDarkMode();
	return (
		<Card
			className={classNames('transition-base rounded-2 mb-0 text-dark', color, {
				'bg-l10-primary-hover': !darkModeStatus,
				'bg-lo25-primary-hover': darkModeStatus,
			})}
			shadow='sm'>
			<CardHeader className='bg-transparent'>
				<CardLabel>
					<CardTitle tag='div' className='h5'>
						{title}
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<div className='d-flex align-items-center pb-3'>
					<div className='flex-shrink-0'>
						<Icon
							icon={title == 'Rechazados' ? 'Remove' : 'Check'}
							size='4x'
							color={title == 'Rechazados' ? 'danger' : 'primary'}
						/>
					</div>
					<div className='flex-grow-1 ms-3'>
						<div className='fw-bold fs-3 mb-0 text-center'>{data?.households}</div>
						Viviendas
					</div>
					<div className='flex-grow-1 ms-3'>
						<div className='fw-bold fs-3 mb-0 text-center'>{data?.offices}</div>
						Oficinas
					</div>
					<div className='flex-grow-1 ms-3'>
						<div className='fw-bold fs-3 mb-0 text-center'>{data?.tertiary}</div>
						Departamentos
					</div>
					<div className='flex-grow-1 ms-3'>
						<div className='fw-bold fs-3 mb-0 text-center'>{data?.total}</div>
						<span className={'h3'}>Total</span>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
export const DesignCompliances = ({ title }: { title: string }) => {
	const [approved, setApproved] = useState<{
		households: number;
		offices: number;
		tertiary: number;
		total: number;
	}>();
	const [denied, setDenied] = useState<{
		households: number;
		offices: number;
		tertiary: number;
		total: number;
	}>();
	useEffect(() => {
		DashboardService.getDesignCompliancesReport().then((data) => {
			setApproved(data.approved);
			setDenied(data.denied);
		});
	}, []);
	return (
		<Card>
			<CardHeader>
				<CardLabel icon='DesignServices' iconColor='secondary'>
					<CardTitle tag='div' className='h5'>
						{title}
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<div className='row g-4'>
					<Box title={'Aprobados'} color={'bg-l25-primary'} data={approved} />
					<Box title={'Rechazados'} color={'bg-l25-secondary'} data={denied} />
				</div>
			</CardBody>
		</Card>
	);
};

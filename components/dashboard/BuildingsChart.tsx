import Chart from '../extras/Chart';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../bootstrap/Card';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { orderByClassification } from '../../helpers/helpers';

export const BuildingsChart = ({ title }: { title: string }) => {
	const salesByStoreOptions: ApexOptions = {
		chart: {
			type: 'bar',
			height: 350,
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
			},
		},
		colors: ['#008FFB', '#00E396', '#775DD0'],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent'],
		},
		xaxis: {
			categories: [
				'San Salvador',
				'Santa Ana',
				'San Miguel',
				'La Libertad',
				'Morazán',
				'La Paz',
				'Chalatenango',
				'Cuscatlán',
				'San Vicente',
				'Cabañas',
				'Usulután',
				'Sonsonate',
				'Ahuachapán',
				'La Unión',
			],
		},
		yaxis: {
			title: {
				text: 'Proyectos creados',
			},
		},
		fill: {
			opacity: 1,
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val + ' proyectos';
				},
			},
		},
	};

	const [year, setYear] = useState(Number(dayjs().format('YYYY')));

	const series: ApexOptions['series'][] = [
		{
			// @ts-ignore
			name: 'Viviendas',
			type: 'column',
			data: [44, 55, 41, 67, 22, 43, 21, 49, 39, 36, 42, 47, 12],
		},
		{
			// @ts-ignore
			name: 'Oficinas',
			type: 'column',
			data: [13, 23, 20, 8, 13, 27, 18, 15, 12, 13, 9, 14, 12],
		},
		{
			// @ts-ignore
			name: 'Terciarios',
			type: 'column',
			data: [11, 17, 15, 15, 21, 14, 20, 19, 13, 9, 17, 12, 12, 12],
		},
	];

	useEffect(() => {
		const year = 2023;
		DashboardService.getBuildingsBySystemReport(year).then((data) => {
			console.log(orderByClassification(data));
		});
	}, []);

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='ContactSupport' iconColor='secondary'>
					<CardTitle tag='div' className='h5'>
						{title}
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<Chart
					options={salesByStoreOptions}
					type={salesByStoreOptions.chart?.type}
					height={salesByStoreOptions.chart?.height}
					// @ts-ignore
					series={series}
				/>
			</CardBody>
		</Card>
	);
};

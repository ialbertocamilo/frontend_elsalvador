import Chart from '../extras/Chart';
import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import dayjs from 'dayjs';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../bootstrap/Card';

export const BuildingsChart = ({ title }: { title: string }) => {
	const salesByStoreOptions: ApexOptions = {
		chart: {
			height: 370,
			type: 'line',
			stacked: false,
			toolbar: { show: false },
		},
		colors: ['#2998FF', '#44A747', '#F3AB04  '],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: [1, 1, 4],
			curve: 'smooth',
		},
		plotOptions: {
			bar: {
				borderRadius: 5,
				columnWidth: '50px',
			},
		},
		xaxis: {
			categories: [
				'proporción muro-ventana',
				'Valor U de muro',
				'Valor U de ventana',
				'Valor G de ventana',
				'Aire Acondicionado COP',
				'Reflectancia Muros',
				'Valor U de techo',
				'sombras ventanas exteriores',
			],
		},
		yaxis: [
			{
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
				},
				labels: {},
				title: {
					text: 'Promedios',
					style: {},
				},
				tooltip: {
					enabled: true,
				},
			},
			{
				seriesName: 'Promedio',
				opposite: true,
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
				},
				labels: {
					style: {},
				},
				title: {
					text: 'Promedios',
					style: {},
				},
			},
		],
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: true,
				position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
				offsetY: 30,
				offsetX: 60,
			},
		},
		legend: {
			horizontalAlign: 'left',
			offsetX: 40,
		},
	};

	const [year, setYear] = useState(Number(dayjs().format('YYYY')));
	function randomize(value: number, x = year) {
		if (x === 2019) {
			// @ts-ignore
			if (value.toFixed(0) % 2) {
				return (value * 1.5).toFixed(2);
			}
			return (value / 1.4).toFixed(2);
		}
		if (x === 2020) {
			// @ts-ignore
			if (value.toFixed(0) % 2) {
				return (value / 1.5).toFixed(2);
			}
			return (value * 1.4).toFixed(2);
		}
		if (x === 2021) {
			// @ts-ignore
			if (value.toFixed(0) % 2) {
				return (value / 2).toFixed(2);
			}
			return (value * 1.4).toFixed(2);
		}
		return value.toFixed(2);
	}
	const series: ApexOptions['series'][] = [
		{
			// @ts-ignore
			name: 'Privado',
			type: 'column',
			data: [
				randomize(3),
				randomize(3.2),
				randomize(1.4),
				randomize(1.9),
				randomize(2.9),
				randomize(1.8),
				randomize(4.6),
				randomize(4.2),
			],
		},
		{
			// @ts-ignore
			name: 'Público',
			type: 'column',
			data: [
				randomize(3),
				randomize(2),
				randomize(3.1),
				randomize(5),
				randomize(3.1),
				randomize(3.9),
				randomize(3.5),
				randomize(5.5),
			],
		},
		{
			// @ts-ignore
			name: 'Total',
			type: 'line',
			data: [
				randomize(30),
				randomize(43),
				randomize(51),
				randomize(19),
				randomize(32),
				randomize(25),
				randomize(39),
				randomize(42),
			],
		},
	];

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

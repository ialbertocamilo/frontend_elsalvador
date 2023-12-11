import Chart from '../extras/Chart';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../bootstrap/Card';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { getDepartmentsFromList, orderByClassification } from '../../helpers/helpers';

export const BuildingsChart = ({ title }: { title: string }) => {
	const salesByStoreOptions: ApexOptions = {
		chart: {
			type: 'bar',
			height: 500,
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '80%',
			},
		},
		colors: ['#008FFB', '#00E396', '#AB4278'],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 10,
			colors: ['transparent'],
		},
		xaxis: {
			categories: getDepartmentsFromList(),
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

	const [series, setSeries] = useState<any>([]);

	useEffect(() => {
		DashboardService.getBuildingsBySystemReport(year).then((data) => {
			setSeries(orderByClassification(data));
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

import Chart from '../extras/Chart';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../bootstrap/Card';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { getDepartmentsFromList, orderByClassification } from '../../helpers/helpers';
import Select from '../bootstrap/forms/Select';

export const BuildingsChart = ({ title }: { title: string }) => {
	const [maxValue, setMaxValue] = useState(10);

	const salesByStoreOptions: ApexOptions = {
		chart: {
			type: 'line',
			height: 500,
			stacked: false, // Habilitar apilamiento si es necesario
			toolbar: {
				show: true, // Mostrar barra de herramientas
			},
			zoom: {
				enabled: true, // Habilitar zoom
				type: 'x', // Tipo de zoom ('x', 'y', 'xy')
				autoScaleYaxis: true, // Escalar automáticamente el eje Y al hacer zoom en el eje X
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '80%',
				borderRadius: 5,
				dataLabels: {
					position: 'top', // Posición de los valores en las barras
				},
			},
		},
		colors: ['#008FFB', '#00E396', '#AB4278'],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: [0, 1],
			curve: 'smooth',
		},
		xaxis: {
			categories: getDepartmentsFromList(),
		},
		yaxis: {
			title: {
				text: 'Proyectos registrados',
			},
			max: maxValue,
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
		legend: {
			show: true, // Mostrar leyenda
			position: 'top', // Posición de la leyenda (puede ser 'top', 'bottom', 'right', 'left', etc.)
			horizontalAlign: 'left', // Alineación horizontal
		},
		grid: {
			row: {
				colors: ['#f3f3f3', 'transparent'], // Colores de las filas de la cuadrícula
				opacity: 0.5, // Opacidad de las filas de la cuadrícula
			},
		},
	};

	const [year, setYear] = useState(Number(dayjs().format('YYYY')));

	const [series, setSeries] = useState<any>([]);

	interface CustomFormat {
		value?: string | number | undefined;
		text?: string | number | undefined;
		label?: string | number | undefined;
	}

	function getLastFiveYearsFormatted(): CustomFormat[] {
		const currentYear = dayjs().year();
		const lastTenYears = Array.from({ length: 5 }, (_, index) => currentYear - index);

		return lastTenYears.map((year) => ({
			value: year,
			text: year.toString(),
			label: `Año ${year}`,
		}));
	}
	const [selectYear, setSelectYear] = useState(year);
	useEffect(() => {
		DashboardService.getBuildingsBySystemReport(selectYear).then((data) => {
			const highestValue = data?.reduce((max, obj) => {
				return obj?.total_projects > max ? obj?.total_projects : max;
			}, 0);
			setMaxValue(highestValue + 5);
			setSeries(orderByClassification(data));
		});
	}, [selectYear]);
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='Dashboard' iconColor='secondary'>
					<CardTitle tag='div' className='h5'>
						{title}
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<Select
					ariaLabel={'select year'}
					value={selectYear.toString()}
					list={getLastFiveYearsFormatted()}
					onChange={(e: any) => setSelectYear(e.target.value)}
				/>
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

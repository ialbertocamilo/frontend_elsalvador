import Chart from '../extras/Chart';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../bootstrap/Card';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { getDepartmentsFromList, orderByClassification } from '../../helpers/helpers';
import Select from '../bootstrap/forms/Select';

export const BuildingsParameterChart = ({ title }: { title: string }) => {
	const salesByStoreOptions: ApexOptions = {
		chart: {
			type: 'line',
			height: 555,
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
				columnWidth: '25%',
				borderRadius: 5,
			},
		},
		colors: ['#008FFB', '#00E396', '#AB4278'],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: [1, 1, 4],
			curve: 'smooth',
		},
		xaxis: {
			categories: [
				'Promedio de proporción muro ventana',
				'Promedio de valor U de muro',
				'Promedio de valor U de ventana',
				'Promedio de valor G de ventana',
				'Promedio de aire acondicionado COP',
				'Promedio de reflectancia de muros',
				'Promedio de valor u de techo',
				'Promedio de reflectancia de techos',
				'Promedio de sombras de ventanas exteriores',
			],
		},
		yaxis: {
			title: {
				text: 'Promedios de valores de proyectos aceptados',
			},
		},
		fill: {
			opacity: 1,
		},
		tooltip: {},
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
		DashboardService.getBuildingsByParametersReport(selectYear).then((data) => {
			setSeries(data);
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

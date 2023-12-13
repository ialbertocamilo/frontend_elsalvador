import Chart from '../extras/Chart';
import { ApexOptions } from 'apexcharts';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Card, { CardBody, CardHeader, CardLabel, CardSubTitle, CardTitle } from '../bootstrap/Card';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import Select from '../bootstrap/forms/Select';
import XLSX from 'xlsx';
import Button from '../bootstrap/Button';
import { exportExcel, getLastFiveYearsFormatted } from '../../helpers/helpers';

export const BuildingsParameterChart = ({ title }: { title: string }) => {
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
				columnWidth: '50%',
				borderRadius: 8,
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
			categories: [
				'PROP',
				'VALU M',
				'VALU V',
				'VALG V',
				'COP',
				'REF M',
				'VALU T',
				'REF T',
				'SOM',
			],
			title: {
				text: 'Promedios de valores de proyectos aprobados',
			},
		},

		yaxis: {
			title: {
				text: 'Promedios de valores de proyectos aprobados',
			},
			max: maxValue,
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
	const [series, setSeries] = useState<any>([]);

	const [year, setYear] = useState(Number(dayjs().format('YYYY')));

	const [selectYear, setSelectYear] = useState(year);

	useEffect(() => {
		DashboardService.getBuildingsByParametersReport(selectYear).then((data) => {
			setSeries(data);

			const allData = data?.flatMap((entry) => entry.data.map(Number));
			const maxValue = Math.max(...allData);
			setMaxValue(maxValue + 50);
		});
	}, [selectYear]);
	const doReport = useCallback(async () => {
		const report = await DashboardService.getBuildingsByParametersReportExcel(selectYear);
		let date = dayjs().unix();
		exportExcel(
			report,
			`Reporte de parámetros de edificación ${date} .xlsx`,
			'REPORTE DE PARÁMETROS DE EDIFICACIÓN',
		);
	}, [selectYear]);
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='Dashboard' iconColor='secondary'>
					<CardTitle tag='div' className='h5'>
						{title}
					</CardTitle>
					<CardSubTitle>Aprobados</CardSubTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<Select
					ariaLabel={'select year'}
					value={selectYear.toString()}
					list={getLastFiveYearsFormatted()}
					onChange={(e: any) => setSelectYear(e.target.value)}
				/>
				<br />
				<Chart
					options={salesByStoreOptions}
					type={salesByStoreOptions.chart?.type}
					height={salesByStoreOptions.chart?.height}
					// @ts-ignore
					series={series}
				/>
				<Button className={''} onClick={doReport} color='primary'>
					Descargar reporte
				</Button>
			</CardBody>
		</Card>
	);
};

import Chart from '../extras/Chart';
import { ApexOptions } from 'apexcharts';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../bootstrap/Card';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import {
	exportExcel,
	getDepartmentCodeFromList,
	getLastFiveYearsFormatted,
	orderByClassification,
	selectDepartmentByCodeFromJson,
	selectDepartmentFromJson,
} from '../../helpers/helpers';
import Select from '../bootstrap/forms/Select';
import Button from '../bootstrap/Button';
import 'xlsx-js-style';
import XLSX from 'sheetjs-style';
import showNotification from '../extras/showNotification';
import Icon from '../icon/Icon';

export const BuildingsChart = ({ title }: { title: string }) => {
	const [maxValue, setMaxValue] = useState(0);

	const [options, setOptions] = useState<ApexOptions>({
		chart: {
			type: 'bar',
			height: 500,
			stacked: false,
			toolbar: {
				show: true,
				tools: { zoomout: true },
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
			categories: getDepartmentCodeFromList(),
			title: {
				text: 'Departamentos',
			},
			labels: {
				show: true,
			},
			type: 'category',
		},
		yaxis: {
			title: {
				text: 'Promedios de valores de proyectos aprobados',
			},
			show: true,
			labels: { show: true },
			min: 0,
			max: 10,
		},
		fill: {
			opacity: 1,
		},
		tooltip: {
			style: { fontSize: '11px' },
			y: {
				formatter: function (val) {
					return val + ' proyectos';
				},
			},
			x: {
				formatter: function (val) {
					const value = String(val);
					return selectDepartmentByCodeFromJson(value);
				},
			},
		},
		legend: {
			show: true, // Mostrar leyenda
			position: 'top', // Posición de la leyenda (puede ser 'top', 'bottom', 'right', 'left', etc.)
			horizontalAlign: 'left', // Alineación horizontal
			showForNullSeries: true,
		},
		grid: {
			row: {
				colors: ['#f3f3f3'], // Colores de las filas de la cuadrícula
				opacity: 0.5, // Opacidad de las filas de la cuadrícula
			},
		},
	});

	const [year, setYear] = useState(Number(dayjs().format('YYYY')));

	const [series, setSeries] = useState<any>([]);

	const [selectYear, setSelectYear] = useState(year);
	useEffect(() => {
		DashboardService.getBuildingsBySystemReport(selectYear).then((data) => {
			const highestValue = data?.reduce((max, obj) => {
				return obj?.total_projects > max ? obj?.total_projects : max;
			}, 0);
			options.yaxis = { ...options.yaxis, max: Number(highestValue + 2) };
			setOptions(options);
			setSeries(orderByClassification(data));
		});
	}, [selectYear]);

	const doReport = useCallback(async () => {
		let report = await DashboardService.getBuildingsBySystemReportExcel(selectYear);

		let date = dayjs().unix();
		if (
			!exportExcel(
				report,
				`Reporte de edificaciones registradas en el sistema ${date} .xlsx`,
				'REPORTE DE EDIFICACIONES REGISTRADAS EN EL SISTEMA',
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
				<br />
				<Chart
					options={options}
					type={options.chart?.type}
					height={options.chart?.height}
					series={series}
				/>
				<Button className={''} color='primary' onClick={doReport}>
					Descargar reporte
				</Button>
			</CardBody>
		</Card>
	);
};

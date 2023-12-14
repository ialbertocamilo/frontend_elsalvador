import { DepartmentsWithProvincies, keyList, RoleNames } from '../common/constants/lists';
import { IUserStorage } from '../common/types/user.types';
import { RoleType } from '../common/types/role.types';
import { operatorMenu, pagesMenu } from '../common/constants/menu';
import { ObjClassification } from '../common/types/dashboard.types';
import 'xlsx-js-style';
import XLSX from 'sheetjs-style';
import dayjs from 'dayjs';
import showNotification from '../components/extras/showNotification';
import Icon from '../components/icon/Icon';

export function test() {
	return null;
}

export function getOS() {
	// @ts-ignore
	const { userAgent } = typeof window !== 'undefined' && window.navigator;
	// @ts-ignore
	const { platform } = typeof window !== 'undefined' && window.navigator;
	const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
	const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
	const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
	let os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'MacOS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
	} else if (!os && /Linux/.test(platform)) {
		os = 'Linux';
	}

	// @ts-ignore
	typeof document !== 'undefined' && document.documentElement.setAttribute('os', os);
	return os;
}

export const hasNotch = () => {
	/**
	 * For storybook test
	 */
	const storybook =
		typeof window !== 'undefined' ? window.location !== window.parent.location : '';
	// @ts-ignore
	const iPhone =
		typeof window !== 'undefined'
			? // @ts-ignore
			  /iPhone/.test(navigator.userAgent) && !window?.MSStream
			: '';
	const aspect = typeof window !== 'undefined' ? window.screen.width / window.screen.height : 0;
	const aspectFrame = typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 0;
	return (
		(iPhone && aspect.toFixed(3) === '0.462') ||
		(storybook && aspectFrame.toFixed(3) === '0.462')
	);
};

export const mergeRefs = (refs: any[]) => {
	return (value: any) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref != null) {
				ref.current = value;
			}
		});
	};
};

export const randomColor = () => {
	const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

	const color = Math.floor(Math.random() * colors.length);

	return colors[color];
};

export const priceFormat = (price: number) => {
	return price?.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});
};

export const average = (array: any[]) => array.reduce((a, b) => a + b) / array.length;

export const percent = (value1: number, value2: number) =>
	Number(((value1 / value2 - 1) * 100).toFixed(2));

export const getFirstLetter = (text: string, letterCount = 2): string =>
	// @ts-ignore
	text
		.toUpperCase()
		.match(/\b(\w)/g)
		.join('')
		.substring(0, letterCount);

export const debounce = (func: (arg0: any) => void, wait = 1000) => {
	let timeout: string | number | NodeJS.Timeout | undefined;

	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout);
			// @ts-ignore
			func(...args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

export const pathRetouch = (path?: string): string => {
	if (path === '/') return '/';
	return '/' + path;
};

export const pathToRoute = (path: string): string => {
	if (path === '/') return '/';
	if (path?.length > 1 && path?.substring(1, 0) === '/') return path?.substring(1, path?.length);
	return path;
};

export function toDecimal(value: unknown, decimal = 3) {
	if (typeof value === 'number') value = value.toString();
	if (typeof value === 'string') {
		const numberValue = Number(value);
		const formattedValue = numberValue.toFixed(decimal);
		return parseFloat(formattedValue).toString();
	}
}

export function toDecimalNumber(value: unknown, decimal = 3) {
	return Number(toDecimal(value, decimal));
}

export function arrayToList(arr: string[]) {
	return arr?.map((name, index) => {
		return { value: index, text: name };
	});
}

export function menuByRole(user: IUserStorage): any {
	if (user.role == RoleType.agent) return operatorMenu;

	return pagesMenu;
}

export function selectRoleName(roleType: number) {
	if (roleType == RoleType.agent) return RoleNames.Operator;
	if (roleType == RoleType.supervisor) return RoleNames.Admin;
	if (roleType == RoleType.admin) return RoleNames.SuperAdmin;
}

export const extractDataFromArrayProject = (key: string, array: []): any => {
	const obj: any = array?.find((val: any) => val?.key == key);
	if (obj)
		switch (key) {
			case keyList.proportion:
				return obj.payload as { rows: []; result: { totalPercentage: string } };
			case keyList.transmittance:
				return obj.payload.data as {
					rows: [];
					result: { u_value: string; surface2: number };
				};
			case keyList.roofs:
				return obj.payload.data as {
					rows: [];
					result: { u_value: string; surface2: number };
				};
			case keyList.window:
				return obj.payload as { windowUValue: string; GValue: number };

			case keyList.shading:
				return obj.payload as {
					data: [];
					result: string;
				};
		}
	return null;
};

export function fillMunicipalitiesByDepartment(departmentIndex: number) {
	const find = DepartmentsWithProvincies.find((value) => value?.id == departmentIndex);
	return find?.municipality;
}

export function selectMunicipalityFromJson(municipalityIndex: number, departmentId: number) {
	const find = DepartmentsWithProvincies.find((value) => value?.id == departmentId);

	return find
		? find.municipality[municipalityIndex]
		: DepartmentsWithProvincies[0].municipality[0];
}

export function selectDepartmenFromJson(departmentId: number) {
	const find = DepartmentsWithProvincies.find((value) => value?.id == departmentId);

	return find ? find.department : DepartmentsWithProvincies[0].department;
}

export function getDataFromClassification(obj: ObjClassification) {
	return DepartmentsWithProvincies.map((value) => {
		if (value.id == Number(obj.department)) return obj.total_projects;
		return 0;
	});
}

interface DataObject {
	name: string;
	type: string;
	data: number[];
}

function sumDataObjects(dataObjects: DataObject[]): DataObject[] {
	const groupedByName: { [key: string]: DataObject } = {};

	dataObjects.forEach((obj) => {
		if (!groupedByName[obj.name]) {
			groupedByName[obj.name] = { ...obj };
		} else {
			groupedByName[obj.name].data = groupedByName[obj.name].data.map(
				(value, index) => value + obj.data[index],
			);
		}
	});

	return Object.values(groupedByName);
}

export function orderByClassification(data: ObjClassification[]) {
	const classif = data.map((value) => {
		let name = '';
		switch (Number(value.building_classification)) {
			case 0:
				name = 'Viviendas';
				break;
			case 1:
				name = 'Oficinas';
				break;
			case 2:
				name = 'Terciarios';
				break;
		}
		return { name, type: 'column', data: getDataFromClassification(value) };
	});
	return sumDataObjects(classif);
}

export function getDepartmentCodeFromList() {
	return DepartmentsWithProvincies.map((value) => value.code);
}

interface CustomFormat {
	value?: string | number | undefined;
	text?: string | number | undefined;
	label?: string | number | undefined;
}

export function getLastFiveYearsFormatted(): CustomFormat[] {
	const currentYear = dayjs().year();
	const lastTenYears = Array.from({ length: 5 }, (_, index) => currentYear - index);

	return lastTenYears.map((year) => ({
		value: year,
		text: year.toString(),
		label: `Año ${year}`,
	}));
}

export function exportExcel(report: any[], fileName: string, title: string) {
	const wb = XLSX.utils.book_new();
	const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
	if (report?.length == 0) return false;

	const headers = Object.keys(report[0]);
	let Heading = [[]];
	ws['A1'] = { v: title, t: 's' };
	ws['A1'].s = {
		font: {
			bold: true,
			sz: 13,
			color: { rgb: '00F5FAFB' },
		},
		alignment: {
			wrapText: false,
			readingOrder: 2,
			vertical: 'center',
			horizontal: 'center',
		},
		fill: { patternType: 'solid', fgColor: { rgb: '0000A0D5' } },
	};
	ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length } }];
	XLSX.utils.sheet_add_aoa(ws, Heading);
	XLSX.utils.sheet_add_json(ws, report, { origin: 'A2' });
	XLSX.utils.book_append_sheet(wb, ws, 'Reporte');

	const widthCols: XLSX.ColInfo[] | { wch: number }[] | undefined = [];
	headers.forEach((value) => widthCols.push({ wch: 25 }));
	headers.forEach((key, colIndex) => {
		ws[XLSX.utils.encode_col(colIndex) + '2'].s = {
			font: {
				bold: true,
				sz: 11,
				color: { rgb: '00F5FAFB' },
			},
			alignment: {
				wrapText: true,
				readingOrder: 4,
				vertical: 'center',
			},
			border: {
				top: { style: 'thin' },
				bottom: { style: 'thin' },
				left: { style: 'thin' },
				right: { style: 'thin' },
			},
			fill: { patternType: 'solid', fgColor: { rgb: '0098989A' } },
		};
	});
	XLSX.writeFile(wb, fileName);
	return true;
}

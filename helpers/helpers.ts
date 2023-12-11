import { DepartmentsWithProvincies, keyList, RoleNames } from '../common/constants/lists';
import { IUserStorage } from '../common/types/user.types';
import { RoleType } from '../common/types/role.types';
import { operatorMenu, pagesMenu } from '../common/constants/menu';

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

export function getDataFromDepartment(obj: ObjClassification) {
	return DepartmentsWithProvincies.map((value) => {
		if (value.id == Number(obj.department)) return obj.total_projects;
		return 0;
	});
}
export function orderByClassification(data: ObjClassification[]) {
	return data.map((value) => {
		let name = '';
		let total_projects = 0;
		switch (Number(value.building_classification)) {
			case 0:
				name = 'Viviendas';
				total_projects += value.total_projects;
				break;
			case 1:
				name = 'Oficinas';
				total_projects += value.total_projects;
				break;
			case 2:
				name = 'Terciarios';
				total_projects += value.total_projects;
				break;
		}
		return { name, type: 'column', data: getDataFromDepartment(value) };
	});
}
export function getDepartmentsFromList() {
	return DepartmentsWithProvincies.map((value) => value.department);
}

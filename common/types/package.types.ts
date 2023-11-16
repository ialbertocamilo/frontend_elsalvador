import { IQuestion } from './question.types';

export interface IPackage {
	wall_window_proportion: number;
	wall_u_value: number;
	wall_reflectance: number;
	roof_u_value: number;
	roof_reflectance: number;
	window_u_value: number;
	window_g_value: number;
	shades: number;
	cop: number;
}

export interface ITechnicalSupport {
	packageName: string;
	metaValue: IPackage;
	reportedValue: IPackage;
	valueOrigin: IPackageOriginQuestions;
	questions?: IQuestion[];
	meets: unknown;
}

export interface IPackageOriginQuestions {
	wall_window_proportion: string;
	wall_u_value: string;
	wall_reflectance: string;
	roof_u_value: string;
	roof_reflectance: string;
	window_u_value: string;
	window_g_value: string;
	shades: string;
	cop: string;
}

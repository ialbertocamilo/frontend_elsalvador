function calculeRTS1(lambda2: number, thickness: number, lambda1: number) {
	if (lambda2 == 0) return thickness / lambda1;
	return false;
}

function calculeRTS2(
	lambdaValue2: number,
	thickness: number,
	totalSurface2: number,
	lambda1: number,
	totalSurface1: number,
) {
	if (lambdaValue2 > 0.001) {
		return (thickness / (lambdaValue2 * totalSurface2 + lambda1 * totalSurface1)) * 100;
	}
	return false;
}

function calculeTotalRTS1(arrayRTS1: number[]) {
	return arrayRTS1.reduce((previousValue, currentValue) => previousValue + currentValue);
}

function calculeTotalRTS2(arrayRTS2: number[]) {
	return arrayRTS2.reduce((previousValue, currentValue) => previousValue + currentValue);
}

function calculeS1(lambda1: number, thickness: number) {
	if (lambda1 > 0) return thickness / lambda1;
	return 0;
}

function calculeSX(lambda1: number, thickness: number, lambda2: number, S1: number) {
	if (lambda1 > 0) return thickness / lambda2;
	return S1;
}

function calculeS2(S1: number, SX: number) {
	if (!S1 || !isNaN(S1)) return SX;
	return S1;
}

function calculeTotalS1(arrayS1: number[], rsi: number, rse: number) {
	const totalS1 = arrayS1.reduce((previousValue, currentValue) => previousValue + currentValue);
	return 1 / (totalS1 + rsi + rse);
}

function calculeTotalS2(arrayS2: number[], rsi: number, rse: number) {
	const totalS2 = arrayS2.reduce((previousValue, currentValue) => previousValue + currentValue);
	return 1 / (totalS2 + rsi + rse);
}

function calculeRTSX(rts1: unknown) {
	if (isNaN(rts1 as number) || !rts1) return 0;
	return rts1;
}

function calculeTotalRTSX(totalRTSX: any[]) {
	return totalRTSX.reduce((previousValue, currentValue) => previousValue + currentValue);
}

function calculeRT(totalrtsx: number, totalrts2: number) {
	return Number((totalrts2 + totalrtsx + rsi + rse).toFixed(2));
}

function calculeRTtotalS1(lambda1: number, RTtotalS2: number, calculeRT: number) {
	if (!isNaN(lambda1)) return (RTtotalS2 + calculeRT) / 2;
	return 0;
}

function calculeRTtotalS2(
	lambda1: number,
	totalS1: number,
	totalS2: number,
	totalSurface1: number,
	totalSurface2: number,
): number {
	if (!isNaN(lambda1)) {
		return Number(((1 / (totalS1 * totalSurface1 + totalS2 * totalSurface2)) * 100).toFixed(4));
	}
	return 0;
}

function percentageRTtotalS1(
	lambda1: number,
	calculeRT: number,
	calculeRTtotalS1: number,
	calculeRTtotalS2: number,
) {
	if (!isNaN(lambda1)) {
		return Number(((calculeRTtotalS2 - calculeRT) / (2 * calculeRTtotalS1)).toFixed(5));
	}
	return 0;
}

function calculeUValue(
	lambda1: number,
	percentageRTtotalS1: number,
	RTtotalS1: number,
	calculeRT: number,
) {
	if (!isNaN(lambda1)) {
		if (percentageRTtotalS1 < 0.1) return 1 / RTtotalS1;
		else return 1 / (calculeRT * 1.1);
	}
	console.log('error calcule u value');
	return 0;
}

const rsi = 0.13;
const rse = 0.04;

export class Calculator {
	static calculateThickness(rows: any[], columnName: string | number) {
		let totalSum = 0;
		for (const newRowsKey in rows) {
			totalSum += Number(rows[newRowsKey][columnName]);
		}
		return totalSum;
	}

	static transmittanceUValue(rows: any[], totalSurface1: number, totalSurface2: number) {
		const lambda1 = rows[0].column2;
		const rtS1 = rows.map((value, index, array) => {
			const lambda1 = value.column2;
			const lambda2 = value.column4;
			const thickness = value.column5;
			return calculeRTS1(lambda2, thickness, lambda1);
		});
		const rtS2 = rows.map((value, index, array) => {
			const lambda1 = value.column2;
			const lambda2 = value.column4;
			const thickness = value.column5;
			return calculeRTS2(lambda2, thickness, totalSurface2, lambda1, totalSurface1);
		});
		const s1 = rows.map((value, index, array) => {
			const lambda1 = value.column2;
			const thickness = value.column5;
			return calculeS1(lambda1, thickness);
		});
		const s2 = rows.map((value, index, array) => {
			const lambda1 = value.column2;
			const lambda2 = value.column4;
			const thickness = value.column5;
			return calculeS2(
				lambda1,
				calculeSX(lambda1, thickness, lambda2, calculeS1(lambda1, thickness)),
			);
		});
		const rtSX = rows.map((value, index, array) => {
			const lambda1 = value.column2;
			const lambda2 = value.column4;
			const thickness = value.column5;
			return calculeRTSX(calculeRTS1(lambda2, thickness, lambda1));
		});
		const totalRTSX = calculeTotalRTSX(rtSX);
		calculeTotalRTS1(rtS1 as number[]);
		const totalRTS2 = calculeTotalRTS2(rtS2 as number[]);
		const totalS1 = calculeTotalS1(s1, rsi, rse);
		const totalS2 = calculeTotalS2(s2, rsi, rse);
		const rt = calculeRT(totalRTSX, totalRTS2);
		const RTtotalS2 = calculeRTtotalS2(lambda1, totalS1, totalS2, totalSurface1, totalSurface2);
		const RTtotalS1 = calculeRTtotalS1(lambda1, RTtotalS2, rt);
		const percentage = percentageRTtotalS1(lambda1, rt, RTtotalS1, RTtotalS2);
		const uValue = calculeUValue(lambda1, percentage, RTtotalS1, rt);
		return uValue.toFixed(2);
	}

	static calculateGValue(csValue: number) {
		return csValue * 0.87;
	}

	static calculateCrystalArea(areaVain: number, frameArea: number) {
		return (areaVain - frameArea).toFixed(2);
	}

	static calculateFrameArea(longVain: number, highVain: number, frameWidth: number) {
		return (frameWidth * longVain * 2 + (highVain - frameWidth * 2) * frameWidth).toFixed(2);
	}

	static calculateWindowUValue(
		uValue1: number,
		uValue2: number,
		frameArea: number,
		crystalArea: number,
		longVain: number,
		highVain: number,
	) {
		const result =
			(uValue1 * crystalArea + uValue2 * frameArea + 0.08 * (longVain * 2 + highVain * 2)) /
			(crystalArea + frameArea);
		return result.toFixed(2);
	}

	static calculateVainArea(longVain: number, highVain: number) {
		return longVain * highVain;
	}
}

import { withAPIKey } from '@aws/amazon-location-utilities-auth-helper';
import {
	LocationClient,
	SearchPlaceIndexForPositionCommand,
	SearchPlaceIndexForTextCommand,
} from '@aws-sdk/client-location';
import { useState } from 'react';
import axiosService from '../../lib/axios';

export const useGeocodingService = () => {
	const apiKey = process.env.MAP_API_KEY as string;
	const region = process.env.AWS_BASE_REGION as string;

	let client: LocationClient;
	const [geoResults, setGeoResults] = useState({});
	const [infoResults, setInfoResults] = useState({});

	async function findLocation(text: string) {
		const authHelper = await withAPIKey(apiKey);
		client = new LocationClient({
			region, // region containing Cognito pool
			...authHelper.getLocationClientConfig(), // Provides configuration required to make requests to Amazon Location
		});

		const input = {
			IndexName: 'ExamplePlaceIndex',
			Text: text,
			MaxResults: 5,
		};

		const command = new SearchPlaceIndexForTextCommand(input);
		const res = await client.send(command);
		if (res.Results?.length) {
			setGeoResults(res?.Results);
			return res?.Results;
		}
		return null;
	}

	async function findLocationByPosition(position: number[]) {
		const authHelper = await withAPIKey(apiKey);
		client = new LocationClient({
			region, // region containing Cognito pool
			...authHelper.getLocationClientConfig(), // Provides configuration required to make requests to Amazon Location
		});

		const payload = {
			Position: position,
			MaxResults: 5,
			Language: 'es',
			IndexName: 'SearchByPosition',
		};

		const command = new SearchPlaceIndexForPositionCommand(payload);
		const res = await client.send(command);
		if (res.Results?.length) {
			setInfoResults(res?.Results);
			return res?.Results;
		}
		return null;
	}

	async function getGeoJson() {
		const response = await axiosService().get(`/map/geojson`);
		if (response.status === 200) return response.data;
		return null;
	}

	return {
		findLocation,
		findLocationByPosition,
		getGeoJson,
	};
};

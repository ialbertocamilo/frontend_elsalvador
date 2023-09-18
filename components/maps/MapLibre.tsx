'use client';
import React, { useEffect, useState } from 'react';
import maplibregl, { Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/src/css/maplibre-gl.css';
import { LngLatLike } from 'mapbox-gl';
import { SearchForTextResult } from '@aws-sdk/client-location';
import Button from '../bootstrap/Button';
import { useGeocodingService } from '../../services/geocoding/geocoding.service';
import { useParams } from 'next/navigation';
import { useProjects } from '../../services/project/project.service';

const keyName = 'geoinformation';

interface MapLibreProps {
	location?: SearchForTextResult;
	locationInfo?: Function;
}

export const MapLibre = ({ location, locationInfo }: MapLibreProps) => {
	const apiKey = process.env.MAP_API_KEY as string;
	const mapName = 'ElSalvadorProject';
	const mapStyle = `https://maps.geo.us-west-2.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`;

	const geo = useGeocodingService();
	const [selectPoint, setSelectPoint] = useState(false);
	const [myPosition, setMyPosition] = useState<LngLatLike>();
	const [map, setMap] = useState<Map>();
	const [viewport, setViewport] = useState({
		width: '100%',
		height: '400px',
		latitude: 37.7577, // Latitud inicial
		longitude: -122.4376, // Longitud inicial
		zoom: 13, // Nivel de zoom inicial
	});

	const project = useProjects();

	const [point, setPoint] = useState<any>();
	useEffect(() => {
		project
			.getProjectData({ key: 'geoinformation', project_id: params?.projectId as string })
			.then((data: any) => {
				const result: SearchForTextResult = data?.payload;
				if (result && locationInfo && map) {
					locationInfo(data.payload as string);
					if (result?.Place?.Geometry?.Point) {
						addMarker(
							{
								lng: result?.Place?.Geometry?.Point[0],
								lat: result?.Place?.Geometry?.Point[1],
							},
							map,
						);

						setMyPosition({
							lng: result?.Place?.Geometry?.Point[0],
							lat: result?.Place?.Geometry?.Point[1],
						});
					}
				}
			});
	}, [map]);
	useEffect(() => {
		if (myPosition) {
			map?.flyTo({
				center: myPosition,
				animate: true,
				zoom: 15,
				essential: true,
				duration: 400,
			});
		}
	}, [myPosition]);

	useEffect(() => {
		if (location?.Place?.Geometry?.Point)
			setMyPosition({
				lng: location.Place?.Geometry?.Point[0],
				lat: location.Place?.Geometry?.Point[1],
			});
	}, [location]);

	useEffect(() => {
		const _map = new maplibregl.Map({
			container: 'map',
			style: mapStyle,
			center: [viewport.longitude, viewport.latitude],
			zoom: viewport.zoom,
		});
		setMap(_map);
		// Configura el mapa de MapLibre
		_map?.on('load', () => {
			// goMyLocation();
		});
		_map?.addControl(new maplibregl.NavigationControl(), 'top-left');
		_map.addControl(
			new maplibregl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true,
				},
				trackUserLocation: true,
			}),
		);
	}, []);

	useEffect(() => {
		map?.on('click', (ev) => {
			console.log(ev);
			setPoint(ev);
		});
	}, [map]);

	const [lastMarker, setLastMarker] = useState<Marker | null>(null);

	function addMarker(coord: LngLatLike, map: Map) {
		if (lastMarker) lastMarker.remove();
		if (map && coord) {
			setLastMarker(new maplibregl.Marker()?.setLngLat(coord).addTo(map));
		}
	}

	function saveLocation(position: any[]) {
		geo.findLocationByPosition(position).then((data) => {
			if (data) {
				project.saveProjectData({
					key: keyName,
					project_id: params?.projectId as string,
					payload: data[0],
				});
				if (locationInfo) locationInfo(data[0]);
			}
		});
	}

	const activatePointer = () => {
		if (map) {
			addMarker({ lng: point.lngLat.lng, lat: point.lngLat.lat }, map);
			saveLocation([point.lngLat.lng, point.lngLat.lat]);
		}
	};

	const params = useParams();
	return (
		<div>
			<div id='map' className={'mb-4'}></div>

			{params?.projectId && (
				<Button color={'info'} icon={'GpsFixed'} onClick={activatePointer}>
					Asignar y guardar marcador
				</Button>
			)}
		</div>
	);
};
export default MapLibre;

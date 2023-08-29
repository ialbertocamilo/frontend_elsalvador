import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { LatLng } from "leaflet";

export const LocationMarker = () => {
	const [position, setPosition] = useState<LatLng>(new LatLng(51.505, -0.09));
	const map = useMapEvents({
		click() {
			map.locate();
		},
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
	});

	return position === null ? null : (
		<Marker position={position}>
			<Popup>You are here</Popup>
		</Marker>
	);
};
export default LocationMarker;

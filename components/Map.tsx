import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { control } from "leaflet";
import 'leaflet/dist/leaflet.css';
import LocationMarker from './maps/LocationMarker';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useRef } from 'react';

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

const Map = ({}) => {
	const position = [51.505, -0.09];

	const myMap = useRef<any>();
	L.esri.Geocoding.geosearch().addTo(myMap.current);
	const map=useMap()
	return (
		<MapContainer
			ref={myMap}
			center={[51.505, -0.09]}
			zoom={13}
			scrollWheelZoom={true}
			style={{ height: 400, width: '100%' }}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<LocationMarker />
			<Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
};
export default Map;

import { useEffect, useState } from 'react';
import { useGeocodingService } from '../services/geocoding/geocoding.service';

const useGeoposition = () => {
	const [geojson, setGeojson] = useState({});

	const service = useGeocodingService();

	function loadGeoJson() {
		service.getGeoJson().then((data) => {
			setGeojson(data);
		});
	}

	useEffect(() => {
		loadGeoJson();
	}, []);

	return { geojson, setGeojson };
};

export default useGeoposition;

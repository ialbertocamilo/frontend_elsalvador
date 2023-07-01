import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const Map = ({}) => {
	const {isLoaded}=useJsApiLoader({
		googleMapsApiKey:"12313123"
	})
	if (!isLoaded) return (<></>)
	return (<GoogleMap style={{ width: '370px', height: '500px' }} zoom={10}></GoogleMap>)
};
export default Map;

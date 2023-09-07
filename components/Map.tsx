
import React from "react";

import {GoogleMap, useLoadScript} from "@react-google-maps/api";


const DefaultMap = ({}) => {
const{isLoaded}=useLoadScript({
    googleMapsApiKey:'AIzaSyBxSptsHi37Fm-4sG_W2T-yylW4iJ75jVw'
})
    if (!isLoaded) return <p>Loading...</p>
    return (
        <GoogleMap zoom={10} center={{lat:-34.397,lng:150.644}} mapContainerClassName="map"/>
    );
};
export default DefaultMap

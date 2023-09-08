'use client'
import React, {useEffect, useState} from 'react';
import maplibregl, {Map, Marker} from 'maplibre-gl';
import "maplibre-gl/src/css/maplibre-gl.css"
import {LngLatLike} from "mapbox-gl";
import {SearchForTextResult} from "@aws-sdk/client-location";
import Button from "../bootstrap/Button";
import {useGeocodingService} from "../../services/geocoding/geocoding.service";

interface MapLibreProps {
    location?: SearchForTextResult
    locationInfo?: Function
}

export const MapLibre = ({location,locationInfo}: MapLibreProps) => {

    const apiKey = process.env.MAP_API_KEY as string
    const region = process.env.AWS_REGION as string
    const mapName = "ElSalvadorProject";

    const geo = useGeocodingService()
    const [selectPoint, setSelectPoint] = useState(false)
    const [myPosition, setMyPosition] = useState<LngLatLike>()
    const [map, setMap] = useState<Map>()
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '400px',
        latitude: 37.7577, // Latitud inicial
        longitude: -122.4376, // Longitud inicial
        zoom: 13, // Nivel de zoom inicial
    });
    const [point, setPoint] = useState({})

    useEffect(() => {
        if (myPosition) {
            map?.flyTo({center: myPosition, animate: true, zoom: 15, essential: true, duration: 400})
        }
    }, [myPosition]);

    useEffect(() => {
        if (location?.Place?.Geometry?.Point)
            setMyPosition({lng: location.Place?.Geometry?.Point[0], lat: location.Place?.Geometry?.Point[1]})
    }, [location]);


    useEffect(() => {
        const _map = new maplibregl.Map({
            container: 'map',
            style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`,
            center: [viewport.longitude, viewport.latitude],
            zoom: viewport.zoom,
        })
        setMap(_map)
        // Configura el mapa de MapLibre
        _map?.on('load', () => {
            goMyLocation()
        });
        _map?.addControl(new maplibregl.NavigationControl(), "top-left");
        _map.addControl(
            new maplibregl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }))
    }, []);

    useEffect(() => {

        map?.on("click", (ev) => {

            setPoint(ev)
        })
    }, [map]);

    function goMyLocation() {
        navigator.geolocation.getCurrentPosition((data) => {
            let pos: LngLatLike = {lat: data.coords.latitude, lng: data.coords.longitude}
            setMyPosition(pos)
        })
    }

    const [lastMarker, setLastMarker] = useState<Marker | null>(null)

    function addMarker(coord: LngLatLike, text: string, map: Map) {

        if (lastMarker) lastMarker.remove()
        if (map && coord) {
            const popup = new maplibregl.Popup({offset: 35}).setHTML(text).addTo(map)
            setLastMarker(new maplibregl.Marker()?.setLngLat(coord).setPopup(popup).addTo(map))
        }
    }

    const activatePointer = () => {
        if (point && map) {
            addMarker({lng: point.lngLat.lng, lat: point.lngLat.lat}, "marker", map)
            geo.findLocationByPosition([point.lngLat.lng, point.lngLat.lat]).then(data=>{
                if (locationInfo)
                locationInfo(data)
            })
        }
    }

    return <div>
        <div id="map" className={"mb-4"}></div>
        <Button color={"info"} icon={"GpsNotFixed"} onClick={activatePointer}>Seleccionar</Button>
    </div>

}
export default MapLibre
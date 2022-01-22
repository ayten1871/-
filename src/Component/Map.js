import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapKey } from '../APIkeys/MapKey';

const Pin = ({ Name }) => <p className="detail-section-down-right-map-pin">{Name}</p>;

const defaultZoom = 15;
let center = {
    lat: null,
    lng: null,
};
const Map = ({ Position, Name }) => {
    center.lat = Position.PositionLat;
    center.lng = Position.PositionLon;

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '40vh', width: '100%' }} className="detail-section-down-right-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: MapKey }}
                defaultCenter={center}
                defaultZoom={defaultZoom}
            >
                <Pin lat={center.lat} lng={center.lng} Name={Name} />
            </GoogleMapReact>
        </div>
    );
};

export default Map;

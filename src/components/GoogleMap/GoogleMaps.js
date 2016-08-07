import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

export default () => {
  return (
    <GoogleMapLoader
      containerElement={
        <div style={{height: '100%'}} />
      }
      googleMapElement={
        <GoogleMap
          defaultZoom={11}
          defaultCenter={{lat: 45.5298537, lng: -73.5944413}}>
          <Marker
            position={{lat: 45.5298537, lng: -73.5944413}} />
        </GoogleMap>
      }
    />
  );
}
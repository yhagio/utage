import React, { PropTypes } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

const { object } = PropTypes;

GoogleMapComponent.propTypes = {
  eventLatLng: object.isRequired
};

export default function GoogleMapComponent (props) {
  if (props.eventLatLng.lat && props.eventLatLng.lng) {
    
    const myLatLng = {
      lat: props.eventLatLng.lat || 45.5298537,
      lng: props.eventLatLng.lng || -73.5944413
    };

    // console.log('Got EventLatLng', myLatLng);
    return (
      <GoogleMapLoader
        containerElement={
          <div style={{height: '100%'}} />
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={11}
            defaultCenter={ myLatLng }>
            <Marker
              position={ myLatLng } />
          </GoogleMap>
        }
      />
    );
  } else {
    return <h3>Loading Map ...</h3>;
  }
}

import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import {
  GoogleMapLoader,
  GoogleMap,
  Marker
} from 'react-google-maps';

GoogleMapComponent.propTypes = {
  eventLatLng: PropTypes.instanceOf(Map).isRequired //object.isRequired
};

export default function GoogleMapComponent (props) {
  if (props.eventLatLng.get('lat') && props.eventLatLng.get('lng')) {
    // Have default lat lng (Montreal, Canada) in case the
    // address is not found at all
    const myLatLng = {
      lat: props.eventLatLng.get('lat') || 45.5298537,
      lng: props.eventLatLng.get('lng') || -73.5944413
    };

    return (
      <GoogleMapLoader
        containerElement={ <div style={ {height: '100%'} } /> }
        googleMapElement={ <GoogleMap
            defaultZoom={ 11 }
            defaultCenter={ myLatLng }>
            <Marker
              position={ myLatLng } />
          </GoogleMap> }/>
    );
  } else {
    return <h3>Loading Map ...</h3>;
  }
}

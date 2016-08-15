import React, { PropTypes } from 'react';
import { 
  GoogleMapLoader,
  GoogleMap,
  Marker
} from 'react-google-maps';

GoogleMapComponent.propTypes = {
  eventLatLng: PropTypes.object.isRequired
};

export default function GoogleMapComponent (props) {
  if (props.eventLatLng.lat && props.eventLatLng.lng) {

    // Have default lat lng (Montreal, Canada) in case the
    // address is not found at all
    const myLatLng = {
      lat: props.eventLatLng.lat || 45.5298537,
      lng: props.eventLatLng.lng || -73.5944413
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

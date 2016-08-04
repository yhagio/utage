import React, { PropTypes } from 'react';
import GoogleApiComponent from '../../components/GoogleMap/GoogleAPIComponent';
import Map from '../../components/GoogleMap/GoogleMap';

export class MapContainer extends React.Component {
  render() {
    const style = {
      width: '100%',
      height: '90vh',
      margin: 'auto'
    };
    
    return (
      <div id="map-container" style={style}>
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'//'AIzaSyDGzFseEXo83K92yGY9GosAvmRga83GFDU'
})(MapContainer)
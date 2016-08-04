import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

export class Map extends React.Component {
  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 11;
      let lat = 45.5298537;
      let lng = -73.5944413;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }

  render() {
    const style = {
      width: '100%',
      height: '100%',
      margin: 'auto'     
    };

    return (
      <div id="map-component" ref='map' style={ style }>
        Loading map...
      </div>
    )
  }
}

export default Map;
// Copyright (c) 2016 Esri Japan

import React from 'react';
import { Glyphicon } from 'react-bootstrap';

class LocationButton extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    return (
      <div className="location-button" onClick={this.props.onClickLocationButton}>
        <style type="text/css">{`
        .location-button {
          position: absolute;
          top: 80px;
          left: 10px;
          margin: auto;
          padding: 5px 8px 5px 8px;
          z-index: 999;
          color: #000;
          background-color: #fff;
          text-align: center;
          border: 2px solid rgba(0,0,0,0.2);
          border-radius: 4px;
          background-clip: padding-box;
        }
        `}</style>
        <Glyphicon glyph="map-marker" />
      </div>
    );
  }
}

LocationButton.propTypes = {
  onClickLocationButton: React.PropTypes.func
};

LocationButton.displayName = 'LocationButton';

export default LocationButton;

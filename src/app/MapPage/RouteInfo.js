// Copyright (c) 2016 Esri Japan

import React from 'react';

class RouteInfo extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    let visibility = 'block';
    if (this.props.route === false) {
      visibility = 'none';
    }
    let travelModeIcon = 'img/walk.png';
    if (this.props.travelMode === 0) {
      travelModeIcon = 'img/walk.png';
    } else if (this.props.travelMode === 1) {
      travelModeIcon = 'img/car.png';
    }

    return (
      <div className="route-info" style={{ display: visibility }}>
        <div className="destination-photo">
          <img src={this.props.destinationPhoto} />
        </div>
        <img src={travelModeIcon} />
        <p>{this.props.destination} まで</p>
        <h3>{this.props.time} 分　|　{this.props.distance} km</h3>
        <div className="kujiran-count">
          <img src="img/colorkujiran-with-shadow-s.png" /> {this.props.kujiranCount}
        </div>
      </div>
    );
  }
}

RouteInfo.propTypes = {
  route: React.PropTypes.bool,
  time: React.PropTypes.number,
  distance: React.PropTypes.number,
  destination: React.PropTypes.string,
  travelMode: React.PropTypes.number,
  destinationPhoto: React.PropTypes.string,
  kujiranCount: React.PropTypes.number
};

RouteInfo.displayName = 'RouteInfo';

export default RouteInfo;

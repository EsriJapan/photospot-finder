// Copyright (c) 2016 Esri Japan

import React from 'react';
import { MapView } from '../';
import RouteInfo from './MapPage/RouteInfo';
import YorimichiAlert from './MapPage/YorimichiAlert';

class MapPage extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    let visibility = 'visible';
    if (this.props.visibility === false) {
      visibility = 'hidden';
    }

    return (
      <div className="mappage" style={{ visibility: visibility, position: 'absolute', top: 0, width: '100%', marginLeft: '-15px' }}>
        <style type="text/css">{`
        .route-info {
          color: #fff;
          background-color: #000;
          opacity: 0.9;
          bottom: 21px;
          width: 100%;
          height: 135px;
          padding-top: 20px;
          position: absolute;
          z-index: 999;
        }
        .route-info > h3 {
          text-align: center;
          width: 100%;
          font-weight: 100;
          margin: 0;
        }
        .route-info > p {
          margin-top: 10px;
          margin-left: 15px;
          font-weight: 100;
        }
        .route-info > img {
          position: absolute;
          right: 0;
          margin: 10px;
          height: 20px;
        }
        .destination-photo {
          position: absolute;
          top: -35px;
          width: 70px;
          height: 70px;
          margin: 0 auto 22px;
          left: 0;
          right: 0;
          border: 5px solid #000;
          border-radius: 50%;
          overflow: hidden;
        }
        .destination-photo > img {
          display: block;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          width: auto;
          height: 100%;
        }
        .kujiran-count {
          margin-right: 10px;
          text-align: right;
        }
        .kujiran-count > img {
          height: 30px;
        }
        `}</style>
        <MapView mapid={this.props.mapid} height={window.innerHeight - 50 + "px"} />
        <RouteInfo route={this.props.route} time={this.props.routeTime} distance={this.props.routeDistance} destination={this.props.destination} travelMode={this.props.travelMode} destinationPhoto={this.props.destinationPhoto} kujiranCount={this.props.kujiranCount} />
        <YorimichiAlert yorimichiCount={this.props.yorimichiCount} visibility={this.props.yorimichiAlertVisibility} onClickYesButton={this.props.onClickYorimichiYesButton} onClickNoButton={this.props.onClickYorimichiNoButton} />
      </div>
    );
  }
}

MapPage.propTypes = {
  visibility: React.PropTypes.bool,
  mapid: React.PropTypes.string,
  route: React.PropTypes.bool,
  routeTime: React.PropTypes.number,
  routeDistance: React.PropTypes.number,
  destination: React.PropTypes.string,
  travelMode: React.PropTypes.number,
  kujiranCount: React.PropTypes.number,
  destinationPhoto: React.PropTypes.string,
  yorimichiCount: React.PropTypes.number,
  yorimichiAlertVisibility: React.PropTypes.bool,
  onClickYorimichiYesButton: React.PropTypes.func,
  onClickYorimichiNoButton: React.PropTypes.func
};

MapPage.displayName = 'MapPage';

export default MapPage;

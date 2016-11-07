// Copyright (c) 2016 Yusuke Nunokawa (https://ynunokawa.github.io)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

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
          opacity: 0.7;
          bottom: 21px;
          width: 100%;
          height: 105px;
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
        .kujiran-count {
          margin-right: 10px;
          text-align: right;
        }
        .kujiran-count > img {
          height: 30px;
        }
        `}</style>
        <MapView mapid={this.props.mapid} height={window.innerHeight - 50 + "px"} />
        <RouteInfo route={this.props.route} time={this.props.routeTime} distance={this.props.routeDistance} destination={this.props.destination} travelMode={this.props.travelMode} kujiranCount={this.props.kujiranCount} />
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
  yorimichiCount: React.PropTypes.number,
  yorimichiAlertVisibility: React.PropTypes.bool,
  onClickYorimichiYesButton: React.PropTypes.func,
  onClickYorimichiNoButton: React.PropTypes.func
};

MapPage.displayName = 'MapPage';

export default MapPage;

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
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import LoadPage from './LoadPage';
import MapPage from './MapPage';
import PhotoPage from './PhotoPage';
import SpotFormPage from './SpotFormPage';

import { Mediator } from '../';

import appConfig from './config';

class App extends Mediator {
  constructor (props) {
      super(props);

      // User State
      this.state.userCurrentPosition = appConfig.map.default.center;

      // LoadPage State
      this.state.loadPageVisibility = true;

      // PhotoPage State
      this.state.photoPageVisibility = false;
      this.state.photoPageSearchRadius = appConfig.photoSearch.radius;
      this.state.photoPageSearchEndpointUrl = appConfig.photoSearch.endpointUrl;
      this.state.travelMode = 0; // 0: walk, 1: car

      // MapPage State
      this.state.mapPageVisibility = false;
      this.state.mapPageRoute = false;
      this.state.mapPageRouteTime = 0;
      this.state.mapPageRouteDistance = 0;
      this.state.mapPageDestination = '';

      // SpotFormPage State
      this.state.spotformPageVisibility = false;
      this.state.spotformPageUrl = appConfig.spotformApp.url;

      /*this.userIcon = L.icon({
        iconUrl: 'img/user.png',
        iconSize: [17, 44],
        iconAnchor: [9, 44]
      });*/
      this.userIcon = L.vectorIcon({
        className: 'user-icon',
        svgHeight: 48,
        svgWidth: 48,
        type: 'circle',
        shape: {
          r: '6',
          cx: '24',
          cy: '24'
        },
        style: {
          fill: '#006ad1',
          stroke: 'none',
          strokeWidth: 1
        }
      });
      this.userIconBorder = L.vectorIcon({
        className: 'user-icon-border',
        svgHeight: 48,
        svgWidth: 48,
        type: 'circle',
        shape: {
          r: '6',
          cx: '24',
          cy: '24'
        },
        style: {
          fill: '#1e90ff',
          stroke: '#1e90ff',
          strokeWidth: 0.5
        }
      });
      this.userLayer = L.featureGroup([]);
      this.routeStyle = {
        color: 'rgb(255, 100, 0)',
        weight: 7,
        opacity: 0.7,
        lineCap: 'round',
        dashArray: '1000',
        dashOffset: '1000',
        className: 'route-path'
      };
      this.routeLayer = null;
      this.photospotLayer = L.esri.featureLayer({ url: this.state.photoPageSearchEndpointUrl });
      this.updateRouteViewCount = this.updateRouteViewCount.bind(this);
      this.onSelectPhoto = this.onSelectPhoto.bind(this);
      this.onLoadPhotos = this.onLoadPhotos.bind(this);
      this.onChangeSwitch = this.onChangeSwitch.bind(this);
      this.getRoute = this.getRoute.bind(this);
      this.showMapPage = this.showMapPage.bind(this);
      this.showPhotoPage = this.showPhotoPage.bind(this);
      this.showSpotFormPage = this.showSpotFormPage.bind(this);
      this.hideLoadPage = this.hideLoadPage.bind(this);
  }

  readyComponents () {
    const map = this.state.map;
    map.invalidateSize(true);

    this.userLayer.addTo(map);

    if (appConfig.map.geolocation === false) {
      const dammyPosition = {
        coords: {
          latitude: this.state.userCurrentPosition[0],
          longitude: this.state.userCurrentPosition[1]
        }
      };
      this.getGeolocation(dammyPosition);
    }
  }

  getGeolocation (position) {
    console.log('App.geoGeolocation: ', position);
    const userCurrentPosition = [position.coords.latitude, position.coords.longitude];

    this.userLayer.clearLayers();
    const userIcon = this.userIcon;
    const userIconBorder = this.userIconBorder;
    const userMarker = L.marker(userCurrentPosition, {
      icon: userIcon
    });
    const userBorderMarker = L.marker(userCurrentPosition, {
      icon: userIconBorder
    });
    this.userLayer.addLayer(userBorderMarker);
    this.userLayer.addLayer(userMarker);

    this.setState({
      userCurrentPosition: userCurrentPosition
    });
  }

  errorGeolocation () {
    alert('現在地を取得できません');
  }

  updateRouteViewCount (data) {
    data.properties.route_view_count += 1;
    this.photospotLayer.updateFeature(data, function (response) {
      console.log(response);
    });
  }

  onSelectPhoto (data) {
    console.log(data);
    const routeEndpointUrl = appConfig.route.endpointUrl;
    const photoSpotLocation = data.geometry.coordinates;
    const userLocation = [this.state.userCurrentPosition[1], this.state.userCurrentPosition[0]];
    let routeParams;

    this.updateRouteViewCount(data);

    if (this.state.travelMode === 1) {
      routeParams = {
        stops: userLocation[0] + ',' + userLocation[1] + '; ' + photoSpotLocation[0] + ',' + photoSpotLocation[1]
      }
    } else if (this.state.travelMode === 0) {
      routeParams = {
        stops: userLocation[0] + ',' + userLocation[1] + '; ' + photoSpotLocation[0] + ',' + photoSpotLocation[1],
        travelMode: '{"attributeParameterValues":[{"parameterName":"Restriction Usage","attributeName":"Walking","value":"PROHIBITED"},{"parameterName":"Restriction Usage","attributeName":"Preferred for Pedestrians","value":"PREFER_LOW"},{"parameterName":"Walking Speed (km/h)","attributeName":"WalkTime","value":5},{"parameterName":"Restriction Usage","attributeName":"Avoid Roads Unsuitable for Pedestrians","value":"AVOID_HIGH"}],"description":"Follows paths and roads that allow pedestrian traffic and finds solutions that optimize travel time. The walking speed is set to 5 kilometers per hour.","impedanceAttributeName":"WalkTime","simplificationToleranceUnits":"esriMeters","uturnAtJunctions":"esriNFSBAllowBacktrack","restrictionAttributeNames":["Avoid Roads Unsuitable for Pedestrians","Preferred for Pedestrians","Walking"],"useHierarchy":false,"simplificationTolerance":2,"timeAttributeName":"WalkTime","distanceAttributeName":"Kilometers","type":"WALK","id":"caFAgoThrvUpkFBW","name":"Walking Time"}'
      }
    }

    /*const gpService = L.esri.GP.service({
      url: routeEndpointUrl,
      useCors: false
    });
    const gpTask = gpService.createTask();
    gpTask.setParam('stops', userLocation[0] + ',' + userLocation[1] + '; ' + photoSpotLocation[0] + ',' + photoSpotLocation[1]);
    gpTask.run(this.getRoute.bind(this));*/

    L.esri.request(routeEndpointUrl + '/solve', routeParams, function(error, response) {
      if(error){
        console.log(error);
      } else {
        this.getRoute(response.routes, data.properties.title);
      }
    }.bind(this));

    this.showMapPage();
  }

  onLoadPhotos (initialLoad) {
    this.hideLoadPage();
    if (initialLoad === true) {
      this.showPhotoPage();
    }
  }

  onChangeSwitch (element, state) {
    console.log('App.onChangeSwitch: ', element, state);
    if (state === true) {
      this.setState({
        photoPageSearchRadius: 2500,
        travelMode: 0
      });
    } else {
      this.setState({
        photoPageSearchRadius: 10000,
        travelMode: 1
      });
    }
  }

  getRoute (routes, destination) {
    console.log('App.getRoute: ', routes);
    const routeGeoJSON = L.esri.Util.arcgisToGeoJSON(routes.features[0]);
    const routeStyle = this.routeStyle;
    const map = this.state.map;
    let routeTime;

    if (this.state.travelMode === 0) {
      routeTime = Math.round(routeGeoJSON.properties.Total_WalkTime);
    } else if (this.state.travelMode === 1) {
      routeTime = Math.round(routeGeoJSON.properties.Total_TravelTime);
    }

    this.setState({
      mapPageRoute: true,
      mapPageRouteTime: routeTime,
      mapPageRouteDistance: Math.round(routeGeoJSON.properties.Total_Kilometers * 100) / 100,
      mapPageDestination: destination
    });

    if (this.routeLayer !== null) {
      this.routeLayer.clearLayers();
    } else {
      this.routeLayer = L.geoJson(null, {
        onEachFeature: function (feature, layer) {
          map.fitBounds(layer.getBounds());
        },
        style: function (feature) {
          return routeStyle;
        }
      });
      this.routeLayer.addTo(map);
    }

    this.routeLayer.addData(routeGeoJSON);
  }

  showMapPage () {
    this.setState({
      photoPageVisibility: false,
      mapPageVisibility: true,
      spotformPageVisibility: false
    });
    const map = this.state.map;
    map.invalidateSize(true);
    setTimeout(function () {map.invalidateSize(true);}, 2000);
  }

  showPhotoPage () {
    this.setState({
      photoPageVisibility: true,
      mapPageVisibility: false,
      spotformPageVisibility: false
    });
  }

  showSpotFormPage () {
    this.setState({
      photoPageVisibility: false,
      mapPageVisibility: false,
      spotformPageVisibility: true
    });
  }

  showLoadPage () {
    this.setState({
      loadPageVisibility: true,
      photoPageVisibility: false,
      mapPageVisibility: false,
      spotformPageVisibility: false
    });
  }

  hideLoadPage () {
    this.setState({
      loadPageVisibility: false
    });
  }

  componentWillMount () {
    if (appConfig.map.geolocation === true) {
      let location = [];
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(this.getGeolocation.bind(this), this.errorGeolocation.bind(this));
      } else {
        alert('現在地を取得できません');
      }
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.isLoaded.webmap === true && prevState.isLoaded.webmap === false) {
      console.log('react-webmap: ready components!');
      this.readyComponents();
    }
  }

  render () {
    return (
      <div>
        <style type="text/css">{`
        html, body {
          background-color: #222;
        }
        .fixed-nav {
            position: fixed;
            width: 100%;
            z-index: 99998;
        }
        .offset-top {
            margin-top: 51px;
        }
        div.leaflet-esri-webmap-layer2-label-pane > div.esri-leaflet-webmap-labels {
          margin-left: 0 !important;
          margin-top: -9px !important;
          color: rgb(255,127,127) !important;
        }
        .route-path {
          -webkit-animation: dash 10s linear forwards;
          animation: dash 10s linear forwards;
        }
        @-webkit-keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        .user-icon-border > svg > g > circle {
          -webkit-animation-duration: 3s;
          -webkit-animation-name: pulse;
          -webkit-animation-iteration-count: infinite;
          animation-duration: 3s;
          animation-name: pulse;
          animation-iteration-count: infinite;
          fill-opacity: 0.3;
        }
        @-webkit-keyframes pulse {
          0% {
            transform-origin: 50% 50%;
            transform: scale(1,1);
            opacity: 1;
          }
          100% {
            transform-origin: 50% 50%;
            transform: scale(3,3);
            opacity: 0.5;
          }
        }
        @keyframes pulse {
          0% {
            transform-origin: 50% 50%;
            transform: scale(1,1);
            opacity: 1;
          }
          100% {
            transform-origin: 50% 50%;
            transform: scale(3,3);
            opacity: 0.5;
          }
        }
        `}</style>
        <Navbar inverse className="fixed-nav">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#"><img src="img/icon.png" style={{ position: 'absolute', width: '42px', marginTop: '-8px' }} /> <span style={{ color: '#fff', fontWeight: 'bold', marginLeft: '56px' }}>PhotoSpot</span> Finder</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#" onClick={this.showPhotoPage}><Glyphicon glyph="picture" /> 写真</NavItem>
              <NavItem eventKey={2} href="#" onClick={this.showMapPage}><Glyphicon glyph="map-marker" /> 地図</NavItem>
              <NavItem eventKey={3} href="#" onClick={this.showSpotFormPage}><Glyphicon glyph="send" /> 写真スポットの投稿</NavItem>
              <NavItem eventKey={4} href="#"><Glyphicon glyph="send" /> くじらんスポットの投稿 (作成中)</NavItem>
              <NavItem eventKey={5} href="https://github.com/EsriJapan/photospot-finder">GitHub</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid className="main-contents">
          <Row className="offset-top">
            <Col xs={12} md={12}>
              <LoadPage 
                visibility={this.state.loadPageVisibility} 
              />
              <PhotoPage 
                visibility={this.state.photoPageVisibility} 
                searchRadius={this.state.photoPageSearchRadius} 
                location={this.state.userCurrentPosition} 
                searchEndpointUrl={this.state.photoPageSearchEndpointUrl} 
                onSelectPhoto={this.onSelectPhoto} 
                onLoadPhotos={this.onLoadPhotos} 
                onChangeSwitch={this.onChangeSwitch} 
              />
              <MapPage 
                visibility={this.state.mapPageVisibility} 
                mapid={this.props.mapid} 
                route={this.state.mapPageRoute} 
                routeTime={this.state.mapPageRouteTime} 
                routeDistance={this.state.mapPageRouteDistance} 
                destination={this.state.mapPageDestination} 
              />
              <SpotFormPage 
                visibility={this.state.spotformPageVisibility} 
                url={this.state.spotformPageUrl} 
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

App.displayName = 'App';

export default App;

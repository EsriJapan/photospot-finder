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

import { Mediator } from '../';

class App extends Mediator {
  constructor (props) {
      super(props);

      // User State
      this.state.userCurrentPosition = [42.315, 140.982];

      // LoadPage State
      this.state.loadPageVisibility = true;

      // PhotoPage State
      this.state.photoPageVisibility = false;
      this.state.photoPageSearchRadius = 10000;
      this.state.photoPageSearchEndpointUrl = '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_muroran/FeatureServer/0';

      // MapPage State
      this.state.mapPageVisibility = false;
      this.state.mapPageRoute = false;
      this.state.mapPageRouteTime = 0;
      this.state.mapPageRouteDistance = 0;
      this.state.mapPageDestination = '';

      this.userIcon = L.icon({
        iconUrl: 'img/user.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
      this.userLayer = null;
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
      this.onSelectPhoto = this.onSelectPhoto.bind(this);
      this.onLoadPhotos = this.onLoadPhotos.bind(this);
      this.getRoute = this.getRoute.bind(this);
      this.showMapPage = this.showMapPage.bind(this);
      this.showPhotoPage = this.showPhotoPage.bind(this);
      this.hideLoadPage = this.hideLoadPage.bind(this);
  }

  readyComponents () {
    const map = this.state.map;
    map.invalidateSize(true);

    const userIcon = this.userIcon;
    this.userLayer = L.marker(this.state.userCurrentPosition, {
      icon: userIcon
    }).addTo(map);
  }

  getGeolocation (position) {
    console.log('App.geoGeolocation: ', position);
    const userCurrentPosition = [42.315, 140.982]; // 開発用
    //const userCurrentPosition = [position.coords.latitude, position.coords.longitude];
    this.setState({
      userCurrentPosition: userCurrentPosition
    });
  }

  errorGeolocation () {
    alert('現在地を取得できません');
  }

  onSelectPhoto (data) {
    console.log(data);
    const routeEndpointUrl = 'https://utility.arcgis.com/usrsvcs/appservices/GfNovy4yk5xdJ9b4/rest/services/World/Route/NAServer/Route_World';
    const photoSpotLocation = data.geometry.coordinates;
    const userLocation = [this.state.userCurrentPosition[1], this.state.userCurrentPosition[0]];
    /*const gpService = L.esri.GP.service({
      url: routeEndpointUrl,
      useCors: false
    });
    const gpTask = gpService.createTask();
    gpTask.setParam('stops', userLocation[0] + ',' + userLocation[1] + '; ' + photoSpotLocation[0] + ',' + photoSpotLocation[1]);
    gpTask.run(this.getRoute.bind(this));*/

    L.esri.request(routeEndpointUrl + '/solve', {
      stops: userLocation[0] + ',' + userLocation[1] + '; ' + photoSpotLocation[0] + ',' + photoSpotLocation[1]
    }, function(error, response) {
      if(error){
        console.log(error);
      } else {
        this.getRoute(response.routes, data.properties.title);
      }
    }.bind(this));

    this.showMapPage();
  }

  onLoadPhotos () {
    this.hideLoadPage();
    this.showPhotoPage();
  }

  getRoute (routes, destination) {
    console.log('App.getRoute: ', routes);
    const routeGeoJSON = L.esri.Util.arcgisToGeoJSON(routes.features[0]);
    const routeStyle = this.routeStyle;
    const map = this.state.map;

    this.setState({
      mapPageRoute: true,
      mapPageRouteTime: Math.round(routeGeoJSON.properties.Total_TravelTime),
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
      mapPageVisibility: true
    });
    const map = this.state.map;
    map.invalidateSize(true);
    setTimeout(function () {map.invalidateSize(true);}, 2000);
  }

  showPhotoPage () {
    this.setState({
      photoPageVisibility: true,
      mapPageVisibility: false
    });
  }

  showLoadPage () {
    this.setState({
      loadPageVisibility: true,
      photoPageVisibility: false,
      mapPageVisibility: false
    });
  }

  hideLoadPage () {
    this.setState({
      loadPageVisibility: false
    });
  }

  componentWillMount () {
    let location = [];
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getGeolocation.bind(this), this.errorGeolocation.bind(this));
    } else {
      alert('現在地を取得できません');
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
        nav > div.container {
          margin-right: 15px;
          margin-left: 15px;
        }
        .col-xs-12 {
          padding-left: 0;
          padding-right: 0;
        }
        .fixed-nav {
            position: fixed;
            width: 100%;
            z-index: 99998;
        }
        .main-contents {
          padding-right: 0;
          padding-left: 0;
        }
        .offset-top {
            margin-top: 50px;
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
        `}</style>
        <Navbar inverse className="fixed-nav">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Photo Spot Finder</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#photopage" onClick={this.showPhotoPage}><Glyphicon glyph="picture" /> 写真</NavItem>
              <NavItem eventKey={2} href="#mappage" onClick={this.showMapPage}><Glyphicon glyph="map-marker" /> 地図</NavItem>
              <NavItem eventKey={3} href="https://github.com/EsriJapan/photospot-finder">GitHub</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid className="main-contents">
          <Row className="offset-top">
            <Col xs={12} md={12}>
              <LoadPage visibility={this.state.loadPageVisibility} />
              <PhotoPage visibility={this.state.photoPageVisibility} searchRadius={this.state.photoPageSearchRadius} location={this.state.userCurrentPosition} searchEndpointUrl={this.state.photoPageSearchEndpointUrl} onSelectPhoto={this.onSelectPhoto} onLoadPhotos={this.onLoadPhotos} />
              <MapPage visibility={this.state.mapPageVisibility} mapid={this.props.mapid} route={this.state.mapPageRoute} routeTime={this.state.mapPageRouteTime} routeDistance={this.state.mapPageRouteDistance} destination={this.state.mapPageDestination} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

App.displayName = 'App';

export default App;

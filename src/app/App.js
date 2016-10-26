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
      this.state.user = {
        currentPosition: [42.315, 140.982]
      }
      this.state.loadPage = {
        visibility: true
      }
      this.state.photoPage = {
        visibility: true,
        searchRadius: 10000,
        searchEndpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_muroran/FeatureServer/0'
      };
      this.state.mapPage = {
        visibility: false,
        route: false,
        routeTime: 0,
        routeDistance: 0,
        destination: ''
      };
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
      this.getRoute = this.getRoute.bind(this);
      this.showMapPage = this.showMapPage.bind(this);
      this.showPhotoPage = this.showPhotoPage.bind(this);
  }

  readyComponents () {
    const map = this.state.map;
    map.invalidateSize();

    // 開発用
    this.setState({
      photoPage: {
        visibility: false,
        searchRadius: 10000,
        searchEndpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_muroran/FeatureServer/0'
      },
      mapPage: {
        visibility: false
      }
    });
    setTimeout(function () {
      this.setState({
        photoPage: {
          visibility: true,
          searchRadius: 10000,
          searchEndpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_muroran/FeatureServer/0'
        },
        loadPage: {
          visibility: false
        }
      });
    }.bind(this), 3000);

    const userIcon = this.userIcon;
    this.userLayer = L.marker(this.state.user.currentPosition, {
      icon: userIcon
    }).addTo(map);
  }

  getGeolocation (position) {
    console.log('App.geoGeolocation: ', position);
    const userInitState = {
      currentPosition: [42.315, 140.982]
      //currentPosition: [position.coords.latitude, position.coords.longitude]
    };
    this.setState({
      user: userInitState
    });
  }

  errorGeolocation () {
    alert('現在地を取得できません');
  }

  onSelectPhoto (data) {
    console.log(data);
    const routeEndpointUrl = 'https://utility.arcgis.com/usrsvcs/appservices/GfNovy4yk5xdJ9b4/rest/services/World/Route/NAServer/Route_World';
    const photoSpotLocation = data.geometry.coordinates;
    const userLocation = [this.state.user.currentPosition[1], this.state.user.currentPosition[0]];
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

  getRoute (routes, destination) {
    console.log('App.getRoute: ', routes);
    const routeGeoJSON = L.esri.Util.arcgisToGeoJSON(routes.features[0]);
    const routeStyle = this.routeStyle;
    const map = this.state.map;

    this.setState({
      mapPage: {
        route: true,
        routeTime: Math.round(routeGeoJSON.properties.Total_TravelTime),
        routeDistance: Math.round(routeGeoJSON.properties.Total_Kilometers * 100) / 100,
        destination: destination
      }
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
      photoPage: {
        visibility: false,
        searchRadius: 10000,
        searchEndpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_muroran/FeatureServer/0'
      },
      mapPage: {
        visibility: true
      }
    });
  }

  showPhotoPage () {
    this.setState({
      photoPage: {
        visibility: true,
        searchRadius: 10000,
        searchEndpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_muroran/FeatureServer/0'
      },
      mapPage: {
        visibility: false
      }
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
          padding-right: 30px;
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
              <LoadPage visibility={this.state.loadPage.visibility} />
              <PhotoPage visibility={this.state.photoPage.visibility} searchRadius={this.state.photoPage.searchRadius} location={this.state.user.currentPosition} searchEndpointUrl={this.state.photoPage.searchEndpointUrl} onSelectPhoto={this.onSelectPhoto} />
              <MapPage visibility={this.state.mapPage.visibility} mapid={this.props.mapid} route={this.state.mapPage.route} routeTime={this.state.mapPage.routeTime} routeDistance={this.state.mapPage.routeDistance} destination={this.state.mapPage.destination} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

App.displayName = 'App';

export default App;

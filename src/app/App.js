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
        currentPosition: [42.344, 140.982]
      }
      this.state.loadPage = {
        visibility: true
      }
      this.state.photoPage = {
        visibility: true,
        searchRadius: 1000,
        searchEndpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_muroran/FeatureServer/0'
      };
      this.state.mapPage = {
        visibility: false
      };
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
  }

  getGeolocation (position) {
    console.log('App.geoGeolocation: ', position);
    const userInitState = {
      currentPosition: [42.344, 140.982]
      //currentPosition: [position.coords.latitude, position.coords.longitude]
    };
    this.setState({
      user: userInitState
    });
  }

  errorGeolocation () {
    alert('現在地を取得できません');
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
        `}</style>
        <Navbar inverse className="fixed-nav">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">むろ写</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#photopage"><Glyphicon glyph="picture" /> 写真</NavItem>
              <NavItem eventKey={2} href="#mappage"><Glyphicon glyph="map-marker" /> 地図</NavItem>
              <NavItem eventKey={3} href="https://github.com/EsriJapan/photospot-finder">GitHub</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid className="main-contents">
          <Row className="offset-top">
            <Col xs={12} md={12}>
              <LoadPage visibility={this.state.loadPage.visibility} />
              <PhotoPage visibility={this.state.photoPage.visibility} searchRadius={this.state.photoPage.searchRadius} location={this.state.user.currentPosition} searchEndpointUrl={this.state.photoPage.searchEndpointUrl} />
              <MapPage visibility={this.state.mapPage.visibility} mapid={this.props.mapid} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

App.displayName = 'App';

export default App;

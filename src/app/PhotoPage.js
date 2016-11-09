// Copyright (c) 2016 Esri Japan

import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import PhotoLayout from './PhotoPage/PhotoLayout';
import SearchInfo from './PhotoPage/SearchInfo';
import SavedRouteAlert from './PhotoPage/SavedRouteAlert';

import appConfig from './config';

class PhotoPage extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        photos: []
      }
      this.initialLoad = true;
  }

  searchPhotos (url, center, radius) {
    console.log('PhotoPage.searchPhotos: ', center, radius);
    const query = L.esri.query({ url: url });
    query.nearby(L.latLng(center[0], center[1]), radius);
    query.orderBy('route_view_count', 'DESC');
    query.run(this.getPhotos.bind(this));
  }

  getPhotos (error, featureCollection, response) {
    console.log('PhotoPage.getPhotos: ', featureCollection, response);
    let photos = [];
    let getAttachments = [];

    if (featureCollection.features.length > 0) {
      photos = featureCollection.features.map(function (f, i) {
        return f;
      }.bind(this));

      photos.forEach(function (p, i) {
        const attachmentReqUrl = this.props.searchEndpointUrl + '/' + p.properties.OBJECTID + '/attachments';
        const getAttachment = L.esri.request(attachmentReqUrl, {}, function(error, response) {
          if(error){
            //console.log(error);
          } else {
            //console.log(response);
            photos[i].url = attachmentReqUrl + '/' + response.attachmentInfos[0].id;
            //this.setState({ photos: photos });
          }
        }.bind(this));
        getAttachments.push(getAttachment);
      }.bind(this));

      Promise.all(getAttachments).then(function () {
        console.log('PhotoPage.getAttachments: done!');
        this.setState({ photos: photos });
        setTimeout(function () {
          this.props.onLoadPhotos(this.initialLoad);
          this.initialLoad = false;
        }.bind(this), 1500);
      }.bind(this));
    } else {
      this.setState({ photos: photos });
    }
    
  }

  componentWillMount () {
    this.searchPhotos(this.props.searchEndpointUrl, this.props.location, this.props.searchRadius);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location !== nextProps.location || this.props.searchRadius !== nextProps.searchRadius) {
      this.searchPhotos(nextProps.searchEndpointUrl, nextProps.location, nextProps.searchRadius);
    }
  }

  render () {
    let visibility = 'block';
    if (this.props.visibility === false) {
      visibility = 'none';
    }

    let Alert = null;
    if (this.props.hasSavedRoute === true) {
      Alert = (<SavedRouteAlert onClickButton={this.props.onClickSavedRouteShowButton} />);
    }

    let Photos = null;
    if (this.state.photos.length > 0) {
      Photos = this.state.photos.map(function (p, i) {
        return (
          <PhotoLayout 
            imgUrl={p.url} 
            name={p.properties[appConfig.photoSearch.reporterNameField]}
            title={p.properties[appConfig.photoSearch.titleField]} 
            comment={p.properties[appConfig.photoSearch.commentField]} 
            time={p.properties[appConfig.photoSearch.reportDateField]} 
            data={p} 
            routeViewCount={p.properties[appConfig.photoSearch.routeViewCountField]}
            onSelectPhoto={this.props.onSelectPhoto}
            key={"murophoto_" + i} 
          />
        );
      }.bind(this));
    }

    return (
      <div className="photopage" style={{ display: visibility, position: 'absolute', top: 0, width: '100%', marginLeft: '-15px' }}>
        <style type="text/css">{`
        .murophoto-frame {
          color: #fff;
          text-shadow: 1px 1px 1px #333, -1px 1px 1px #333, 1px -1px 1px #333, -1px -1px 1px #333;
          position: relative;
          transition: all 0.3s;
        }
        .murophoto-frame:hover {
          opacity: 0.8;
          border: solid #333 3px;
        }
        .to-route {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          height: 28px;
          width: 150px;
          padding-top: 7px;
          color: #fff;
          font-weight: bold;
          background-color: #333;
          border-radius: 15px;
          border: solid 1px #999;
          text-shadow: none;
          text-align: center;
          font-size: 0.7em;
          opacity: 0;
          transition: all 0.3s;
          cursor: pointer;
        }
        .to-route:hover {
          color: #333;
          background-color: #fff;
          border: solid 1px #fff;
        }
        .murophoto-frame:hover > div.to-route {
          opacity: 1;
        }
        .murophoto-frame > h5 {
          position: absolute;
          margin: 15px;
          bottom: 30px;
          text-align: right;
          width: 90%;
        }
        .murophoto-frame > p {
          position: absolute;
          bottom: 5px;
          margin: 15px;
          font-size: 0.8em;
          text-align: right;
          width: 90%;
        }
        .route-view-count {
          position: absolute;
          margin: 15px;
          top: 0;
          text-align: left;
          width: 90%;
        }
        .route-view-count > .label {
          text-shadow: none;
        }
        .murophoto {
          width: 100%;
        }
        .bootstrap-switch {
          border-radius: 16px;
        }
        .bootstrap-switch.bootstrap-switch-small .bootstrap-switch-handle-on, .bootstrap-switch.bootstrap-switch-small .bootstrap-switch-handle-off, .bootstrap-switch.bootstrap-switch-small .bootstrap-switch-label {
          border-radius: 14px;
        }
        `}</style>
        {Alert}
        {Photos}
        <SearchInfo onChangeSwitch={this.props.onChangeSwitch} />
      </div>
    );
  }
}

PhotoPage.propTypes = {
  visbility: React.PropTypes.bool,
  location: React.PropTypes.array,
  searchRadius: React.PropTypes.number,
  searchEndpointUrl: React.PropTypes.string,
  onSelectPhoto: React.PropTypes.func,
  onLoadPhotos: React.PropTypes.func,
  onChangeSwitch: React.PropTypes.func,
  hasSavedRoute: React.PropTypes.bool,
  onClickSavedRouteShowButton: React.PropTypes.func
};

PhotoPage.displayName = 'PhotoPage';

export default PhotoPage;

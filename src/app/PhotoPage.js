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
import { Button, Glyphicon } from 'react-bootstrap';
import PhotoLayout from './PhotoPage/PhotoLayout';
import SearchInfo from './PhotoPage/SearchInfo';

class PhotoPage extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        photos: []
      }
  }

  searchPhotos (url, center, radius) {
    console.log('PhotoPage.searchPhotos: ', center, radius);
    const query = L.esri.query({ url: url });
    query.nearby(L.latLng(center[0], center[1]), radius);
    query.run(this.getPhotos.bind(this));
  }

  getPhotos (error, featureCollection, response) {
    console.log('PhotoPage.getPhoto: ', featureCollection, response);
    let photos = [];
    let getAttachments = [];

    photos = featureCollection.features.map(function (f, i) {
      const attachmentReqUrl = this.props.searchEndpointUrl + '/' + f.properties.OBJECTID + '/attachments';
      const getAttachment = L.esri.request(attachmentReqUrl, {}, function(error, response) {
        if(error){
          console.log(error);
        } else {
          console.log(response);
          photos[i].url = attachmentReqUrl + '/' + response.attachmentInfos[0].id;
          this.setState({ photos: photos });
        }
      }.bind(this));
      getAttachments.push(getAttachment);
      return f;
    }.bind(this));

    Promise.all(getAttachments).then(function () {
      console.log('PhotoPage.getAttachments: done!');
      setTimeout(function () {
        this.props.onLoadPhotos();
      }.bind(this), 1500);
    }.bind(this));
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

    const Photos = this.state.photos.map(function (p, i) {
      return (
        <PhotoLayout 
          imgUrl={p.url} 
          name={p.properties.reporter_name}
          title={p.properties.title} 
          comment={p.properties.comment_text} 
          time={p.properties.report_time} 
          data={p} 
          routeViewCount={p.properties.route_view_count}
          onSelectPhoto={this.props.onSelectPhoto}
          key={"murophoto_" + i} 
        />
      );
    }.bind(this));

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
          border: solid #000 3px;
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
        `}</style>
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
  onChangeSwitch: React.PropTypes.func
};

PhotoPage.displayName = 'PhotoPage';

export default PhotoPage;

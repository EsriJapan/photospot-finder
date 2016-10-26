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

    photos = featureCollection.features.map(function (f, i) {
      const attachmentReqUrl = this.props.searchEndpointUrl + '/' + f.properties.OBJECTID + '/attachments';
      L.esri.request(attachmentReqUrl, {}, function(error, response) {
        if(error){
          console.log(error);
        } else {
          console.log(response);
          photos[i].url = attachmentReqUrl + '/' + response.attachmentInfos[0].id;
          this.setState({ photos: photos });
        }
      }.bind(this));
      return f;
    }.bind(this));
  }

  componentWillMount () {
    this.searchPhotos(this.props.searchEndpointUrl, this.props.location, this.props.searchRadius);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location !== nextProps.location) {
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
          key={"murophoto_" + i} 
        />
      );
    });

    return (
      <div style={{ display: visibility }}>
        <style type="text/css">{`
        .murophoto-frame {
          color: #fff;
          text-shadow: 1px 1px 1px #333, -1px 1px 1px #333, 1px -1px 1px #333, -1px -1px 1px #333;
          position: relative;
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
        .murophoto {
          width: 100%;
        }
        `}</style>
        {Photos}
      </div>
    );
  }
}

PhotoPage.propTypes = {
  visbility: React.PropTypes.bool,
  location: React.PropTypes.array,
  searchRadius: React.PropTypes.number,
  searchEndpointUrl: React.PropTypes.string
};

PhotoPage.displayName = 'PhotoPage';

export default PhotoPage;

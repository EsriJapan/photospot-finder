// Copyright (c) 2016 Esri Japan

import React from 'react';
import { Label, Glyphicon } from 'react-bootstrap';

class PhotoLayout extends React.Component {
  constructor (props) {
      super(props);
      this._onSelectPhoto = this._onSelectPhoto.bind(this);
  }

  _onSelectPhoto () {
    this.props.onSelectPhoto(this.props.data, this.props.imgUrl);
  }

  render () {
    let NewLabel = null;
    let routeViewCount = this.props.routeViewCount;
    const date = new Date();
    const now = date.getTime();
    const def = now - this.props.time;

    console.log(this.props.title, def);
    
    if (def < 86400000) {
      NewLabel = (<Label bsStyle="danger">New</Label>);
    }
    if (routeViewCount === null || routeViewCount === undefined) {
      routeViewCount = 0;
    }

    return (
      <div className="murophoto-frame">
        <img src={this.props.imgUrl} className="murophoto" />
        <h5>{this.props.title}</h5>
        <p>by. {this.props.name}</p>
        <div className="route-view-count"><Glyphicon glyph="eye-open" /> {routeViewCount} {NewLabel}</div>
        <div className="to-route" onClick={this._onSelectPhoto}><Glyphicon glyph="globe" /> ルート検索を開始する</div>
      </div>
    );
  }
}

PhotoLayout.propTypes = {
  imgUrl: React.PropTypes.string,
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  comment: React.PropTypes.string,
  time: React.PropTypes.number,
  data: React.PropTypes.object,
  routeViewCount: React.PropTypes.number,
  onSelectPhoto: React.PropTypes.func
};

PhotoLayout.displayName = 'PhotoLayout';

export default PhotoLayout;

// Copyright (c) 2016 Esri Japan

import React from 'react';

class SelectSpotTypePage extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    let visibility = 'block';
    if (this.props.visibility === false) {
      visibility = 'none';
    }

    return (
      <div className="select-photospot-page" style={{ display: visibility, position: 'absolute', top: 0, width: '100%', marginLeft: '-15px', height: window.innerHeight - 50 + 'px' }}>
        <style type="text/css">{`
          .select-photospot-page > div {
            height: 50%;
            position: relative;
            background-size: cover;
          }
          .select-photospot-page > div:before {
            filter: blur(1px);
          }
          .select-photospot {
            background-image: url(img/photospot-bg.jpg);
          }
          .select-kujiranspot {
            background-image: url(img/kujiranspot-bg.jpg);
          }
          .select-photospot-page > div > div {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            height: 34px;
            width: 200px;
            padding-top: 7px;
            color: #fff;
            background-color: rgba(0,0,0,0.3);
            font-weight: bold;
            border-radius: 17px;
            border: solid 1px #fff;
            text-shadow: none;
            text-align: center;
            transition: all 0.3s;
            cursor: pointer;
          }
          .select-photospot-page > div > div:hover {
            color: #666;
            background-color: rgba(255,255,255,1);
          }
        `}</style>
        <div className="select-photospot">
          <div onClick={this.props.onSelectPhotoSpot}>
            <p>撮影スポットを探す</p>
          </div>
        </div>
        <div className="select-kujiranspot">
          <div onClick={this.props.onSelectKujiranSpot}>
            <p>くじらんスポットを探す</p>
          </div>
        </div>
      </div>
    );
  }
}

SelectSpotTypePage.propTypes = {
  visibility: React.PropTypes.bool,
  onSelectPhotoSpot: React.PropTypes.func,
  onSelectKujiranSpot: React.PropTypes.func
};

SelectSpotTypePage.displayName = 'SelectSpotTypePage';

export default SelectSpotTypePage;

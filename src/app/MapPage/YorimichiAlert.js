// Copyright (c) 2016 Esri Japan

import React from 'react';
import { Button } from 'react-bootstrap';

class YorimichiAlert extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    let visibility = 'block';
    if (this.props.visibility === false) {
      visibility = 'none';
    }

    return (
      <div className="yorimichi-alert" style={{ display: visibility }}>
        <style type="text/css">{`
        .yorimichi-alert {
          position: absolute;
          top: 10px;
          right: 10px;
          margin: auto;
          padding: 15px;
          height: 100px;
          width: 250px;
          z-index: 999;
          color: #fff;
          background-color: #000;
          opacity: 0.8;
          font-size: 0.8em;
          text-align: center;
          border: 1px solid transparent;
          border-radius: 4px;
        }
        .yorimichi-alert > .btn {
          font-size: 0.9em;
          margin: 5px;
        }
        `}</style>
        <p>ルート付近に観光スポットが{this.props.yorimichiCount}件あります</p>
        <Button bsStyle="primary" onClick={this.props.onClickYesButton}>寄り道する</Button>
        <Button onClick={this.props.onClickNoButton}>しない</Button>
      </div>
    );
  }
}

YorimichiAlert.propTypes = {
  yorimichiCount: React.PropTypes.number,
  visibility: React.PropTypes.bool,
  onClickYesButton: React.PropTypes.func,
  onClickNoButton: React.PropTypes.func
};

YorimichiAlert.displayName = 'YorimichiAlert';

export default YorimichiAlert;

// Copyright (c) 2016 Esri Japan

import React from 'react';
import { Button } from 'react-bootstrap';

class SavedRouteAlert extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    return (
      <div className="saved-route-alert">
        <style type="text/css">{`
        .saved-route-alert {
          position: fixed;
          bottom: 70px;
          left: 0;
          right: 0;
          margin: auto;
          padding: 15px;
          height: 100px;
          width: 250px;
          z-index: 1;
          color: #fff;
          background-color: #000;
          opacity: 0.8;
          font-size: 0.8em;
          text-align: center;
          border: 1px solid transparent;
          border-radius: 4px;
          display: block;
          -webkit-animation: fadeout 12s linear forwards;
          animation: fadeout 12s linear forwards;
        }
        @-webkit-keyframes fadeout {
          0% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            display: none;
          }
        }
        @keyframes fadeout {
          0% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            display: none;
          }
        }
        `}</style>
        <p>前回のルートが自動保存されています</p>
        <Button bsStyle="primary" onClick={this.props.onClickButton}>表示する</Button>
      </div>
    );
  }
}

SavedRouteAlert.propTypes = {
  onClickButton: React.PropTypes.func
};

SavedRouteAlert.displayName = 'SavedRouteAlert';

export default SavedRouteAlert;

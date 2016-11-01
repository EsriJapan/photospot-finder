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

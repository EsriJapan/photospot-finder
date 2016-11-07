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

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
import Switch from 'react-bootstrap-switch';

class SearchInfo extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    return (
      <div className="search-info">
        <style type="text/css">{`
        .search-info {
          bottom: 0;
          width: 100%;
          height: 55px;
          position: fixed;
          z-index: 999;
          padding: 10px;
        }
        .search-info > p {
          font-size: 0.8em;
        }
        .bootstrap-switch .bootstrap-switch-label {
          background: none;
        }
        .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-warning, .bootstrap-switch .bootstrap-switch-handle-off.bootstrap-switch-warning {
          background: rgb(255,100,0);
        }
        `}</style>
        <Switch
          defaultValue={true} 
          bsSize={"small"} 
          //onChange={this.props.onChangeSwitch}
          onText={"徒歩"}
          offText={"自動車"} 
          offColor={"warning"}
        />
      </div>
    );
  }
}

SearchInfo.propTypes = {
  onChangeSwitch: React.PropTypes.func
};

SearchInfo.displayName = 'SearchInfo';

export default SearchInfo;

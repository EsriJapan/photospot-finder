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

class SpotFormPage extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    let visibility = 'visible';
    if (this.props.visibility === false) {
      visibility = 'hidden';
    }

    return (
      <div className="spotformpage" style={{ visibility: visibility, position: 'absolute', top: 0, width: '100%', marginLeft: '-15px' }}>
        <iframe src={this.props.url} style={{ width: '100%', height: window.innerHeight - 50 + "px" }} />
      </div>
    );
  }
}

SpotFormPage.propTypes = {
  visibility: React.PropTypes.bool,
  url: React.PropTypes.string
};

SpotFormPage.displayName = 'SpotFormPage';

export default SpotFormPage;

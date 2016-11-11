// Copyright (c) 2016 Esri Japan

import React from 'react';

class SpotFormPage extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    let visibility = 'block';
    if (this.props.visibility === false) {
      visibility = 'none';
    }

    return (
      <div className="spotformpage" style={{ display: visibility, position: 'absolute', top: 0, width: '100%', marginLeft: '-15px' }}>
        <iframe src={this.props.url} style={{ width: window.innerWidth + "px", height: window.innerHeight - 50 + "px" }} />
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

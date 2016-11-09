// Copyright (c) 2016 Esri Japan

import React from 'react';

class LoadPage extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    let visibility = 'block';
    if (this.props.visibility === false) {
      visibility = 'none';
    }

    return (
      <div style={{ display: visibility, position: 'absolute', top: 0, width: '100%', marginLeft: '-15px', height: window.innerHeight - 50 + 'px' }}>
        <style type="text/css">{`
          img.kujiran-load {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            max-width: 100%;
            max-height: 100%;
          }
        `}</style>
        <img className="kujiran-load" src="img/loading.svg" />
        <img className="kujiran-load" src="img/colorkujiran-with-shadow-s.png" />
      </div>
    );
  }
}

LoadPage.propTypes = {
  visibility: React.PropTypes.bool
};

LoadPage.displayName = 'LoadPage';

export default LoadPage;

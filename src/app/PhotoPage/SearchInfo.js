// Copyright (c) 2016 Esri Japan

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
          onChange={this.props.onChangeSwitch}
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

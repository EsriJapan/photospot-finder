// Copyright (c) 2016 Esri Japan

import React from 'react';
import ReactDOM from 'react-dom';
import document from 'global/document';

import App from './App';

import { isReactDOMSupported } from '../lib/utils/react-utils';

import appConfig from './config';

const mapid = appConfig.map.id;

const el = document.createElement('div');
const render = isReactDOMSupported() ? ReactDOM.render : React.render;


// アプリのレンダリング開始
function renderApp () {
  const appContents = (
    <main>
      <App 
        mapid={mapid} 
      />
    </main>
  );
  document.body.appendChild(el);
  render(appContents, el);
}

renderApp();

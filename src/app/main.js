// Copyright (c) 2016 Esri Japan

import React from 'react';
import ReactDOM from 'react-dom';
import document from 'global/document';

import App from './App';

import { isReactDOMSupported } from '../lib/utils/react-utils';

import appConfig from './config';

console.log('appConfig: ', appConfig);

let mapid = appConfig.map.id;

const appContents = (
  <main>
    <App 
      mapid={mapid}
    />
  </main>
);

const el = document.createElement('div');
const render = isReactDOMSupported() ? ReactDOM.render : React.render;
document.body.appendChild(el);
render(appContents, el);

// Copyright (c) 2016 Esri Japan

import React from 'react';
import ReactDOM from 'react-dom';
import document from 'global/document';

import App from './App';

import { isReactDOMSupported } from '../lib/utils/react-utils';

import appConfig from './config';

let accessToken;
let callbacks = [];
const protocol = window.location.protocol;
const host = window.location.host;
const callbackPage = protocol + '//' + host + '/oauth/callback.html';

const mapid = appConfig.map.id;

const el = document.createElement('div');
const render = isReactDOMSupported() ? ReactDOM.render : React.render;

// ArcGIS OAuth 認証
function oauth (callback) {
  if (accessToken) {
    callback(accessToken);
  } else {
    callbacks.push(callback);
    window.open('https://www.arcgis.com/sharing/oauth2/authorize?client_id=' + appConfig.oauth.appid + '&response_type=token&expiration=20160&redirect_uri=' + window.encodeURIComponent(callbackPage), 'oauth', 'height=400,width=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes');
  }
}

// アプリのレンダリング開始
function renderApp (token) {
  const appContents = (
    <main>
      <App 
        mapid={mapid} 
        token={token} 
      />
    </main>
  );
  document.body.appendChild(el);
  render(appContents, el);
}

// OAuth 認証後に実行
window.oauthCallback = function (token) {
  renderApp(token);
};

// アプリ認証を使わない場合はユーザーログイン認証を実施
if (appConfig.oauth.appLogin === false) {
  oauth();
} else {
  renderApp(null);
}

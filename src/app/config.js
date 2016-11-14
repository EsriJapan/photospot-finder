// URL 末尾に ?demo を付記するとデモ用のアプリで起動 (現在位置を室蘭市某所の固定)
let demo = true;
const urlParams = location.search.substring(1).split('&');
urlParams.forEach(function (urlParam) {
  console.log(urlParam);
  if (urlParam === 'demo') {
    demo = false
  }
});
console.log('appConfig geolocation: ', demo);

export const appConfig = {
  oauth: {
    appLogin: false, // for Esri World Route Service
    appid: 'kJb12p62K5gGwjNx' // ArcGIS for Developers で発行したアプリID: https://developers.arcgis.com/applications/
  },
  ui: {
    title: 'PhotoSpot', // ヘッダーのタイトル (太字)
    subtitle: 'Finder', // ヘッダーのサブタイトル
    iconUrl: 'img/icon.png' // ヘッダーのアプリアイコン
  },
  map: {
    id: '956c47b1c2ea40a0b6530b3bb64af437', // ArcGIS Web マップ ID: http://esrijapan.github.io/arcgis-dev-resources/create-webmap/
    default: {
      center: [42.315, 140.982] // 初期表示の中心座標
    },
    geolocation: demo // 現在位置取得の有無
  },
  photoSearch: {
    radius: {
      walk: 2500, // 写真スポット検索範囲 (徒歩)
      car: 10000 // 写真スポット検索範囲 (自動車)
    },
    endpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_muroran/FeatureServer/0', // 写真スポット エンドポイント URL
    titleField: 'title', // タイトルのフィールド
    reporterNameField: 'reporter_name', // 投稿者名のフィールド
    commentField: 'comment_text', // コメントのフィールド
    reportDateField: 'report_time', // 投稿日時のフィールド
    routeViewCountField: 'route_view_count' // ルートビュー数のフィールド
  },
  photoSearch2: {
    endpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_kujiran/FeatureServer/0', // くじらんスポット エンドポイント URL
    titleField: 'title', // タイトルのフィールド
    reporterNameField: 'reporter_name', // 投稿者名のフィールド
    commentField: 'comment_text', // コメントのフィールド
    reportDateField: 'report_time', // 投稿日時のフィールド
    routeViewCountField: 'route_view_count' // ルートビュー数のフィールド
  },
  kujiran: {
    endpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_kujiran/FeatureServer/0' // くじらんスポット エンドポイント URL
  },
  yorimichiSpot: {
    endpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/室蘭市の観光情報(総務省公共クラウド)/FeatureServer/0' // 観光スポット エンドポイント URL
  },
  route: {
    style: {
      color: 'rgb(255, 100, 0)',
      weight: 7,
      opacity: 0.7,
      lineCap: 'round',
      dashArray: '1000',
      dashOffset: '1000',
      className: 'route-path'
    },
    bufferRadius: 250, // ルート バッファー半径 (寄り道スポット、くじらんの検索に使用)
    endpointUrl: '//route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World' // ルート検索サービス エンドポイント URL
    //endpointUrl: '//utility.arcgis.com/usrsvcs/appservices/GfNovy4yk5xdJ9b4/rest/services/World/Route/NAServer/Route_World'
  },
  spotformApp: {
    url: '//www.arcgis.com/apps/GeoForm/index.html?appid=9dd92be784fe4f3f8d5a70624781e3d1' // 写真スポット投稿フォーム アプリ URL
  },
  kujiranformApp: {
    url: '//www.arcgis.com/apps/GeoForm/index.html?appid=07dce0330c664f4d96f0d8dc27392b8c' // くじらんスポット投稿フォーム アプリ URL
  }
};

export default appConfig;

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
    title: 'PhotoSpot',
    subtitle: 'Finder',
    iconUrl: 'img/icon.png'
  },
  map: {
    id: '956c47b1c2ea40a0b6530b3bb64af437',
    default: {
      center: [42.315, 140.982]
    },
    geolocation: demo
  },
  photoSearch: {
    radius: {
      walk: 2500,
      car: 10000
    },
    endpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_muroran/FeatureServer/0'
  },
  kujiran: {
    endpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_kujiran/FeatureServer/0'
  },
  yorimichiSpot: {
    endpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/室蘭市の観光情報(総務省公共クラウド)/FeatureServer/0'
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
    bufferRadius: 250,
    endpointUrl: '//route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World'
    //endpointUrl: '//utility.arcgis.com/usrsvcs/appservices/GfNovy4yk5xdJ9b4/rest/services/World/Route/NAServer/Route_World'
  },
  spotformApp: {
    url: '//www.arcgis.com/apps/GeoForm/index.html?appid=9dd92be784fe4f3f8d5a70624781e3d1'
  }
};

export default appConfig;

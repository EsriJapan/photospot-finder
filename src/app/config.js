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
  map: {
    id: '956c47b1c2ea40a0b6530b3bb64af437',
    default: {
      center: [42.315, 140.982]
    },
    geolocation: demo
  },
  photoSearch: {
    radius: 2500,
    endpointUrl: '//services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/photospot_muroran/FeatureServer/0'
  },
  route: {
    endpointUrl: '//utility.arcgis.com/usrsvcs/appservices/GfNovy4yk5xdJ9b4/rest/services/World/Route/NAServer/Route_World'
  },
  spotformApp: {
    url: '//www.arcgis.com/apps/GeoForm/index.html?appid=9dd92be784fe4f3f8d5a70624781e3d1'
  }
};

export default appConfig;

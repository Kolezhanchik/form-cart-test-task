export default function geoFindMe() {
 
  function success(position) {
    let adress = ''
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    search(longitude, latitude).then((res) => {
      if (res.ok) { return res.json(); }
      return Promise.reject(res.status);
      })
      .then((res) => {
        document.querySelectorAll("input[name='City']").forEach(item => {
          item.value = res.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
        })
      })
      .catch((err) => {
      alert(err);
      })
      console.log(adress)
   return adress;
  }

  function error() {
    console.log('Unable to retrieve your location');
  }

  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
  } else {
    
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function search(longitude, latitude) {
  return fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=15e586b6-9e0e-4163-b84e-6eaec1f97d60&geocode=${longitude},${latitude}`);
}
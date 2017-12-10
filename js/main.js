var gUserLocation;
var gCurrLocation;
var gMap;
var gGeocoder;
var gGeoResults;
var elSreach;
var gMarker;
var elShareLink;
var gSearchTimeOut;

function initMap() {
    elShareLink = document.querySelector('#share-url');
    gMarker = new google.maps.Marker();
    gMarker.setIcon('./img/marker-sm.png');
    elSreach = document.getElementById('address');
    gGeocoder = new google.maps.Geocoder();

    gMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 8
    });
}
function getWheater() {
    var lat = gCurrLocation.lat();
    var lon = gCurrLocation.lng();

    var api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
        lat + '&lon=' +
        lon + '&units=metric&appid=6a033ffe42ff57654f7f07775eefa7ec';

    $.ajax({
        url: api_url,
        method: 'GET',
        success: function (data) {
            console.log(data);
            var tempr = data.main.temp;
            var icon = data.weather[0].icon;

            $('.inf-temp').html(tempr + '°' + '  <i class="owi owi-' + icon + '" aria-hidden="true"></i>');
        }
    });
}

function showPosition(position) {
    if (gUserLocation) {
        gMap.setCenter(gUserLocation);
    } else {
        gMap.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        gMap.setZoom(12);
        gUserLocation = new google.maps.LatLng(gMap.center.lat(), gMap.center.lng())
    }
    gCurrLocation = gMap.center;
    geocodeLatLng(gMap.center);
    setMarker(gMap.center);
}

function getCurrLocation() {
    if(gCurrLocation) return showPosition();
    navigator.geolocation.getCurrentPosition(showPosition);
}

function searchKeyPressed(event) {
    if (event.key === 'Enter') {
        console.log(event.key)
        setLocation(0);
        event.preventDefault();
    }
}

function geocodeLatLng(latlng) {
    gGeocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                gMap.setZoom(11);
                gGeoResults = results;
                updateInf(0);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function codeAddress() {
    var strAddress = elSreach.value;
    if (!strAddress) return toggleSuggestList(false);

    clearTimeout(gSearchTimeOut);
    console.log(gSearchTimeOut);
    gSearchTimeOut = setTimeout(function () {
        gGeocoder.geocode({ 'address': strAddress }, function (results, status) {
            if (status == 'OK') {
                gGeoResults = results;

                var strHtml = createSuggestions(results);
                document.querySelector('.suggest-list').innerHTML = strHtml;
                toggleSuggestList(true);
            } else {
                // alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }, 200);
}

function createSuggestions(results) {
    var strHtml = '';
    for (let i = 0; i < results.length; i++) {
        strHtml += `<div data-id="${i}" onclick="setLocation(this.getAttribute('data-id'))">${results[i]['formatted_address']}</div>`
    }
    return strHtml
}

function setLocation(idx) {
    if (!gGeoResults) return;
    gCurrLocation = gGeoResults[idx].geometry.location;

    toggleSuggestList(false);
    updateInf(idx);

    elSreach.value = gGeoResults[idx]['formatted_address'];
    gMap.setCenter(gGeoResults[idx].geometry.location);
    setMarker(gGeoResults[idx].geometry.location)
}

function updateInf(idx) {
    var element = gGeoResults[idx];
    console.log(element);
    // if(idx === undefined) {
    //     element = 
    //     return;
    // }
    document.querySelector('.inf-address').innerText = element['formatted_address'];
    elShareLink.value = getShareURL();
    getWheater();
}

function setMarker(location) {
    gMarker.setPosition(location);
    gMarker.setMap(gMap);
}

function toggleSuggestList(val) {
    document.querySelector('.suggest-list').style.display = (val) ? 'block' : 'none';
}

function copyCurrPosURL() {
    if (!elShareLink) return;
    elShareLink.value = getShareURL();
    elShareLink.select();
    document.execCommand('Copy');
}

function getShareURL() {
    return `https://www.google.com/maps/@${gCurrLocation.lat()},${gCurrLocation.lng()},${gMap.zoom}z`
}

const geocoder = new google.maps.Geocoder();

function getAddress(addressQuery) {
    return new Promise((resolve, reject) => {
        geocoder.geocode({
            'address': addressQuery
        }, (results, status) => {
            if (status == 'OK') {
                return resolve(results);
            }else{
                return reject('Geocoder failed due to: ' + status);
            }
        });
    })
};

function getAddressByLatLng(latlng) {
    return new Promise((resolve, reject) => {
        console.log('getAddressByLatLng');
        geocoder.geocode({
            'location': latlng
        }, (results, status) => {
            console.log('status: ', status);

            if (status === 'OK') {
                if (results[0]) {
                    return resolve(results[0])
                } else {
                    return reject('No Address founded')
                }
            } else {
                return reject('Geocoder failed due to: ' + status)
            }
        });
    })
}

export default {
    getAddressByLatLng,
    getAddress
}
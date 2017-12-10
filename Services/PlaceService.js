'use strict'
// import notes from './Notes.js';
var places = [{
        id: 1,
        name: 'Larisaz favorite place',
        tag: 'food',
        photos: ['http://susanskar.org/wp-content/uploads/2016/11/details-title.png','https://www.spritecloud.com/wp-content/uploads/2014/04/sC_icon_reputation_details.png'],
        lat: 31.742959,
        lng: 35.207018
    },
    {
        id: 2,
        name: 'Larisaz favorite place',
        tag: 'food',
        photos: ['http://susanskar.org/wp-content/uploads/2016/11/details-title.png','https://www.spritecloud.com/wp-content/uploads/2014/04/sC_icon_reputation_details.png'],
        lat: 31.772959,
        lng: 35.207018
    },
    {
        id: 3,
        name: 'Sumbats favorite place',
        tag: 'bowling',
        photos: ['http://susanskar.org/wp-content/uploads/2016/11/details-title.png'],
        lat: 31.761959,
        lng: 35.247018
    },
    {
        id: 4,
        name: 'Moshez favorite place',
        tag: 'work',
        photos: ['http://susanskar.org/wp-content/uploads/2016/11/details-title.png'],
        lat: 31.771959,
        lng: 35.217018
    },
    {
        id: 5,
        name: 'May favorite place',
        tag: 'food',
        photos: ['http://susanskar.org/wp-content/uploads/2016/11/details-title.png'],
        lat: 31.741959,
        lng: 35.211018
    },
];

// var places = getCopyOfPlaces();

// function getCopyOfPlaces(){
//     var newPlaces = JSON.stringify(serverPlaces);
//     return JSON.parse(newPlaces);
// }
function savePlace(place) {
    places.push(place)
    return Promise.resolve(places)
}
function getGeoRes(address){
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAdiZ5wvOh8BqfabcjzOlnfaXAQxRjNFG4`)
    .then(res => res.json()).then(res => res.results)
    
}
function getPlaces() {
    return Promise.resolve(places);
}

function deletePlaceById(placeId) {
    console.log('place id for delete ' + placeId)
    places = places.filter(place => place.id !== placeId);

    console.log('places', places)
    return Promise.resolve(places);
}

function getPlaceById(placeId) {
    return getPlaces().then(places => {
        let place = places.find(place => place.id === placeId); //'note.id == noteId' "==" cuz noteId is string
        console.log('place: ', place);
        return place;
    })
}

function addPlacePhoto(placeId, src) {
    return getPlaceById(placeId).then(place => {
        place.photos.push(src);
    })
}

function addNewPlace(place) {
    return getPlaces.then(places => places.push(place));
}

export default {
    getPlaces,
    getPlaceById,
    deletePlaceById,
    getGeoRes,
    savePlace,
}
import EventBus from '../Services/EventBus.js'
import GeoService from '../Services/GeoService.js'
import PlaceService from '../Services/PlaceService.js'
import InfoWindow from '../cmps/InfoWindow.js'

export default {
    template: `
        <div class="map">
            <div id="map">   
            </div>
            <info-window :selectedAddress="selectedAddress":tempMarker="tempMarker"></info-window>
        </div>
    `,
    props: {
        places: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            map: null,
            tempMarker: null,
            tempInfoWindow: null,
            selectedAddress: {
                address: null,
                displayMsg: null,
                error: false,
            },
            markers: [],
        }
    },
    methods: {
        createMarkers() {
            for (var i = 0; i < this.places.length; i++) {
                var place = this.places[i];
                let isMarkerInMarkers = this.markers.some(marker => {
                    return marker.id === place.id
                });
                if(isMarkerInMarkers) {
                    
                    console.log('continue: ');
                    continue;
                }
                this.markers.push(this.createMarker(place));
            }
        },
        createMarker(place) {
            let infowindow = new google.maps.InfoWindow({
                content: `Place ${place.id}`
            });

            let marker = new google.maps.Marker();
            let icon = `/assets/${place.tag}.png`
            marker.addListener('click', () => {
                infowindow.open(this.map, marker);
            });
            if(place.tag){
                marker.setIcon(icon)
            }else{
                marker.setIcon('/assets/marker-sm.png')
            }
            marker.setPosition(new google.maps.LatLng(place.lat, place.lng));
            marker.setMap(this.map);
            return {
                id: place.id,
                marker
            }
        },
        getAddressByLatLng(latLng) {
            GeoService.getAddressByLatLng(latLng).then(resAddress => {
                this.selectedAddress.address = resAddress;
                this.selectedAddress.error = false;
                this.selectedAddress.displayMsg = resAddress.formatted_address;

            }).catch(rejectMsg => {
                this.selectedAddress.error = true;
                this.selectedAddress.displayMsg = rejectMsg
            })
        },
    },
    watch: {
        places() {
            if (this.places.length !== 0) {
                this.createMarkers();
            };
        },
        'selectedAddress.address' () {
            let pos = this.selectedAddress.address.geometry.location;
            this.tempMarker.setPosition(pos);
            this.map.setCenter(pos);
            EventBus.$emit('addressChanged', this.selectedAddress)
        }
    },
    created() {
        EventBus.$on('suggestSelected', suggest => {
            console.log('suggest: ', suggest);
            this.selectedAddress.address = suggest;
            this.selectedAddress.displayMsg = this.selectedAddress.address.formatted_address;
        })
        EventBus.$on('deleteMarker', id => {
            let marker = this.markers.find((marker) => {
                return marker['id'] == id
            });
            this.markers.indexOf(marker);
            let idx = this.markers.indexOf(marker);
            this.markers[idx].marker.setMap(null);
            this.markers[idx].marker = null;
            this.markers.splice(idx, 1);
        })
        EventBus.$on('placeSelected', index => {
            if(!this.places[index])return;
            let place = this.places[index];
            let latlng = {
                lat: place.lat,
                lng: place.lng
            }
            this.map.setCenter(latlng);
        })
        EventBus.$on('savePlace', () => {this.tempMarker.setMap(null)})
    },
    mounted() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: {
                lat: 31.771959,
                lng: 35.217018,
            }
        });

        this.map.addListener('click', e => {
            // this.map.setCenter(e.latLng)
            this.tempMarker.setMap(this.map);
            this.tempMarker.setPosition(e.latLng);
            this.tempInfoWindow.close();
            this.getAddressByLatLng(e.latLng)
        });

        this.tempInfoWindow = new google.maps.InfoWindow();

        this.tempMarker = new google.maps.Marker();
        this.tempMarker.setMap(this.map);

        this.tempMarker.addListener('click', () => {
            this.tempInfoWindow.open(this.map, this.tempMarker);
        });
    },
    components: {
        InfoWindow
    }
}
'use strict'
import GoogleMap from '../cmps/GoogleMap.js';
import AddingModal from '../cmps/AddingModal.js';
import PlacesList from '../cmps/PlacesList.js'
import GeoSearch from '../cmps/GeoSearch.js';
// import PlaceDetails from '../cmps/PlaceDetails.js';
import PlaceService from '../Services/PlaceService.js'
import EventBus from '../Services/EventBus.js'
// import PlaceService from '../Services/PlaceService.js';

export default {
    template: `
        <section>
            <google-map :places="places"></google-map>
            <adding-modal :id="places.length+1"></adding-modal>
            <geo-search @addPlace="addPlace"></geo-search>
            <p style="margin: 10px 0">
                Length of places : {{placesComputed}}
            </p>
            <places-list v-if="places" :items="places"></places-list>
        </section>
    `,
    data() {
        return {
            show: true,
            places: [],
            placesComputed: 0,
        }
    },
    watch: {
        places() {
            this.placesComputed = this.places.length
        }
    },
    methods: {
        getPlaces() {
            PlaceService.getPlaces().then(places => this.places = places)
        },
        addPlace(place) {
            this.places.push(place)
        }
    },
    created() {
        this.getPlaces();
        EventBus.$on('savePlace', place => {
            PlaceService.savePlace(place).then(places => {
                console.log('places: ', places);
                this.places = places;
            })
        });
        EventBus.$on('deletePlace', id => {
            PlaceService.deletePlaceById(id).then(places => {
                EventBus.$emit('deleteMarker' , id);
                console.log('places: ', places);
                this.places = places;
            })
        })
    },
    components: {
        GoogleMap,
        GeoSearch,
        PlacesList,
        AddingModal
    }
}
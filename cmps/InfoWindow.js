import EventBus from '../Services/EventBus.js'
import GeoService from '../Services/GeoService.js'

export default {
    template: `

        <div class="notification column"  v-if="selectedAddress && show">
            <button class="button delete" @click="show = false"></button>
                
                    <span :class="{ 'has-text-danger': selectedAddress.error}">
                       <strong> {{selectedAddress.displayMsg}} </strong>
                    </span>
               
            <div v-if="!selectedAddress.error">
                <hr/>
                <button class="button is-success" @click="showAddModal">Add Place</button>
            </div>
        </div>
    `,
    props: {
        selectedAddress: {
            type: Object,
            required: false
        },
        tempMarker: {
            type: Object,
            required: false
        }

    },
    data() {
        return {
            show: false,
        }
    },
    methods: {
        showAddModal() {
            this.show = false;
            EventBus.$emit('showAddModal');
        },
    },
    watch: {
        'selectedAddress.displayMsg' () {
            this.show = true;
        },
        'tempMarker.changed' () {
            console.log(this.tempMarker)
        }
    },
    created() {
        EventBus.$on('suggestSelected',()=>{this.show = true})
    }


}
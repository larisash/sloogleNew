import EventBus from '../Services/EventBus.js'
import GeoService from '../Services/GeoService.js'


export default {
    template: `
    <div class="modal" :class="{'is-active' : isActive}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Adding place</p>
                <button class="delete" @click="isActive=false"></button>
            </header>
            <section class="modal-card-body">
                <input class="input" type="text" v-model="placeToAdd.name"/>
                <div class="select">

                    <div class="field has-addons">
                        <div class="control">
                            <select v-model="placeToAdd.tag" placeholder="Select tag">
                                <option>Work</option>
                                <option>Food</option>
                                <option>Bowling</option>
                                <option>Shop</option>
                                <option>Coffe</option>
                                <option>Restaurant</option>
                            </select>
                        </div> 
                        <div class="control">
                            <span><img :src="tagSrc"/></span>
                        </div>
                    </div>
                </div>
                <input class="input" type="text"/>
                <textarea class="textarea" placeholder="10 lines of textarea" rows="6" v-model="placeToAdd.desc"></textarea>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="savePlace">Save changes</button>
                <button class="button" @click="isActive=false">Cancel</button>
            </footer>
        </div>
    </div>
    `,
    props: {
        id: {
            required: true,
        }
    },
    data() {
        return {
            isActive: false,
            placeToAdd: {
                id: null,
                name: '',
                desc: '',
                tag: '',
                photos: [],
                lat: null,
                lng: null
            }
        }
    },
    computed:{
        tagSrc(){
            return `/assets/${this.placeToAdd.tag}.png`
        }
    },
    methods: {
        savePlace() {
            EventBus.$emit('savePlace', this.placeToAdd);
            this.isActive = false;
        }
    },
    created() {
        EventBus.$on('addressChanged', selectedAddress => {
            this.placeToAdd = {
                id: this.id,
                name: selectedAddress.address.formatted_address,
                tag: '',
                photos: [],
                lat: selectedAddress.address.geometry.location.lat(),
                lng: selectedAddress.address.geometry.location.lng(),
            }
        });
        EventBus.$on('showAddModal',() => {this.isActive = true})
    }
}
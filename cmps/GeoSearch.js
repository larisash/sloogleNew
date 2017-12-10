import EventBus from '../Services/EventBus.js'
import GeoService from '../Services/GeoService.js'

export default {
    template: `
    <div class="col">
    
        
        <div class="field has-addons">
            <div class="control" style="width:100%">
                <input type="text" class="input" v-model="addressQuery" @keyup.enter="searchClicked"/>
            </div>
            <div class="control">
                 <button class="button btn-blue" @click="searchClicked"><i class="fa fa-search"></i></button>
            </div>
        </div>
        <div class="suggest-list">
            <ul class="menu-list ">
                <strong>
                    <li v-for="(suggest,index) in suggests" :key="index" @click="suggestClicked(index)">
                        <a>{{suggest.formatted_address}} </a> 
                    </li>
                </strong>
            </ul>

        </div>
    </div>
    `,
    data() {
        return {
            suggests: [],
            addressQuery: '',
        }
    },
    watch: {
        addressQuery() {
            this.search();
        }
    },
    methods: {
        search() {
            return GeoService.getAddress(this.addressQuery).then(results => {
                this.suggests = results;
            })
        },
        searchClicked() {
            this.search().then(() => {
                this.suggestClicked(0);
            })
        },
        addPlace() {
            this.$emit('addPlace');
        },
        getAddress() {

        },
        suggestClicked(index) {
            if (!this.suggests[index]) return;
            this.addressQuery = this.suggests[index].formatted_address
            EventBus.$emit('suggestSelected', this.suggests[index])
        }
    }
}
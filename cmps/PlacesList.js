import EventBus from '../Services/EventBus.js'

export default {
    template: `
    <div>
        <ul class="menu-list">
            <li v-for="(item,index) in items" :key="index">
                <a @click="placeSelected(index)" class="menu-a">
                    <img class="flex-center" :src="'/assets/' + item.tag + '.png'"/>
                    <span>
                        <strong>
                            {{item.name}} / 
                            {{item.tag}} 
                        </strong>
                    </span>
                    <button class="button btn-blue inline-block" @click.self="deletePlace(item.id)">
                        <i class="fa fa-trash"></i>
                    </button>
                </a>
            </li>
        </ul>
    </div>
    `,
    props: {
        items: {
            type: Array,
            required: true,
        }
    },
    methods: {
        deletePlace(id) {
            EventBus.$emit('deletePlace', id)
        },
        placeSelected(index) {
            EventBus.$emit('placeSelected', index)
        }
    },
}
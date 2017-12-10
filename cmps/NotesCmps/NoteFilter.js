import EventBus from '/Services/EventBus.js'

export default {
    template: `
    <div class="filter">
     <button class="button btn-blue" @click="filterByDate">By Date</button>
     <button class="button btn-blue" @click="filterByPriority">By Priority</button> 
    </div>
    `,
    data(){
        return{
            filterToggle: true
        }
    },
    methods:{
        filterByDate(){
            EventBus.$emit('noteFilterChanged', 'date',this.filterToggle);
            this.filterToggle = !this.filterToggle;
        },
        filterByPriority(){
            EventBus.$emit('noteFilterChanged', 'priority',this.filterToggle);
            this.filterToggle = !this.filterToggle;
        }
    }
}
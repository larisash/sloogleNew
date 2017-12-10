import EventBus from '/Services/EventBus.js'

export default {
    template: `
    <div class="field has-addons ">
        <div class="control " style="width:100%">
            <input type="text" class="input" v-model="searchQuery" @keyup.enter="searchNote"/>
        </div>
        <div class="control ">
            <button class="button btn-blue">Search</button>
        </div>
    </div>
    `,
    data(){
        return{
            searchQuery:'',
        }
    },
    methods:{
        searchNote(){
            alert(this.noteQuery)
        }
    },
    watch:{
        searchQuery(){
            this.$emit('seachQueryChanged',this.searchQuery)
        }
    }
}
import EventBus from '/Services/EventBus.js'
import NoteItem from './NoteItem.js'

export default {
    template: `
    <div class="note-list">
        <note-item v-if="notesLength" v-for="(note, index) in notes" :key="index" :note="note"></note-item>
    </div>
    `,
    props:{
        notes:{
            type:Array,
            required:true
        }
    },
    computed:{
        notesLength(){
            return this.notes.length > 0;
        }
    },
    components:{
        NoteItem
    }
}
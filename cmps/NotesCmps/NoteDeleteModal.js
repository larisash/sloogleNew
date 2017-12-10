import EventBus from '/Services/EventBus.js'

export default {
    template: `
    <div class="modal" :class="{'is-active' : isActive}">
        <div class="modal-background"></div>
        <div class="modal-card" :class="{'animated bounceIn' : isActive}">
            <header class="modal-card-head">
                <p class="modal-card-title">Delete Note</p>
                <button class="delete" @click="isActive=false"></button>
            </header>
            <section class="modal-card-body">
                ARE YOU SURE YOU WANT TO DELETE THIS NOTE?
            </section>
            <footer class="modal-card-foot">
                <button class="button red" @click="deleteNote">Delete</button>
                <button class="button" @click="isActive=false">Cancel</button>
            </footer>
        </div>
    </div>
    `,
    data() {
        return {
            isActive: false,
            noteToDelete:{},
        }
    },
    methods:{
        colorSelected(color){
            this.note.color = color
        },
        deleteNote(){
            EventBus.$emit('deleteNote', this.noteToDelete.id);
            this.isActive = false;
        }
    },
    created(){
        EventBus.$on('showDeleteModal', noteToDelete =>{
            this.noteToDelete = noteToDelete;
            this.isActive = true;
        })
        
    }
}
import EventBus from '/Services/EventBus.js'


export default {
    template: `
    <div class="modal" :class="{'is-active' : isActive }">
        <div class="modal-background"></div>
        <div class="modal-card" :class="{'animated bounceInDown' : isActive}">
            <header class="modal-card-head">
                <p class="modal-card-title">Adding Note</p>
                <button class="delete" @click="isActive=false"></button>
            </header>
            <section class="modal-card-body">
                <input class="input" type="text" placeholder="Note title" v-model="note.title"/>
                <div class="select">
                    <div class="control">
                        <select placeholder="Select tag" v-model="note.priority">
                            <option>Important</option>
                            <option>Regular</option>
                        </select>
                    </div> 
                </div>
                <textarea class="textarea" placeholder="10 lines of textarea" rows="6" v-model="note.text"></textarea>
                <div class="colors">
                    <div class="red" @click="colorSelected('red')"></div></a>
                    <div class="green" @click="colorSelected('green')"></div>
                    <div class="orange" @click="colorSelected('orange')"></div>
                </div>
                </section>
            <footer class="modal-card-foot">
                <button class="button btn-blue" @click="saveChanges">Save changes</button>
                <button class="button" @click="isActive=false">Cancel</button>
            </footer>
        </div>
    </div>
    `,
    data() {
        return {
            noteToDelete:{},
            note:{},
            isActive: false,
        }
    },
    methods:{
        colorSelected(color){
            this.note.color = color
        },
        saveChanges(){
            EventBus.$emit('noteEdited', this.note , this.noteToDelete);
            this.isActive = false;
        }
    },
    created(){
        EventBus.$on('showEditModal', note=>{
            this.noteToDelete = note;
            var strNoteObj = JSON.stringify(note);
            this.note = JSON.parse(strNoteObj);
            this.note.date = this.noteToDelete.date;
            this.isActive = true;
        })
    }
}
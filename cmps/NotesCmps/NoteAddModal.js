import EventBus from '/Services/EventBus.js'


export default {
    template: `
    <div class="modal" :class="{'is-active' : isActive}">
        <div class="modal-background"></div>
        <div class="modal-card" :class="{'animated fadeInLeft' : isActive}">
            <header class="modal-card-head">
                <p class="modal-card-title">Adding Note</p>
                <button class="delete" @click="isActive=false"></button>
            </header>
            <section class="modal-card-body">
                <input class="input" type="text" placeholder="Note title" v-model="noteToAdd.title"/>
                <div class="select">
                    <div class="control">
                        <select placeholder="Select tag" v-model="noteToAdd.priority">
                            <option>Important</option>
                            <option>Regular</option>
                        </select>
                    </div> 
                </div>
                <textarea class="textarea" placeholder="10 lines of textarea" rows="6" v-model="noteToAdd.text"></textarea>
                <div class="colors">
                    <a></a><div class="red" @click="colorSelected('red')"></div></a>
                    <div class="green" @click="colorSelected('green')"></div>
                    <div class="orange" @click="colorSelected('orange')"></div>
                </div>
                </section>
            <footer class="modal-card-foot">
                <button class="button btn-blue" @click="addNote">Save changes</button>
                <button class="button" @click="isActive=false">Cancel</button>
            </footer>
        </div>
    </div>
    `,
    data() {
        return {
            isActive: false,
            noteToAdd: {
                id: this.noteId,
                title: '',
                color: 'green',
                image: '',
                text: '',
                priority: 'Regular',
                date: '',
            }
        }
    },
    methods:{
        colorSelected(color){
            this.noteToAdd.color = color
        },
        addNote(){
            if(!this.noteToAdd.title.trim()) this.noteToAdd.title = 'No Title'
            this.noteToAdd.date = new Date();
            EventBus.$emit('addNote', this.noteToAdd);
            this.noteToAdd =  {
                id: 0,
                title: '',
                color: 'green',
                image: '',
                text: '',
                priority: 'Regular',
                date: '',
            }
            this.isActive = false;
        }
    },
}
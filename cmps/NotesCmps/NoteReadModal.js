import EventBus from '/Services/EventBus.js'

export default {
    template: `
    <div v-if="note"class="modal" :class="{'is-active' : isActive}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Read Note</p>
                <button class="delete" @click="isActive=false"></button>
            </header>
            <section class="modal-card-body">
                <div class="content">
                <h1>{{note.title}}</h1>
                <div class="break-word">
                    {{note.text}}
                </div>
                <hr/>
                <strong>{{convertedDate}}</strong>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button" @click="isActive=false">Cancel</button>
            </footer>
        </div>
    </div>
    `,
    data() {
        return {
            isActive: false,
            note:null,
        }
    },
    computed:{
        convertedDate(){
            return this.note.date.toLocaleString();
        }
    },
    created(){
        EventBus.$on('showReadModal', note =>{
            this.note = note;
            this.isActive = true;
        })
        
    }
}
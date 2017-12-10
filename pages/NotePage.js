'use strict'
import EventBus from '/Services/EventBus.js'
import NoteService from '/Services/NoteService.js'
import NoteList from '../cmps/NotesCmps/NoteList.js'
import NoteFilter from '../cmps/NotesCmps/NoteFilter.js'
import NoteSearch from '../cmps/NotesCmps/NoteSearch.js'
import NoteModal from '../cmps/NotesCmps/NoteAddModal.js'
import EditModal from '../cmps/NotesCmps/NoteEditModal.js'
import DeleteModal from '../cmps/NotesCmps/NoteDeleteModal.js'
import ReadModal from '../cmps/NotesCmps/NoteReadModal.js'

export default {
    template: `
        <section class="container is-centered"> 
            <div class="note-nav">
                <note-search @seachQueryChanged="seachQueryChanged"></note-search>
                <div class="filter-container">
                    <button class="button btn-blue" @click="showAddModal">+</button>
                    <div class="note-filter">
                        <note-filter></note-filter>
                    </div>           
                </div>
                </div>
            <note-list :notes="notesDoDisplay"></note-list>
            <note-modal ref="noteModal"></note-modal>
            <edit-modal></edit-modal>
            <delete-modal></delete-modal>
            <read-modal></read-modal>
        </section>
    `,
    data() {
        return {
            notes: [],
            searchQuery: '',
        }
    },
    methods: {
        showAddModal() {
            this.$refs.noteModal.isActive = true;
            console.log('this.$refs.noteModal: ', this.$refs.noteModal);
        },
        seachQueryChanged(searchQuery) {
            this.searchQuery = searchQuery;
        }
    },
    computed: {
        notesDoDisplay() {
            return this.notes.filter(note => {
                return note.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1 ||
                    note.text.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1
            })
        }
    },
    created() {

        NoteService.getNotes().then(notes => {
            this.notes = notes;
        })
        EventBus.$on('addNote', note => {
            var maxId = 0;
            if(this.notes.length > 0 ) maxId = Math.max.apply(Math, this.notes.map(function (o) { return o.id }));
            note.id = maxId + 1;
            console.log(' note.id: ', note.id);
            NoteService.addNewNote(note).then(notes => {
                this.notes = notes;
                EventBus.$emit('anim',note.id,'animNew')
            });
        });
        EventBus.$on('deleteNote', noteId => {

            EventBus.$emit('anim',noteId,'animDelete');
            setTimeout(() => {
                NoteService.deleteNoteById(noteId).then(notes => {
                    this.notes = notes;
                    EventBus.$emit('anim',-1,'animDelete');
                    
                });
            }, 1000);
        });
        EventBus.$on('noteEdited', (noteToAdd, noteToDelete) => {
                NoteService.editNoteById(noteToDelete.id,noteToAdd).then(notes => {
                    this.notes = notes;
                    EventBus.$emit('anim',noteToDelete.id,'animEdit');
                })
        });
        EventBus.$on('noteFilterChanged', (type, toggle) => {
            if (type === 'priority') {
                this.notes.sort((a) => {
                    if (a.priority.startsWith('I')) {
                        if (toggle) return 1
                        return -1
                    } else {
                        if (toggle) return -1
                        return 1
                    }
                })
            } else { //byDate
                this.notes.sort((a, b) => {
                    if (toggle) {
                        console.log('a.date.getTime() - b.date.getTime(): ', a.date.getTime() - b.date.getTime());
                        return a.date.getTime() - b.date.getTime();
                    } else {
                        return b.date.getTime() - a.date.getTime();
                    }
                })
            }
        });
    },
    components: {
        NoteList,
        NoteSearch,
        NoteModal,
        NoteFilter,
        EditModal,
        DeleteModal,
        ReadModal
    }

}
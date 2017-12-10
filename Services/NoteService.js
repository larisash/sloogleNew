'use strict'

// Priority : Important, Regular,
var notes = [{
        id: 1,
        title: 'Hellooooo',
        color: 'red',
        image: '',
        text: 'Lorem ipsum asiudunfjdpofkgboiksdbgfpoiajsodijfaoisdjfasjdoibufnsnu',
        priority: 'Regular',
        date: new Date(),
    },
    {
        id: 2,
        title: 'Larisa',
        color: 'green',
        image: '',
        text: '',
        priority: 'Important',
        date: new Date(),
    },
    {
        id: 3,
        title: 'Sumbate',
        color: 'orange',
        image: '',
        text: '',
        priority: 'Important',
        date: new Date(),
        
    },
    {
        id: 4,
        title: 'Sumbate',
        color: 'orange',
        image: '',
        text: '',
        priority: 'Regular',
        date: new Date(),
    },
    {
        id: 5,
        title: 'Sumbate',
        color: 'orange',
        image: '',
        text: '',
        priority: 'Regular',
        date: new Date(),        
    },
];

function saveNote(note) {
    notes.push(note)
    return Promise.resolve(notes)
}

function getNotes() {
    return Promise.resolve(notes);
}
function editNoteById(noteId,note) {
    console.log('noteId,note: ', noteId,note);
    var idx = notes.findIndex(note => {
       return note.id === noteId;
    })
    notes.splice(idx,1,note);
    return Promise.resolve(notes);
}
function deleteNoteById(noteId) {
    notes = notes.filter(note => note.id !== noteId);
    return Promise.resolve(notes);
}

function getNoteById(noteId) {
    return getNotes().then(notes => {
        let note = notes.find(note => note.id === noteId); //'note.id == noteId' "==" cuz noteId is string
        return note;
    })
}

function addNotePhoto(noteId, src) {
    return getNoteById(noteId).then(note => {
        note.image = src;
    })
}

function addNewNote(note) {
    console.log('note: ', note);
    notes.push(note);
    return Promise.resolve(notes);
}

export default {
    addNewNote,
    getNotes,
    getNoteById,
    deleteNoteById,
    saveNote,
    editNoteById,
}
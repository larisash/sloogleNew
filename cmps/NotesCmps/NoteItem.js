import EventBus from '/Services/EventBus.js'

export default {
    template: `

    <div class="card" :class="[this.note.color, {'animated zoomOutDown': animDelete , 'animated zoomIn': animNew, 'animated jello': animEdit }]" >
    <header class="card-header">
        <p class="card-header-title">
            {{note.title}}
        </p>
        <a href="#" class="card-header-icon has-text-light" aria-label="more options">
            <span class="icon" @click="showReadModal">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
        </a>
        </header>
        <div class="card-content">
        <strong class="has-text-light">{{convertedDate}}</strong>
        <div class="content has-text-light">
                <div class="break-word">
                    {{subStringText}}
                    
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <a href="#" class="card-footer-item has-text-light" @click.prevent="editNote">Edit</a>
            <a href="#" class="card-footer-item has-text-light" @click.prevent="showDeleteModal">Delete</a>
        </footer>
    </div>
    `,
    props: {
        note: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isActive: true,
            animDelete: false,
            animNew: true,
            animEdit: false
        }
    },
    computed: {
        convertedDate() {
            return this.note.date.toLocaleString();
        },
        subStringText() {
            if (!this.note.text) return 'No description...';
            return this.note.text.substring(60, 0) + '...'
        }
    },
    methods: {
        editNote() {
            EventBus.$emit('showEditModal', this.note);
        },
        showReadModal() {
            EventBus.$emit('showReadModal', this.note)
        },
        showDeleteModal() {
            EventBus.$emit('showDeleteModal', this.note)
        }
    },
    created() {
        EventBus.$on('anim', (noteId, anim) => {
            if (this.note.id === noteId) {

                this.animDelete = false;
                this.animNew = false;
                this.animEdit = false;
                this[anim] = true;
                setTimeout(() => {
                    this[anim] = false;
                    console.log('this[anim: ', this[anim]);
                }, 1000);

            } else {
                this[anim] = false;
            }
            console.log('this[anim]: ', this[anim]);
        });

    }
}
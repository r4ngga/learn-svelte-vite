<script >
    //  Global Imports
  
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faPlus } from '@fortawesome/free-solid-svg-icons';
  

    //  Component Imports
  
    import Note from '../pages/components/Note.svelte'
    import EditNoteModal from '../pages/components/EditNoteModal.svelte'
    import DeleteNoteModal from '../pages/components/DeleteNoteModal.svelte'
  
    //  Varaible Declarations
  
    let notesJSONString = localStorage.getItem('notes')
  
    let notes;
  
    // Notes initialization
    if (notesJSONString) {
      try {
        notes = JSON.parse(notesJSONString);
      } catch(err) {
        console.error(err)
      }
    } else {
      notes = [
        {
          id: 1,
          title: 'Some Note',
          content: 'This note is about this and that',
          date: '20221011151951',
          isFavorite: false,
          tags: ['test', 'text']
        },
        {
          id: 2,
          title: 'Another Note',
          content: 'This is yet another note about this and that',
          date: '20221011151951',
          isFavorite: false,
          tags: ['test', 'text', 'extra']
        },
        {
          id: 3,
          title: 'Lorem ipsum',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in bibendum tellus. ',
          date: '20221011151951',
          isFavorite: true,
          tags: ['lorem', 'ipsum']
        }
      ]
    }
  

    //  Edit Modal Methods
  
    // For Editing
    let noteToEdit;
    let showEditModal = false;
  
    /**
     * Display the Note details modal
     */
    const openEditNote = (note) => {
      noteToEdit = {}
  
      if (note) {
        noteToEdit = note
      }
  
      showEditModal = true
    }
  
    /**
     * Close the Note details modal
     */
    const closeEditModal = () => {
      noteToEdit = {}
      showEditModal = false
    }
  
    //  Delete Modal Methods
  
    // For Deleting
    let noteToDelete;
    let showDeleteModal = false
  
    /**
     * Display the Note details modal     
     */
    const openDeleteNote = (event) => {
      const deleteNoteIndex = event.detail;
  
      const noteIndex = notes.findIndex(item => item.id === deleteNoteIndex)
  
      if (noteIndex !== -1) {
        noteToDelete = notes[noteIndex]
        showDeleteModal = true
      }
    }
  
    /**
     * Close the Note details modal

     */
    const closeDeleteModal = () => {
      noteToDelete = {}
      showDeleteModal = false
    }
  
  
    /**
     * Save notes in the local storage
     */
    const saveNotesToStorage = () => {
      // for reactivity purposes
      notes = notes
  
      // save it in the local storage
      localStorage.setItem('notes', JSON.stringify(notes))
    }
  
    /**
     * Toggle the favorite flag of a given post
     * and save the changes to local storage
     *
     */
    const toggleFavorite = (event) => {
      const noteId = event.detail
  
      const note = notes.find(item => item.id === noteId)
  
      if (note) {
        note.isFavorite = !note.isFavorite
  
        saveNotesToStorage()
      }
    }
  
    /**
     * Update the eixting note or add the new note
     *
     *
     * 
     */
    const saveNote = (event) => {
      closeEditModal()
  
      const note = event.detail
      const noteIndex = notes.findIndex(item => item.id === note.id)
      
      if (noteIndex !== -1) {
        notes[noteIndex] = note    
      } else {
        notes.push(note)
      }
  
      saveNotesToStorage()
    }
  
    /**
     * 
     *      
     */
    const deleteNote  = (event) => {
      closeDeleteModal()
      closeEditModal()
  
      const deleteNoteIndex = event.detail 
      const noteIndex = notes.findIndex(item => item.id === deleteNoteIndex)
      
      if (noteIndex !== -1) {
        notes.splice(noteIndex, 1)
      }
  
      console.log(notes)
  
      saveNotesToStorage()
    }
  </script>
  
  <main>
    <div class="note-card-container">
      <div class="note-card-add" on:click="{() => { openEditNote() }}">
        <Fa icon={faPlus} color="#afaeae" size="3x" />
      </div>
  
      {#each notes as note (note.id)}
        <Note
          {...note}
          on:click="{() => { openEditNote(note) }}"
          on:toggleFavorite="{toggleFavorite}"
        />
      {/each}
    </div>
  </main>
  
  {#if showEditModal}
    <EditNoteModal
      {...noteToEdit}
      on:save="{saveNote}"
      on:delete="{openDeleteNote}"
      on:close="{closeEditModal}"
    />
  {/if}
  
  {#if showDeleteModal}
    <DeleteNoteModal
      {...noteToDelete}
      on:delete="{deleteNote}"
      on:close="{closeDeleteModal}"
    />
  {/if}
  
  <style lang="scss">
    main {
      padding: 2em;
      margin: 0 auto;
      width: 100vw;
      box-sizing: border-box;
    }
  
    .note-card {
      &-add {
        background-color: #d6d4d4;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: none;
        border: 4px dashed #a29f9f;
        width: 144px;
        height: 189px;
        color: #a29f9f;
        margin-right: 15px;
        padding: 15px;
        border-radius: 10px;
  
        &:hover {
            background-color: #c5c5c5;
        }
      }
  
      &-container {
        display: flex;
      }
    }
  </style>
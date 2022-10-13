<script >
  //  Global Imports

  import Fa from 'svelte-fa/src/fa.svelte'
  import { faPlus } from '@fortawesome/free-solid-svg-icons';
  import {afterUpdate} from 'svelte';
  import AddNoteModal from '../components/AddNoteModal.svelte';
  import Note from '../components/Note.svelte';

  // export let title;
  export let nameheader;

  let noteItem = [];

  afterUpdate(function(){
    localStorage.setItem("NoteItem", JSON.stringify(noteItem));
  });
  let notesJSONString = localStorage.getItem('NoteItem');

  if(notesJSONString){
    try {
        noteItem = JSON.parse(notesJSONString);
      } catch(err) {
        console.error(err)
      }
  }else{
    noteItem = [
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

  const toggleFavorite = (event) => {
    const noteId = event.detail;

    const notenya = noteItem.find(item => item.id === noteId);

    if(notenya){
      notenya.isFavorite = !notenya.isFavorite

      saveNotesToStorage();
    }
  }
  
  function increment(id){

    console.log(id);

    const index = noteItem.findIndex(function(e){
      if(e.id === id){
        return true;
      }
    });
  }

  // const saveNote = (event) => {
  //   const note = event.detail;
  //   const noteIndex = noteItem.findIndex(item => item.id === note.id);

  //   if(noteIndex !== -1){
  //     noteItem[noteIndex] = note;
  //   }else{
  //     noteItem.push(note);
  //   }
  //   saveNotesToStorage();
  // }

  function addNote({id, title, content, date, isFavorite, tags}){
    console.log({id: noteItem.length+1,title, content, date, isFavorite:false, tags});
    noteItem.push({id: noteItem.length+1,title, content, date, isFavorite:false, tags});
    localStorage.setItem("NoteItem", JSON.stringify(noteItem));
    noteItem = noteItem;
  }

  const saveNotesToStorage = () => {

    noteItem = noteItem;

    localStorage.setItem("NoteItem", JSON.stringify(noteItem));

  }

  // //  Component Imports

  // import Note from '../components/Note.svelte'
  // import EditNoteModal from '../components/EditNoteModal.svelte'
  // import DeleteNoteModal from '../components/DeleteNoteModal.svelte'

  // //  Varaible Declarations

  // let notesJSONString = localStorage.getItem('notes')

  // let notes;

  // // Notes initialization
  // if (notesJSONString) {
  //   try {
  //     notes = JSON.parse(notesJSONString);
  //   } catch(err) {
  //     console.error(err)
  //   }
  // } else {
  //   notes = [
  //     {
  //       id: 1,
  //       title: 'Some Note',
  //       content: 'This note is about this and that',
  //       date: '20221011151951',
  //       isFavorite: false,
  //       tags: ['test', 'text']
  //     },
  //     {
  //       id: 2,
  //       title: 'Another Note',
  //       content: 'This is yet another note about this and that',
  //       date: '20221011151951',
  //       isFavorite: false,
  //       tags: ['test', 'text', 'extra']
  //     },
  //     {
  //       id: 3,
  //       title: 'Lorem ipsum',
  //       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in bibendum tellus. ',
  //       date: '20221011151951',
  //       isFavorite: true,
  //       tags: ['lorem', 'ipsum']
  //     }
  //   ]
  // }


  // //  Edit Modal Methods

  // // For Editing
  // let noteToEdit;
  // let showEditModal = false;

  // /**
  //  * Display the Note details modal
  //  */
  // const openEditNote = (note) => {
  //   noteToEdit = {}

  //   if (note) {
  //     noteToEdit = note
  //   }

  //   showEditModal = true
  // }

  // /**
  //  * Close the Note details modal
  //  */
  // const closeEditModal = () => {
  //   noteToEdit = {}
  //   showEditModal = false
  // }

  // //  Delete Modal Methods

  // // For Deleting
  // let noteToDelete;
  // let showDeleteModal = false

  // /**
  //  * Display the Note details modal     
  //  */
  // const openDeleteNote = (event) => {
  //   const deleteNoteIndex = event.detail;

  //   const noteIndex = notes.findIndex(item => item.id === deleteNoteIndex)

  //   if (noteIndex !== -1) {
  //     noteToDelete = notes[noteIndex]
  //     showDeleteModal = true
  //   }
  // }

  // /**
  //  * Close the Note details modal

  //  */
  // const closeDeleteModal = () => {
  //   noteToDelete = {}
  //   showDeleteModal = false
  // }


  // /**
  //  * Save notes in the local storage
  //  */
  // const saveNotesToStorage = () => {
  //   // for reactivity purposes
  //   notes = notes

  //   // save it in the local storage
  //   localStorage.setItem('notes', JSON.stringify(notes))
  // }

  // /**
  //  * Toggle the favorite flag of a given post
  //  * and save the changes to local storage
  //  *
  //  */
  // const toggleFavorite = (event) => {
  //   const noteId = event.detail

  //   const note = notes.find(item => item.id === noteId)

  //   if (note) {
  //     note.isFavorite = !note.isFavorite

  //     saveNotesToStorage()
  //   }
  // }

  // /**
  //  * Update the eixting note or add the new note
  //  *
  //  *
  //  * 
  //  */
  // const saveNote = (event) => {
  //   closeEditModal()

  //   const note = event.detail
  //   const noteIndex = notes.findIndex(item => item.id === note.id)
    
  //   if (noteIndex !== -1) {
  //     notes[noteIndex] = note    
  //   } else {
  //     notes.push(note)
  //   }

  //   saveNotesToStorage()
  // }

  // /**
  //  * 
  //  *      
  //  */
  // const deleteNote  = (event) => {
  //   closeDeleteModal()
  //   closeEditModal()

  //   const deleteNoteIndex = event.detail 
  //   const noteIndex = notes.findIndex(item => item.id === deleteNoteIndex)
    
  //   if (noteIndex !== -1) {
  //     notes.splice(noteIndex, 1)
  //   }

  //   console.log(notes)

  //   saveNotesToStorage()
  // }
</script>

<AddNoteModal addNoteList={addNote} title={nameheader}/>

<main>
  <!-- <Note /> -->

  <div class="grid grid-cols-4 gap-4">
    {#each noteItem as note (note.id)}
      <div>
          <Note
          {...note}        
            on:toggleFavorite="{toggleFavorite}"
          />
      </div>
        
    {/each}      
  </div>
  
  <!-- <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <img class="w-full" src="./static/card-top.jpg" alt="Sunset in the mountains">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
      <p class="text-gray-700 text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
    </div>
  </div> -->
</main>
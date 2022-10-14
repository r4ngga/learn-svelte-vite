<script>
    //import
    import moment from 'moment';
    import { createEventDispatcher, onMount } from 'svelte';

    //  Props  
    export let addNoteList;
    export let id;
    export let title;
    export let content;
    export let date;
    export let isFavorite;
    export let tags ;

    //variable declaration
    let tagString = tags && tags.length ? tags.join(',') : '';
    let noteItem = [];
    const saveNote = (event) => {
    const note = event.detail;
    const noteIndex = noteItem.findIndex(item => item.id === note.id);

    if(noteIndex !== -1){
      noteItem[noteIndex] = note;
    }else{
      noteItem.push(note);
    }
    saveNotesToStorage();
  }

    const saveNotesToStorage = () => {

    noteItem = noteItem

    localStorage.setItem("NoteItem", JSON.stringify(noteItem));

    }

    function handleSubmit(){
        event.preventDefault();
        
        tags = tagString.replace(/\s/g,'').split(',').filter(item => item);
        date = moment().format('YYYYMMDDHHmmss');
        isFavorite = false;
        addNoteList({id, title, content, date, isFavorite, tags});
        id = "";
        title = "";
        content = "";
        tags = "";
        // saveNotesToStorage();
    }   
</script>

<div class="container mx-auto p-5 mb-4">
    <h3> New Title Note : {title}</h3>
    <form on:submit={handleSubmit}>
        <div class=" grid grid-cols-4 gap-4">
            <div class="p-2">
                <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-1 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Title..." type="text" name="title" bind:value={title}/>
            </div>
            <div  class="p-2 flex">
                <!-- <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-1 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Content..." type="text" name="content"/> -->
                <textarea id="message" rows="6" class="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Your message..." bind:value={content}></textarea>
            </div>
            <div class="p-2">
                <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-1 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Tags" type="text" name="tags" bind:value={tagString}/>
            </div>
            <div class="p-2">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Button
                </button>
            </div>
        </div>
    </form>
</div>  
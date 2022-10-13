<script>
    //import

    import moment from 'moment';
    import {createEventDispatcher, onMount} from 'svelte';
    import Modal from '../components/Modal.svelte';
    import {formatDate} from '../lib/utils.js';
    
    //props

    export let id;
    export let title;
    export let date;
    export let content;
    export let isFavorite;
    export let tags;

    let tagString = tags && tags.length ? tags.join(',') : '';

    //simplevalidation

    $: canSave = Boolean(title && content);

    //declare proccess

    const dispatch = createEventDispatcher();

    // const saveNote = () => {
    //     id;
    //     title;
    //     content;
    //     date: moment().format('YYYYMMDDHHmmss');
    //     isFavorite;
    //     tags: tagString.replace(/\s/g,'').split(',').filter(item => item);
    // }

    /**
     * Save the note if allowed by dispatching a save event
     * with the new memo object
     */
     const saveNote = () => {
      if (!canSave) return
  
      const newMemo = {
        id,
        title,
        content,
        date: moment().format('YYYYMMDDHHmmss'),
        isFavorite,
        tags: tagString.replace(/\s/g,'').split(',').filter(item => item)
      }
  
      if (!newMemo.id) {
        newMemo.id = moment().valueOf()
      }
  
      dispatch('save', newMemo)
    }

    let textarea;

    const onInput = () => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }
  
    onMount(() => {
      onInput()
    })
</script>

<Modal on:closeModal="{ () => dispatch('close')}"/>
    <div slot="title" class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
        {id ? 'Edit' : 'Create' } Post
    </div>

    <div slot="body" class="p-6 space-y-6">
        <div>
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
            <input bind:value={title} type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
        </div>
        <div>
            <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tags</label>
            <input bind:value={tagString} type="text" id="tags" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
        </div>
        <div>
            <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Content</label>
            <textarea bind:this={textarea}
            bind:value={content} type="textarea"
            on:input={onInput} class="form-control
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
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />

        </div>

        <div>
            {#if date}
            <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Update</label>
            <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{formatDate(date)}</label>
            {/if}
        </div>
    </div>

    <div slot="footer" class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        {#if id}
        <button on:click|stopPropagation={saveNote} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
        <button on:click|stopPropagation={() => dispatch('delete', id)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
        {/if}

        <button on:click|stopPropagation={() => dispatch('close')} type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
    </div>
<Modal />

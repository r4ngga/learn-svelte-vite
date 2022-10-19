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

    let showEditModal = true;

    const closeEditModal = () => {
    showEditModal = false;
  }
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
      closeEditModal();
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

<Modal on:closeModal="{() => dispatch('close')}">
  <div slot="title" class="flex justify-between items-center p-2 rounded-t border-b dark:border-gray-600">
    Edit Post
  </div>

  <div slot="body" class="p-6 space-y-6 ">
    <div>
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
        <input bind:value={title} type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" >
    </div>
    <div>
        <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tags</label>
        <input bind:value={tagString} type="text" id="tags" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
    </div>
    <div>
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Content</label>
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
    {#if date}
    <div>
      <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date</label>
      <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{formatDate(date)}</label>
    </div>
    {/if}
  </div>

  <div slot="footer" class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
    <div class="delete-wrapper">
      {#if id}
        <button
          class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          on:click|stopPropagation="{() => dispatch('delete', id)}"
        >
          Delete
        </button>
      {/if}
    </div>
    <div class="buttons-wrapper">
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 {!canSave? 'disabled' : ''}"
        on:click|stopPropagation="{saveNote}"
        on:click|stopPropagation="{() => dispatch('close')}"
      >
        Save
      </button>
      <button
        class="button"
        on:click|stopPropagation="{() => dispatch('close')}"
      >
        Cancel
    </button>
    </div>
  </div>
</Modal>


<style lang="scss">
  .modal {

&-body {
  
  padding: 30px 15px;
  width: 340px;
}

&-footer {
  padding: 0 15px;
  text-align: right;

  .button {
    height: 30px;
    padding: 0 10px;
    text-align: center;
    box-sizing: content-box;
    border-radius: 3px;
    border: 1px solid #000;

    &:active {
      background-color: #b9b7b7;
    }

    &.delete {
      background-color: #e81414;
      color: #fff;

      &:active {
         background-color: #b11111;
      }
    }
  }
}
}
</style>
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

<!-- <div id="medium-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
  <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
      
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          
         
          <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
              <slot name="title"></slot>
              <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                  
              </h3>
              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="medium-modal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Close modal</span> 
              </button>
          </div>
          
          
          <div  class="p-6 space-y-6">
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
          
          
          <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              
              <button data-modal-toggle="medium-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
              <button data-modal-toggle="medium-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
          </div>
      </div>
  </div>
</div> -->

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
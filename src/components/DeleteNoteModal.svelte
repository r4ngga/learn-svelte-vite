<script>
    //import
    import Modal from '../components/Modal.svelte';
    import { createEventDispatcher } from 'svelte';

    //prop
    export let id;
    export let title;
    
    //call dispacth
    const dispatch = createEventDispatcher();
</script>

<!-- <Modal /> -->
<Modal
on:closeModal="{() => dispatch('close')}"
>
<div slot="title" class="flex justify-between items-center p-2 rounded-t border-b dark:border-gray-600">Confirm Delete</div>
<div slot="body" class="p-6 space-y-6 ">
  Are you sure delete "{title}" ?
</div>

<div slot="footer" class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
  <button
    class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
    on:click|stopPropagation="{() => dispatch('delete', id)}"
  >
    Delete
  </button>
  <button
    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
    on:click|stopPropagation="{() => dispatch('close')}"
  >
    Cancel
</button>
</div>

</Modal>
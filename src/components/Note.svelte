<script>
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faStar } from '@fortawesome/free-solid-svg-icons';
    import { createEventDispatcher } from 'svelte';
    import { formatDate } from '../lib/utils';

    //  Props  
    // export let addNoteList;
    export let id;
    export let title;
    export let content;
    export let date;
    export let isFavorite;
    export let tags ;

    const dispatch = createEventDispatcher();

   
     // Trim the content if longer than 50 characters and add ellipsis
     
     const trimContent = (content) => {
      if (content.length > 50) {
        return `${content.substring(0, 50)}...`
      }
  
      return content
    }

</script>

<!-- {#each noteItem as note} -->
<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="./static/card-top.jpg" alt="Sunset in the mountains">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{title}</div>
    <p class="text-gray-700 text-base">
        {trimContent(content)}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    {#each tags as tag (tag)}
      <!-- <div class="tag"></div> -->
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
    {/each}
    <!-- <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> -->
  </div>

  <div class="px-6 py-4">
    <!-- <img class="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"> -->
    <div class="text-sm">
      <p class="text-gray-900 leading-none">{formatDate(date)}</p>
        
            <div class="fav-icon" on:click|stopPropagation="{() => dispatch('toggleFavorite', id)}">
            <Fa icon={faStar} color="{isFavorite ? '#ffda00' : '#afaeae'}"  
            />
            </div>
        
    </div>
  </div>
</div>
<!-- {/each} -->

<style>
    .fav-icon {
          padding-bottom: 2px;
          cursor: pointer;
    }
</style>
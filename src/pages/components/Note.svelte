<script >
    //  Imports
  
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faStar } from '@fortawesome/free-solid-svg-icons';
    import { createEventDispatcher } from 'svelte';
    import { formatDate } from '../../lib/utils.js';
  

    //  Props  
    export let id;
    export let title;
    export let content;
    export let date;
    export let isFavorite;
    export let tags;
  
  
    //  Methods Declarations  
    const dispatch = createEventDispatcher();
  
    /**
     * Trim the content if longer than 50 characters and add ellipsis
     *
     */
    const trimContent = (content) => {
      if (content.length > 50) {
        return `${content.substring(0, 50)}...`
      }
  
      return content
    }
  </script>
  
  <div class="note-card" on:click >
    <div class="title">{title}</div>
    <div class="preview">{trimContent(content)}</div>
  
    <div class="tag-wrapper">
    {#each tags as tag (tag)}
      <div class="tag">{tag}</div>
    {/each}
    </div>
  
    <div class="card-footer">
      <div class="date">{formatDate(date)}</div>
      <div class="fav-icon" on:click|stopPropagation="{() => dispatch('toggleFavorite', id)}">
        <Fa icon={faStar} color="{isFavorite ? '#ffda00' : '#afaeae'}"  
        />
      </div>
    </div>
  </div>
  
  <style lang="scss">
    .note-card {
      width: 150px;
      min-height: 195px;
      max-height: 250px;
      margin-right: 15px;
      background-color: #FFFAF0;
      padding: 15px;
      border-radius: 10px;
      box-shadow: 3px 6px #888888;
      display: grid;
      grid-template-rows: 1fr 4fr 2fr 1fr;
  
      .title {
        font-weight: bold;
        margin-bottom: 10px;
      }
  
      .preview {
        font-size: 15px;
        word-break: break-word;
      }
  
      .tag {
        background-color: #d6d2d2;
        padding: 2px 5px ;
        border-radius: 20px;
        font-size: 12px;
        margin-right: 5px;
        height: 25px;
        // background-color: #d6d2d2;
        // padding: 2px 10px 2px ;
        // border-radius: 20px;
        // font-size: 12px;
        // margin-right: 5px;
        // height: 15px;
  
        &-wrapper {
          display: flex;
          align-items: flex-end;
          flex-wrap: nowrap;
        }
      }
  
      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
  
        .date {
          color: #afaeae;
          font-size: small;
        }

        .fav-icon {
          padding-bottom: 2px;
          cursor: pointer;
        }
      }
    }
  
    
  </style>
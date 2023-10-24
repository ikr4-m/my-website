<script lang="ts">
  import metadata from '$lib/global/metadata'
  export let data

  $metadata.title = '~/explore'
  $metadata.location = 'categories'
</script>

<svelte:head>
  <meta property="og:title" content="{$metadata.title}">
  <meta property="og:description" content="{$metadata.description}">
  <meta property="twitter:title" content="{$metadata.title}">
  <meta property="twitter:description" content="{$metadata.description}">
</svelte:head>

<p>Categories in this blog:</p>
<p>
  {#each data.categories as category, i}
    <a href="/blog/categories/{category}">{category}</a>
    {#if (i + 1) < data.categories.length}
      <span>|</span>
      <span> </span>
    {/if}
  {/each}
</p>
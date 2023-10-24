<script lang="ts">
  import metadata from '$lib/global/metadata'
  export let data

  $metadata.title = '~/blog'
  $metadata.location = 'blog'

  let page = 0
  const setPage = (target: number) => page = target
</script>

<svelte:head>
  <meta property="og:title" content="{$metadata.title}">
  <meta property="og:description" content="{$metadata.description}">
  <meta property="twitter:title" content="{$metadata.title}">
  <meta property="twitter:description" content="{$metadata.description}">
</svelte:head>

<h1>Post that satisfy with {data.category}:</h1>
{#each data.posts[page] as post}
  <div class="grid md:grid-cols-3 grid-cols-1 gap-2 px-4 pt-4">
    <div class="col-span-2">
      <a href="/blog/{post.slug}" class="text-3xl">{post.title}</a>
      <p>{post.description}</p>
    </div>
    <div class="col-span-1">
      <p class="font-bold text-right">{post.date}</p>
      <p class="text-right">
        {#each post.categories as category, i}
          <a href="/blog/categories/{category}">{category}</a>
          {#if (i + 1) < post.categories.length}
            <span>|</span>
            <span> </span>
          {/if}
        {/each}
      </p>
    </div>
  </div>
  <div class="h-px bg-nord-frost-0 mb-4 mx-4"></div>
{/each}
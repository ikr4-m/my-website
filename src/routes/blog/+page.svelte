<script lang="ts">
  import metadata from '$lib/global/metadata'
  export let data

  $metadata.title = '~/blog'
  $metadata.location = 'blog'
</script>

<svelte:head>
  <meta property="og:title" content="{$metadata.title}">
  <meta property="og:description" content="{$metadata.description}">
  <meta property="twitter:title" content="{$metadata.title}">
  <meta property="twitter:description" content="{$metadata.description}">
</svelte:head>

<h1>Ini halaman buat blog</h1>

{#each data.posts as post}
  <div class="post">
    <a href="/blog/{post.slug}">
      <h3>{post.title}</h3>
    </a>
    <p>{post.description}</p>
  </div>
{/each}
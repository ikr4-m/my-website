<script lang="ts">
  import metadata from '$lib/global/metadata'
  export let data

  const title = '~/blog'
  $metadata.title = title
  $metadata.location = 'blog'
</script>

<svelte:head>
  <meta property="og:title" content="~ikram/blog - {data.metadata.title}">
  <meta property="og:description" content="{data.metadata.description}">
  <meta property="twitter:title" content="~ikram/blog - {data.metadata.title}">
  <meta property="twitter:description" content="{data.metadata.description}">
  {#if data.metadata.thumbnail}
    <meta property="twitter:image:src" content="{data.metadata.thumbnail}">
  {/if}
  <link href='https://fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' type='text/css'>
  <title>Ikram's Website - {$metadata.title}</title>
</svelte:head>

<h1>{data.metadata.title}</h1>
<svelte:component this={data.content} />
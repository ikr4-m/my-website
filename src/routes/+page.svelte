<script lang="ts">
  import metadata from '$lib/global/metadata'

  $metadata.title = '~ikram'
  $metadata.location = 'index'
</script>

<svelte:head>
  <meta property="og:title" content="{$metadata.title}">
  <meta property="og:description" content="{$metadata.description}">
  <meta property="twitter:title" content="{$metadata.title}">
  <meta property="twitter:description" content="{$metadata.description}">
</svelte:head>

<div class="container mx-auto px-5">
  <p class="text-center">Pinjam seratus</p>
</div>
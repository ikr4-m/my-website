<script lang="ts">
  import metadata from '$lib/global/metadata'
  export let data

  $metadata.title = '~ikram'
  $metadata.location = 'index'
</script>

<svelte:head>
  <meta property="og:title" content="{$metadata.title}">
  <meta property="og:description" content="{$metadata.description}">
  <meta property="twitter:title" content="{$metadata.title}">
  <meta property="twitter:description" content="{$metadata.description}">
</svelte:head>

<div class="container mx-auto px-5 py-10">
  <div class="grid md:grid-cols-2 grid-cols-1">

    <div class="flex px-10 md:border-r md:pb-0 pb-3 border-nord-polar-3">
      <div class="m-auto">
        <div class="flex">
          <img src="/img/portrait.jpg" alt="pict" class="m-auto rounded-full h-1/2 w-1/2">
        </div>
        <p class="text-center pt-5 text-xl font-bold">~ikram</p>
        <div class="text-center text-sm">Ordinary person that like to destroying someone project and trying weird tech.</div>
      </div>
    </div>

    <div class="flex md:border-l md:pt-0 pt-3 border-nord-polar-3 px-7">
      <div class="m-auto">
        <p class="text-xl text-center">Recent Posts</p>
        <div class="text-sm text-center">
          {#each data.posts as post}
            <p>[ {post.date} ] - <a href="/blog/{post.slug}">{post.title}</a></p>
          {/each}
        </div>
      </div>
    </div>

  </div>
</div>
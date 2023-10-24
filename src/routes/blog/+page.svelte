<script lang="ts">
  import metadata from '$lib/global/metadata'
  export let data

  $metadata.title = '~/blog'
  $metadata.description = 'My "beloved" website'
  $metadata.location = 'blog'
</script>

<h1>Ini halaman buat blog</h1>

{#each data.posts as post}
  <div class="post">
    <a href="/blog/{post.slug}">
      <h3>{post.title}</h3>
    </a>
    <p>{post.description}</p>
  </div>
{/each}
<script lang="ts">
  export let data
</script>

<h1>Kategori</h1>

<ul>
  {#each data.categories as category}
    <li>
      <a href="/blog/categories/{category}">{category}</a>
    </li>
  {/each}
</ul>
<script lang="ts">
  export let data
</script>

<h1>{data.metadata.title}</h1>
<svelte:component this={data.content} />
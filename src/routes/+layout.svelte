<script>
  import '$lib/app.css'
  export let data
</script>

<svelte:head>
  <link href='https://fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' type='text/css'>
  <title>Ikram's Website - {data.metadata.title}</title>
</svelte:head>

<div class="md:container md:mx-auto md:w-1/2 p-3">
  <slot />
</div>

<script lang="ts">
  import type { HeaderFooterMenu, WebsiteNavigator } from '$lib/typing.js';
  import '$lib/app.css'
  export let data

  function setHeaderActive(location: WebsiteNavigator): string {
    return data.metadata.location === location ? 'bg-nord-aurora-0 text-nord-snow-0 px-2' : ''
  }

  const headerMenu: HeaderFooterMenu[] = [
    {
      name: '~',
      link: '/',
      location: 'index'
    },
    {
      name: 'Blog',
      link: '/blog',
      location: 'blog'
    },
    {
      name: 'Porto',
      link: '/porto',
      location: 'porto'
    }
  ]

  const footerMenu: HeaderFooterMenu[] = [
    {
      name: 'Facebook',
      link: 'https://fb.me/ikram.sekai'
    },
    {
      name: 'Mastodon',
      link: 'https://mstdn.id/@ikr4m'
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/ikr.4m_/'
    },
    {
      name: 'Mail',
      link: 'mailto:ikramullahzx@gmail.com'
    },
  ]
</script>

<svelte:head>
  <link href='https://fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' type='text/css'>
  <title>Ikram's Website - {data.metadata.title}</title>
</svelte:head>

<div class="md:container md:mx-auto md:w-3/4 lg:w-1/2 p-3 text-nord-polar-1 lg:text-xl">
  <!-- Header -->
  <div class="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
    <p class="md:text-4xl text-2xl md:text-left text-center text-nord-polar-0">{data.metadata.title}</p>
    <div class="flex">
      <p class="md:ml-auto md:mr-0 m-auto">
        {#each headerMenu as header, i}
          <a href="{header.link}" class="{setHeaderActive(header.location ?? 'lost')} text-nord-polar-3">{header.name}</a>
          {#if (i + 1) < headerMenu.length}
            <span>/</span>
            <span> </span>
          {/if}
        {/each}
      </p>
    </div>
  </div>
  <div class="block h-px bg-nord-polar-0 mt-1 mb-5"></div>
  <!-- Header -->

  <!-- Content -->
  <slot />
  <!-- Content -->

  <!-- Footer -->
  <div class="block h-px bg-nord-polar-0 mb-1 mt-5"></div>
  <div class="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1 text-sm">
    <p class="md:text-left text-center text-nord-polar-3">(C) - All right reserved.</p>
    <div class="flex">
      <p class="md:ml-auto md:mr-0 m-auto">
        {#each footerMenu as footer, i}
          <a href="{footer.link}" target="_blank" class="text-nord-polar-3">{footer.name}</a>
          {#if (i + 1) < footerMenu.length}
            <span>/</span>
            <span> </span>
          {/if}
        {/each}
      </p>
    </div>
  </div>
  <!-- Footer -->
</div>

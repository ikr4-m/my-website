<script lang="ts">
  import type { HeaderFooterMenu } from '$lib/typing.js';
  import metadata from '$lib/global/metadata'
  import '$lib/app.scss'

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
      name: 'Explore',
      link: '/blog/categories',
      location: 'categories'
    },
    {
      name: 'Resume',
      link: 'https://drive.google.com/file/d/1btt2qcbwPxdBY39zpBrnQuctTijZgs5s/view?usp=sharing'
    }
  ]

  const footerMenu: HeaderFooterMenu[] = [
    {
      name: 'FB',
      link: 'https://fb.me/ikram.sekai'
    },
    {
      name: 'X',
      link: 'https://x.com/d04_1bu'
    },
    {
      name: 'IG',
      link: 'https://www.instagram.com/ikr.4m_/'
    },
    {
      name: 'GPG',
      link: 'https://github.com/ikr4-m.gpg'
    },
    {
      name: 'Mail',
      link: 'mailto:contact@ikr4m.my.id'
    },
  ]
</script>

<svelte:head>
  <meta property="theme-color" content="#2E3440">
  <meta property="og:type" content="website">
  <meta property="og:image" content="/img/b&w.png">
  <link href='https://fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' type='text/css'>
  <title>Ikram's Website - {$metadata.title}</title>
</svelte:head>

<div class="md:container md:mx-auto md:w-3/4 lg:w-1/2 p-3 text-nord-polar-1 xl:text-xl">
  <!-- Header -->
  <div class="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
    <p class="md:text-4xl text-2xl md:text-left text-center text-nord-polar-0">{$metadata.title}</p>
    <div class="flex">
      <p class="md:ml-auto md:mr-0 m-auto">
        {#each headerMenu as header, i}
          <a href="{header.link}" class="{$metadata.location === header.location ? 'bg-nord-aurora-0 text-nord-snow-0 px-2' : ''} text-nord-polar-3">{header.name}</a>
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
    <p class="md:text-left text-center text-nord-polar-3">(C) 2023 - {new Date().getFullYear()} - Made with ❤️.</p>
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

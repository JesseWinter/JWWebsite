<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import logo from '$lib/images/WebsiteLogo.png';
  import '../app.css';

  let { children } = $props();

  const navigation = [
    { route: '/', label: 'Home' },
    { route: '/vfx', label: 'VFX' },
    { route: '/color', label: 'Color Grading' },
    { route: '/about', label: 'About' }
  ] as const;

  const contactRoutes = ['/vfx', '/color', '/about'];
  const showContact = $derived(contactRoutes.includes(page.route.id ?? ''));
</script>

<svelte:head>
  <meta name="theme-color" content="#641220" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&amp;family=IBM+Plex+Mono:wght@500&amp;family=Instrument+Sans:wght@400;500;600;700&amp;display=swap"
  />
</svelte:head>

<div class="site-layout">
  <a class="skip-link" href="#main-content">Skip to content</a>

  <header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href={resolve('/')} aria-label="Jesse Winter, home">
        <img src={logo} alt="" width="34" height="34" />
        <span>Jesse Winter</span>
      </a>

      <nav aria-label="Main navigation">
        {#each navigation as item (item.route)}
          <a
            href={resolve(item.route)}
            aria-current={page.route.id === item.route ? 'page' : undefined}
          >
            {item.label}
          </a>
        {/each}
      </nav>

      {#if showContact}
        <a
          class="contact-link"
          href="mailto:jessewinter310@gmail.com"
          aria-label="Contact Jesse Winter by email"
        >
          Contact
        </a>
      {/if}
    </div>
  </header>

  <main id="main-content" tabindex="-1">
    {@render children?.()}
  </main>

  <footer class="shell site-footer">
    <span>Jesse Winter · Atlanta, GA</span>
    <a
      href="https://www.linkedin.com/in/jessewintervfx/"
      target="_blank"
      rel="noopener noreferrer"
    >
      LinkedIn
    </a>
  </footer>
</div>

<style>
  :global(:root) {
    color-scheme: dark;
    --paper: #24191d;
    --ink: #fff5ed;
    --muted: #d5b7bb;
    --rule: #594149;
    --wine: #ffb5bb;
    --berry: #ff9da8;
    --ruby: #a11d33;
    --bright-red: #e01e37;
    --cream: #fff5ed;
    --gutter: clamp(18px, 4.2vw, 64px);
    --body: 'Instrument Sans', Arial, sans-serif;
    --display: 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif;
    --mono: 'IBM Plex Mono', monospace;
  }

  :global(body) {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--body);
  }

  .site-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    min-width: 0;
  }

  .shell {
    width: min(1320px, calc(100% - var(--gutter) * 2));
    margin-inline: auto;
  }

  .skip-link {
    position: absolute;
    top: 8px;
    left: var(--gutter);
    z-index: 10;
    padding: 10px 14px;
    background: var(--cream);
    color: #641220;
    transform: translateY(-160%);
  }

  .skip-link:focus {
    transform: translateY(0);
  }

  .site-header {
    background: linear-gradient(105deg, #641220 20%, #85182a 67%, #a11d33);
    color: var(--cream);
  }

  .header-inner {
    display: flex;
    align-items: center;
    gap: clamp(12px, 2.2vw, 28px);
    min-height: 64px;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    color: inherit;
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
  }

  .brand img {
    display: block;
    width: 34px;
    height: 34px;
    object-fit: contain;
  }

  nav {
    display: flex;
    align-items: center;
    gap: clamp(12px, 3vw, 30px);
    margin-inline-start: auto;
  }

  nav a,
  .contact-link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: inherit;
    font-size: 0.875rem;
    text-decoration: none;
  }

  nav a {
    white-space: nowrap;
  }

  nav a:hover,
  nav a[aria-current='page'] {
    text-decoration: underline;
    text-underline-offset: 0.35em;
  }

  .contact-link {
    justify-content: center;
    padding-inline: 16px;
    background: var(--cream);
    color: #641220;
    font-weight: 700;
  }

  .contact-link:hover {
    background: #ffdde0;
  }

  .site-header a:focus-visible {
    outline: 2px solid var(--cream);
    outline-offset: 3px;
  }

  .site-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0 16px;
    padding-block: 12px;
    border-top: 1px solid var(--rule);
    color: var(--muted);
    font-size: 0.8125rem;
  }

  .site-footer a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--berry);
    text-decoration: underline;
    text-underline-offset: 0.22em;
  }

  .site-footer a:focus-visible {
    outline: 2px solid var(--berry);
    outline-offset: 3px;
  }

  @media (max-width: 640px) {
    .header-inner {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      grid-template-areas:
        'brand contact'
        'nav nav';
      gap: 4px 12px;
      padding-block: 8px 0;
    }

    .brand {
      grid-area: brand;
      justify-self: start;
    }

    .contact-link {
      grid-area: contact;
      justify-self: end;
    }

    nav {
      grid-area: nav;
      display: grid;
      grid-template-columns: 0.9fr 0.7fr 1.5fr 0.9fr;
      gap: 4px;
      margin-inline-start: 0;
      border-top: 1px solid #fff5ed33;
    }

    nav a {
      justify-content: center;
      text-align: center;
      white-space: normal;
    }
  }
</style>
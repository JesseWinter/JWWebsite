<script lang="ts">
  import { resolve } from '$app/paths';
</script>

<svelte:head>
  <title>VFX Reel | Jesse Winter</title>
  <meta name="description" content="Watch Jesse Winter’s November 2026 visual effects reel." />
</svelte:head>

<section class="reel-page" aria-labelledby="reel-title">
  <a class="reel-link back-link" href={resolve('/')}>← Home</a>

  <header class="reel-heading">
    <h1 id="reel-title">VFX Reel</h1>
    <time class="reel-date" datetime="2026-11">November 2026</time>
  </header>

  <div class="reel-video">
    <iframe
      src="https://player.vimeo.com/video/1245255531?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
      width="960"
      height="540"
      title="Jesse Winter’s November 2026 VFX reel"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>

  <div class="reel-links">
    <a
      class="reel-link"
      href="https://vimeo.com/1245255531"
      target="_blank"
      rel="noopener noreferrer"
    >
      Open on Vimeo
    </a>
    <a class="reel-link" href={resolve('/color')}>Color Grading Reel →</a>
  </div>
</section>

<style>
  .reel-page {
    width: min(1120px, calc(100% - var(--gutter, 4.2vw) * 2));
    margin-inline: auto;
    padding-bottom: 28px;
  }

  .reel-link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--berry);
    font-weight: 600;
    text-decoration: none;
  }

  .reel-link:hover {
    text-decoration: underline;
    text-underline-offset: 0.22em;
  }

  .reel-link:focus-visible {
    outline: 2px solid var(--berry);
    outline-offset: 3px;
  }

  .reel-date,
  .back-link {
    color: var(--berry);
    font: 500 0.75rem/1.4 var(--mono);
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .reel-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px 24px;
    margin-bottom: 20px;
  }

  h1 {
    margin: 0;
    color: var(--wine);
    font: 700 clamp(2.65rem, 7.5vw, 7rem)/0.92 var(--display);
    letter-spacing: -0.04em;
    text-transform: uppercase;
  }

  .reel-video {
    background: #160d11;
  }

  .reel-video iframe {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    border: 0;
  }

  .reel-video::after {
    content: '';
    display: block;
    height: 4px;
    background: linear-gradient(90deg, #641220, #85182a, #a11d33, #e01e37);
  }

  .reel-links {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0 20px;
    margin-top: 8px;
  }

  @media (max-width: 540px) {
    .reel-heading {
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 16px;
    }
  }
</style>
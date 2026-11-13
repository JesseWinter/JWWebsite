<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { resolve } from '$app/paths';
  import vfxStill from '$lib/images/Image1.png';
  import colorStill from '$lib/images/Image11.png';

  const imageFiles = import.meta.glob<string>(
    '/src/lib/images/Image*.png',
    { eager: true, query: '?url', import: 'default' }
  );

  const slides = Array.from({ length: 20 }, (_, index) => index + 1).flatMap((number) => {
    const src = imageFiles[`/src/lib/images/Image${number}.png`];
    return src ? [{ number, src }] : [];
  });

  const initialSlide = Math.max(0, slides.findIndex((slide) => slide.number === 2));
  let activeSlide = $state(initialSlide);
  const currentSlide = $derived(slides[activeSlide]);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'vfx', label: 'VFX' },
    { id: 'color', label: 'Color' }
  ] as const;

  const reels = [
    { id: 'vfx', label: 'VFX', title: 'VFX Reel', route: '/vfx', image: vfxStill },
    {
      id: 'color',
      label: 'Color Grading',
      title: 'Color Grading Reel',
      route: '/color',
      image: colorStill
    }
  ] as const;

  let filter = $state<(typeof filters)[number]['id']>('all');
  const visibleReels = $derived(
    reels.filter((reel) => filter === 'all' || reel.id === filter)
  );

  onMount(() => {
    if (slides.length < 2) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number | undefined;

    function updateAutoplay() {
      window.clearInterval(timer);
      timer = undefined;

      if (!motionPreference.matches) {
        timer = window.setInterval(() => {
          activeSlide = (activeSlide + 1) % slides.length;
        }, 3000);
      }
    }

    updateAutoplay();
    motionPreference.addEventListener('change', updateAutoplay);

    return () => {
      window.clearInterval(timer);
      motionPreference.removeEventListener('change', updateAutoplay);
    };
  });
</script>

<svelte:head>
  <title>Jesse Winter | Visual Effects Artist &amp; Film Colorist</title>
  <meta
    name="description"
    content="Visual effects and color grading reels by Jesse Winter, an Atlanta-based artist and film colorist."
  />
</svelte:head>

<div class="home">
  <section class="hero" aria-labelledby="home-title">
    <div>
      <p class="eyebrow">Atlanta, GA</p>
      <h1 id="home-title"><span>Jesse</span> <span>Winter</span></h1>
      <p class="role">Visual Effects Artist &amp; Film Colorist</p>
      <a class="eyebrow explore" href="#selected-work">
        Explore work <span aria-hidden="true">↓</span>
      </a>
    </div>

    {#if currentSlide}
      <div class="frame">
        {#key currentSlide.number}
          <img
            src={currentSlide.src}
            alt=""
            fetchpriority={activeSlide === initialSlide ? 'high' : 'auto'}
            in:fade={{ duration: 450 }}
          />
        {/key}
      </div>
    {/if}
  </section>

  <section class="selected-work" id="selected-work" aria-labelledby="work-title">
    <div class="work-heading">
      <h2 id="work-title">Selected work</h2>

      <div class="filters" role="group" aria-label="Filter selected work">
        {#each filters as option (option.id)}
          <button
            type="button"
            aria-pressed={filter === option.id}
            onclick={() => (filter = option.id)}
          >
            {option.label}
          </button>
        {/each}
      </div>
    </div>

    <div class="work-grid" aria-live="polite">
      {#each visibleReels as reel (reel.id)}
        <a class="work-card" href={resolve(reel.route)}>
          <img
            src={reel.image}
            alt=""
            width="2050"
            height="1000"
            loading="lazy"
            decoding="async"
          />
          <div class="card-caption">
            <div>
              <p class="eyebrow">{reel.label}</p>
              <h3>{reel.title}</h3>
            </div>
            <span aria-hidden="true">→</span>
          </div>
        </a>
      {/each}
    </div>
  </section>
</div>

<style>
  .home {
    width: min(1320px, calc(100% - var(--gutter, 4.3vw) * 2));
    margin-inline: auto;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
    align-items: center;
    gap: clamp(24px, 4vw, 48px);
    padding-block: clamp(27px, 5.2vw, 54px) 31px;
  }

  .eyebrow {
    margin: 0;
    color: var(--berry);
    font: 500 0.6875rem/1.4 var(--mono);
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  h1 {
    margin: 8px 0 15px;
    color: var(--wine);
    font: 700 clamp(4.1rem, 9.5vw, 8rem)/0.8 var(--display);
    letter-spacing: -0.045em;
    text-transform: uppercase;
  }

  h1 span {
    display: block;
  }

  .role {
    margin: 0;
    font-size: clamp(0.95rem, 2vw, 1.1875rem);
    font-weight: 600;
  }

  .explore {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    margin-top: 14px;
    text-decoration: none;
  }

  .frame {
    background: #160d11;
  }

  .frame img,
  .work-card img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .frame img {
    aspect-ratio: 1080 / 680;
  }

  .frame::after {
    content: '';
    display: block;
    height: 4px;
    background: linear-gradient(90deg, #641220, #85182a, #a11d33, #e01e37);
  }

  .selected-work {
    padding-bottom: 32px;
    scroll-margin-top: 16px;
  }

  .work-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4px 16px;
    padding-block: 13px;
    border-top: 1px solid var(--rule);
  }

  h2 {
    margin: 0;
    font-size: clamp(1.45rem, 3.1vw, 2.06rem);
    font-weight: 600;
    letter-spacing: -0.04em;
  }

  .filters {
    display: flex;
    gap: 5px;
  }

  .filters button {
    min-width: 44px;
    min-height: 44px;
    padding-inline: 11px;
    border: 1px solid transparent;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 0.8125rem;
    cursor: pointer;
  }

  .filters button:hover {
    border-color: var(--berry);
  }

  .filters button[aria-pressed='true'] {
    background: var(--ruby);
    color: var(--cream);
  }

  .work-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  .work-card {
    display: block;
    border-bottom: 1px solid var(--rule);
    color: inherit;
    text-decoration: none;
  }

  .work-card img {
    aspect-ratio: 2 / 1;
  }

  .card-caption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-block: 11px;
  }

  h3 {
    margin: 2px 0 0;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .explore:hover,
  .work-card:hover h3 {
    text-decoration: underline;
    text-underline-offset: 0.22em;
  }

  .explore:focus-visible,
  .filters button:focus-visible,
  .work-card:focus-visible {
    outline: 2px solid var(--berry);
    outline-offset: 3px;
  }

  @media (max-width: 720px) {
    .hero {
      grid-template-columns: 1fr;
      gap: 12px;
      padding-bottom: 25px;
    }

    h1 {
      font-size: clamp(3rem, 11.5vw, 4.95rem);
      line-height: 0.92;
    }

    h1 span {
      display: inline;
    }

    .explore {
      margin-top: 2px;
    }
  }

  @media (max-width: 620px) {
    .work-grid {
      grid-template-columns: 1fr;
      gap: 15px;
    }
  }
</style>
<script lang="ts">
  import { dev } from '$app/environment';
  import { resolve } from '$app/paths';

  const imageFiles = import.meta.glob<string>(
    '/src/lib/images/**/{[uU][nN][gG][rR][aA][dD][eE][dD],[lL][oO][oO][kK]*}.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF}',
    { eager: true, query: '?url', import: 'default' }
  );

  const images = new Map(
    Object.entries(imageFiles).map(([path, url]) => {
      const name = path
        .slice(path.lastIndexOf('/') + 1)
        .replace(/\.[^.]+$/, '')
        .toLowerCase()
        .replace(/[\s_-]+/g, '');

      return [name, url] as const;
    })
  );

  const ungraded = images.get('ungraded');
  const lookNumbers = [1, 2, 3, 4];

  const looks = lookNumbers.flatMap((number) => {
    const id = `look${number}`;
    const image = images.get(id);

    return image ? [{ id, title: `Look ${number}`, image }] : [];
  });

  const missing = ['ungraded', ...lookNumbers.map((number) => `look${number}`)]
    .filter((name) => !images.has(name));

  let splits = $state<Record<string, number>>(
    Object.fromEntries(looks.map((look) => [look.id, 50]))
  );
</script>

<svelte:head>
  <title>Color Grading | Jesse Winter</title>
  <meta
    name="description"
    content="Watch Jesse Winter’s color grading reel and compare his show LUTs with the original ungraded frame."
  />
</svelte:head>

<section class="reel-page" aria-labelledby="reel-title">
  <a class="reel-link back-link" href={resolve('/')}>← Home</a>

  <header class="reel-heading">
    <h1 id="reel-title">Color Grading Reel</h1>
    <time class="reel-date" datetime="2026-04">April 2026</time>
  </header>

  <div class="reel-video">
    <iframe
      src="https://player.vimeo.com/video/1181034973?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
      width="960"
      height="540"
      title="Jesse Winter’s April 2026 color grading reel"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>

  <div class="reel-links">
    <a
      class="reel-link"
      href="https://vimeo.com/1181034973"
      target="_blank"
      rel="noopener noreferrer"
    >
      Open on Vimeo
    </a>
    <a class="reel-link" href={resolve('/vfx')}>VFX Reel →</a>
  </div>

  {#if dev || (ungraded && looks.length > 0)}
    <section class="lut-section" aria-labelledby="lut-title">
      <h2 id="lut-title">Show LUTs</h2>

      <div class="lut-intro">
        <h3>Need a show LUT for your next shoot?</h3>
        <p>
          I’m available to grade your camera tests and build a custom look for your
          on-set monitors and dailies. I can deliver the look as a
          <strong>.cube LUT</strong> or an <strong>ARRI .aml look file</strong>,
          depending on your workflow.
        </p>
      </div>

      {#if dev && missing.length > 0}
        <p class="missing-images">
          Images missing from <code>src/lib/images/</code>: {missing.join(', ')}
        </p>
      {/if}

      {#if ungraded}
        <div class="lut-grid">
          {#each looks as look (look.id)}
            {@const split = splits[look.id] ?? 50}

            <article aria-label={look.title}>
              <div class="comparison" style={`--split: ${split}%`}>
                <img
                  class="ungraded-image"
                  src={ungraded}
                  alt={`Original ungraded frame for ${look.title}`}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  class="graded-image"
                  src={look.image}
                  alt={`The same frame with ${look.title} applied`}
                  loading="lazy"
                  decoding="async"
                />

                <span class="wipe-line" aria-hidden="true"></span>
                <span class="wipe-handle" aria-hidden="true">◀ ▶</span>

                <span class="comparison-label left" aria-hidden="true">Ungraded</span>
                <span class="comparison-label right" aria-hidden="true">Graded</span>

                <input
                  class="wipe-input"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={split}
                  aria-label={`Compare the ungraded and graded frames for ${look.title}`}
                  aria-valuetext={`${split}% ungraded, ${100 - split}% graded`}
                  oninput={(event) => {
                    splits[look.id] = event.currentTarget.valueAsNumber;
                  }}
                />
              </div>
            </article>
          {/each}
        </div>
      {/if}
    </section>
  {/if}
</section>

<style>
  .reel-page {
    width: min(1120px, calc(100% - var(--gutter, 4.2vw) * 2));
    margin-inline: auto;
    padding-bottom: 32px;
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

  .reel-link:focus-visible,
  .comparison:focus-within {
    outline: 2px solid var(--berry);
    outline-offset: 3px;
  }

  .back-link,
  .reel-date {
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

  .lut-section {
    margin-top: clamp(30px, 5vw, 60px);
    padding-top: 20px;
    border-top: 1px solid var(--rule);
  }

  .lut-section h2 {
    margin: 0 0 12px;
    color: var(--wine);
    font: 700 clamp(2.25rem, 5vw, 4.25rem)/1 var(--display);
    text-transform: uppercase;
  }

  .lut-intro {
    margin-bottom: 24px;
  }

  .lut-intro h3 {
    margin: 0 0 8px;
    color: var(--wine);
    font-size: clamp(1.125rem, 2vw, 1.4rem);
    font-weight: 700;
  }

  .lut-intro p {
    max-width: 65ch;
    margin: 0;
    color: var(--ink);
    line-height: 1.6;
  }

  .missing-images {
    margin: 0 0 22px;
    color: var(--berry);
    line-height: 1.5;
  }

  .lut-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(12px, 2vw, 22px);
  }

  .comparison {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    background: #160d11;
  }

  .comparison img {
    display: block;
    width: 100%;
  }

  .ungraded-image {
    height: auto;
  }

  .graded-image {
    position: absolute;
    inset: 0;
    height: 100%;
    object-fit: cover;
    clip-path: inset(0 0 0 var(--split));
  }

  .wipe-line,
  .wipe-handle,
  .comparison-label {
    position: absolute;
    pointer-events: none;
  }

  .wipe-line {
    inset-block: 0;
    left: var(--split);
    width: 2px;
    background: #fff5ed;
    transform: translateX(-50%);
  }

  .wipe-handle {
    top: 50%;
    left: clamp(22px, var(--split), calc(100% - 22px));
    display: grid;
    place-items: center;
    box-sizing: border-box;
    width: 44px;
    height: 44px;
    border: 2px solid #fff5ed;
    border-radius: 50%;
    background: #24191d;
    color: #fff5ed;
    font-size: 0.75rem;
    transform: translate(-50%, -50%);
  }

  .comparison-label {
    bottom: 10px;
    padding: 5px 8px;
    background: #160d11;
    color: #fff5ed;
    font: 500 clamp(0.625rem, 1.3vw, 0.75rem)/1.25 var(--mono);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .comparison-label.left {
    left: 10px;
  }

  .comparison-label.right {
    right: 10px;
  }

  .wipe-input {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    appearance: none;
    opacity: 0;
    cursor: ew-resize;
    touch-action: pan-y;
  }

  .wipe-input::-webkit-slider-runnable-track {
    height: 100%;
  }

  .wipe-input::-webkit-slider-thumb {
    width: 2px;
    height: 100%;
    appearance: none;
  }

  .wipe-input::-moz-range-track {
    height: 100%;
  }

  .wipe-input::-moz-range-thumb {
    width: 2px;
    height: 100%;
    border: 0;
  }

  @media (max-width: 640px) {
    .lut-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 540px) {
    .reel-heading {
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 16px;
    }
  }
</style>
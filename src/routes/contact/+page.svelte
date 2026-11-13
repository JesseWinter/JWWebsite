<script lang="ts">
  let service = $state<'vfx' | 'color'>('vfx');

  const email = 'jessewinter310@gmail.com';

  const services = {
    vfx: { name: 'VFX', rate: '$40/hr' },
    color: { name: 'Color Grading', rate: '$25/hr' }
  } as const;

  const projectTypes = [
    'Feature Film',
    'Short Film',
    'Commercial',
    'Documentary',
    'Other'
  ];

  function openEmailDraft(event: SubmitEvent) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;

    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const replyTo = String(data.get('email') ?? '').trim();
    const projectName = String(data.get('projectName') ?? '').trim();
    const projectType = String(data.get('projectType') ?? '');
    const colorService = String(data.get('colorService') ?? '');
    const timeline = String(data.get('timeline') ?? '').trim();
    const projectLink = String(data.get('projectLink') ?? '').trim();
    const details = String(data.get('details') ?? '').trim();
    const selectedService = services[service];

    const subject = `${selectedService.name} inquiry — ${projectName}`;
    const body = [
      'Hi Jesse,',
      '',
      `Name: ${name}`,
      `Reply email: ${replyTo}`,
      `Service: ${selectedService.name}`,
      ...(service === 'color' ? [`Color service: ${colorService}`] : []),
      `Project: ${projectName}`,
      `Project type: ${projectType}`,
      `Hourly rate: ${selectedService.rate}`,
      `Timeline: ${timeline || 'To be discussed'}`,
      ...(projectLink ? [`Project or reference link: ${projectLink}`] : []),
      '',
      'Project details:',
      details
    ].join('\r\n');

    window.location.href =
      `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
</script>

<svelte:head>
  <title>Contact | Jesse Winter</title>
  <meta
    name="description"
    content="Contact Jesse Winter about visual effects, color grading, or a custom show LUT for your next project."
  />
</svelte:head>

<section class="contact-page" aria-labelledby="contact-title">
  <header class="intro">
    <h1 id="contact-title">Contact</h1>
    <p>Tell me about your project and what you need for VFX, color grading, or a show LUT.</p>
    <a class="email-link" href={`mailto:${email}`}>{email}</a>
  </header>

  <form onsubmit={openEmailDraft}>
    <fieldset class="service-picker">
      <legend>What do you need?</legend>

      <div class="service-options">
        <label class="service-option">
          <input type="radio" name="service" value="vfx" bind:group={service} />
          <span>VFX</span>
          <span class="rate">{services.vfx.rate}</span>
        </label>

        <label class="service-option">
          <input type="radio" name="service" value="color" bind:group={service} />
          <span>Color Grading</span>
          <span class="rate">{services.color.rate}</span>
        </label>
      </div>
    </fieldset>

    <div class="fields">
      {#if service === 'color'}
        <label class="field full">
          <span>Color service</span>
          <select name="colorService" required>
            <option value="Color Grade">Color Grade</option>
            <option value="Show LUT">Show LUT</option>
          </select>
        </label>
      {/if}

      <label class="field">
        <span>Your name</span>
        <input name="name" type="text" autocomplete="name" required maxlength="100" />
      </label>

      <label class="field">
        <span>Email address</span>
        <input name="email" type="email" autocomplete="email" required maxlength="150" />
      </label>

      <label class="field">
        <span>Project name</span>
        <input name="projectName" type="text" required maxlength="120" />
      </label>

      <label class="field">
        <span>Project type</span>
        <select name="projectType" required>
          <option value="" disabled selected>Select a project type</option>
          {#each projectTypes as type (type)}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </label>

      <label class="field">
        <span>Timeline <small>(optional)</small></span>
        <input name="timeline" type="text" placeholder="e.g. Final delivery December 15" maxlength="120" />
      </label>

      <label class="field">
        <span>Project or reference link <small>(optional)</small></span>
        <input name="projectLink" type="url" placeholder="https://…" maxlength="250" />
      </label>

      <label class="field full">
        <span>Project details</span>
        <textarea
          name="details"
          rows="5"
          required
          maxlength="800"
          placeholder={service === 'vfx'
            ? 'Tell me about the shots, the effects you need, and any references.'
            : 'Tell me about your footage, camera, and the look you want to achieve.'}
        ></textarea>
      </label>
    </div>

    <div class="form-footer">
      <p aria-live="polite">
        {services[service].name} <strong>{services[service].rate}</strong>
      </p>
      <button type="submit" aria-describedby="email-note">Open email draft</button>
    </div>

    <p class="email-note" id="email-note">
      This opens a draft in your email app. Review it and send it from there.
    </p>
  </form>
</section>

<style>
  .contact-page {
    width: min(100%, 900px);
    box-sizing: border-box;
    margin-inline: auto;
    padding: clamp(28px, 5vw, 60px) var(--gutter, 18px) 48px;
    color: var(--ink, #fff5ed);
  }

  .intro {
    margin-bottom: 28px;
  }

  h1 {
    margin: 0 0 14px;
    color: var(--wine, #ffb5bb);
    font: 700 clamp(3rem, 8vw, 6rem)/0.9 var(--display, sans-serif);
    letter-spacing: -0.04em;
    text-transform: uppercase;
  }

  .intro p {
    max-width: 55ch;
    margin: 0 0 5px;
    line-height: 1.6;
  }

  .email-link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--berry, #ff9da8);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    overflow-wrap: anywhere;
  }

  form {
    padding-top: 22px;
    border-top: 1px solid var(--rule, #594149);
  }

  .service-picker {
    min-inline-size: 0;
    margin: 0 0 20px;
    padding: 0;
    border: 0;
  }

  legend {
    margin-bottom: 10px;
    padding: 0;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .service-options,
  .fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 16px;
  }

  .service-option {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 10px;
    min-height: 52px;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid var(--rule, #594149);
    cursor: pointer;
  }

  .service-option:has(input:checked) {
    border-color: var(--berry, #ff9da8);
    background: #351f28;
  }

  .service-option input {
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: var(--berry, #ff9da8);
  }

  .rate {
    margin-inline-start: auto;
    color: var(--berry, #ff9da8);
    font-weight: 700;
    white-space: nowrap;
  }

  .field {
    display: grid;
    gap: 6px;
    min-width: 0;
    font-weight: 600;
  }

  .full {
    grid-column: 1 / -1;
  }

  small,
  .email-note {
    color: var(--muted, #d5b7bb);
    font-weight: 400;
  }

  .field input,
  .field select,
  .field textarea {
    width: 100%;
    min-width: 0;
    min-height: 46px;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid var(--rule, #594149);
    background: #1c1317;
    color: inherit;
    font: inherit;
    font-size: 1rem;
    font-weight: 400;
  }

  .field textarea {
    resize: vertical;
  }

  .field input::placeholder,
  .field textarea::placeholder {
    color: #bfa6ad;
  }

  .form-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 22px;
  }

  .form-footer p {
    margin: 0;
  }

  .form-footer strong {
    margin-inline-start: 6px;
    color: var(--berry, #ff9da8);
  }

  button {
    min-height: 46px;
    padding-inline: 18px;
    border: 0;
    background: var(--ruby, #a11d33);
    color: var(--cream, #fff5ed);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  button:hover {
    background: #bd2442;
  }

  :is(a, input, select, textarea, button):focus-visible {
    outline: 2px solid var(--berry, #ff9da8);
    outline-offset: 3px;
  }

  .email-note {
    margin: 12px 0 0;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  @media (max-width: 560px) {
    .service-options,
    .fields {
      grid-template-columns: 1fr;
    }

    .form-footer button {
      width: 100%;
    }
  }
</style>
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
  let sending = $state(false);

  const values = $derived(form?.values);
  const email = 'jessewinter310@gmail.com';
  const projectTypes = ['Feature Film', 'Short Film', 'Commercial', 'Documentary', 'Other'];
</script>

<svelte:head>
  <title>Contact | Jesse Winter</title>
  <meta
    name="description"
    content="Contact Jesse Winter about visual effects, color grading, or a custom show LUT."
  />
</svelte:head>

<section class="contact-page" aria-labelledby="contact-title">
  <header>
    <h1 id="contact-title">Contact</h1>
    <p>Tell me about your project and what you need for VFX, color grading, or a show LUT.</p>
    <a href={`mailto:${email}`}>{email}</a>
  </header>

  <form
    method="POST"
    use:enhance={() => {
      sending = true;
      return async ({ update }) => {
        try {
          await update();
        } finally {
          sending = false;
        }
      };
    }}
  >
    <fieldset>
      <legend>What do you need?</legend>
      <div class="grid">
        <label class="option">
          <input type="radio" name="service" value="vfx" checked={values?.service !== 'color'} />
          VFX
        </label>

        <label class="option">
          <input type="radio" name="service" value="color" checked={values?.service === 'color'} />
          Color Grading
        </label>
      </div>
    </fieldset>

    <label class="field color-service">
      Color service
      <select name="colorService" value={values?.colorService || 'Color Grade'}>
        <option>Color Grade</option>
        <option>Show LUT</option>
      </select>
    </label>

    <fieldset>
      <legend>Pricing</legend>
      <div class="grid">
        <label class="option">
          <input type="radio" name="pricing" value="hourly" checked={values?.pricing !== 'project'} />
          Hourly
          <strong class="rate vfx-rate">$40/hr</strong>
          <strong class="rate color-rate">$25/hr</strong>
        </label>

        <label class="option">
          <input type="radio" name="pricing" value="project" checked={values?.pricing === 'project'} />
          Project rate
          <span class="rate">Request a quote</span>
        </label>
      </div>
    </fieldset>

    <div class="grid">
      <label class="field">
        Your name
        <input name="name" autocomplete="name" value={values?.name ?? ''} required maxlength="100" />
      </label>

      <label class="field">
        Email address
        <input
          name="email"
          type="email"
          autocomplete="email"
          value={values?.email ?? ''}
          required
          maxlength="150"
        />
      </label>

      <label class="field">
        Project name
        <input name="projectName" value={values?.projectName ?? ''} required maxlength="120" />
      </label>

      <label class="field">
        Project type
        <select name="projectType" value={values?.projectType ?? ''} required>
          <option value="" disabled>Select a project type</option>
          {#each projectTypes as type (type)}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </label>

      <label class="field">
        Timeline (optional)
        <input name="timeline" value={values?.timeline ?? ''} maxlength="120" />
      </label>

      <label class="field">
        Project or reference link (optional)
        <input name="projectLink" type="url" value={values?.projectLink ?? ''} maxlength="250" />
      </label>

      <label class="field full">
        Project details
        <textarea name="details" rows="5" value={values?.details ?? ''} required maxlength="2000"></textarea>
      </label>
    </div>

    <div hidden>
      <label>
        Company website
        <input name="companyWebsite" autocomplete="off" tabindex="-1" />
      </label>
    </div>

    <button type="submit" disabled={sending}>
      {sending ? 'Sending…' : 'Send inquiry'}
    </button>

    {#if form?.success}
      <p role="status">Thanks! Your inquiry was sent.</p>
    {:else if form?.error}
      <p class="error" role="alert">{form.error}</p>
    {/if}
  </form>
</section>

<style>
  .contact-page {
    width: min(900px, calc(100% - var(--gutter, 18px) * 2));
    margin-inline: auto;
    padding-block: clamp(28px, 5vw, 60px) 48px;
  }

  header { margin-bottom: 24px; }

  h1 {
    margin: 0 0 14px;
    color: var(--wine);
    font: 700 clamp(3rem, 8vw, 6rem)/.9 var(--display, sans-serif);
    text-transform: uppercase;
  }

  header p { margin: 0 0 8px; }
  a, .rate, .error { color: var(--berry); }
  a { display: inline-flex; align-items: center; min-height: 44px; text-decoration: underline; }
  form { padding-top: 22px; border-top: 1px solid var(--rule); }
  fieldset { min-width: 0; margin: 0 0 20px; padding: 0; border: 0; }
  legend { margin-bottom: 9px; padding: 0; font-weight: 700; }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 16px;
  }

  .option {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 10px;
    min-height: 52px;
    padding: 10px 12px;
    border: 1px solid var(--rule);
    cursor: pointer;
  }

  .option:has(input:checked) {
    border-color: var(--berry);
    background: #351f28;
  }

  .option input { accent-color: var(--berry); }
  .rate { margin-inline-start: auto; }
  .field { display: grid; gap: 6px; min-width: 0; font-weight: 600; }
  .full { grid-column: 1 / -1; }
  .color-service { margin-bottom: 20px; }
  .color-service, .color-rate { display: none; }
  form:has(input[name='service'][value='color']:checked) .color-service { display: grid; }
  form:has(input[name='service'][value='color']:checked) .color-rate { display: inline; }
  form:has(input[name='service'][value='color']:checked) .vfx-rate { display: none; }

  .field :is(input, select, textarea) {
    width: 100%;
    min-width: 0;
    min-height: 46px;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid var(--rule);
    background: #1c1317;
    color: inherit;
    font: inherit;
    font-weight: 400;
  }

  textarea { resize: vertical; }

  button {
    margin-top: 20px;
    min-height: 46px;
    padding-inline: 18px;
    border: 0;
    background: var(--ruby);
    color: var(--cream);
    font-weight: 700;
    cursor: pointer;
  }

  button:disabled { opacity: .65; cursor: wait; }

  :is(a, input, select, textarea, button):focus-visible {
    outline: 2px solid var(--berry);
    outline-offset: 3px;
  }

  [role='status'], .error { margin-top: 12px; }

  @media (max-width: 560px) {
    .grid { grid-template-columns: 1fr; }
    button { width: 100%; }
  }
</style>
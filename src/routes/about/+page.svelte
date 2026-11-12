<script>
  import portrait from '$lib/images/AboutMeJesse.png';
  import houdiniLogo from '$lib/images/HoudiniLogo.png';
  import nukeLogo from '$lib/images/NukeLogo.png';
  import mayaLogo from '$lib/images/MayaLogo.png';
  import unrealLogo from '$lib/images/UnrealLogo.png';
  import onsetLogo from '$lib/images/OnSetLogo.png';
  import supervisionLogo from '$lib/images/SupervisionLogo.png';
  import resume from '$lib/JesseWinterResume.pdf';

  const skills = [
    {
      name: 'Houdini',
      icon: houdiniLogo,
      description:
        'I use Houdini for simulation and procedural workflows. I also build tools and digital assets to make production workflows more efficient.'
    },
    {
      name: 'Nuke',
      icon: nukeLogo,
      description: 'Nuke is my go-to compositing tool and a key part of my 3D workflow.'
    },
    {
      name: 'Maya',
      icon: mayaLogo,
      description:
        'I use Maya for modeling and lighting, and render CG shots with Arnold, Redshift, and Pixar’s RenderMan.'
    },
    {
      name: 'Unreal Engine',
      icon: unrealLogo,
      description:
        'I use Unreal Engine for lighting, rendering, and Niagara simulations alongside my other 3D tools.'
    },
    {
      name: 'On-set supervision',
      icon: onsetLogo,
      description:
        'On set, I record camera settings and gather lens distortion references, color charts, and HDRIs to help the VFX team match the footage.'
    },
    {
      name: 'Project supervision',
      icon: supervisionLogo,
      description:
        'I work with the director to carry their vision through post and assign shots based on each artist’s strengths.'
    }
  ];
</script>

<svelte:head>
  <title>About | Jesse Winter</title>
  <meta
    name="description"
    content="Meet Jesse Winter, an Atlanta-based visual effects artist, 3D generalist, and film colorist."
  />
</svelte:head>

<div class="about-page">
  <div class="about-inner">
    <section class="intro" aria-labelledby="about-title">
      <div class="intro-copy">
        <p class="eyebrow">Atlanta, GA</p>
        <h1 id="about-title">About me</h1>
        <p class="bio">
          I’m Jesse Winter, a Visual Effects Artist, 3D Generalist, and Film Colorist.
          With 4 years of experience, I’m always trying to learn new skills to enhance
          my creative toolkit.
        </p>

        <div class="profile-links">
          <a class="resume-link" href={resume} target="_blank" rel="noopener noreferrer">
            View résumé
          </a>
          <a
            class="linkedin-link"
            href="https://www.linkedin.com/in/jessewintervfx/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <figure class="portrait">
        <img
          src={portrait}
          alt="Jesse Winter on set holding a color chart"
          width="2050"
          height="1000"
          fetchpriority="high"
        />
      </figure>
    </section>

    <section class="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">Tools &amp; experience</h2>

      <div class="skills-grid">
        {#each skills as skill (skill.name)}
          <article class="skill">
            <img src={skill.icon} alt="" width="38" height="38" loading="lazy" />
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </article>
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
  .about-page {
    --about-paper: var(--paper, #f8f0eb);
    --about-ink: var(--ink, #28191d);
    --about-wine: var(--wine, #641220);
    --about-berry: var(--berry, #85182a);
    --about-ruby: var(--ruby, #a11d33);
    --about-rule: var(--rule, #ddc9c8);
    --about-muted: var(--muted, #685257);
    --about-cream: var(--cream, #fff5ed);
    --about-gutter: clamp(18px, 4.2vw, 64px);

    background: var(--about-paper);
    color: var(--about-ink);
    font-family: var(--body, 'Instrument Sans', Arial, sans-serif);
  }

  .about-inner {
    width: min(1320px, calc(100% - var(--about-gutter) * 2));
    margin-inline: auto;
    padding-bottom: clamp(30px, 5vw, 62px);
  }

  .intro {
    display: grid;
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
    align-items: center;
    gap: clamp(24px, 4vw, 58px);
    padding-block: clamp(34px, 5.5vw, 74px) clamp(32px, 5vw, 64px);
  }

  .eyebrow {
    margin: 0;
    color: var(--about-berry);
    font-family: var(--mono, 'IBM Plex Mono', monospace);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  h1 {
    margin: 9px 0 19px;
    color: var(--about-wine);
    font-family: var(--display, 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif);
    font-size: clamp(3rem, 6.8vw, 7rem);
    font-weight: 700;
    line-height: 0.9;
    letter-spacing: -0.04em;
    text-transform: uppercase;
  }

  .bio {
    max-width: 40ch;
    margin: 0;
    font-size: clamp(1rem, 1.65vw, 1.22rem);
    line-height: 1.55;
  }

  .profile-links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 20px;
    margin-top: 20px;
  }

  .profile-links a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-weight: 600;
  }

  .resume-link {
    padding-inline: 15px;
    background: var(--about-ruby);
    color: var(--about-cream);
    text-decoration: none;
  }

  .resume-link:hover {
    background: var(--about-wine);
  }

  .linkedin-link {
    color: var(--about-berry);
    text-decoration: underline;
    text-underline-offset: 0.22em;
  }

  .profile-links a:focus-visible {
    outline: 2px solid var(--about-ruby);
    outline-offset: 4px;
  }

  .portrait {
    margin: 0;
    background: #28191d;
  }

  .portrait img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1.65;
    object-fit: cover;
    object-position: 63% center;
  }

  .portrait::after {
    content: '';
    display: block;
    height: 4px;
    background: linear-gradient(
      90deg,
      var(--about-wine),
      var(--about-berry),
      var(--about-ruby),
      #e01e37
    );
  }

  .experience {
    border-top: 1px solid var(--about-rule);
    padding-top: 18px;
  }

  h2 {
    margin: 0 0 8px;
    font-size: clamp(1.55rem, 3vw, 2.25rem);
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1.15;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0 clamp(18px, 3vw, 40px);
  }

  .skill {
    border-bottom: 1px solid var(--about-rule);
    padding-block: 19px;
  }

  .skill img {
    display: block;
    width: 38px;
    height: 38px;
    margin-bottom: 8px;
    object-fit: contain;
  }

  .skill h3 {
    margin: 0 0 5px;
    font-size: 1.06rem;
    font-weight: 700;
  }

  .skill p {
    margin: 0;
    color: var(--about-muted);
    font-size: 0.95rem;
    line-height: 1.5;
  }

  @media (max-width: 790px) {
    .intro {
      grid-template-columns: 1fr;
    }

    .skills-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 490px) {
    .skills-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
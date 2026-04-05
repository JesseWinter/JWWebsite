<script>
    import logo from '$lib/images/WebsiteLogo.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <main>
        <section class="showcase">
            <h2 class="reel-title"><strong>Color Grading Reel</strong></h2>
            <p class="reel-date">April 2026</p>
            <div class="reel-video">
    <iframe 
        src="https://player.vimeo.com/video/1179944151"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        title="Color Grading Reel">
    </iframe>
</div>
        </section>
    </main>
</section>

<style>
.reel-video {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    position: relative;
    top: -10px;
}
/* VFX Reel page styles */
.showcase {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 400px;
    position: relative;
    top: -50px;
}

.reel-title {
    font-size: 4.5rem;
    color: #aa5454;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
    position: relative;
    top: 40px;
}

.reel-date {
    font-size: 2.5rem;
    color: #aa5454;
    text-align: center;
    font-weight: bold;
    position: relative;
    top: 0px;
}
</style>
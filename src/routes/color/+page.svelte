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
            <p class="reel-date">August 2025</p>
            <div class="reel-video">
                <iframe src="https://player.vimeo.com/video/1112141968?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="960" height="540" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" title="JESSEWINTER_COLORREEL_August2025"></iframe>
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
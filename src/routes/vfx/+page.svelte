<script>
    import logo from '$lib/images/WebsiteLogo.png';
    import vfxReel from '$lib/videos/August2025_VFXReel.mp4';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <main>
        <section class="vfx-showcase">
            <h2 class="vfx-reel-title"><strong>VFX Reel</strong></h2>
            <p class="vfx-reel-date">August 2025</p>
            <div class="vfx-reel-video">
                    <video controls width="1058">
                    <source src={vfxReel} type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    </main>
</section>

<style>
.vfx-reel-video {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    position: relative;
    top: -10px;
}
/* VFX Reel page styles */
.vfx-showcase {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 400px;
    position: relative;
    top: -50px;
}

.vfx-reel-title {
    font-size: 4.5rem;
    color: #aa5454;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
    position: relative;
    top: 40px;
}

.vfx-reel-date {
    font-size: 2.5rem;
    color: #aa5454;
    text-align: center;
    font-weight: bold;
    position: relative;
    top: 0px;
}
</style>

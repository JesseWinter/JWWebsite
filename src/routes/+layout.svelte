<script lang="ts">
    let { children } = $props();
    import '../app.css';

    import logo from '$lib/images/WebsiteLogo.png';
</script>

<style>
    /* Header - Ensures it stays on top */
header {
    background-color: #aa5454;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 50px;
    height: 100px;
    position: relative; /* Ensures text stays in place */
    z-index: 1000; /* Keeps header on top of everything */
}

/* Centered Header Text */
.header-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-family: Tahoma, sans-serif;
    color: white;
}

/* "Jesse Winter" Text */
.header-title h1 {
    font-size: 3em;
    margin: 0;
}

/* "VFX Artist & Film Colorist" Text */
.header-title p {
    font-size: 1em;
    margin: 0;
}

.logo img {
    height: 100px;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
}

nav ul li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1em;
}
</style>
<header>
        <div class="logo">
            <a href="/">
                <img src={logo}>
            </a>
        </div>
        <div class="header-title">
            <h1>Jesse Winter</h1>
            <p>VFX Artist & Film Colorist</p>
        </div>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/vfx">VFX</a></li>
                <li><a href="/color">Color Grading</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>
{@render children?.()}
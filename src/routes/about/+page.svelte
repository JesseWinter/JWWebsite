<script>
    import logo from '$lib/images/WebsiteLogo.png';
	import about from '$lib/images/AboutMeJesse.png';
	import houdiniLogo from '$lib/images/HoudiniLogo.png';
	import nukeLogo from '$lib/images/NukeLogo.png';
	import mayaLogo from '$lib/images/MayaLogo.png';
	import unrealLogo from '$lib/images/UnrealLogo.png';
	import onsetLogo from '$lib/images/OnSetLogo.png';
	import supervisionLogo from '$lib/images/SupervisionLogo.png';
	import linkedIn from '$lib/images/LinkedInLogo.png';
	import Resume from '$lib/JesseWinterResume.pdf';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section id="wrapper">
    <section class="about-header">
        <img id="about" src={about}>
        <div class="about-text-overlay">
            <h2>ABOUT ME</h2>           
            <p>I'm Jesse Winter, a Visual Effects Artist, 3D Generalist, and Film Colorist. With 4  
            years of experience, I’m always trying to learn new
               skills to enhance my creative toolkit.</p>
               <a class="resume" href={Resume}>RESUME</a>
               <a href="https://www.linkedin.com/in/jessewintervfx/" target="_blank" class="linkedin-link">
                <div class="linkedin-container">
                    <img src={linkedIn}>
                </div>
            </a>                      
    </section>    

    <div class="houdini-container">
        <img src={houdiniLogo} alt="Houdini Logo" class="houdini-logo">
        <span class="houdini-title">HOUDINI</span>
        <img src={nukeLogo} alt="Nuke Logo" class="nuke-logo">
        <span class="nuke-title">NUKE</span>
        <img src={mayaLogo} alt="Maya Logo" class="maya-logo">
        <span class="maya-title">MAYA</span>
        <img src={unrealLogo} alt="Unreal Logo" class="unreal-logo">
        <span class="unreal-title">UNREAL</span>
        <img src={onsetLogo} alt="OnSet Logo" class="onset-logo">
        <span class="onset-title">ON-SET SUPERVISION</span>
        <img src={supervisionLogo} alt="Supervision Logo" class="supervision-logo">
        <span class="supervision-title">PROJECT SUPERVISION</span>
    </div>
    <p class="houdini-description">
        I am confident in my skill with
        simulation and procedural workflows
        using Houdini. I have experience
        setting up tools and digital assets
        to optimize productions.
    </p>
    
    <p class="nuke-description">
        Compositing tool of choice.
        Another powerhouse that enhances
        my 3D workflow.
    </p>

    <p class="maya-description">
        Modeling and lighting tool of
        choice. Rendering through
        Arnold, Redshift, and Pixar's
        Renderman, I complete all my
        CG shots.
    </p>

    <p class="unreal-description">
        Compliments my skillset in other
        3D digital content creation apps.
        I'm proficient in lighting,
        rendering, and simulation
        through Niagara.
    </p>

    <p class="onset-description">
        Being on set allows me to grab
        vital information such as camera
        settings, lens distortion, color
        calibration, and grabbing HDRIs
        of each location.
    </p>

    <p class="supervision-description">
        Working in the supervisor role
        allows me to work with the
        director's vision. I keep my team's
        morale up by working with them and
        assigning them shots that are best
        suited to their skill set.
    </p>
</section>

<style>
.resume {
    position: relative;
}

#about {
    width: 100%;
    height: 650px;
    display: block;
    object-fit: cover;
}

/* About Me Text Overlay */
.about-text-overlay {
    position: absolute;
    top: 150px; /* Moved down by 200px */
    left: 50px; /* Keeps text aligned to the left */
    color: white;
    font-family: Tahoma, sans-serif;
    text-align: left;
    max-width: 700px; /* Adjust width to keep text readable */
    z-index: 5; /* Ensures text is above the image */
}

.about-text-overlay h2 {
    font-size: 5em; /* Increased by 2em */
    margin-bottom: 7.5px; /* Reduced by 25% */
    position: relative;
    top: 25px; /* Moves it down by 25px */
}

.about-text-overlay p {
    font-size: 2em; /* Increased by 2em */
    line-height: 1.125; /* Reduced line spacing by 25% */
    margin-bottom: 15px; /* Reduced by 25% */
}

.about-text-overlay .resume {
    position: relative;
    top: -25px;
    font-size: 2em;
    text-decoration: underline;
    cursor: pointer;
    color: white; /* Makes the text color white */
}

.linkedin-container {
    display: inline-block;
    align-items: center;
    justify-content: center;
    max-width: 100px; /* Allow more space */
    height: auto;
}

.linkedin-container img {
    position: relative;
    top: 45px; /* Moves it down */
    left: -130px; /* Moves it to the left */
    width: 100%;
    max-width: 50px; /* Adjust based on your needs */
    height: auto;
    object-fit: contain; /* Ensures full visibility */
}

/* Houdini Logo - Keep aspect ratio */
.houdini-logo {
    width: 50px !important; 
    height: auto !important; /* Keeps aspect ratio */
    display: block;
    margin-top: 20px;
    margin-left: 20px;
}

.houdini-container {
    display: flex;
    align-items: center;
    gap: 10px; /* Space between logo and text */
}

.houdini-title {
    font-family: Tahoma, sans-serif;
    font-weight: bold;
    font-size: 1.25em;
    position: relative;
    top: 10px;
}

.houdini-description {
    font-family: Tahoma, sans-serif;
    font-size: 1em;
    text-align: left;
    position: relative;
    left: 20px;
    max-width: 200px; /* Adjust if needed */
    margin-top: 5px;
}

/* NUKE LOGO SECTION */

.nuke-logo {
    position: relative;
    top: 10px;
    left: -45px;
    width: 50px !important; 
    height: auto !important; /* Keeps aspect ratio */
    display: block;
    margin-left: 125px; /* Moves it 200px to the right of the Houdini title */
}

.nuke-title {
    font-family: Tahoma, sans-serif;
    font-weight: bold;
    font-size: 1.25em;
    position: relative;
    top: 10px;
    left: -45px;
}

.nuke-description {
    font-family: Tahoma, sans-serif;
    font-size: 1em;
    text-align: left;
    position: relative;
    top: -175px;
    left: 275px;
    max-width: 200px; /* Adjust if needed */
    margin-top: 5px;
}

/* MAYA LOGO SECTION */
.maya-logo {
    position: relative;
    top: 5px;
    width: 50px !important; 
    height: auto !important; /* Keeps aspect ratio */
    display: block;
    margin-left: 150px; /* Moves it 200px to the right of the Nuke title */
}

.maya-title {
    font-family: Tahoma, sans-serif;
    font-weight: bold;
    font-size: 1.25em;
    position: relative;
    top: 10px;
}

.maya-description {
    font-family: Tahoma, sans-serif;
    font-size: 1em;
    text-align: left;
    position: relative;
    top: -255px;
    left: 590px;
    max-width: 200px; /* Adjust if needed */
    margin-top: 5px;
}

/* UNREAL SECTION */
.unreal-logo {
    position: relative;
    top: 275px;
    left: -847px;
    width: 55px !important; 
    height: auto !important; /* Keeps aspect ratio */
    display: block;
    margin-left: 150px; /* Moves it 200px to the right of the Nuke title */
}

.unreal-title {
    font-family: Tahoma, sans-serif;
    font-weight: bold;
    font-size: 1.25em;
    position: relative;
    top: 275px;
    left: -847px;
}

.unreal-description {
    font-family: Tahoma, sans-serif;
    font-size: 1em;
    text-align: left;
    position: relative;
    top: -115px;
    left: 25px;
    max-width: 200px;
    margin-top: 5px;
}

/* OnSet Section */
.onset-logo {
    position: relative;
    top: 270px;
    left: -742px;
    width: 55px !important; 
    height: auto !important; /* Keeps aspect ratio */
    display: block;
}

.onset-title {
    font-family: Tahoma, sans-serif;
    font-weight: bold;
    font-size: 1.25em;
    position: relative;
    top: 275px;
    left: -742px;
}

.onset-description {
    font-family: Tahoma, sans-serif;
    font-size: 1em;
    text-align: left;
    position: relative;
    top: -245px;
    left: 275px;
    max-width: 200px;
    margin-top: 5px;
}

.onset-logo {
    margin-left: -15px;
}
.onset-title {
    margin-left: -10px;
    font-size: 1rem;
}

/* Supervision Section */
.supervision-logo {
    position: relative;
    top: 270px;
    left: -700px;
    width: 55px !important; 
    height: auto !important; /* Keeps aspect ratio */
    display: block;
}

.supervision-title {
    font-family: Tahoma, sans-serif;
    font-weight: bold;
    font-size: 1.25em;
    position: relative;
    top: 275px;
    left: -700px;
}

.supervision-description {
    font-family: Tahoma, sans-serif;
    font-size: 1em;
    text-align: left;
    position: relative;
    top: -400px;
    left: 600px;
    max-width: 200px;
    margin-top: 5px;
}

#wrapper {
    display: block;
    overflow: hidden;
    height: 1250px;
}
</style>
<script>
	import logo from '$lib/images/WebsiteLogo.png';
	import image1 from '$lib/images/Image1.png';
	import image2 from '$lib/images/Image2.png';
	import image3 from '$lib/images/Image3.png';
	import image4 from '$lib/images/Image4.png';
	import image5 from '$lib/images/Image5.png';
	import image6 from '$lib/images/Image6.png';
	import image7 from '$lib/images/Image7.png';
	import image8 from '$lib/images/Image8.png';
	import image9 from '$lib/images/Image9.png';
	import image10 from '$lib/images/Image10.png';
	import image11 from '$lib/images/Image11.png';
	
	import { Carousel } from 'flowbite-svelte';
    const images = [
        { src: image1, alt: 'Image1', title: 'Image1' },
        { src: image2, alt: 'Image2', title: 'Image2' },
        { src: image3, alt: 'Image3', title: 'Image3' },
        { src: image4, alt: 'Image4', title: 'Image4' },
        { src: image5, alt: 'Image5', title: 'Image5' },
        { src: image6, alt: 'Image6', title: 'Image6' },
        { src: image7, alt: 'Image7', title: 'Image7' },
        { src: image8, alt: 'Image8', title: 'Image8' },
        { src: image9, alt: 'Image9', title: 'Image9' },
        { src: image10, alt: 'Image10', title: 'Image10' },
        { src: image11, alt: 'Image11', title: 'Image11' }
    ];
    import { fade } from "svelte/transition";
    import { linear } from "svelte/easing";

    const fadeAnimation = (node) => fade(node, { duration: 800, easing: linear})
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
        <div class="grid h-205 overflow-hidden">
        <Carousel duration={3000} class="bottom-0" {images} transition={fadeAnimation}/>
        </div>

<style>
</style>
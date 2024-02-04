<script>
import Footer from './../FooterSection/Footer.svelte';
import MapButton from './../MapButton/MapButton.svelte';
	import Offer from './../OfferSection/Offer.svelte';
  import Join from './../JoinUsSection/Join.svelte';
 import Help from "../HelpSection/help.svelte";
import Searchbar from "./Searchbar.svelte";

</script>
  
<section class="hero">
  <div class="hero-background flex justify-center items-center">
    <img src="/vx.png" alt="Background Image" class="hero-image">
    <div class="absolute bottom-40 left-20 mb-4 ml-4">
      <Searchbar/>
    </div>
  </div>

  <div class="hero-content text-white ml-[-750px] mb-48">
    <div class="flex flex-col">
      <h1 class="text-5xl font-bold mb-2" style="font-family: 'Poppins';">
        Easy way to find a
      </h1>
      <h1 class="text-5xl font-bold mb-7">
        perfect property
      </h1>
      <p class="text-lg font-normal mb-2">
        We provide a complete service for the sale <br> purchase, or rental of real estate.
      </p>
    </div>
  </div>
</section>

<style>
.hero {
  width: 100vw;
}

.hero-background {
  position: relative;
  width: 100%;
}

.hero-image {
  width: 90%; 
  height: auto; 
  max-height: 80vh; 
  border-radius: 20px; 
}
</style>


  <Help/>
  <Offer/>
  <Join/>
  <MapButton/>
  <Footer/>
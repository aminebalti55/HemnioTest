<script>
  import { onMount } from 'svelte';
  import interact from 'interactjs';
  import { faMapMarkerAlt, faBed, faBath, faRulerCombined, faHome, faCheckCircle, faUndo } from '@fortawesome/free-solid-svg-icons';
  import { Fa } from 'svelte-fa';
  import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

  let houses = [
    { id: 1, title: "Modern Villa", images: ["/4.jpg", "/5.jpg"], description: "4 BHK villa with a beautiful garden and pool.", distance: "2 km", location: "Malmo", surface: "200 sqm", bedrooms: 4, bathrooms: 3 },
    { id: 2, title: "City Apartment", images: ["/2.jpg", "/6.jpg"], description: "A cozy 2 BHK apartment in the heart of the city.", distance: "500 m", location: "Stockholm", surface: "100 sqm", bedrooms: 2, bathrooms: 1 },
    { id: 3, title: "Beach House", images: ["/3.jpg", "/4.jpg"], description: "5 BHK beach house with a stunning sea view.", distance: "10 km", location: "Malmo", surface: "300 sqm", bedrooms: 5, bathrooms: 4 },
  ];

  let selectedHouse = null;
  let dragging = false;
  let currentImageIndex = 0;
  let swipedCards = [];
  let cardElement;
  let cards = [];

  function selectHouse(house, card) {
    if (!dragging) {
      setTimeout(() => {
        selectedHouse = house;
        currentImageIndex = 0;
        card.style.display = 'none';
      }, 200);
    }
  }

  function closePopup() {
    selectedHouse = null;
    currentImageIndex = 0;
    const cards = document.querySelectorAll('.draggable');
    cards.forEach(card => card.style.display = 'flex');
  }

  function nextImage() {
    if (currentImageIndex < selectedHouse.images.length - 1) {
      currentImageIndex++;
    }
  }

  function prevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
    }
  }

  function swipeRight(house) {
  const card = document.querySelector(`.draggable[data-id='${house.id}']`);
  if (!card) return;

  const originalTransform = card.style.transform;
  card.querySelector('.yes').style.display = 'block';

  card.style.transition = "transform 0.5s ease-in-out";
  card.style.transform = `translate(1000px) rotate(20deg)`;

  setTimeout(() => {
    card.remove();
    if (houses.length > 0) {
      swipedCards.push({ ...houses[0], originalTransform, card });
      houses = houses.slice(1);
      cards.shift();
    }
  }, 500);
}

function swipeLeft(house) {
  const card = document.querySelector(`.draggable[data-id='${house.id}']`);
  if (!card) return;

  const originalTransform = card.style.transform;
  card.querySelector('.no').style.display = 'block';

  card.style.transition = "transform 0.5s ease-in-out";
  card.style.transform = `translate(-1000px) rotate(-20deg)`;

  setTimeout(() => {
    card.remove();
    if (houses.length > 0) {
      swipedCards.push({ ...houses[0], originalTransform, card });
      houses = houses.slice(1);
      cards.shift();
    }
  }, 500);
}


function reverseSwipe() {
  if (swipedCards.length > 0) {
    const lastSwipedCard = swipedCards.pop();
    houses.unshift(lastSwipedCard);

    const container = document.querySelector('.container');
    container.insertBefore(lastSwipedCard.card, container.firstChild);

    addSwipeListeners(lastSwipedCard.card);

    lastSwipedCard.card.style.transition = 'transform 0.5s ease-in-out';
    lastSwipedCard.card.style.transform = 'translateY(1000px)';

    lastSwipedCard.card.querySelector('.yes').style.display = 'none';
    lastSwipedCard.card.querySelector('.no').style.display = 'none';

    setTimeout(() => {
      lastSwipedCard.card.style.transform = 'translate(0px, 0px) rotate(0deg)';
      lastSwipedCard.card.setAttribute('data-x', 0);
      lastSwipedCard.card.setAttribute('data-y', 0);
    }, 100);

    setTimeout(() => {
      lastSwipedCard.card.style.transition = '';
    }, 600);

    cards.unshift(lastSwipedCard.card);
  }
}




  function dragMoveListener(event) {
    dragging = true;
    var target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    let rotation = x / 10;
    target.style.webkitTransform =
      target.style.transform =
      'translate(' + x + 'px, ' + y + 'px) rotate(' + rotation + 'deg)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    if (x > 0) {
      target.querySelector('.yes').style.display = 'block';
      target.querySelector('.no').style.display = 'none';
    } else {
      target.querySelector('.yes').style.display = 'none';
      target.querySelector('.no').style.display = 'block';
    }
  }

  function dragEndListener(event) {
    let target = event.target;
    let x = (parseFloat(target.getAttribute('data-x')) || 0);
    let direction = x > 0 ? 1 : -1;
    target.style.transition = "transform 0.5s ease-in-out";
    target.style.transform += `translate(${direction * 1000}px) rotate(${direction * 20}deg)`;

    setTimeout(() => {
      target.style.display = "none";
    }, 500);

    target.querySelector('.yes').style.display = 'none';
    target.querySelector('.no').style.display = 'none';

    setTimeout(() => {
      if (houses.length > 0) {
        swipedCards.push(houses[0]);
        houses = houses.slice(1);
      }
    }, 1000);

    setTimeout(() => {
      dragging = false;
    }, 100);
  }

  function addSwipeListeners(card) {
    card.querySelector('.no').addEventListener('click', () => swipeLeft(houses[0]));
    card.querySelector('.yes').addEventListener('click', () => swipeRight(houses[0]));
    card.addEventListener('click', () => selectHouse(houses[0], card));
  }

  onMount(() => {
    interact('.draggable').draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      autoScroll: true,
      onmove: dragMoveListener,
      onend: dragEndListener
    });

    cards = Array.from(document.querySelectorAll('.draggable'));
    cards.forEach(addSwipeListeners);
  });
</script>


<style>
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 550px;
    margin-left: 40px;
  }

  .draggable {
    position: absolute;
    width: 300px;
    height: 450px;
    border-radius: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    box-sizing: border-box;
    transition: box-shadow 0.3s ease-in-out;
    background-size: cover;
    background-position: center;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .draggable:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  }

  .draggable h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
  }

  .draggable p {
    font-size: 16px;
    margin-top: 10px;
  }

  .no-cards {
    position: absolute;
    text-align: center;
    width: 100%;
    color: #333;
  }

  .yes,
  .no {
    position: absolute;
    font-size: 30px;
    font-weight: bold;
    display: none;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.288);
  }

  .yes {
    color: green;
    top: 20px;
    left: 20px;
  }

  .no {
    color: red;
    top: 20px;
    right: 20px;
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    transition: opacity 0.3s ease;
    overflow: auto;
  }

  .details {
    display: flex;
    justify-content: space-between;
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .popup-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    max-width: 420px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: transform 0.3s ease;
    max-height: 92vh;
    height: inherit;
  }

  .popup-content h2 {
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .popup-content p {
    font-size: 1em;
    line-height: 1.6em;
  }

  .close-button {
    position: absolute;
    right: -15px;
    top: -15px;
    background: #fff;
    color: #333;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    font-size: 1em;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  .location-info {
    display: flex;
    align-items: center;
  }

  .location-info p {
    margin: 0 10px;
  }

  .popup-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    margin-bottom: 20px;
    border-radius: 10px;
  }

  .carousel {
    position: relative;
    display: flex;
    align-items: center;
  }

  .carousel-button {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2em;
  }

  .carousel-button.prev {
    left: 10px;
  }

  .carousel-button.next {
    right: 10px;
  }

  .carousel-indicators {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .carousel-indicator {
    width: 10px;
    height: 10px;
    background: #ddd;
    margin: 0 5px;
    border-radius: 50%;
  }

  .carousel-indicator.active {
    background: #333;
  }

  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .buttons {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    width: 200px;
  }

  .swipe-button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    box-shadow: 0 9px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .swipe-button:hover {
    box-shadow: 0 9px 10px 0 rgba(0, 0, 0, 0.3);
  }

  .swipe-button.nope {
    background: #ec5288;
    color: #ffffff;
  }

  .swipe-button.like {
    background: #3fcc88;
    color: #ffffff;
  }

  .swipe-button.reverse {
    background: #f0ad4e;
    color: #ffffff;
  }
</style>

<div class="container">
  {#each houses as house, i (house.id)}
  <div class="draggable" bind:this={cards[i]} data-id={house.id} on:click={() => selectHouse(house, cards[i])} style="z-index: {houses.length - house.id + 1}; background-image: linear-gradient(to top, rgba(172, 60, 36, 0.6), rgba(0, 0, 0, 0)), url({house.images[0]});">
    <div class="yes">YES</div>
    <div class="no">NO</div>
    <h2>{house.title}</h2>
    <p>{house.description}</p>
  </div>
  {/each}
  {#if houses.length === 0}
  <div class="no-cards">
    <h2>No cards left to swipe</h2>
  </div>
  {/if}
</div>

<div class="buttons">
  <button class="swipe-button nope" on:click={() => swipeLeft(houses[0])}><Fa icon={faTimes} /></button>
  <button class="swipe-button reverse" on:click={reverseSwipe}><Fa icon={faUndo} /></button>
  <button class="swipe-button like" on:click={() => swipeRight(houses[0])}><Fa icon={faCheck} /></button>
</div>

{#if selectedHouse}
<div class="popup" on:click={closePopup}>
  <div class="popup-content" on:click|stopPropagation>
    <button class="close-button" on:click={closePopup}>&times;</button>
    <div class="carousel">
      <button class="carousel-button prev" on:click={prevImage}>&lt;</button>
      <img class="popup-image" src={selectedHouse.images[currentImageIndex]} alt={selectedHouse.title} />
      <button class="carousel-button next" on:click={nextImage}>&gt;</button>
    </div>
    <div class="carousel-indicators">
      {#each selectedHouse.images as image, index (index)}
      <div class="carousel-indicator {currentImageIndex === index ? 'active' : ''}"></div>
      {/each}
    </div>

    <div class="title-container">
      <h2>{selectedHouse.title}</h2>
      <Fa icon={faCheckCircle} color="#3b73ff" />
    </div>

    <div class="location-info" size="lg">
      <Fa icon={faMapMarkerAlt} />
      <p>Distance: {selectedHouse.distance} </p>
    </div>
    <div class="location-info">
      <Fa icon={faHome} size="sm" />
      <p> Location: {selectedHouse.location}</p>
    </div>
    <h2>About the House</h2>
    <p>{selectedHouse.description}</p>
    <h2>Includes</h2>
    <div class="details">
      <div class="detail-item"><Fa icon={faRulerCombined} /> Surface: {selectedHouse.surface}</div>
      <div class="detail-item"><Fa icon={faBed} /> Bedrooms: {selectedHouse.bedrooms}</div>
      <div class="detail-item"><Fa icon={faBath} /> Bathrooms: {selectedHouse.bathrooms}</div>
    </div>
  </div>
</div>
{/if}

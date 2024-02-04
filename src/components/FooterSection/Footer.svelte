<script>
import '@fortawesome/fontawesome-free/css/all.css';

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap');

.horizontal-footer {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10rem;
    justify-items: center;
    align-items: start;
}

.horizontal-footer a {
    white-space: nowrap;
}

.horizontal-footer>div {
    margin: -2rem;
}

footer {
    background-color: #ebc3a3;
    padding-bottom: 8rem;
    font-family: 'Poppins', sans-serif;
}
</style>

<footer class="p-20 mt-40">
    <div class="container mx-auto horizontal-footer">
        <div class="space-y-2">
            <img src="/hemnio-01.png" alt="Logo" class="w-40 mb-2" />
            <p>We have built our reputation as true local experts</p>
            <div class="flex mt-2">
                <input type="email" placeholder="Your email" class="flex-grow mr-2 p-1" />
                <button class="p-1 bg-primary text-white px-9 ">Contact</button>
            </div>
        </div>

        <div class="space-y-2">
            <h2 class="mb-2">Service</h2>
            <ul class="list-none p-0">

                <li class="mb-1"><a href="#" class="font-thin">About us</a></li>
                <li class="mb-1"><a href="#" class="font-thin">Careers</a></li>
                <li class="mb-1"><a href="#" class="font-thin">Terms and conditions</a></li>
                <li class="mb-1"><a href="#" class="font-thin">Privacy and policy</a></li>
            </ul>
        </div>

        <div class="space-y-2">
            <h2 class="mb-2">Community</h2>
            <ul class="list-none p-0">

                <li class="mb-1"><a href="#" class="font-thin">Find agents</a></li>
                <li class="mb-1"><a href="#" class="font-thin">Careers</a></li>
                <li class="mb-1"><a href="#" class="font-thin">Legal notice</a></li>
            </ul>
        </div>

        <div class="space-y-4">
            <h2 class="mb-2">Follow us</h2>
            <div class="flex space-x-4">
                <a href="#"><i class="fab fa-facebook fa-1x text-white"></i></a>
                <a href="#"><i class="fab fa-twitter fa-1x text-white"></i></a>
                <a href="#"><i class="fab fa-instagram fa-1x text-white"></i></a>
            </div>
        </div>
        </footer>

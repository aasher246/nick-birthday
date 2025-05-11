document.addEventListener('DOMContentLoaded', () => {
    const clickSound = document.getElementById('clickSound');
    const startButton = document.getElementById('startButton');
    const birthdayBanner = document.getElementById('birthdayBanner');
    const mainContent = document.getElementById('mainContent');

    console.log("Script loaded and running");

    startButton.onclick = () => {
        console.log("Button clicked!");

        clickSound.currentTime = 0;
        clickSound.play().catch((e) => {
            console.error("Sound failed to play:", e);
        });

        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.volume = 0.2; // Set low volume
        backgroundMusic.play().catch(e => console.error("Background music failed:", e));


        document.getElementById('landing').classList.add('hidden');
        birthdayBanner.classList.remove('hidden');
        mainContent.classList.remove('hidden');

        startConfetti();
        createBalloons(20);
        createSparkles(40);
        setInterval(() => createSparkles(5), 1000); // ongoing sparkles


        // Show the bouquet and cake
        setTimeout(() => {
            const flowers = document.getElementById('flowers');
            const cake = document.getElementById('cake');
            const flowers2 = document.getElementById('flowers2');

            flowers.innerHTML = '<img src="images/bouquet.svg" alt="Bouquet" class="pop-in">';
            cake.innerHTML = `<img src="images/cake.svg" alt="Cake" class="bounce" />`;
            flowers2.innerHTML = `<img src="images/bouquet.svg" alt="Bouquet" class="pop-in">`;
        }, 500);
    };

    // Envelope click logic (both small and large)
    document.querySelectorAll('.envelope, .envelope_large').forEach(env => {
        env.addEventListener('click', () => {
            const msg = env.getAttribute('data-message');
            showMessage(msg);
        });
    });
});

function showMessage(message) {
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');

    // Convert newlines to <br> for HTML
    messageText.innerHTML = message.replace(/\n/g, '<br>');

    messageBox.classList.remove('hidden');
}


function closeMessage() {
    document.getElementById('messageBox').classList.add('hidden');
}

function startConfetti() {
    console.log("Confetti triggered!");
    confetti({
        particleCount: 200,
        angle: 90,
        spread: 180,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#ff0080', '#00ffcc', '#ffcc00', '#af64e1'],
        gravity: 0.5,
        drift: 0,
        scalar: 1.5
    });
}

function playEnvelopeSound() {
    const envelopeSound = document.getElementById('envelopeSound');
    if (envelopeSound) {
        envelopeSound.currentTime = 0;
        envelopeSound.play().catch(e => console.error("Envelope sound error:", e));
    }
}


function createBalloons(numBalloons) {
    const balloonsContainer = document.getElementById('balloons');
    balloonsContainer.innerHTML = '';

    const balloonImages = [
        'images/balloon1.svg',
        'images/balloon2.svg',
        'images/balloon3.svg',
        'images/balloon4.svg',
        'images/balloon5.svg',
        'images/balloon6.svg',
        'images/balloon7.svg'
    ];

    for (let i = 0; i < numBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        const randomIndex = Math.floor(Math.random() * balloonImages.length);
        const img = document.createElement('img');
        img.src = balloonImages[randomIndex];
        img.alt = 'Balloon';
        img.style.width = '50px';
        img.style.height = '70px';

        const randomX = Math.random() * 100;
        balloon.style.left = `${randomX}%`;

        const delay = Math.random() * 10;
        balloon.style.animationDelay = `${delay}s`;

        balloon.appendChild(img);
        balloonsContainer.appendChild(balloon);
    }
}

// Generate sparkles
function createSparkles(count = 30) {
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;
        sparkle.style.animationDuration = `${2 + Math.random() * 2}s`;

        document.body.appendChild(sparkle);

        // Remove after animation
        setTimeout(() => sparkle.remove(), 3000);
    }
}

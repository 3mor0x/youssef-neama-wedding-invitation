const audio = document.getElementById('bg-music');
let isPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    buildCalendar();
    loadWishes();
});

function openInvitation() {
    document.getElementById('heroGate').classList.add('open');
    createPetalExplosion();
    
    audio.play().then(() => {
        isPlaying = true;
    }).catch(() => {
        isPlaying = false;
    });
}

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
}

function createPetalExplosion() {
    const colors = ['#c5a059', '#3b628c', '#ffffff', '#60a5fa', '#f3e5ab'];
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.width = Math.random() * 12 + 8 + 'px';
            petal.style.height = Math.random() * 15 + 10 + 'px';
            petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            petal.style.opacity = Math.random() * 0.7 + 0.3;
            petal.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(petal);

            setTimeout(() => petal.remove(), 5000);
        }, i * 80);
    }
}

// 3 سبتمبر 2026 الساعة 8:00 مساءً
const weddingDate = new Date('September 3, 2026 20:00:00').getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff > 0) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

function buildCalendar() {
    const grid = document.getElementById('calendarGrid');
    if(!grid) return;
    grid.innerHTML = '';
    const headers = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    
    headers.forEach(h => {
        const div = document.createElement('div');
        div.className = 'cal-header';
        div.innerText = h;
        grid.appendChild(div);
    });

    for(let i = 0; i < 2; i++) {
        const empty = document.createElement('div');
        grid.appendChild(empty);
    }

    for(let d = 1; d <= 30; d++) {
        const div = document.createElement('div');
        div.className = 'cal-day';
        if(d === 3) div.classList.add('active-wedding');
        div.innerText = d;
        grid.appendChild(div);
    }
}

function addWish() {
    const nameInput = document.getElementById('guestName');
    const msgInput = document.getElementById('guestMessage');
    const name = nameInput.value.trim();
    const msg = msgInput.value.trim();
    
    if (name && msg) {
        const wish = { name, msg };
        saveWishToStorage(wish);
        renderWish(wish, true);

        nameInput.value = '';
        msgInput.value = '';
    }
}

function renderWish(wish, prepend = false) {
    const wishesList = document.getElementById('wishesList');
    const item = document.createElement('div');
    item.className = 'wish-item';
    item.innerHTML = `<span class="wish-name">${wish.name}</span><div>${wish.msg}</div>`;
    
    if (prepend) {
        wishesList.prepend(item);
    } else {
        wishesList.appendChild(item);
    }
}

function saveWishToStorage(wish) {
    let wishes = JSON.parse(localStorage.getItem('youssef_neama_wishes')) || [];
    wishes.unshift(wish);
    localStorage.setItem('youssef_neama_wishes', JSON.stringify(wishes));
}

function loadWishes() {
    let wishes = JSON.parse(localStorage.getItem('youssef_neama_wishes')) || [];
    wishes.forEach(wish => renderWish(wish));
}
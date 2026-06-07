const TOURS = [
  { id:1,  name:'Незабутня Італія',              country:'Італія',            cat:'Місто',    desc:'Рим, Венеція, Флоренція — три перлини Апеннінського півострова.', price:19999, duration:10, rating:4.9, badge:'Хіт',        img:'images/italy.jpg',       nights:9,  meals:'Сніданок' },
  { id:2,  name:'Грецькі острови',               country:'Греція',            cat:'Пляж',     desc:"Санторіні, Міконос та найкращі пляжі Середземномор'я.",          price:24999, duration:8,  rating:4.8, badge:'Популярне', img:'images/greece.jpg',      nights:7,  meals:'Все включено' },
  { id:3,  name:'Магічна Чехія',                 country:'Чехія',             cat:'Місто',    desc:'Прага, Карлові Вари та середньовічні замки.',                    price:14999, duration:6,  rating:4.7, badge:'Бюджетно', img:'images/czech.jpg',       nights:5,  meals:'Сніданок' },
  { id:4,  name:'Мальдіви — рай на землі',       country:'Мальдіви',          cat:'Екзотика', desc:'Кришталева вода, корали та бунгало над океаном.',                price:79999, duration:12, rating:5.0, badge:'Преміум',   img:'images/maldives.jpg',    nights:11, meals:'Все включено' },
  { id:5,  name:'Норвезькі фіорди',              country:'Норвегія',          cat:'Гори',     desc:'Захопливі пейзажі, фіорди та Північне сяйво.',                   price:38999, duration:9,  rating:4.9, badge:'Унікальне', img:'images/norway.jpg',      nights:8,  meals:'Сніданок' },
  { id:6,  name:'Романтичний Париж',             country:'Франція',           cat:'Місто',    desc:'Ейфелева вежа, Лувр, круасани та атмосфера кохання.',            price:27999, duration:7,  rating:4.8, badge:'Романтика', img:'images/paris.jpg',       nights:6,  meals:'Сніданок' },
  { id:7,  name:'Таїланд: храми та пляжі',       country:'Таїланд',           cat:'Екзотика', desc:'Бангкок, Паттайя, острів Пхукет — повне занурення в культуру.',  price:32999, duration:14, rating:4.7, badge:'Довгий тур', img:'images/thailand.jpg',    nights:13, meals:'Сніданок і вечеря' },
  { id:8,  name:'Іспанія: сонце та фієста',      country:'Іспанія',           cat:'Пляж',     desc:'Барселона, Мадрид, Коста-Брава. Фламенко та тапас.',             price:22999, duration:10, rating:4.6, badge:'Спекотно',  img:'images/spain.jpg',       nights:9,  meals:'Все включено' },
  { id:9,  name:'Японія: традиції та технології', country:'Японія',           cat:'Місто',    desc:'Токіо, Кіото, Осака — подорож між минулим і майбутнім.',          price:65999, duration:14, rating:5.0, badge:'Ексклюзив', img:'images/japan.jpg',       nights:13, meals:'Сніданок' },
  { id:10, name:'Альпійський відпочинок',         country:'Швейцарія',        cat:'Гори',     desc:'Женева, Цюрих, Інтерлакен. Шоколад, сир і засніжені вершини.',   price:52999, duration:8,  rating:4.9, badge:'Гірський',  img:'images/switzerland.jpg', nights:7,  meals:'Сніданок' },
  { id:11, name:'Середземноморський круїз',       country:'Греція / Туреччина',cat:'Круїз',   desc:'7 портів за 8 днів: Афіни, Стамбул, Дубровник, Котор.',          price:44999, duration:8,  rating:4.8, badge:'Круїз',     img:'images/cruise.jpg',      nights:7,  meals:'Все включено' },
  { id:12, name:'Туреччина All Inclusive',         country:'Туреччина',        cat:'Пляж',     desc:'Анталія, Кемер, Белек. Найкращий сервіс за найкращою ціною.',    price:16999, duration:7,  rating:4.5, badge:'Бестселер', img:'images/turkey.jpg',      nights:6,  meals:'Все включено' },
];

let currentCat  = 'all';
let currentSort = 'default';

function renderTours() {
  const trackEl = document.getElementById('tourTrack');
  if (!trackEl) return;

  let data = [...TOURS];
  if (currentCat !== 'all') {
    data = data.filter(t => t.cat === currentCat);
  }
  applySorting(data);

  const noRes = document.getElementById('noResults');
  if (!data.length) {
    trackEl.innerHTML = '';
    if (noRes) noRes.style.display = 'block';
    return;
  }
  if (noRes) noRes.style.display = 'none';
  trackEl.innerHTML = data.map(cardHTML).join('');
}

function renderToursGrid() {
  const gridEl = document.getElementById('toursGrid');
  if (!gridEl) return;

  let data = [...TOURS];

 
  if (currentCat !== 'all') {
    data = data.filter(t => t.cat === currentCat);
  }


  const countryEl = document.getElementById('sCountry');
  if (countryEl && countryEl.value) {
    data = data.filter(t => t.country.toLowerCase().includes(countryEl.value.toLowerCase()));
  }


  const budgetEl = document.getElementById('sBudget');
  if (budgetEl && budgetEl.value) {
    data = data.filter(t => t.price <= +budgetEl.value);
  }

  applySorting(data);

  const noRes = document.getElementById('noRes');
  const countEl = document.getElementById('tourCount');

  if (!data.length) {
    gridEl.innerHTML = '';
    if (noRes) noRes.style.display = 'block';
    if (countEl) countEl.textContent = '';
    return;
  }
  if (noRes) noRes.style.display = 'none';
  if (countEl) countEl.textContent = `Знайдено турів: ${data.length}`;

  gridEl.innerHTML = data.map(cardHTML).join('');
}


function cardHTML(t) {
  return `
    <article class="tour-card" data-id="${t.id}">
      <div class="tour-card-img">
        <img src="${t.img}" alt="Тур ${t.name} — ${t.country}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
        <span class="tc-badge">${t.badge}</span>
        <span class="tc-tag">${t.cat}</span>
      </div>
      <div class="tc-body">
        <div class="tc-loc">📍 ${t.country}</div>
        <h3 class="tc-name">${t.name}</h3>
        <p class="tc-desc">${t.desc}</p>
        <div class="tc-meta">
          <span>🌙 ${t.nights} ночей</span>
          <span>🍽 ${t.meals}</span>
          <span>⭐ ${t.rating}</span>
        </div>
        <div class="tc-footer">
          <div class="tc-price">
            ${t.price.toLocaleString('uk-UA')} грн<br>
            <small>на особу</small>
          </div>
          <button class="btn btn-primary btn-sm" onclick="bookTour(${t.id})">Бронювати</button>
        </div>
      </div>
    </article>
  `;
}


function applySorting(data) {
  switch (currentSort) {
    case 'price-asc':    data.sort((a, b) => a.price - b.price);                  break;
    case 'price-desc':   data.sort((a, b) => b.price - a.price);                  break;
    case 'name-asc':     data.sort((a, b) => a.name.localeCompare(b.name, 'uk')); break;
    case 'rating-desc':  data.sort((a, b) => b.rating - a.rating);                break;
    case 'duration-asc': data.sort((a, b) => a.duration - b.duration);            break;
  }
}


function bookTour(id) {
  const t = TOURS.find(x => x.id === id);
  showToast(`✅ Тур "${t.name}" додано до кошика!`);
}


const filterBarEl = document.getElementById('filterBar');
if (filterBarEl) {
  filterBarEl.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    renderTours();
    renderToursGrid();
  });
}

const sortSelEl = document.getElementById('sortSel');
if (sortSelEl) {
  sortSelEl.addEventListener('change', e => {
    currentSort = e.target.value;
    renderToursGrid();
  });
}

const sortSelectEl = document.getElementById('sortSelect');
if (sortSelectEl) {
  sortSelectEl.addEventListener('change', e => {
    currentSort = e.target.value;
    renderTours();
  });
}


const searchBtnEl = document.getElementById('searchBtn');
if (searchBtnEl) {
  searchBtnEl.addEventListener('click', () => renderToursGrid());
}


const resetBtnEl = document.getElementById('resetBtn');
if (resetBtnEl) {
  resetBtnEl.addEventListener('click', () => {
    const countryEl = document.getElementById('sCountry');
    const budgetEl  = document.getElementById('sBudget');
    if (countryEl) countryEl.value = '';
    if (budgetEl)  budgetEl.value  = '';
    currentCat  = 'all';
    currentSort = 'default';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('.filter-btn[data-cat="all"]');
    if (allBtn) allBtn.classList.add('active');
    renderToursGrid();
  });
}


const tourTrackEl = document.getElementById('tourTrack');
const arrowLeft   = document.getElementById('arrowLeft');
const arrowRight  = document.getElementById('arrowRight');

if (arrowLeft && tourTrackEl) {
  arrowLeft.addEventListener('click', () => tourTrackEl.scrollBy({ left: -340, behavior: 'smooth' }));
}
if (arrowRight && tourTrackEl) {
  arrowRight.addEventListener('click', () => tourTrackEl.scrollBy({ left: 340, behavior: 'smooth' }));
}


function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
}
function switchModal(closeId, openId) {
  closeModal(closeId);
  openModal(openId);
}

const loginBtnEl    = document.getElementById('loginBtn');
const registerBtnEl = document.getElementById('registerBtn');
const loginCloseEl  = document.getElementById('loginClose');
const regCloseEl    = document.getElementById('registerClose');
const searchCloseEl = document.getElementById('searchClose');

if (loginBtnEl)    loginBtnEl.addEventListener('click',    () => openModal('loginModal'));
if (registerBtnEl) registerBtnEl.addEventListener('click', () => openModal('registerModal'));
if (loginCloseEl)  loginCloseEl.addEventListener('click',  () => closeModal('loginModal'));
if (regCloseEl)    regCloseEl.addEventListener('click',    () => closeModal('registerModal'));
if (searchCloseEl) searchCloseEl.addEventListener('click', () => closeModal('searchModal'));

['loginBackdrop', 'registerBackdrop', 'searchBackdrop'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', () => closeModal(id.replace('Backdrop', 'Modal')));
});

const switchToRegEl   = document.getElementById('switchToReg');
const switchToLoginEl = document.getElementById('switchToLogin');
if (switchToRegEl) {
  switchToRegEl.addEventListener('click', e => {
    e.preventDefault(); closeModal('loginModal'); openModal('registerModal');
  });
}
if (switchToLoginEl) {
  switchToLoginEl.addEventListener('click', e => {
    e.preventDefault(); closeModal('registerModal'); openModal('loginModal');
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['loginModal', 'registerModal', 'searchModal'].forEach(id => closeModal(id));
  }
});


function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}


const nlBtnEl = document.getElementById('nlBtn');
if (nlBtnEl) {
  nlBtnEl.addEventListener('click', () => {
    const emailEl = document.getElementById('nlEmail');
    const email   = emailEl.value.trim();
    if (!email || !email.includes('@')) {
      showToast('⚠️ Введіть коректну пошту');
      return;
    }
    showToast('📧 Дякуємо! Ви підписані на новини.');
    emailEl.value = '';
  });
}


const headerEl = document.getElementById('header');
const btnUpEl  = document.getElementById('btnUp');


if (headerEl) headerEl.style.transition = 'none';
requestAnimationFrame(() => {
  if (headerEl) headerEl.style.transition = '';
});

window.addEventListener('scroll', () => {
  if (headerEl) headerEl.classList.toggle('scrolled', window.scrollY > 60);
  if (btnUpEl)  btnUpEl.classList.toggle('vis',       window.scrollY > 400);
});

if (btnUpEl) {
  btnUpEl.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


const burgerBtn = document.getElementById('burger');
const navEl     = document.getElementById('nav');

if (burgerBtn && navEl) {
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('open');
    navEl.classList.toggle('open');
  });
  navEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burgerBtn.classList.remove('open');
      navEl.classList.remove('open');
    });
  });
}


function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const step   = target / 60;
    let curr = 0;
    const timer = setInterval(() => {
      curr += step;
      if (curr >= target) { curr = target; clearInterval(timer); }
      el.textContent = Math.floor(curr).toLocaleString('uk-UA');
    }, 30);
  });
}

const heroSection = document.querySelector('.hero');
if (heroSection) {
  const heroObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); heroObs.disconnect(); }
  }, { threshold: 0.3 });
  heroObs.observe(heroSection);
}


const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));


const htmlEl     = document.documentElement;
const toggleBtn  = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('sw-theme') || 'light';

htmlEl.setAttribute('data-theme', savedTheme);
if (toggleBtn) toggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    const next   = isDark ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    toggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('sw-theme', next);
  });
}


renderTours();     
renderToursGrid();  

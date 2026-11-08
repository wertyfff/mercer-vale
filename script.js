const resetReloadPosition = () => {
  if (window.mercerReload) window.scrollTo({top:0,left:0,behavior:'instant'});
};
resetReloadPosition();
if (window.mercerReload) {
  document.addEventListener('DOMContentLoaded',resetReloadPosition,{once:true});
  requestAnimationFrame(resetReloadPosition);
}
// A restrained wordmark and a single preparation bar.
const loader = document.querySelector('.site-loader');
let bootFinished = false;
let bootTimer;
let bootSequence = 0;
let bootFrame = 0;
let openingWasReplayed = false;
const setBootProgress = value => {
  loader.querySelector('.loader-track').setAttribute('aria-valuenow',String(Math.round(value)));
  loader.style.setProperty('--load-progress',String(value / 100));
};
function finishBoot() {
  if (bootFinished) return;
  bootFinished = true;
  const sequence = bootSequence;
  clearTimeout(bootTimer);clearTimeout(window.mercerBootFallback);cancelAnimationFrame(bootFrame);
  setBootProgress(100);resetReloadPosition();requestAnimationFrame(resetReloadPosition);
  document.documentElement.classList.remove('is-booting');
  document.querySelectorAll('.site-header,main,.site-footer,.skip-link').forEach(element => { element.inert = false; });
  loader.classList.add('is-leaving');
  const hide = () => {
    if (sequence !== bootSequence) return;
    loader.hidden = true;loader.classList.remove('is-leaving');
    if (openingWasReplayed) document.querySelector('.header-brand').focus({preventScroll:true});
  };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) hide();
  else setTimeout(hide,500);
}
function startOpening(replay = false) {
  const sequence = ++bootSequence;
  const started = performance.now();
  const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1200 : 4000;
  let assetsReady = false;
  bootFinished = false;openingWasReplayed = replay;
  clearTimeout(bootTimer);cancelAnimationFrame(bootFrame);
  document.documentElement.classList.add('is-booting');
  loader.classList.remove('is-leaving');loader.hidden = false;setBootProgress(0);
  document.querySelectorAll('.site-header,main,.site-footer,.skip-link').forEach(element => { element.inert = true; });
  bootTimer = setTimeout(finishBoot,9000);
  if (replay) { window.scrollTo({top:0,left:0,behavior:'instant'});loader.querySelector('.loader-skip').focus({preventScroll:true}); }
  Promise.allSettled([document.querySelector('.hero-photo').decode(),document.fonts?.ready || Promise.resolve()]).then(() => { assetsReady = true; });
  const prepare = now => {
    if (sequence !== bootSequence || bootFinished) return;
    const value = Math.min((now-started)/duration*100,assetsReady ? 100 : 88);
    setBootProgress(value);
    if (value >= 100 && assetsReady) finishBoot();
    else bootFrame = requestAnimationFrame(prepare);
  };
  bootFrame = requestAnimationFrame(prepare);
}
loader.querySelector('.loader-skip').addEventListener('click',finishBoot);
if (document.documentElement.classList.contains('is-booting')) startOpening();
document.querySelector('.replay-opening').addEventListener('click',() => startOpening(true));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
reducedMotion.addEventListener('change',event => {
  if (event.matches && !bootFinished) finishBoot();
});
const menu = document.querySelector('#site-menu');
const menuToggle = document.querySelector('.menu-toggle');
const lookbook = document.querySelector('.lookbook');
const search = document.querySelector('#site-search');
const dialogs = [menu, lookbook, search];
let returnFocus = null;
let slideIndex = 0;
let imageRequest = 0;
const studies = [
  {
    "gender": "women",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/women-coat-02.jpg",
    "title": "The city coat.",
    "description": "A tan coat and a wide-brimmed hat, photographed on brick steps.",
    "alt": "A tan coat and a wide-brimmed hat, photographed on brick steps."
  },
  {
    "gender": "women",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/women-coat-01.jpg",
    "title": "Up close.",
    "description": "The cuff, the belt and a watch: a closer look at a beige trench.",
    "alt": "The cuff, the belt and a watch: a closer look at a beige trench."
  },
  {
    "gender": "women",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/women-edit-02.jpg",
    "title": "Burgundy outside.",
    "description": "A burgundy coat over a dark turtleneck, finished with sunglasses.",
    "alt": "A burgundy coat over a dark turtleneck, finished with sunglasses."
  },
  {
    "gender": "women",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/women-coat-new-32.jpg",
    "title": "A longer line.",
    "description": "A camel coat with an asymmetric hem, tied at the waist over black.",
    "alt": "A camel coat with an asymmetric hem, tied at the waist over black."
  },
  {
    "gender": "women",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/women-coat-new-33.jpg",
    "title": "Belted in beige.",
    "description": "A beige trench coat with a wide collar, worn over a black top.",
    "alt": "A beige trench coat with a wide collar, worn over a black top."
  },
  {
    "gender": "women",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/women-coat-new-34.jpg",
    "title": "Open over black.",
    "description": "A tan coat left open over a short black dress.",
    "alt": "A tan coat left open over a short black dress."
  },
  {
    "gender": "women",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/women-coat-new-35.jpg",
    "title": "White outer layer.",
    "description": "An oversized white coat, a small shoulder bag and black ankle boots.",
    "alt": "An oversized white coat, a small shoulder bag and black ankle boots."
  },
  {
    "gender": "women",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/women-coat-new-20.jpg",
    "title": "Out on the street.",
    "description": "A short beige jacket, a dark skirt and tall black boots.",
    "alt": "A short beige jacket, a dark skirt and tall black boots."
  },
  {
    "gender": "women",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/women-top-01.jpg",
    "title": "White, with black.",
    "description": "A cropped white T-shirt with black cargo trousers.",
    "alt": "A cropped white T-shirt with black cargo trousers."
  },
  {
    "gender": "women",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/women-detail-01.jpg",
    "title": "A softer line.",
    "description": "A white blouse and a pale pleated skirt, photographed seated.",
    "alt": "A white blouse and a pale pleated skirt, photographed seated."
  },
  {
    "gender": "women",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/women-shirt-02.jpg",
    "title": "In blue.",
    "description": "A patterned blue shirt, photographed on a hanger.",
    "alt": "A patterned blue shirt, photographed on a hanger."
  },
  {
    "gender": "women",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/women-silhouette-01.jpg",
    "title": "Head to toe.",
    "description": "Yellow separates and white boots on an outdoor court.",
    "alt": "Yellow separates and white boots on an outdoor court."
  },
  {
    "gender": "women",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/women-top-new-11.jpg",
    "title": "Blue, laid out.",
    "description": "A striped blue shirt and matching skirt, arranged with white sneakers.",
    "alt": "A striped blue shirt and matching skirt, arranged with white sneakers."
  },
  {
    "gender": "women",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/women-top-new-12.jpg",
    "title": "The floral shirt.",
    "description": "A red shirt with a large pale floral print.",
    "alt": "A red shirt with a large pale floral print."
  },
  {
    "gender": "women",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/women-top-new-13.jpg",
    "title": "The overshirt.",
    "description": "A grey overshirt with a pointed collar and large chest pocket.",
    "alt": "A grey overshirt with a pointed collar and large chest pocket."
  },
  {
    "gender": "women",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/women-knit-01.jpg",
    "title": "A printed white tee.",
    "description": "A white T-shirt with a small graphic print, shown on a hanger.",
    "alt": "A white T-shirt with a small graphic print, shown on a hanger."
  },
  {
    "gender": "women",
    "categoryKey": "knitwear",
    "category": "Knitwear",
    "image": "assets/collection/women-knit-02.jpg",
    "title": "An open stitch.",
    "description": "A cream crochet top, shown on a hanger so the stitch takes focus.",
    "alt": "A cream crochet top, shown on a hanger so the stitch takes focus."
  },
  {
    "gender": "women",
    "categoryKey": "knitwear",
    "category": "Knitwear",
    "image": "assets/collection/women-knit-new-01.jpg",
    "title": "The red sweater.",
    "description": "A deep red ribbed sweater layered over a white pointed collar.",
    "alt": "A deep red ribbed sweater layered over a white pointed collar."
  },
  {
    "gender": "women",
    "categoryKey": "knitwear",
    "category": "Knitwear",
    "image": "assets/collection/women-knit-new-02.jpg",
    "title": "Green cable knit.",
    "description": "An oversized green cable-knit sweater, photographed outdoors.",
    "alt": "An oversized green cable-knit sweater, photographed outdoors."
  },
  {
    "gender": "women",
    "categoryKey": "knitwear",
    "category": "Knitwear",
    "image": "assets/collection/women-knit-new-03.jpg",
    "title": "The stitch, close up.",
    "description": "A close view of a cream sweater with open stitches and ribbed cuffs.",
    "alt": "A close view of a cream sweater with open stitches and ribbed cuffs."
  },
  {
    "gender": "women",
    "categoryKey": "knitwear",
    "category": "Knitwear",
    "image": "assets/collection/women-knit-new-04.jpg",
    "title": "Cream against blue.",
    "description": "A long cream cardigan, photographed against a clear blue sky.",
    "alt": "A long cream cardigan, photographed against a clear blue sky."
  },
  {
    "gender": "women",
    "categoryKey": "knitwear",
    "category": "Knitwear",
    "image": "assets/collection/women-knit-new-06.jpg",
    "title": "A pale grey layer.",
    "description": "A soft grey sweater, photographed in warm outdoor light.",
    "alt": "A soft grey sweater, photographed in warm outdoor light."
  },
  {
    "gender": "women",
    "categoryKey": "knitwear",
    "category": "Knitwear",
    "image": "assets/collection/women-knit-new-07.jpg",
    "title": "The white turtleneck.",
    "description": "A white cable-knit turtleneck, held on a hanger beside dried flowers.",
    "alt": "A white cable-knit turtleneck, held on a hanger beside dried flowers."
  },
  {
    "gender": "women",
    "categoryKey": "knitwear",
    "category": "Knitwear",
    "image": "assets/collection/women-knit-new-09.jpg",
    "title": "Dark red, close up.",
    "description": "A deep burgundy textured knit, shown in a close crop.",
    "alt": "A deep burgundy textured knit, shown in a close crop."
  },
  {
    "gender": "men",
    "categoryKey": "tailoring",
    "category": "Tailoring",
    "image": "assets/collection/men-tie-01.jpg",
    "title": "Shirt. Tie. After dark.",
    "description": "A white shirt, a patterned tie and relaxed black trousers. The starting point for the men’s edit.",
    "alt": "A white shirt, a patterned tie and relaxed black trousers. The starting point for the men’s edit."
  },
  {
    "gender": "men",
    "categoryKey": "tailoring",
    "category": "Tailoring",
    "image": "assets/collection/men-tie-03.jpg",
    "title": "A narrow tie.",
    "description": "A white shirt and a dark tie, photographed in black and white.",
    "alt": "A white shirt and a dark tie, photographed in black and white."
  },
  {
    "gender": "men",
    "categoryKey": "tailoring",
    "category": "Tailoring",
    "image": "assets/collection/men-shirt-02.jpg",
    "title": "The dotted tie.",
    "description": "A close crop of a white shirt and a dark, dotted tie.",
    "alt": "A close crop of a white shirt and a dark, dotted tie."
  },
  {
    "gender": "men",
    "categoryKey": "tailoring",
    "category": "Tailoring",
    "image": "assets/collection/men-tailoring-01.jpg",
    "title": "Blue, full length.",
    "description": "A blue suit with a white open-collar shirt.",
    "alt": "A blue suit with a white open-collar shirt."
  },
  {
    "gender": "men",
    "categoryKey": "tailoring",
    "category": "Tailoring",
    "image": "assets/collection/men-suit-new-26.jpg",
    "title": "The brown suit.",
    "description": "A brown suit with a white shirt, patterned tie and dark sunglasses.",
    "alt": "A brown suit with a white shirt, patterned tie and dark sunglasses."
  },
  {
    "gender": "men",
    "categoryKey": "tailoring",
    "category": "Tailoring",
    "image": "assets/collection/men-suit-new-27.jpg",
    "title": "Black in motion.",
    "description": "A full-length black suit, photographed beneath a tall arch.",
    "alt": "A full-length black suit, photographed beneath a tall arch."
  },
  {
    "gender": "men",
    "categoryKey": "tailoring",
    "category": "Tailoring",
    "image": "assets/collection/men-suit-new-28.jpg",
    "title": "The monochrome study.",
    "description": "A white shirt and black tie with a dark jacket in motion, photographed in black and white.",
    "alt": "A white shirt and black tie with a dark jacket in motion, photographed in black and white."
  },
  {
    "gender": "men",
    "categoryKey": "tailoring",
    "category": "Tailoring",
    "image": "assets/collection/men-suit-new-29.jpg",
    "title": "An orange jacket.",
    "description": "An orange tailored jacket, blue tie and dark trousers on city steps.",
    "alt": "An orange tailored jacket, blue tie and dark trousers on city steps."
  },
  {
    "gender": "men",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/men-shirt-01.jpg",
    "title": "Sleeves rolled.",
    "description": "A white shirt with the sleeves rolled up, worn with dark trousers.",
    "alt": "A white shirt with the sleeves rolled up, worn with dark trousers."
  },
  {
    "gender": "men",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/men-tie-04.jpg",
    "title": "Leave it open.",
    "description": "An open white shirt layered over black, with dark trousers.",
    "alt": "An open white shirt layered over black, with dark trousers."
  },
  {
    "gender": "men",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/men-night-01.jpg",
    "title": "Room to move.",
    "description": "Loose black trousers, a white short-sleeved shirt and sneakers, photographed after dark.",
    "alt": "Loose black trousers, a white short-sleeved shirt and sneakers, photographed after dark."
  },
  {
    "gender": "men",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/men-shirt-new-14.jpg",
    "title": "With braces.",
    "description": "A white shirt with rolled sleeves, black braces and black trousers.",
    "alt": "A white shirt with rolled sleeves, black braces and black trousers."
  },
  {
    "gender": "men",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/men-shirt-new-15.jpg",
    "title": "Pale blue, buttoned.",
    "description": "A pale blue shirt with a navy tie, worn with cream trousers.",
    "alt": "A pale blue shirt with a navy tie, worn with cream trousers."
  },
  {
    "gender": "men",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/men-shirt-new-16.jpg",
    "title": "Three collars.",
    "description": "Three collared shirts in white and shades of blue, arranged flat.",
    "alt": "Three collared shirts in white and shades of blue, arranged flat."
  },
  {
    "gender": "men",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/men-shirt-new-17.jpg",
    "title": "The checked shirt.",
    "description": "A black and grey checked shirt, photographed on a hanger.",
    "alt": "A black and grey checked shirt, photographed on a hanger."
  },
  {
    "gender": "men",
    "categoryKey": "everyday",
    "category": "Shirts & tops",
    "image": "assets/collection/men-shirt-hanger.jpg",
    "title": "A white shirt, alone.",
    "description": "A white button-up shirt photographed on a wooden hanger.",
    "alt": "A white button-up shirt photographed on a wooden hanger."
  },
  {
    "gender": "men",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/men-outerwear-01.jpg",
    "title": "The rust jacket.",
    "description": "A rust-coloured bomber jacket, photographed on a hanger.",
    "alt": "A rust-coloured bomber jacket, photographed on a hanger."
  },
  {
    "gender": "men",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/men-jacket-new-36.jpg",
    "title": "The denim jacket.",
    "description": "A dark denim jacket with a contrasting tan collar, shown on a hanger.",
    "alt": "A dark denim jacket with a contrasting tan collar, shown on a hanger."
  },
  {
    "gender": "men",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/men-jacket-new-23.jpg",
    "title": "Black leather.",
    "description": "A close view of a black leather biker jacket with silver zips.",
    "alt": "A close view of a black leather biker jacket with silver zips."
  },
  {
    "gender": "men",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/men-jacket-new-24.jpg",
    "title": "Olive, zipped.",
    "description": "A close crop of an olive zip-up jacket and its cuff.",
    "alt": "A close crop of an olive zip-up jacket and its cuff."
  },
  {
    "gender": "men",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/men-jacket-new-25.jpg",
    "title": "The burgundy bomber.",
    "description": "A burgundy satin bomber jacket with striped ribbing.",
    "alt": "A burgundy satin bomber jacket with striped ribbing."
  },
  {
    "gender": "men",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/men-jacket-new-31.jpg",
    "title": "The rain layer.",
    "description": "A close view of a black rain jacket with a high collar.",
    "alt": "A close view of a black rain jacket with a high collar."
  },
  {
    "gender": "men",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/men-jacket-new-18.jpg",
    "title": "A brighter shell.",
    "description": "A yellow outdoor shell jacket with black panels.",
    "alt": "A yellow outdoor shell jacket with black panels."
  },
  {
    "gender": "men",
    "categoryKey": "outerwear",
    "category": "Outerwear",
    "image": "assets/collection/men-suit-new-30.jpg",
    "title": "The overcoat.",
    "description": "A black overcoat over an ochre waistcoat, finished with a black hat.",
    "alt": "A black overcoat over an ochre waistcoat, finished with a black hat."
  },
  {
    "category": "Knitwear",
    "image": "assets/field.jpg",
    "title": "The patterned knit.",
    "description": "A patterned sweater with pale shorts and tall boots. The warm brown in the knit is picked up by the boots.",
    "alt": "Brown and white knitwear worn with pale shorts and tall brown boots by a lake",
    "gender": "editorial",
    "categoryKey": "editorial"
  },
  {
    "category": "Outerwear",
    "image": "assets/tailoring.jpg",
    "title": "The belted coat.",
    "description": "A camel coat, belted at the waist and worn over black. The belt draws the shape in; the dark layers keep the focus on the coat.",
    "alt": "A belted camel coat worn over black against stone steps",
    "gender": "editorial",
    "categoryKey": "editorial"
  },
  {
    "category": "Everyday",
    "image": "assets/shirt.jpg",
    "title": "The white top.",
    "description": "A sleeveless white top with straight blue denim. Raw hems and dark sandals give the outfit a sharper finish.",
    "alt": "A sleeveless white top with blue jeans, raw hems and dark sandals",
    "gender": "editorial",
    "categoryKey": "editorial"
  }
];
let lookSequence = studies.map((item,index) => item.gender === "women" && item.categoryKey === "outerwear" ? index : -1).filter(index => index >= 0);

function openDialog(dialog, trigger) {
  if (dialog.open) return;
  returnFocus = trigger || document.activeElement;
  dialog.classList.remove('is-closing');
  dialog.showModal();
  document.body.classList.add('modal-open');
  if (dialog === menu) menuToggle.setAttribute('aria-expanded','true');
}

async function closeDialog(dialog) {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  dialog.classList.add('is-closing');
  if (!reducedMotion.matches) {
    await Promise.allSettled(dialog.getAnimations().map(animation => animation.finished));
  }
  dialog.close();
}

for (const dialog of dialogs) {
  dialog.addEventListener('keydown',event => {
    if (event.key === 'Escape') { event.preventDefault(); closeDialog(dialog); }
  });
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeDialog(dialog);
  });
  dialog.addEventListener('close', () => {
    dialog.classList.remove('is-closing');
    if (!dialogs.some(item => item.open)) document.body.classList.remove('modal-open');
    if (dialog === menu) menuToggle.setAttribute('aria-expanded','false');
    returnFocus?.focus({preventScroll:true});
  });
}
menuToggle.addEventListener('click', () => openDialog(menu, menuToggle));
document.querySelector('.menu-close').addEventListener('click', () => closeDialog(menu));
menu.querySelectorAll('nav a').forEach(link => link.addEventListener('click', async event => {
  event.preventDefault();
  await closeDialog(menu);
  if (link.getAttribute('href').startsWith('?')) { window.location.href = link.getAttribute('href'); return; }
  const target = document.querySelector(link.getAttribute('href'));
  target?.scrollIntoView({behavior:reducedMotion.matches ? 'instant' : 'smooth'});
  history.replaceState(null,'',link.getAttribute('href'));
}));

function setResponsivePhoto(image,src,sizes = '(max-width: 700px) 100vw, 58vw') {
  const name = src.split('/').pop().replace(/\.jpg$/, '');
  image.sizes = sizes;
  image.srcset = `assets/responsive/${name}-640.webp 640w, assets/responsive/${name}-1280.webp 1280w`;
  image.src = src;
}
const lookbookImage = document.querySelector('.lookbook-image img');
async function setSlide(index, animate = true) {
  slideIndex = (index + studies.length) % studies.length;
  const study = studies[slideIndex];
  const request = ++imageRequest;
  const incoming = new Image();
  setResponsivePhoto(incoming,study.image);
  try { await incoming.decode(); } catch { /* The existing image remains until the next render. */ }
  if (request !== imageRequest) return;
  setResponsivePhoto(lookbookImage,study.image);
  lookbookImage.alt = study.alt;
  document.querySelector('#lookbook-title').textContent = study.title;
  document.querySelector('.lookbook-description').textContent = study.description;
  document.querySelector('.lookbook-category').textContent = `${study.gender === 'men' ? 'Men' : study.gender === 'women' ? 'Women' : 'Editorial'} / ${study.category}`;
  document.querySelector('.lookbook-info .line-link').href = `mailto:hello@mercervale.com?subject=${encodeURIComponent('Collection 01 - ' + study.title)}`;
  document.querySelector('.lookbook-count').textContent = `${String(lookSequence.indexOf(slideIndex) + 1).padStart(2,'0')} / ${String(lookSequence.length).padStart(2,'0')}`;
  if (animate && !reducedMotion.matches) {
    lookbookImage.getAnimations().forEach(animation => animation.cancel());
    lookbookImage.animate([{opacity:.35,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}], {duration:450,easing:'cubic-bezier(.16,1,.3,1)'});
  }
}
async function openLook(index,trigger) {
  const panel = trigger?.closest('.look-panel');
  lookSequence = panel ? panels.filter(item => !item.hidden).map(item => Number(item.dataset.look)) : studies.map((item,i) => item.gender === studies[index].gender && item.categoryKey === studies[index].categoryKey ? i : -1).filter(i => i >= 0);
  await setSlide(index,false);openDialog(lookbook,trigger);
}
function stepLook(direction) {
  const position = lookSequence.indexOf(slideIndex);
  setSlide(lookSequence[(position + direction + lookSequence.length) % lookSequence.length]);
}
document.querySelectorAll('[data-look]').forEach(button => button.addEventListener('click', () => {
  openLook(Number(button.dataset.look),button);
}));
document.querySelector('.lookbook-close').addEventListener('click', () => closeDialog(lookbook));
document.querySelector('.look-prev').addEventListener('click', () => stepLook(-1));
document.querySelector('.look-next').addEventListener('click', () => stepLook(1));
lookbook.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    stepLook(event.key === 'ArrowRight' ? 1 : -1);
  }
});

const panels = [...document.querySelectorAll('.look-panel')];
function activatePanel(panel) {
  panels.forEach(item => item.classList.toggle('is-active',item === panel));
}
panels.forEach(panel => {
  panel.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') activatePanel(panel); });
  panel.addEventListener('focus', () => activatePanel(panel));
});

const hero = document.querySelector('.hero');
const heroMedia = document.querySelector('.hero-media');
const heroBottom = document.querySelector('.hero-bottom');
let framePending = false;
function renderScroll() {
  framePending = false;
  document.querySelector('.site-header').classList.toggle('is-scrolled',window.scrollY > hero.offsetHeight - 85);
  if (reducedMotion.matches) {
    heroMedia.style.transform = '';
    heroBottom.style.transform = '';
    return;
  }
  renderEditorialScroll();
  const progress = Math.max(0,Math.min(window.scrollY / hero.offsetHeight,1));
  if (progress < 1) {
    heroMedia.style.transform = `translate3d(0,${progress * 130}px,0)`;
    heroBottom.style.transform = `translate3d(0,${progress * -65}px,0)`;
  }
}
function queueScroll() {
  if (!framePending) { framePending = true; requestAnimationFrame(renderScroll); }
}
window.addEventListener('scroll',queueScroll,{passive:true});
window.addEventListener('resize',queueScroll,{passive:true});
reducedMotion.addEventListener('change',queueScroll);
queueScroll();
document.querySelector('#year').textContent = new Date().getFullYear();


// Category filters operate on real visual studies, without implying inventory.
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const panelStrip = document.querySelector('.look-panels');
let selectedGender = new URLSearchParams(location.search).get('collection') === 'men' ? 'men' : 'women';
const defaultCategory = gender => gender === 'men' ? 'tailoring' : 'outerwear';
const categoryFromUrl = new URLSearchParams(location.search).get('edit');
let selectedCategory = (selectedGender === 'men' ? ['tailoring','everyday','outerwear'] : ['outerwear','everyday','knitwear']).includes(categoryFromUrl) ? categoryFromUrl : defaultCategory(selectedGender);
const genderButtons = [...document.querySelectorAll('[data-gender-filter]')];
function filterCollection() {
  const activeCategory = filterButtons.find(button => button.dataset.filter === selectedCategory).dataset.label;
  document.querySelector('.selected-collection-title').textContent = `${selectedGender === 'men' ? 'Men' : 'Women'} / ${activeCategory}`;
  filterButtons.forEach(button => {
    button.hidden = (button.dataset.filter === 'knitwear' && selectedGender === 'men') || (button.dataset.filter === 'tailoring' && selectedGender === 'women');
    button.setAttribute('aria-pressed',String(button.dataset.filter === selectedCategory));
  });
  genderButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.genderFilter === selectedGender)));
  panels.forEach(panel => {
    panel.hidden = panel.dataset.gender !== selectedGender || panel.dataset.category !== selectedCategory;
    panel.classList.remove('is-leading','is-ending');
  });
  const visible = panels.filter(panel => !panel.hidden);
  if (visible.length >= 6) { visible[0].classList.add('is-leading');visible.at(-1).classList.add('is-ending'); }
  if (visible[0]) activatePanel(visible[0]);
  panelStrip.classList.remove('is-filtered');
  document.querySelector('.filter-count').textContent = `${visible.length} photographs / ${activeCategory}`;
}
filterButtons.forEach(button => button.addEventListener('click',() => { selectedCategory = button.dataset.filter;const url = new URL(location.href);url.searchParams.set('edit',selectedCategory);history.replaceState(null,'',url);filterCollection(); }));
genderButtons.forEach(button => button.addEventListener('click',() => { selectedGender = button.dataset.genderFilter;selectedCategory = defaultCategory(selectedGender);const url = new URL(location.href);url.searchParams.set('collection',selectedGender);url.searchParams.set('edit',selectedCategory);history.replaceState(null,'',url);filterCollection(); }));
filterCollection();
document.querySelector('[data-current-lookbook]').addEventListener('click',event => openLook(Number(panels.find(panel => !panel.hidden).dataset.look),event.currentTarget));

const edits = [
  {
    "image": "assets/tailoring.jpg",
    "alt": "A belted camel coat worn over black",
    "caption": "Outerwear / Study 01",
    "title": "Let the coat\nset the shape.",
    "text": "Tie it at the waist and keep the layers underneath simple. Here, black gives the camel colour a clean edge.",
    "look": "49"
  },
  {
    "image": "assets/shirt.jpg",
    "alt": "A sleeveless white top, blue denim and dark sandals",
    "caption": "Everyday / Study 02",
    "title": "Start with\na white top.",
    "text": "Wear it with straight blue denim. The raw hems keep the look relaxed; dark sandals add a sharper finish.",
    "look": "50"
  },
  {
    "image": "assets/field.jpg",
    "alt": "A patterned sweater, pale shorts and tall brown boots",
    "caption": "Knitwear / Study 03",
    "title": "Keep the knit.\nChange the scenery.",
    "text": "A patterned sweater over pale shorts, with boots that pick up its brown tones. The colour carries across the outfit.",
    "look": "48"
  }
];
const editButtons = [...document.querySelectorAll('[data-edit]')];
let editRequest = 0;
editButtons.forEach(button => button.addEventListener('click',async () => {
  const item = edits[Number(button.dataset.edit)];
  const request = ++editRequest;
  editButtons.forEach(control => control.setAttribute('aria-pressed',String(control === button)));
  const incoming = new Image(); setResponsivePhoto(incoming,item.image);
  try { await incoming.decode(); } catch { return; }
  if (request !== editRequest) return;
  const image = document.querySelector('.styling-image img');
  setResponsivePhoto(image,item.image); image.alt = item.alt;
  document.querySelector('.styling-image-caption').textContent = item.caption;
  document.querySelector('.styling-description h3').textContent = item.title;
  document.querySelector('.styling-description p').textContent = item.text;
  document.querySelector('.styling-open').dataset.look = item.look;
  if (!reducedMotion.matches) {
    image.getAnimations().forEach(animation => animation.cancel());
    image.animate([{opacity:.4,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}],{duration:500,easing:'cubic-bezier(.16,1,.3,1)'});
  }
}));

// Search uses a small local index; typed text is never inserted as HTML.
const searchToggle = document.querySelector('.search-toggle');
const searchInput = document.querySelector('#collection-search');
const searchResults = document.querySelector('.search-results');
const searchIndex = [
  ...studies.slice(0,48).map((item,look) => ({title:item.title,label:`${item.gender === 'women' ? 'Women' : 'Men'} / ${item.category}`,keywords:`${item.description} ${item.gender === 'men' ? 'man male мужская мужчина рубашка галстук брюки' : 'woman female женская женщина'} ${item.category}`,look})),
  {title:'How we’d wear it',label:'Styling references',keywords:'style styling outfit combine сочетания образы стилизация',href:'#styling'},
  {title:'The house',label:'About MERCER VALE',keywords:'brand about story london бренд история',href:'#house'},
  {title:'Launch, sizes & availability',label:'Help & questions',keywords:'faq fit size sizes launch buy shop availability launch доставка запуск размеры купить наличие',href:'#help'},
  {title:'Get in touch',label:'Contact the house',keywords:'contact email hello support контакт почта поддержка',href:'#contact'}
];
function renderSearch() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const words = query.split(/\s+/).filter(Boolean);
  const results = searchIndex.filter(item => words.every(word => `${item.title} ${item.label} ${item.keywords}`.toLocaleLowerCase().includes(word)));
  searchResults.replaceChildren();
  document.querySelector('.search-result-count').textContent = query ? `${results.length} ${results.length === 1 ? 'result' : 'results'}` : 'Browse the studies and the house';
  if (!results.length) {
    const message = document.createElement('p'); message.className = 'search-empty';
    message.textContent = 'Nothing found. Try coat, denim or knitwear. For anything else, email hello@mercervale.com.';
    searchResults.append(message);
  }
  results.forEach(item => {
    const control = document.createElement(item.href ? 'a' : 'button');
    if (item.href) control.href = item.href; else control.type = 'button';
    const text = document.createElement('span');
    const title = document.createElement('strong'); title.textContent = item.title;
    const label = document.createElement('small'); label.textContent = item.label;
    text.append(title,label);
    const icon = document.createElementNS('http://www.w3.org/2000/svg','svg');
    icon.setAttribute('aria-hidden','true');
    const use = document.createElementNS('http://www.w3.org/2000/svg','use'); use.setAttribute('href','#diagonal');icon.append(use);
    control.append(text,icon);
    control.addEventListener('click',async event => {
      event.preventDefault();
      await closeDialog(search);
      if (item.href) {
        document.querySelector(item.href).scrollIntoView({behavior:reducedMotion.matches ? 'instant' : 'smooth'});
        history.replaceState(null,'',item.href);
      } else {
        openLook(item.look,searchToggle);
      }
    });
    searchResults.append(control);
  });
}
searchToggle.addEventListener('click',() => {
  searchInput.value = ''; renderSearch();openDialog(search,searchToggle);searchInput.focus();
});
document.querySelector('.search-close').addEventListener('click',() => closeDialog(search));
searchInput.addEventListener('input',renderSearch);


// Editorial motion: line masks, photographic reveals and native scroll-linked framing.
const editorialAnimations = new Set();
function animateEditorial(element,keyframes,options = {}) {
  if (reducedMotion.matches) return;
  const animation = element.animate(keyframes,{duration:900,easing:'cubic-bezier(.16,1,.3,1)',...options});
  editorialAnimations.add(animation);
  animation.finished.catch(() => {}).finally(() => editorialAnimations.delete(animation));
}
const motionHeadings = [...document.querySelectorAll('.intro-statement,.collection-heading h2,.styling-heading h2,.house-copy h2,.help-intro h2,.contact-content h2')];
motionHeadings.forEach(heading => {
  const groups = []; let group = [];
  [...heading.childNodes].forEach(node => {
    if (node.nodeName === 'BR') { groups.push(group); group = []; }
    else group.push(node);
  });
  groups.push(group);
  heading.replaceChildren();
  groups.forEach(nodes => {
    const line = document.createElement('span'); line.className = 'scroll-line';
    const content = document.createElement('span'); content.className = 'scroll-line-content';
    content.append(...nodes);line.append(content);heading.append(line);
  });
});
if ('IntersectionObserver' in window) {
  const motionObserver = new IntersectionObserver((entries,observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      observer.unobserve(element);
      if (reducedMotion.matches) return;
      if (element.matches('h2')) {
        element.querySelectorAll('.scroll-line-content').forEach((line,index) => {
          animateEditorial(line,[{transform:'translateY(112%) rotate(1.5deg)',opacity:.4},{transform:'translateY(0) rotate(0)',opacity:1}],{delay:index * 95,duration:1000});
        });
      } else if (element.matches('.look-panels')) {
        element.querySelectorAll('.look-panel').forEach((panel,index) => {
          animateEditorial(panel,[{clipPath:'inset(16% 0 0 0)',opacity:.35},{clipPath:'inset(0)',opacity:1}],{delay:Math.min(index,4) * 70,duration:1000});
        });
      } else if (element.matches('.house-image')) {
        animateEditorial(element,[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0)'}],{duration:1100});
      } else if (element.matches('.styling-image')) {
        animateEditorial(element,[{clipPath:'inset(6% 6% 6% 6%)'},{clipPath:'inset(0)'}],{duration:1100});
      } else {
        animateEditorial(element,[{opacity:.3,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:700});
      }
    });
  },{threshold:.16,rootMargin:'0px 0px -35px 0px'});
  [...motionHeadings,document.querySelector('.look-panels'),document.querySelector('.house-image'),document.querySelector('.styling-image'),document.querySelector('.footer-directory')].forEach(element => motionObserver.observe(element));
}
const fieldScene = document.querySelector('.field-story');
const fieldFrame = document.querySelector('.field-frame');
const fieldPhoto = fieldFrame.querySelector('img');
const contactScene = document.querySelector('.contact');
const contactPhoto = document.querySelector('.contact-image img');
document.body.classList.add('editorial-motion');
function renderEditorialScroll() {
  if (reducedMotion.matches) return;
  const viewport = window.innerHeight;
  const fieldRect = fieldScene.getBoundingClientRect();
  const contactRect = contactScene.getBoundingClientRect();
  if (fieldRect.top < viewport && fieldRect.bottom > 0) {
    const entry = Math.max(0,Math.min((viewport-fieldRect.top)/(viewport*.85),1));
    const travel = Math.max(0,Math.min((viewport-fieldRect.top)/(viewport+fieldRect.height),1));
    fieldFrame.style.clipPath = `inset(0 ${(1-entry)*4.5}% 0 ${(1-entry)*4.5}%)`;
    fieldPhoto.style.transform = `scale(${1.13-entry*.06}) translateY(${(travel-.5)*5}%)`;
  }
  if (contactRect.top < viewport && contactRect.bottom > 0) {
    const progress = Math.max(0,Math.min((viewport-contactRect.top)/(viewport+contactRect.height),1));
    contactPhoto.style.transform = `scale(1.12) translateY(${(progress-.5)*65}px)`;
  }
}
reducedMotion.addEventListener('change',() => {
  if (reducedMotion.matches) {
    editorialAnimations.forEach(animation => animation.cancel());
    fieldFrame.style.clipPath = '';fieldPhoto.style.transform = '';contactPhoto.style.transform = '';
  }
  queueScroll();
});

// Keep native disclosure controls while animating the measured answer height.
const answerStates = new Map();
function settleAnswer(state) {
  state.heightAnimation?.cancel();
  state.textAnimation?.cancel();
  state.heightAnimation = null;
  state.textAnimation = null;
  state.details.open = state.expanded;
  state.details.style.height = '';
  state.details.classList.remove('is-answer-moving');
}
function setAnswer(state, expanded) {
  const {details, summary, content} = state;
  const startHeight = details.getBoundingClientRect().height;
  const startOpacity = details.open ? getComputedStyle(content).opacity : '0';
  state.heightAnimation?.cancel();
  state.textAnimation?.cancel();
  state.expanded = expanded;
  summary.setAttribute('aria-expanded',String(expanded));
  details.classList.toggle('is-answer-expanded',expanded);
  content.inert = !expanded;
  if (!expanded && content.contains(document.activeElement)) summary.focus({preventScroll:true});
  if (reducedMotion.matches) { settleAnswer(state); return; }
  details.open = true;
  details.style.height = '';
  const endHeight = expanded ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + parseFloat(getComputedStyle(details).borderBottomWidth || 0);
  details.classList.add('is-answer-moving');
  const duration = expanded ? 520 : 400;
  const animation = details.animate([{height:`${startHeight}px`},{height:`${endHeight}px`}],{duration,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
  state.heightAnimation = animation;
  state.textAnimation = content.animate([{opacity:startOpacity},{opacity:expanded ? 1 : 0}],{duration:expanded ? 380 : 220,easing:'ease-out',fill:'both'});
  animation.finished.then(() => {
    if (state.heightAnimation === animation) settleAnswer(state);
  }).catch(() => {});
}
document.querySelectorAll('.help-questions details').forEach(details => {
  const summary = details.querySelector('summary');
  const content = details.querySelector('.detail-content');
  // Native exclusive groups close instantly; coordinate the same behavior here.
  details.removeAttribute('name');
  const state = {details,summary,content,expanded:details.open};
  answerStates.set(details,state);
  summary.setAttribute('aria-expanded',String(state.expanded));
  details.classList.toggle('is-answer-expanded',state.expanded);
  content.inert = !state.expanded;
  summary.addEventListener('click',event => {
    event.preventDefault();
    const expanded = !state.expanded;
    if (expanded) answerStates.forEach(other => { if (other !== state && other.expanded) setAnswer(other,false); });
    setAnswer(state,expanded);
  });
});
reducedMotion.addEventListener('change',event => {
  if (event.matches) answerStates.forEach(settleAnswer);
});
// Horizontal gestures change the photograph; vertical gestures keep native scrolling.
let lookTouchStart = null;
const lookbookFrame = document.querySelector('.lookbook-image');
lookbookFrame.addEventListener('touchstart',event => {
  lookTouchStart = event.touches.length === 1 ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null;
},{passive:true});
lookbookFrame.addEventListener('touchmove',event => {
  if (event.touches.length !== 1) lookTouchStart = null;
},{passive:true});
lookbookFrame.addEventListener('touchend',event => {
  if (!lookTouchStart || !event.changedTouches[0]) return;
  const dx = event.changedTouches[0].clientX - lookTouchStart.x;
  const dy = event.changedTouches[0].clientY - lookTouchStart.y;
  lookTouchStart = null;
  if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.5) stepLook(dx < 0 ? 1 : -1);
},{passive:true});
lookbookFrame.addEventListener('touchcancel',() => { lookTouchStart = null; },{passive:true});

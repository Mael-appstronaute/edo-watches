// ============================================================
// EDO WATCHES — comportement du header (toutes pages)
// Nécessite montres.js (MARQUES, logoMarque) chargé avant.
// ============================================================

(function () {
  const header = document.getElementById('header');
  if (!header) return;
  const transparent = header.hasAttribute('data-transparent');
  const mega = document.getElementById('mega');
  const decl = document.getElementById('decl-mega');
  let megaOuvert = false;

  // Fond du header : transparent sur le hero de l'accueil, noir partout ailleurs
  const majFond = () => {
    const solide = !transparent || window.scrollY > 40 || megaOuvert;
    header.classList.toggle('bg-noir', solide);
  };
  window.addEventListener('scroll', majFond, { passive: true });
  majFond();

  // ---------- Mega menu marques ----------
  if (mega && decl) {
    const grille = document.getElementById('mega-grille');
    grille.innerHTML = MARQUES.map(m => `
      <a href="collection.html?marque=${encodeURIComponent(m.nom)}"
         class="group flex flex-col items-center justify-center gap-3 border-r border-b border-platine/30 py-7 px-3 bg-ivoire hover:bg-white transition-colors duration-500">
        <img src="${logoMarque(m.domaine)}" alt="Logo ${m.nom}" loading="lazy"
             class="h-7 w-7 object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-500">
        <span class="text-[10px] tracking-[0.18em] uppercase text-center leading-tight">${m.nom}</span>
      </a>`).join('');

    const ouvrir = (o) => {
      if (o === megaOuvert) return;
      megaOuvert = o;
      mega.classList.toggle('ouverte', o);
      decl.setAttribute('aria-expanded', o);
      majFond();
    };
    decl.addEventListener('click', () => ouvrir(!megaOuvert));
    decl.addEventListener('mouseenter', () => ouvrir(true));
    header.addEventListener('mouseleave', () => ouvrir(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') ouvrir(false); });
    document.addEventListener('click', (e) => { if (megaOuvert && !header.contains(e.target)) ouvrir(false); });
  }

  // ---------- Menu mobile ----------
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu-mobile');
  if (burger && menu) {
    const listeMarques = document.getElementById('marques-mobile');
    if (listeMarques) {
      listeMarques.innerHTML = MARQUES.map(m => `
        <a href="collection.html?marque=${encodeURIComponent(m.nom)}"
           class="flex items-center gap-3 py-1.5 text-[12px] tracking-wide text-neutral-400 hover:text-ivoire transition-colors duration-400">
          <img src="${logoMarque(m.domaine)}" alt="" loading="lazy" class="h-4 w-4 object-contain opacity-70">${m.nom}
        </a>`).join('');
    }
    // Accordéon marques (mega menu version mobile)
    const declMobile = document.getElementById('decl-marques-mobile');
    const sousMarques = document.getElementById('sous-marques');
    if (declMobile && sousMarques) {
      declMobile.addEventListener('click', () => {
        const o = sousMarques.classList.contains('hidden');
        sousMarques.classList.toggle('hidden', !o);
        declMobile.setAttribute('aria-expanded', o);
      });
    }

    const basculer = (o) => {
      menu.classList.toggle('hidden', !o);
      menu.classList.toggle('flex', o);
      burger.setAttribute('aria-expanded', o);
      burger.setAttribute('aria-label', o ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.style.overflow = o ? 'hidden' : '';
      if (o) header.classList.add('bg-noir');
      else majFond();
    };
    burger.addEventListener('click', () => basculer(menu.classList.contains('hidden')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => basculer(false)));
  }
})();

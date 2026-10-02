// ============================================================
// EDO WATCHES — comportement commun (header, menu mobile, langue)
// Chargé avant les scripts de page : LANG / IS_EN y sont disponibles.
// ============================================================

// ---------- Langue : FR par défaut, EN via le drapeau du header ----------
// Un lien avec ?lang=en ou ?lang=fr force et mémorise la langue.
const langUrl = new URLSearchParams(location.search).get('lang');
if (langUrl === 'en' || langUrl === 'fr') localStorage.setItem('edo-lang', langUrl);
const LANG = localStorage.getItem('edo-lang') === 'en' ? 'en' : 'fr';
const IS_EN = LANG === 'en';

// Dictionnaire FR → EN : les clés sont les textes français normalisés
// (espaces réduits). Les données des montres (sous-titres, descriptions,
// valeurs des caractéristiques) restent telles que saisies dans le dashboard.
const EN = {
  // --- Header & menus ---
  'Aix-en-Provence et alentours — Sur rendez-vous': 'Aix-en-Provence and surroundings — By appointment',
  'Aix-en-Provence et alentours — sur rendez-vous': 'Aix-en-Provence and surroundings — By appointment',
  'Pièces vendues': 'Sold pieces',
  'Vendre': 'Sell',
  'Prendre rendez-vous': 'Book an appointment',
  'La Maison': 'The House',
  'Vendre sa montre': 'Sell your watch',
  'Ouvrir le menu': 'Open menu',
  'Fermer le menu': 'Close menu',
  'Navigation principale': 'Main navigation',
  'Nous suivre sur Instagram': 'Follow us on Instagram',
  'Nous contacter sur WhatsApp': 'Contact us on WhatsApp',
  'Liens du site': 'Site links',
  'Liens légaux': 'Legal links',
  'Galerie': 'Gallery',

  // --- Titres de pages & meta ---
  'EDO WATCHES — Achat et vente de montres de luxe à Aix-en-Provence | Rolex, Patek Philippe, Audemars Piguet':
    'EDO WATCHES — Buying and selling luxury watches in Aix-en-Provence | Rolex, Patek Philippe, Audemars Piguet',
  'Catalogue — Montres de luxe à Aix-en-Provence | EDO WATCHES':
    'Catalogue — Luxury watches in Aix-en-Provence | EDO WATCHES',
  'Nos pièces vendues — Montres de luxe | EDO WATCHES Aix-en-Provence':
    'Our sold pieces — Luxury watches | EDO WATCHES Aix-en-Provence',
  'EDO WATCHES — Fiche montre': 'EDO WATCHES — Watch details',
  "EDO WATCHES, spécialiste de l'achat et de la vente de montres de luxe et de collection à Aix-en-Provence : Rolex, Patek Philippe, Audemars Piguet, Cartier, Omega. Authenticité certifiée, estimation gratuite sous 24 heures, envoi offert et sécurisé sous 24 heures.":
    'EDO WATCHES, specialist in buying and selling luxury and collector watches in Aix-en-Provence: Rolex, Patek Philippe, Audemars Piguet, Cartier, Omega. Certified authenticity, free appraisal within 24 hours, free secure shipping within 24 hours.',
  "Toutes nos montres de luxe disponibles à l'achat : Rolex, Audemars Piguet, Omega, IWC… Envoi offert et sécurisé, sur rendez-vous à Aix-en-Provence.":
    'All our luxury watches available for purchase: Rolex, Audemars Piguet, Omega, IWC… Free, secure shipping, by appointment in Aix-en-Provence.',
  'Les montres de luxe déjà vendues par EDO WATCHES à Aix-en-Provence : Rolex, Patek Philippe, Audemars Piguet… Une pièce similaire vous intéresse ? Nous la sourçons sur demande.':
    'Luxury watches already sold by EDO WATCHES in Aix-en-Provence: Rolex, Patek Philippe, Audemars Piguet… Interested in a similar piece? We source it on request.',
  'Montre de luxe authentifiée, disponible sur rendez-vous à Aix-en-Provence chez EDO WATCHES. Envoi offert et sécurisé sous 24 heures.':
    'Authenticated luxury watch, available by appointment in Aix-en-Provence at EDO WATCHES. Free, secure shipping within 24 hours.',

  // --- Accueil : hero & réassurance ---
  'Découvrir nos pièces': 'Discover our pieces',
  'Nous contacter': 'Contact us',
  'Défiler': 'Scroll',
  'Authenticité certifiée': 'Certified authenticity',
  'Chaque référence est contrôlée par nos horlogers avant sa mise en vente.': 'Every reference is checked by our watchmakers before being offered for sale.',
  'Envoi offert & sécurisé': 'Free & secure shipping',
  "L'envoi est offert, sécurisé et expédié sous 24 heures. Remise en main propre possible à Aix-en-Provence.": 'Shipping is free, secure and dispatched within 24 hours. Hand delivery available in Aix-en-Provence.',
  'Estimation sous 24 heures': 'Appraisal within 24 hours',
  'Vous souhaitez vendre votre montre ? Envoyez-nous ses photos : estimation gratuite sous 24 heures.': 'Looking to sell your watch? Send us photos: free appraisal within 24 hours.',

  // --- Accueil : sélection ---
  'Notre sélection': 'Our selection',
  'Voir tout le catalogue': 'View the full catalogue',
  'Découvrir →': 'Discover →',
  'Réservée': 'Reserved',
  'Vendue': 'Sold',

  // --- Accueil : La Maison ---
  "EDO WATCHES est née d'une conviction simple : une montre d'exception mérite une transaction d'exception. Depuis Aix-en-Provence, nous sélectionnons des pièces neuves ou d'occasion auprès d'un réseau de sourcing international construit sur la durée.":
    'EDO WATCHES was born from a simple conviction: an exceptional watch deserves an exceptional transaction. From Aix-en-Provence, we select new and pre-owned pieces through an international sourcing network built over time.',
  "Chaque référence est expertisée, ouverte, contrôlée. Nous ne vendons rien que nous n'aurions acquis pour nous-mêmes. Les rencontres se font sur rendez-vous, dans la plus grande discrétion.":
    'Every reference is appraised, opened, inspected. We sell nothing we would not have acquired for ourselves. Meetings are held by appointment, in complete discretion.',

  // --- Accueil : vendre ---
  'Vous détenez une pièce dont vous souhaitez vous séparer. Envoyez-nous ses photos et sa référence : nous vous adressons une estimation gratuite sous 24 heures.':
    'You own a piece you wish to part with. Send us photos and the reference: we will provide a free appraisal within 24 hours.',
  "La transaction se déroule à notre bureau ou à distance, en toute discrétion. Le paiement est immédiat, dès l'expertise validée.":
    'The transaction takes place at our office or remotely, in complete discretion. Payment is immediate once the appraisal is confirmed.',
  'Estimation gratuite sous 24 heures': 'Free appraisal within 24 hours',
  'Transaction discrète, à Aix-en-Provence ou à distance': 'Discreet transaction, in Aix-en-Provence or remotely',
  'Paiement immédiat après expertise': 'Immediate payment after appraisal',
  'Obtenir une estimation': 'Get an appraisal',

  // --- Accueil : témoignages ---
  'Ils nous font confiance': 'They trust us',
  "« Achat d'une Submariner en toute confiance. Montre conforme, échange simple et rapide. »": '“Bought a Submariner with complete confidence. Watch as described, quick and easy exchange.”',
  '« Estimation reçue en moins de 24 heures, paiement immédiat au rendez-vous. Sérieux et discret. »': '“Appraisal received in under 24 hours, immediate payment at the meeting. Professional and discreet.”',
  '« Un vrai conseil, sans pression. Je reviendrai pour ma prochaine pièce. »': '“Genuine advice, no pressure. I will be back for my next piece.”',

  // --- Accueil : contact & formulaire ---
  'Sur rendez-vous': 'By appointment',
  'Adresse': 'Address',
  'Horaires': 'Opening hours',
  'Du lundi au samedi, 9 h — 19 h': 'Monday to Saturday, 9 am — 7 pm',
  'Uniquement sur rendez-vous': 'By appointment only',
  'Téléphone': 'Phone',
  'Nom': 'Name',
  'Votre message — pièce recherchée, montre à vendre, demande de rendez-vous': 'Your message — piece you are looking for, watch to sell, appointment request',
  'Envoyer': 'Send',

  // --- Footer ---
  'Achat et vente de montres de luxe, échange et dépôt vente.': 'Purchase and sale of luxury watches, trade-in and consignment.',
  'Maison': 'The House',
  'Informations': 'Information',
  'Mentions légales': 'Legal notice',
  'Confidentialité': 'Privacy',
  'Votre email': 'Your email',
  "S'inscrire": 'Subscribe',
  '© 2026 EDO WATCHES — Tous droits réservés — SIRET : 108 142 985 00010': '© 2026 EDO WATCHES — All rights reserved — SIRET: 108 142 985 00010',
  'EDO WATCHES est indépendante des marques citées.': 'EDO WATCHES is independent of the brands mentioned.',

  // --- Catalogue ---
  'Toutes nos pièces': 'All our pieces',
  "Chaque montre est authentifiée et contrôlée. La pièce que vous cherchez n'est pas en vitrine ? Nous la sourçons sur demande.":
    "Every watch is authenticated and inspected. Can't find the piece you are looking for? We source it on request.",
  'Voir nos pièces vendues →': 'See our sold pieces →',
  'Aucune pièce en vitrine actuellement.': 'No pieces currently in our showcase.',
  "Notre vitrine évolue chaque semaine et notre réseau de sourcing couvre l'Europe et la Suisse. Décrivez-nous la pièce recherchée : nous vous revenons sous 24 heures avec des propositions.":
    'Our showcase changes every week and our sourcing network covers Europe and Switzerland. Describe the piece you are looking for: we will come back to you within 24 hours with proposals.',
  'Lancer une recherche': 'Start a search',

  // --- Pièces vendues ---
  'Références': 'References',
  'Nos pièces vendues': 'Our sold pieces',
  'Ces montres ont trouvé leur propriétaire. Une pièce similaire vous intéresse ? Notre réseau de sourcing nous permet de la retrouver sur demande.':
    'These watches have found their owner. Interested in a similar piece? Our sourcing network allows us to find it on request.',
  'Nos prochaines références apparaîtront ici.': 'Our next references will appear here.',
  'Chaque pièce vendue rejoindra cette page. En attendant, découvrez les montres actuellement disponibles.':
    'Every sold piece will join this page. In the meantime, discover the watches currently available.',
  'Voir le catalogue': 'View the catalogue',
  'Rechercher une pièce similaire': 'Search for a similar piece',

  // --- Fiche montre ---
  'Caractéristiques': 'Specifications',
  'Référence': 'Reference',
  'Année': 'Year',
  'Matériau': 'Material',
  'Diamètre': 'Diameter',
  'Mouvement': 'Movement',
  'État': 'Condition',
  'Pièce vendue': 'Sold',
  'Pièce réservée': 'Reserved',
  'Sourcer une pièce similaire': 'Source a similar piece',
  'Être prévenu si elle se libère': 'Be notified if it becomes available',
  "Pièce visible à notre bureau d'Aix-en-Provence, uniquement sur rendez-vous. Envoi offert et sécurisé sous 24 heures.":
    'Piece available to view at our Aix-en-Provence office, by appointment only. Free, secure shipping within 24 hours.',
  'Autres pièces': 'Other pieces',
  'Tout le catalogue': 'Full catalogue',
};

// Textes avec partie variable (compteurs)
const EN_RULES = [
  [/^(\d+) pièces disponibles$/, '$1 pieces available'],
  [/^(\d+) pièce disponible$/, '$1 piece available'],
  [/^(\d+) pièces vendues$/, '$1 pieces sold'],
  [/^(\d+) pièce vendue$/, '$1 piece sold'],
];

function traduire(texte) {
  const n = (texte || '').replace(/\s+/g, ' ').trim();
  if (!n) return null;
  if (Object.prototype.hasOwnProperty.call(EN, n)) return EN[n];
  for (const [motif, remplacement] of EN_RULES) {
    if (motif.test(n)) return n.replace(motif, remplacement);
  }
  return null;
}

// Traduit tout le document : textes, attributs, titre, meta, liens WhatsApp
function appliquerLangue() {
  if (!IS_EN) return;
  document.documentElement.lang = 'en';

  // Éléments dont la traduction est portée par data-en (ex. titre « Sur rendez-vous »)
  document.querySelectorAll('[data-en]').forEach(el => { el.textContent = el.dataset.en; });

  const marcheur = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (nd) => nd.parentElement && nd.parentElement.closest('script, style')
      ? NodeFilter.FILTER_REJECT
      : NodeFilter.FILTER_ACCEPT,
  });
  const noeuds = [];
  while (marcheur.nextNode()) noeuds.push(marcheur.currentNode);
  noeuds.forEach(nd => {
    const t = traduire(nd.textContent);
    if (t !== null) nd.textContent = t;
  });

  ['placeholder', 'aria-label'].forEach(attr => {
    document.querySelectorAll('[' + attr + ']').forEach(el => {
      const t = traduire(el.getAttribute(attr));
      if (t !== null) el.setAttribute(attr, t);
    });
  });

  const titre = traduire(document.title);
  if (titre !== null) document.title = titre;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    const t = traduire(meta.content);
    if (t !== null) meta.content = t;
  }

  // Messages WhatsApp pré-remplis des liens statiques
  document.querySelectorAll('a[data-wa-en]').forEach(a => {
    a.href = 'https://wa.me/33609078885?text=' + encodeURIComponent(a.dataset.waEn);
  });
}
document.addEventListener('DOMContentLoaded', appliquerLangue);

// ---------- Bouton drapeau FR / EN ----------
const DRAPEAU_UK = (uid) =>
  '<svg width="21" height="13" viewBox="0 0 60 36" aria-hidden="true" class="shrink-0">' +
  '<clipPath id="uk-' + uid + '"><path d="M0,0v36h60V0z"/></clipPath>' +
  '<g clip-path="url(#uk-' + uid + ')">' +
  '<path fill="#012169" d="M0,0v36h60V0z"/>' +
  '<path stroke="#fff" stroke-width="7.2" d="M0,0 60,36M60,0 0,36"/>' +
  '<path stroke="#C8102E" stroke-width="4.8" d="M0,0 60,36M60,0 0,36"/>' +
  '<path stroke="#fff" stroke-width="12" d="M30,0v36M0,18h60"/>' +
  '<path stroke="#C8102E" stroke-width="7.2" d="M30,0v36M0,18h60"/>' +
  '</g></svg>';
const DRAPEAU_FR =
  '<svg width="21" height="13" viewBox="0 0 60 36" aria-hidden="true" class="shrink-0">' +
  '<rect width="20" height="36" fill="#002395"/><rect x="20" width="20" height="36" fill="#fff"/><rect x="40" width="20" height="36" fill="#ED2939"/></svg>';

['lang-toggle', 'lang-toggle-mobile'].forEach((id, i) => {
  const btn = document.getElementById(id);
  if (!btn) return;
  const court = id === 'lang-toggle';
  btn.innerHTML = IS_EN
    ? DRAPEAU_FR + '<span>' + (court ? 'FR' : 'Version française') + '</span>'
    : DRAPEAU_UK(i) + '<span>' + (court ? 'EN' : 'English version') + '</span>';
  btn.setAttribute('aria-label', IS_EN ? 'Passer le site en français' : 'Switch the site to English');
  btn.addEventListener('click', () => {
    localStorage.setItem('edo-lang', IS_EN ? 'fr' : 'en');
    location.reload();
  });
});

// ---------- Header ----------
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  const transparent = header.hasAttribute('data-transparent');

  // Fond du header : transparent sur le hero de l'accueil, chrome partout ailleurs
  const majFond = () => {
    const solide = !transparent || window.scrollY > 40;
    header.classList.toggle('bg-chrome', solide);
  };
  window.addEventListener('scroll', majFond, { passive: true });
  majFond();

  // ---------- Menu mobile ----------
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu-mobile');
  if (burger && menu) {
    const basculer = (o) => {
      menu.classList.toggle('hidden', !o);
      menu.classList.toggle('flex', o);
      burger.setAttribute('aria-expanded', o);
      burger.setAttribute('aria-label', o
        ? (IS_EN ? 'Close menu' : 'Fermer le menu')
        : (IS_EN ? 'Open menu' : 'Ouvrir le menu'));
      document.body.style.overflow = o ? 'hidden' : '';
      if (o) header.classList.add('bg-chrome');
      else majFond();
    };
    burger.addEventListener('click', () => basculer(menu.classList.contains('hidden')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => basculer(false)));
  }
})();

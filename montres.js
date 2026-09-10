// ============================================================
// EDO WATCHES — données partagées (catalogue + marques)
// FICHIER GÉNÉRÉ par server.py depuis montres.json.
// Ne pas éditer à la main : passer par le dashboard (/admin.html).
// ============================================================

const MARQUES = [
  {
    "nom": "Rolex",
    "domaine": "rolex.com"
  },
  {
    "nom": "Patek Philippe",
    "domaine": "patek.com"
  },
  {
    "nom": "Audemars Piguet",
    "domaine": "audemarspiguet.com"
  },
  {
    "nom": "Omega",
    "domaine": "omegawatches.com"
  },
  {
    "nom": "Cartier",
    "domaine": "cartier.com"
  },
  {
    "nom": "Tudor",
    "domaine": "tudorwatch.com"
  },
  {
    "nom": "IWC Schaffhausen",
    "domaine": "iwc.com"
  },
  {
    "nom": "Jaeger-LeCoultre",
    "domaine": "jaeger-lecoultre.com"
  },
  {
    "nom": "Vacheron Constantin",
    "domaine": "vacheron-constantin.com"
  },
  {
    "nom": "A. Lange & Söhne",
    "domaine": "alange-soehne.com"
  },
  {
    "nom": "Breitling",
    "domaine": "breitling.com"
  },
  {
    "nom": "Hublot",
    "domaine": "hublot.com"
  },
  {
    "nom": "Richard Mille",
    "domaine": "richardmille.com"
  },
  {
    "nom": "Panerai",
    "domaine": "panerai.com"
  },
  {
    "nom": "Longines",
    "domaine": "longines.com"
  }
];

const logoMarque = (domaine) => 'https://www.google.com/s2/favicons?domain=' + domaine + '&sz=128';

const MONTRES = {
  "daytona": {
    "marque": "Rolex",
    "nom": "Cosmograph Daytona",
    "sousTitre": "2021 · Or jaune 18 ct · Réf. 116508",
    "prix": "42 500 €",
    "prixNum": 42500,
    "annee": 2021,
    "couleur": "Noir",
    "matiere": "Or",
    "image": "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=1600&auto=format&fit=crop",
    "alt": "Rolex Cosmograph Daytona en or jaune, cadran noir",
    "ambiance": "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000&auto=format&fit=crop",
    "galerie": [],
    "enVitrine": true,
    "description": [
      "Le Cosmograph Daytona n'a plus rien à prouver. Dessiné pour la course automobile, il est devenu la référence absolue du chronographe. Cette exécution en or jaune, cadran noir, en est l'une des expressions les plus affirmées.",
      "Notre exemplaire, produit en 2021, présente un état proche du neuf. Boîtier et bracelet n'ont fait l'objet d'aucun polissage. Le calibre 4130, chronographe automatique de manufacture, a été contrôlé par nos horlogers."
    ],
    "specs": {
      "Référence": "116508",
      "Année": "2021",
      "Matière": "Or jaune 18 ct",
      "Diamètre": "40 mm",
      "Mouvement": "Calibre 4130, chronographe automatique",
      "État": "Excellent, non poli"
    },
    "set": [
      "Boîte et écrin d’origine",
      "Carte de garantie datée de 2021",
      "Maillons et documentation complets",
      "Provenance européenne documentée"
    ]
  },
  "submariner": {
    "marque": "Rolex",
    "nom": "Submariner Date",
    "sousTitre": "2022 · Acier Oystersteel · Réf. 126610LN",
    "prix": "14 500 €",
    "prixNum": 14500,
    "annee": 2022,
    "couleur": "Noir",
    "matiere": "Acier",
    "image": "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1600&auto=format&fit=crop",
    "alt": "Rolex Submariner Date, cadran noir, bracelet acier",
    "ambiance": "https://images.unsplash.com/photo-1526045431048-f857369baa09?q=80&w=2000&auto=format&fit=crop",
    "galerie": [],
    "enVitrine": true,
    "description": [
      "La Submariner est l'archétype de la montre de plongée. Lunette céramique, cadran noir, bracelet Oyster : rien d'inutile, rien à retirer. La référence 126610LN en est la génération actuelle, boîtier 41 mm.",
      "Cet exemplaire de 2022 est dans un état comme neuf, porté quelques semaines seulement. Le calibre 3235 offre une réserve de marche de 70 heures. Set complet, garantie internationale en cours."
    ],
    "specs": {
      "Référence": "126610LN",
      "Année": "2022",
      "Matière": "Acier Oystersteel",
      "Diamètre": "41 mm",
      "Mouvement": "Calibre 3235, automatique",
      "État": "Comme neuf"
    },
    "set": [
      "Boîte et écrin d’origine",
      "Carte de garantie datée de 2022 — garantie en cours",
      "Tous maillons et documentation",
      "Première main, achetée en boutique"
    ]
  },
  "royal-oak": {
    "marque": "Audemars Piguet",
    "nom": "Royal Oak Offshore",
    "sousTitre": "2021 · Acier · Chronographe",
    "prix": "38 000 €",
    "prixNum": 38000,
    "annee": 2021,
    "couleur": "Noir",
    "matiere": "Acier",
    "image": "https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=1600&auto=format&fit=crop",
    "alt": "Audemars Piguet Royal Oak Offshore, boîtier octogonal",
    "ambiance": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=2000&auto=format&fit=crop",
    "galerie": [],
    "enVitrine": true,
    "description": [
      "Née en 1993, l'Offshore a imposé le luxe sportif en grand format. Boîtier octogonal, vis apparentes, cadran structuré : le dessin de Gérald Genta poussé à son expression la plus radicale.",
      "Notre exemplaire de 2021 est en très bon état, entretenu exclusivement par la manufacture. Chronographe automatique, finitions alternées satiné-poli caractéristiques de la maison du Brassus."
    ],
    "specs": {
      "Référence": "Royal Oak Offshore",
      "Année": "2021",
      "Matière": "Acier",
      "Diamètre": "42 mm",
      "Mouvement": "Chronographe automatique de manufacture",
      "État": "Très bon état"
    },
    "set": [
      "Boîte et écrin d’origine",
      "Papiers de la manufacture",
      "Historique d’entretien disponible",
      "Provenance suisse"
    ]
  },
  "explorer": {
    "marque": "Rolex",
    "nom": "Explorer",
    "sousTitre": "2021 · Acier Oystersteel · Réf. 124270",
    "prix": "8 900 €",
    "prixNum": 8900,
    "annee": 2021,
    "couleur": "Noir",
    "matiere": "Acier",
    "image": "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=1600&auto=format&fit=crop",
    "alt": "Rolex Explorer, cadran noir, bracelet acier Oyster",
    "ambiance": "https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=2000&auto=format&fit=crop",
    "galerie": [],
    "enVitrine": true,
    "description": [
      "L'Explorer est la Rolex des origines : celle de l'ascension de l'Everest en 1953. Cadran noir, chiffres 3-6-9, boîtier 36 mm — la montre-outil réduite à l'essentiel, sans date, sans artifice.",
      "La référence 124270 renoue avec le diamètre historique. Notre exemplaire de 2021 est comme neuf, avec l'intégralité de son set. Une pièce d'entrée en collection aussi juste que durable."
    ],
    "specs": {
      "Référence": "124270",
      "Année": "2021",
      "Matière": "Acier Oystersteel",
      "Diamètre": "36 mm",
      "Mouvement": "Calibre 3230, automatique",
      "État": "Comme neuf"
    },
    "set": [
      "Boîte et écrin d’origine",
      "Carte de garantie datée de 2021",
      "Documentation complète",
      "Première main"
    ]
  },
  "planet-ocean": {
    "marque": "Omega",
    "nom": "Seamaster Planet Ocean Chronographe",
    "sousTitre": "2016 · Acier · Chronographe co-axial",
    "prix": "8 200 €",
    "prixNum": 8200,
    "annee": 2016,
    "couleur": "Noir",
    "matiere": "Acier",
    "image": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1600&auto=format&fit=crop",
    "alt": "Omega Seamaster Planet Ocean, chronographe acier",
    "ambiance": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?q=80&w=2000&auto=format&fit=crop",
    "galerie": [],
    "enVitrine": true,
    "description": [
      "La Planet Ocean incarne la plongée selon Omega : étanche à 600 mètres, valve à hélium, lunette céramique. La version chronographe y ajoute un calibre co-axial certifié chronomètre.",
      "Cet exemplaire de 2016 a été porté avec soin et révisé récemment. Le co-axial 9300, avec ses deux compteurs, est l'un des mouvements de chronographe les plus aboutis de sa génération."
    ],
    "specs": {
      "Référence": "Seamaster Planet Ocean 600M",
      "Année": "2016",
      "Matière": "Acier",
      "Diamètre": "45,5 mm",
      "Mouvement": "Calibre 9300, chronographe co-axial",
      "État": "Très bon état, révisée"
    },
    "set": [
      "Boîte et écrin d’origine",
      "Carte de garantie",
      "Facture de révision",
      "Provenance française"
    ]
  },
  "datejust": {
    "marque": "Rolex",
    "nom": "Datejust 36",
    "sousTitre": "2020 · Acier & or jaune · Réf. 126233",
    "prix": "12 800 €",
    "prixNum": 12800,
    "annee": 2020,
    "couleur": "Argenté",
    "matiere": "Acier & or",
    "image": "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=1600&auto=format&fit=crop",
    "alt": "Rolex Datejust, boîtier acier et or jaune, cadran clair",
    "ambiance": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=2000&auto=format&fit=crop",
    "galerie": [],
    "enVitrine": true,
    "description": [
      "La Datejust est la montre classique par définition : née en 1945, elle traverse les décennies sans prendre une ride. La version Rolesor, acier et or jaune, en est l'expression la plus reconnaissable.",
      "Notre exemplaire de 2020, boîtier 36 mm et lunette cannelée, présente un état excellent. Le calibre 3235 assure précision chronométrique et 70 heures de réserve de marche. Set complet."
    ],
    "specs": {
      "Référence": "126233",
      "Année": "2020",
      "Matière": "Acier & or jaune (Rolesor)",
      "Diamètre": "36 mm",
      "Mouvement": "Calibre 3235, automatique",
      "État": "Excellent"
    },
    "set": [
      "Boîte et écrin d’origine",
      "Carte de garantie datée de 2020",
      "Maillons complets",
      "Provenance européenne documentée"
    ]
  },
  "sea-dweller": {
    "marque": "Rolex",
    "nom": "Sea-Dweller",
    "sousTitre": "2019 · Acier Oystersteel · Réf. 126600",
    "prix": "13 500 €",
    "prixNum": 13500,
    "annee": 2019,
    "couleur": "Noir",
    "matiere": "Acier",
    "image": "https://images.unsplash.com/photo-1526045431048-f857369baa09?q=80&w=1600&auto=format&fit=crop",
    "alt": "Rolex Sea-Dweller, cadran noir, lunette céramique",
    "ambiance": "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=2000&auto=format&fit=crop",
    "galerie": [],
    "enVitrine": false,
    "description": [
      "Conçue pour la plongée à saturation, la Sea-Dweller est l'outil extrême du catalogue Rolex : étanche à 1 220 mètres, valve à hélium, lunette céramique Cerachrom. Une montre pensée pour le travail, devenue pièce de collection.",
      "Cette référence 126600 de 2019 marque les 50 ans du modèle. Très bon état général, aucune rayure profonde, set complet avec carte de garantie."
    ],
    "specs": {
      "Référence": "126600",
      "Année": "2019",
      "Matière": "Acier Oystersteel",
      "Diamètre": "43 mm",
      "Mouvement": "Calibre 3235, automatique",
      "État": "Très bon état"
    },
    "set": [
      "Boîte et écrin d’origine",
      "Carte de garantie datée de 2019",
      "Maillons et documentation complets",
      "Provenance européenne"
    ]
  },
  "planet-ocean-600m": {
    "marque": "Omega",
    "nom": "Seamaster Planet Ocean 600M",
    "sousTitre": "2018 · Acier · Cadran gris",
    "prix": "4 900 €",
    "prixNum": 4900,
    "annee": 2018,
    "couleur": "Gris",
    "matiere": "Acier",
    "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?q=80&w=1600&auto=format&fit=crop",
    "alt": "Omega Seamaster Planet Ocean 600M, cadran gris",
    "ambiance": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000&auto=format&fit=crop",
    "galerie": [],
    "enVitrine": false,
    "description": [
      "Trois aiguilles, une lunette céramique et 600 mètres d'étanchéité : la Planet Ocean dans sa définition la plus pure. Le cadran gris, moins courant que le noir, lui donne une présence singulière au poignet.",
      "Exemplaire de 2018 en très bon état, entretenu régulièrement. Le calibre Master Chronometer 8900 est certifié METAS, antimagnétique à 15 000 gauss."
    ],
    "specs": {
      "Référence": "Planet Ocean 600M Co-Axial",
      "Année": "2018",
      "Matière": "Acier",
      "Diamètre": "43,5 mm",
      "Mouvement": "Calibre 8900, Master Chronometer",
      "État": "Très bon état"
    },
    "set": [
      "Boîte et écrin d’origine",
      "Carte de garantie",
      "Documentation complète",
      "Provenance française"
    ]
  },
  "portugieser": {
    "marque": "IWC Schaffhausen",
    "nom": "Portugieser",
    "sousTitre": "2018 · Acier · Cadran argenté",
    "prix": "12 900 €",
    "prixNum": 12900,
    "annee": 2018,
    "couleur": "Argenté",
    "matiere": "Acier",
    "image": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1600&auto=format&fit=crop",
    "alt": "IWC Portugieser, cadran argenté, bracelet cuir noir",
    "ambiance": "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000&auto=format&fit=crop",
    "galerie": [],
    "enVitrine": false,
    "description": [
      "Née dans les années 1930 pour des navigateurs portugais, la Portugieser est l'une des lignes les plus élégantes de la haute horlogerie. Cadran épuré, chiffres arabes fins, aiguilles feuille : un classicisme sans âge.",
      "Notre exemplaire de 2018, cadran argenté sur bracelet cuir noir, est en excellent état. Révisé par la manufacture de Schaffhausen, il est livré avec l'intégralité de son set."
    ],
    "specs": {
      "Référence": "Portugieser",
      "Année": "2018",
      "Matière": "Acier",
      "Diamètre": "40 mm",
      "Mouvement": "Automatique de manufacture",
      "État": "Excellent, révisée manufacture"
    },
    "set": [
      "Boîte et écrin d’origine",
      "Papiers de la manufacture",
      "Facture de révision IWC",
      "Provenance suisse"
    ]
  },
  "air-king": {
    "marque": "Rolex",
    "nom": "Air-King",
    "sousTitre": "1999 · Acier · Réf. 14010",
    "prix": "6 400 €",
    "prixNum": 6400,
    "annee": 1999,
    "couleur": "Noir",
    "matiere": "Acier",
    "image": "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1600&auto=format&fit=crop",
    "alt": "Rolex Air-King vintage, cadran noir, lunette gravée",
    "ambiance": "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=2000&auto=format&fit=crop",
    "galerie": [],
    "enVitrine": false,
    "description": [
      "L'Air-King rend hommage aux pilotes de la Royal Air Force depuis 1945. Cette référence 14010, avec sa lunette gravée et son boîtier de 34 mm, est une Rolex vintage discrète et attachante.",
      "Exemplaire de 1999 dans un très bel état d'origine, cadran et aiguilles intacts. Une porte d'entrée pleine de caractère dans l'univers de la couronne, à un prix encore raisonnable."
    ],
    "specs": {
      "Référence": "14010",
      "Année": "1999",
      "Matière": "Acier",
      "Diamètre": "34 mm",
      "Mouvement": "Calibre 3000, automatique",
      "État": "Très bel état d’origine"
    },
    "set": [
      "Boîte d’origine",
      "Documentation d’époque",
      "Révision récente attestée",
      "Provenance française"
    ]
  },
  "test": {
    "marque": "Patek Philippe",
    "nom": "test",
    "sousTitre": "test",
    "prix": "15 000 €",
    "prixNum": 15000,
    "annee": 2021,
    "couleur": "test",
    "matiere": "Acier",
    "image": "photos/capture-d-ecran-2026-09-07-140208.png",
    "alt": "Patek Philippe test, cadran test, test",
    "ambiance": "ezez",
    "galerie": [
      "photos/capture-d-ecran-2026-07-23-105333.png"
    ],
    "enVitrine": false,
    "description": [
      "zezezezeze"
    ],
    "specs": {
      "Référence": "ezeze",
      "Année": "2021",
      "Matière": "test",
      "Diamètre": "test mm",
      "Mouvement": "test"
    },
    "set": [
      "Boîte et écrin d’origine",
      "Carte de garantie datée de 2021",
      "Garantie internationale en cours",
      "Documentation complète"
    ]
  }
};

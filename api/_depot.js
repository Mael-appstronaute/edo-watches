// ============================================================
// EDO WATCHES — accès aux données (Vercel Blob)
// Le blob « edo/donnees.json » est la source de vérité en prod.
// Au premier accès, il est semé depuis montres.json du dépôt.
// ============================================================

const { put, head } = require('@vercel/blob');
const graine = require('../montres.json');

const CHEMIN_BLOB = 'edo/donnees.json';

async function chargerDonnees() {
  try {
    const meta = await head(CHEMIN_BLOB);
    // Cache CDN contourné : l'URL varie à chaque lecture
    const r = await fetch(meta.url + '?v=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) throw new Error('Lecture du blob impossible');
    return await r.json();
  } catch (e) {
    if (e && (e.name === 'BlobNotFoundError' || /not.*found|does not exist/i.test(String(e.message)))) {
      await sauvegarderDonnees(graine);
      return JSON.parse(JSON.stringify(graine));
    }
    throw e;
  }
}

async function sauvegarderDonnees(donnees) {
  await put(CHEMIN_BLOB, JSON.stringify(donnees, null, 2), {
    access: 'public',
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
}

// Clé d'accès du dashboard : requise pour toute écriture
function verifierCle(req, res) {
  const attendue = process.env.EDO_ADMIN_CLE;
  if (!attendue) return true; // pas encore configurée → accès libre (préprod)
  if ((req.headers['x-edo-cle'] || '') === attendue) return true;
  res.status(401).json({ erreur: 'Clé d’accès requise' });
  return false;
}

function slugifier(texte) {
  return String(texte)
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .toLowerCase() || 'piece';
}

module.exports = { chargerDonnees, sauvegarderDonnees, verifierCle, slugifier };

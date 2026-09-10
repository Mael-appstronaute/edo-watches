// ============================================================
// EDO WATCHES — accès aux données (Vercel Blob)
// Chaque sauvegarde écrit un blob « edo/donnees-<timestamp>.json »
// inédit : une URL jamais vue = pas de cache CDN périmé.
// La lecture liste le préfixe et prend le plus récent.
// Au premier accès, le catalogue est semé depuis montres.json.
// ============================================================

const { put, list, del } = require('@vercel/blob');
const graine = require('../montres.json');

const PREFIXE = 'edo/donnees-';

async function chargerDonnees() {
  const { blobs } = await list({ prefix: PREFIXE });
  if (!blobs.length) {
    await sauvegarderDonnees(graine);
    return JSON.parse(JSON.stringify(graine));
  }
  // Les noms sont horodatés : le plus grand = le plus récent
  blobs.sort((a, b) => (a.pathname < b.pathname ? 1 : -1));
  const r = await fetch(blobs[0].url, { cache: 'no-store' });
  if (!r.ok) throw new Error('Lecture du catalogue impossible');
  return await r.json();
}

async function sauvegarderDonnees(donnees) {
  await put(PREFIXE + Date.now() + '.json', JSON.stringify(donnees, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  });
  // Ménage best-effort : on ne garde que les 3 versions les plus récentes
  try {
    const { blobs } = await list({ prefix: PREFIXE });
    blobs.sort((a, b) => (a.pathname < b.pathname ? 1 : -1));
    const anciens = blobs.slice(3).map(b => b.url);
    if (anciens.length) await del(anciens);
  } catch (e) { /* le ménage peut échouer sans conséquence */ }
}

// Clé d'accès du dashboard : requise pour toute écriture
function verifierCle(req, res) {
  const attendue = (process.env.EDO_ADMIN_CLE || '').trim();
  if (!attendue) return true; // pas encore configurée → accès libre (préprod)
  if ((req.headers['x-edo-cle'] || '').trim() === attendue) return true;
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

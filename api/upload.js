// POST /api/upload?nom=fichier.jpg — image en corps brut → Vercel Blob, renvoie {url}
const { put } = require('@vercel/blob');
const { verifierCle, slugifier } = require('./_depot.js');

const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];
const TYPES = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif' };

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ erreur: 'Méthode non autorisée' });
  if (!verifierCle(req, res)) return;
  try {
    const nom = (req.query && req.query.nom) || 'photo.jpg';
    const point = nom.lastIndexOf('.');
    const ext = (point >= 0 ? nom.slice(point) : '.jpg').toLowerCase();
    if (!EXTENSIONS.includes(ext)) {
      return res.status(400).json({ erreur: 'Format non pris en charge (' + ext + ')' });
    }

    // Corps brut : Buffer fourni par Vercel pour application/octet-stream,
    // sinon on lit le flux nous-mêmes
    let contenu = req.body;
    if (!Buffer.isBuffer(contenu)) {
      const morceaux = [];
      for await (const m of req) morceaux.push(m);
      contenu = Buffer.concat(morceaux);
    }
    if (!contenu || !contenu.length) return res.status(400).json({ erreur: 'Fichier vide' });

    const base = slugifier(nom.slice(0, point >= 0 ? point : nom.length));
    const blob = await put('photos/' + base + ext, contenu, {
      access: 'public',
      addRandomSuffix: true,
      contentType: TYPES[ext],
    });
    res.status(200).json({ ok: true, url: blob.url });
  } catch (e) {
    res.status(500).json({ erreur: String(e.message || e) });
  }
};

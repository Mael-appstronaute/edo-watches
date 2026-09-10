// POST /api/marque — ajout d'une maison {nom, domaine}
const { chargerDonnees, sauvegarderDonnees, verifierCle } = require('./_depot.js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ erreur: 'Méthode non autorisée' });
  if (!verifierCle(req, res)) return;
  try {
    const corps = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const nom = (corps.nom || '').trim();
    let domaine = (corps.domaine || '').trim().toLowerCase()
      .replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
    if (!nom) return res.status(400).json({ erreur: 'Nom de marque manquant' });

    const donnees = await chargerDonnees();
    if (donnees.marques.some(m => m.nom.toLowerCase() === nom.toLowerCase())) {
      return res.status(200).json({ ok: true, existante: true });
    }
    donnees.marques.push({ nom, domaine: domaine || 'watch.com' });
    await sauvegarderDonnees(donnees);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ erreur: String(e.message || e) });
  }
};

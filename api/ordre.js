// POST /api/ordre — réordonne le catalogue {slugs: […]}
const { chargerDonnees, sauvegarderDonnees, verifierCle } = require('./_depot.js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ erreur: 'Méthode non autorisée' });
  if (!verifierCle(req, res)) return;
  try {
    const corps = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const slugs = Array.isArray(corps.slugs) ? corps.slugs : [];
    const donnees = await chargerDonnees();
    const actuels = Object.keys(donnees.montres);
    if (slugs.length !== actuels.length || !actuels.every(s => slugs.includes(s))) {
      return res.status(400).json({ erreur: 'Liste de slugs incohérente' });
    }
    const nouveau = {};
    for (const s of slugs) nouveau[s] = donnees.montres[s];
    donnees.montres = nouveau;
    await sauvegarderDonnees(donnees);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ erreur: String(e.message || e) });
  }
};

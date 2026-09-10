// GET /api/data — catalogue complet (marques + montres)
const { chargerDonnees } = require('./_depot.js');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ erreur: 'Méthode non autorisée' });
  try {
    const donnees = await chargerDonnees();
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(donnees);
  } catch (e) {
    res.status(500).json({ erreur: String(e.message || e) });
  }
};

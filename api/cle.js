// GET /api/cle — vérifie le jeton de session du dashboard (en-tête x-edo-cle).
// {ok:true, libre:true} si aucun accès n'est configuré (préprod).
const { jetonAttendu, memesSecrets } = require('./_depot.js');

module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ erreur: 'Méthode non autorisée' });
  const attendue = jetonAttendu();
  if (!attendue) return res.status(200).json({ ok: true, libre: true });
  if (memesSecrets((req.headers['x-edo-cle'] || '').trim(), attendue)) return res.status(200).json({ ok: true });
  res.status(401).json({ erreur: 'Jeton invalide' });
};

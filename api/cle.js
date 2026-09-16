// GET /api/cle — vérifie la clé d'accès du dashboard (en-tête x-edo-cle).
// {ok:true, libre:true} si aucune clé n'est configurée (préprod).
module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ erreur: 'Méthode non autorisée' });
  const attendue = (process.env.EDO_ADMIN_CLE || '').trim();
  if (!attendue) return res.status(200).json({ ok: true, libre: true });
  if ((req.headers['x-edo-cle'] || '').trim() === attendue) return res.status(200).json({ ok: true });
  res.status(401).json({ erreur: 'Clé invalide' });
};

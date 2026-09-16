// POST /api/connexion — {identifiant, mdp} → {ok, jeton}
// Le jeton renvoyé est ensuite passé en en-tête x-edo-cle sur les écritures.
const { jetonAttendu, memesSecrets } = require('./_depot.js');

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ erreur: 'Méthode non autorisée' });
  try {
    const user = (process.env.EDO_ADMIN_USER || '').trim();
    const mdp = (process.env.EDO_ADMIN_MDP || '').trim();
    if (!user || !mdp) return res.status(200).json({ ok: true, jeton: '', libre: true });

    const corps = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const bonUser = memesSecrets((corps.identifiant || '').trim().toLowerCase(), user.toLowerCase());
    const bonMdp = memesSecrets((corps.mdp || '').trim(), mdp);
    if (bonUser && bonMdp) return res.status(200).json({ ok: true, jeton: jetonAttendu() });

    res.status(401).json({ erreur: 'Identifiant ou mot de passe incorrect' });
  } catch (e) {
    res.status(500).json({ erreur: String(e.message || e) });
  }
};

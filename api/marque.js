// POST   /api/marque          — ajout d'une maison {nom, domaine}
// PUT    /api/marque          — mise à jour du domaine {nom, domaine}
// DELETE /api/marque?nom=…    — suppression (refusée si des pièces l'utilisent)
const { chargerDonnees, sauvegarderDonnees, verifierCle } = require('./_depot.js');

const nettoyerDomaine = (d) => (d || '').trim().toLowerCase()
  .replace(/^https?:\/\/(www\.)?/, '').split('/')[0];

module.exports = async (req, res) => {
  try {
    if (req.method === 'POST' || req.method === 'PUT') {
      if (!verifierCle(req, res)) return;
      const corps = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const nom = (corps.nom || '').trim();
      const domaine = nettoyerDomaine(corps.domaine);
      if (!nom) return res.status(400).json({ erreur: 'Nom de marque manquant' });

      const donnees = await chargerDonnees();
      const existante = donnees.marques.find(m => m.nom.toLowerCase() === nom.toLowerCase());

      if (req.method === 'PUT') {
        if (!existante) return res.status(404).json({ erreur: 'Marque introuvable' });
        existante.domaine = domaine || existante.domaine;
        await sauvegarderDonnees(donnees);
        return res.status(200).json({ ok: true });
      }

      if (existante) return res.status(200).json({ ok: true, existante: true });
      donnees.marques.push({ nom, domaine: domaine || 'watch.com' });
      await sauvegarderDonnees(donnees);
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      if (!verifierCle(req, res)) return;
      const nom = ((req.query && req.query.nom) || '').trim();
      const donnees = await chargerDonnees();
      const index = donnees.marques.findIndex(m => m.nom.toLowerCase() === nom.toLowerCase());
      if (index < 0) return res.status(404).json({ erreur: 'Marque introuvable' });
      const utilisee = Object.values(donnees.montres).some(m => m.marque === donnees.marques[index].nom);
      if (utilisee) return res.status(400).json({ erreur: 'Des pièces du catalogue utilisent encore cette marque' });
      donnees.marques.splice(index, 1);
      await sauvegarderDonnees(donnees);
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ erreur: 'Méthode non autorisée' });
  } catch (e) {
    res.status(500).json({ erreur: String(e.message || e) });
  }
};

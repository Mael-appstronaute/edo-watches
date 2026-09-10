// POST   /api/montre        — création ou mise à jour ({slug, montre})
// DELETE /api/montre?slug=… — suppression
const { chargerDonnees, sauvegarderDonnees, verifierCle, slugifier } = require('./_depot.js');

module.exports = async (req, res) => {
  try {
    if (req.method === 'POST') {
      if (!verifierCle(req, res)) return;
      const corps = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const montre = corps.montre || {};
      if (!montre.marque || !montre.nom) {
        return res.status(400).json({ erreur: 'Marque et modèle sont obligatoires' });
      }

      const donnees = await chargerDonnees();
      let slug = corps.slug || '';
      if (!slug) {
        // Slug intelligent : modèle seul, puis marque-modèle, puis suffixe numérique
        const base = slugifier(montre.nom);
        slug = base;
        if (donnees.montres[slug]) slug = slugifier(montre.marque + '-' + montre.nom);
        let i = 2;
        while (donnees.montres[slug]) slug = base + '-' + i++;
      }

      if (!Array.isArray(montre.galerie)) montre.galerie = [];
      if (typeof montre.enVitrine !== 'boolean') montre.enVitrine = false;
      if (!montre.ambiance) montre.ambiance = montre.image || '';

      donnees.montres[slug] = montre;
      await sauvegarderDonnees(donnees);
      return res.status(200).json({ ok: true, slug });
    }

    if (req.method === 'DELETE') {
      if (!verifierCle(req, res)) return;
      const slug = (req.query && req.query.slug) || '';
      const donnees = await chargerDonnees();
      if (!donnees.montres[slug]) return res.status(404).json({ erreur: 'Pièce introuvable' });
      delete donnees.montres[slug];
      await sauvegarderDonnees(donnees);
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ erreur: 'Méthode non autorisée' });
  } catch (e) {
    res.status(500).json({ erreur: String(e.message || e) });
  }
};

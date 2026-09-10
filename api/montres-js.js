// GET /montres.js (réécrit vers /api/montres-js) — le fichier de données
// que chargent toutes les pages du site, généré depuis le blob.
const { chargerDonnees } = require('./_depot.js');

module.exports = async (req, res) => {
  try {
    const donnees = await chargerDonnees();
    const js =
      '// ============================================================\n' +
      '// EDO WATCHES — données partagées (catalogue + marques)\n' +
      '// GÉNÉRÉ à la volée depuis le dashboard (/admin.html).\n' +
      '// ============================================================\n\n' +
      'const MARQUES = ' + JSON.stringify(donnees.marques, null, 2) + ';\n\n' +
      "const logoMarque = (domaine) => 'https://www.google.com/s2/favicons?domain=' + domaine + '&sz=128';\n\n" +
      'const MONTRES = ' + JSON.stringify(donnees.montres, null, 2) + ';\n';
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(js);
  } catch (e) {
    res.status(500).send('// Erreur de chargement du catalogue : ' + String(e.message || e));
  }
};

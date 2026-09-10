# ============================================================
# EDO WATCHES — serveur local (site + API du dashboard)
# Lancer :  python server.py   →  http://localhost:8098
#           dashboard          →  http://localhost:8098/admin.html
#
# Zéro dépendance (stdlib uniquement).
# Source de vérité : montres.json. À chaque écriture, montres.js
# est régénéré pour que le site public reste 100 % statique.
# ============================================================

import json
import os
import re
import unicodedata
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

RACINE = os.path.dirname(os.path.abspath(__file__))
FICHIER_DONNEES = os.path.join(RACINE, 'montres.json')
FICHIER_JS = os.path.join(RACINE, 'montres.js')
DOSSIER_PHOTOS = os.path.join(RACINE, 'photos')
PORT = 8098

EXTENSIONS_IMAGES = {'.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'}


def charger():
    with open(FICHIER_DONNEES, encoding='utf-8-sig') as f:
        return json.load(f)


def sauvegarder(donnees):
    with open(FICHIER_DONNEES, 'w', encoding='utf-8') as f:
        json.dump(donnees, f, ensure_ascii=False, indent=2)
    regenerer_js(donnees)


def regenerer_js(donnees):
    """Réécrit montres.js — le fichier chargé par toutes les pages du site."""
    marques = json.dumps(donnees['marques'], ensure_ascii=False, indent=2)
    montres = json.dumps(donnees['montres'], ensure_ascii=False, indent=2)
    contenu = (
        "// ============================================================\n"
        "// EDO WATCHES — données partagées (catalogue + marques)\n"
        "// FICHIER GÉNÉRÉ par server.py depuis montres.json.\n"
        "// Ne pas éditer à la main : passer par le dashboard (/admin.html).\n"
        "// ============================================================\n\n"
        f"const MARQUES = {marques};\n\n"
        "const logoMarque = (domaine) => 'https://www.google.com/s2/favicons?domain=' + domaine + '&sz=128';\n\n"
        f"const MONTRES = {montres};\n"
    )
    with open(FICHIER_JS, 'w', encoding='utf-8') as f:
        f.write(contenu)


def slugifier(texte):
    texte = unicodedata.normalize('NFKD', texte).encode('ascii', 'ignore').decode()
    texte = re.sub(r'[^a-zA-Z0-9]+', '-', texte).strip('-').lower()
    return texte or 'piece'


class Requete(SimpleHTTPRequestHandler):

    def translate_path(self, path):
        # Sert toujours depuis le dossier du projet, peu importe le cwd
        chemin = super().translate_path(path)
        return os.path.join(RACINE, os.path.relpath(chemin, os.getcwd()))

    def end_headers(self):
        # Pas de cache : les données changent depuis le dashboard
        if self.path.endswith(('.js', '.json', '.html')) or self.path.startswith('/api/'):
            self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    # ---------- Réponses JSON ----------
    def repondre_json(self, objet, code=200):
        corps = json.dumps(objet, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(corps)))
        self.end_headers()
        self.wfile.write(corps)

    def lire_corps(self):
        taille = int(self.headers.get('Content-Length', 0))
        return self.rfile.read(taille)

    # ---------- Routage ----------
    def do_GET(self):
        if urlparse(self.path).path == '/api/data':
            return self.repondre_json(charger())
        super().do_GET()

    def do_POST(self):
        route = urlparse(self.path).path
        try:
            if route == '/api/montre':
                return self.api_montre()
            if route == '/api/marque':
                return self.api_marque()
            if route == '/api/ordre':
                return self.api_ordre()
            if route == '/api/upload':
                return self.api_upload()
            self.repondre_json({'erreur': 'Route inconnue'}, 404)
        except Exception as e:
            self.repondre_json({'erreur': str(e)}, 500)

    def do_DELETE(self):
        analyse = urlparse(self.path)
        if analyse.path == '/api/montre':
            slug = parse_qs(analyse.query).get('slug', [''])[0]
            donnees = charger()
            if slug not in donnees['montres']:
                return self.repondre_json({'erreur': 'Pièce introuvable'}, 404)
            del donnees['montres'][slug]
            sauvegarder(donnees)
            return self.repondre_json({'ok': True})
        self.repondre_json({'erreur': 'Route inconnue'}, 404)

    # ---------- API ----------
    def api_montre(self):
        """Création ou mise à jour d'une pièce : {slug, montre}."""
        corps = json.loads(self.lire_corps())
        montre = corps.get('montre') or {}
        if not montre.get('marque') or not montre.get('nom'):
            return self.repondre_json({'erreur': 'Marque et modèle sont obligatoires'}, 400)

        donnees = charger()
        slug = corps.get('slug') or ''
        if not slug:
            # Slug intelligent : modèle seul, puis marque-modèle, puis suffixe numérique
            base = slugifier(montre['nom'])
            slug = base
            if slug in donnees['montres']:
                slug = slugifier(montre['marque'] + '-' + montre['nom'])
            i = 2
            while slug in donnees['montres']:
                slug = f'{base}-{i}'
                i += 1

        # Filets de sécurité côté serveur
        montre.setdefault('galerie', [])
        montre.setdefault('enVitrine', False)
        if not montre.get('ambiance'):
            montre['ambiance'] = montre.get('image', '')

        donnees['montres'][slug] = montre
        sauvegarder(donnees)
        self.repondre_json({'ok': True, 'slug': slug})

    def api_marque(self):
        corps = json.loads(self.lire_corps())
        nom = (corps.get('nom') or '').strip()
        domaine = (corps.get('domaine') or '').strip().lower()
        domaine = re.sub(r'^https?://(www\.)?', '', domaine).split('/')[0]
        if not nom:
            return self.repondre_json({'erreur': 'Nom de marque manquant'}, 400)
        donnees = charger()
        if any(m['nom'].lower() == nom.lower() for m in donnees['marques']):
            return self.repondre_json({'ok': True, 'existante': True})
        donnees['marques'].append({'nom': nom, 'domaine': domaine or 'watch.com'})
        sauvegarder(donnees)
        self.repondre_json({'ok': True})

    def api_ordre(self):
        """Réordonne le catalogue : {slugs: [...]} (ordre = « sélection de la maison »)."""
        corps = json.loads(self.lire_corps())
        slugs = corps.get('slugs') or []
        donnees = charger()
        if sorted(slugs) != sorted(donnees['montres'].keys()):
            return self.repondre_json({'erreur': 'Liste de slugs incohérente'}, 400)
        donnees['montres'] = {s: donnees['montres'][s] for s in slugs}
        sauvegarder(donnees)
        self.repondre_json({'ok': True})

    def api_upload(self):
        """Reçoit une image en corps brut ; ?nom=fichier.jpg. Renvoie {url}."""
        params = parse_qs(urlparse(self.path).query)
        nom = params.get('nom', ['photo.jpg'])[0]
        base, ext = os.path.splitext(nom)
        ext = ext.lower()
        if ext not in EXTENSIONS_IMAGES:
            return self.repondre_json({'erreur': 'Format non pris en charge (' + ext + ')'}, 400)

        contenu = self.lire_corps()
        if not contenu:
            return self.repondre_json({'erreur': 'Fichier vide'}, 400)
        if len(contenu) > 15 * 1024 * 1024:
            return self.repondre_json({'erreur': 'Image trop lourde (max 15 Mo)'}, 400)

        os.makedirs(DOSSIER_PHOTOS, exist_ok=True)
        base = slugifier(base)
        chemin = os.path.join(DOSSIER_PHOTOS, base + ext)
        i = 2
        while os.path.exists(chemin):
            chemin = os.path.join(DOSSIER_PHOTOS, f'{base}-{i}{ext}')
            i += 1
        with open(chemin, 'wb') as f:
            f.write(contenu)
        self.repondre_json({'ok': True, 'url': 'photos/' + os.path.basename(chemin)})

    def log_message(self, fmt, *args):
        if '/api/' in (args[0] if args else ''):
            super().log_message(fmt, *args)


if __name__ == '__main__':
    regenerer_js(charger())  # montres.js toujours synchro au démarrage
    print(f'EDO WATCHES — site      : http://localhost:{PORT}')
    print(f'EDO WATCHES — dashboard : http://localhost:{PORT}/admin.html')
    ThreadingHTTPServer(('', PORT), Requete).serve_forever()

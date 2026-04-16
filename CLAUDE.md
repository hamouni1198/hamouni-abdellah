# Portfolio 3D — Abdellah Hamouni

## Présentation du projet

Portfolio personnel d'**Abdellah Hamouni**, développeur Full Stack en alternance chez **Sofyx** (Paris) et étudiant en Bachelor Chef de Projets Digitaux à l'**EEMI**.

L'objectif est de transformer ce portfolio HTML/CSS/JS statique en une **expérience immersive 3D** avec Three.js, tout en conservant l'identité visuelle noir & blanc actuelle.

---

## Structure des fichiers

```
hamouni-abdellah/
├── index.html          # Page d'accueil (hero : nom + photo de profil)
├── about.html          # À propos (bio, formations, expériences)
├── projet.html         # Galerie des projets (4 projets actuels)
├── competence.html     # Grille des logos de compétences
├── contact.html        # Formulaire de contact (EmailJS)
│
├── style.css           # Styles page d'accueil
├── about.css           # Styles page À propos
├── projet.css          # Styles page Projets
├── competence.css      # Styles page Compétences
├── contacte.css        # Styles page Contact
├── nav.css             # Navigation partagée + cursor #mouse
│
├── script.js           # JS partagé (cursor, parallax image, sendMail, tabs)
└── img/                # Assets images (photo profil, logos SVG/PNG, favicon)
```

---

## Identité visuelle

| Élément         | Valeur                                      |
|-----------------|---------------------------------------------|
| Palette         | Noir `#000000` et blanc `#ffffff` uniquement |
| Police          | **Clash Display** (Fontshare CDN) — weights 200, 300, 400, 700 |
| Style           | Minimaliste, typographie XXL, fond blanc    |
| Effet curseur   | Bulle lumineuse floue (`#mouse`, radial-gradient blanc) |
| Effet texte     | "Abdellah" plein / "Hamouni" outline — swap au hover |
| Effet image     | Parallax 3D sur photo de profil au mousemove |

---

## Fonctionnalités existantes

### Navigation (`nav.css`)
- Barre horizontale centrée, `border-bottom: 0.5px solid grey`, hauteur `13vh`
- 5 liens : Accueil / À propos / Projets / Compétences / Contact
- Hover : fond gris clair `rgb(225,225,225)` avec border-radius
- Responsive : réduction de font-size et gap sur tablet/mobile

### Curseur personnalisé (`nav.css` + `script.js`)
- `#mouse` : cercle blanc flou fixe, suit la souris avec délai (speed 0.1)
- `pointer-events: none`, `filter: blur(20px)`, z-index 100

### Page d'accueil (`index.html` + `style.css`)
- Deux `<h1>` géants (280px) : "Abdellah" (plein) et "Hamouni" (outline)
- Photo de profil centree en `position: absolute` entre les deux textes (z-index 2)
- 2 boutons CTA : "À Propos De Moi" (noir) et "Contactez-moi" (outline)
- Parallax sur l'image au `mousemove` (translateX/Y proportionnel à position curseur)

### Page À propos (`about.html`)
- Bio (alternance Sofyx, stack Symfony/Next.js/React/TypeScript/Docker/K8s)
- Liens sociaux : Instagram, LinkedIn, GitHub (Font Awesome)
- Section **Formations** : EEMI (2024-2027), EFET (2022-2024), Lycée (2021)
- Section **Expériences** : Sofyx, Cercle international des femmes leaders, AgriData Consulting, Vita Mix

### Page Projets (`projet.html`)
- 4 projets affichés comme `.box` cliquables (liens vers Netlify/domaine)
  - batterie-agadir.netlify.app
  - jaguar-eemi.netlify.app
  - shott.netlify.app
  - femmesleaders.info

### Page Compétences (`competence.html`)
- Grille d'icônes SVG/PNG organisées par catégorie :
  - **Langages** : HTML5, CSS3, JavaScript, PHP, Python, C++
  - **Frameworks** : Symfony, Next.js, React, TypeScript, Node.js, Ajax
  - **DevOps** : Docker, Kubernetes, ArgoCD
  - **BDD** : MySQL / MariaDB
  - **Outils** : GitHub, Figma, Notion, Slack, WordPress, Laravel, WinDev

### Page Contact (`contact.html`)
- Formulaire avec : Nom, Email, Contact (téléphone), Objet, Message
- Envoi via **EmailJS** (service: `service_qw2peya`, template: `template_gkif4f5`)
- Clé publique EmailJS : `Gpy3dE6la5He8wOti`
- Validation JS côté client dans `script.js` (`sendMail()`)

---

## Stack technique actuelle

- HTML5 / CSS3 vanilla (pas de framework CSS)
- JavaScript vanilla (pas de bundler)
- [EmailJS](https://www.emailjs.com/) pour l'envoi de mails
- [Font Awesome 6.7.2](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/) pour les icônes sociales
- [Fontshare – Clash Display](https://api.fontshare.com/) pour la typographie

---

## Vision 3D — Objectifs de la refonte

### Librairies installées
- **[Three.js](https://threejs.org/) v0.183.2** (`npm install three`) — moteur 3D WebGL
- **[GSAP](https://gsap.com/) v3.15.0** (`npm install gsap`) — animations fluides et transitions de pages
- Importation via `node_modules/` avec un bundler (Vite recommandé) ou via les CDN ESM ci-dessous

### Import via ESM CDN (sans bundler)
```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.183.2/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.183.2/examples/jsm/",
    "gsap": "https://cdn.jsdelivr.net/npm/gsap@3.15.0/index.js"
  }
}
</script>
<script type="module" src="./scene3d.js"></script>
```

### Effets 3D à implémenter par page

#### Page d'accueil
- Scène Three.js en fond : particules flottantes ou grille 3D animée (noir sur blanc)
- Texte "Abdellah Hamouni" avec effet de profondeur / extrusion 3D (`TextGeometry`)
- Photo de profil conservée, mais avec un reflet 3D ou halo lumineux
- Transition de page animée (GSAP + Three.js camera movement)

#### Page À propos
- Timeline des formations/expériences en 3D (cartes flottantes avec perspective)
- Effet de rotation 3D des cartes au hover

#### Page Projets
- Galerie 3D type carousel ou défilement en profondeur
- Chaque projet présenté sur un plan 3D avec effet de flip au hover

#### Compétences
- Logos des technologies en orbite 3D (sphère de compétences tournante)
- Regroupement par catégories avec labels 3D

#### Contact
- Formulaire avec fond 3D (ondulations, vagues)
- Conserver EmailJS

### Contraintes à respecter
- Conserver la palette **noir & blanc uniquement**
- Conserver la police **Clash Display**
- Conserver le **curseur personnalisé** (adapter pour Three.js canvas)
- Le site doit rester **responsive** (desktop/tablet/mobile)
- Les fichiers HTML doivent rester séparés par page (pas de SPA obligatoire)
- Ne pas casser le formulaire EmailJS existant

---

## Commandes utiles

```bash
# Lancer un serveur local pour tester
npx serve .
# ou
python -m http.server 8080
```

---

## Règles pour Claude

1. Toujours lire le fichier concerné avant de le modifier.
2. Travailler page par page : commencer par `index.html` pour la démo 3D principale.
3. Three.js doit être chargé via CDN dans un premier temps (pas de build tool).
4. Chaque scène Three.js s'injecte dans un `<canvas>` en `position: fixed` derrière le contenu HTML.
5. Garder `nav.css` et `script.js` partagés et les mettre à jour pour chaque nouvelle page.
6. Tester visuellement que les textes restent lisibles sur fond 3D.
7. Ne pas supprimer les effets existants (cursor, parallax image, text swap) — les adapter si besoin.

# Judo Club de Juvisy - Site Web

## Prérequis

Avant de pouvoir compiler et exécuter ce projet en local, assurez-vous d'avoir les éléments suivants installés sur votre machine Windows :

1. **Ruby** : Jekyll est construit sur Ruby, donc vous devrez installer Ruby sur votre machine. Prendre la version avec le DevKit (Ruby+Devkit).
   - Téléchargez Ruby pour Windows [ici](https://rubyinstaller.org/).
   - Pendant l'installation, assurez-vous de cocher l'option pour ajouter Ruby au PATH.

2. **Jekyll et Bundler** : Une fois Ruby installé, vous devrez installer Jekyll et Bundler via RubyGems.
   - Ouvrez l'invite de commandes et exécutez la commande suivante :
     ```bash
     gem install jekyll bundler
     ```

3. **Node.js et npm** : Vous aurez besoin de Node.js pour gérer les packages JavaScript et SCSS.
   - Téléchargez Node.js [ici](https://nodejs.org/).
   - npm (Node Package Manager) est inclus avec Node.js, donc vous n'avez pas besoin de l'installer séparément.

## Installation

Une fois que vous avez installé les prérequis, suivez les étapes ci-dessous pour configurer et compiler le projet :

1. **Cloner le projet** :
   - Si vous avez accès à un dépôt Git, clonez le projet sur votre machine locale :
     ```bash
     git clone https://votre-repository.git
     cd votre-repository
     ```

2. **Installer les dépendances Jekyll** :
   - Installez les gemmes Ruby nécessaires pour Jekyll :
     ```bash
     bundle install
     ```

3. **Installer les dépendances npm** :
   - Installez les packages npm nécessaires pour SCSS et JavaScript :
     ```bash
     npm install
     ```

4. **Compiler les fichiers SCSS** :
   - Si vous avez des fichiers SCSS, vous devez les compiler en CSS. Vous pouvez le faire avec une commande npm. Assurez-vous d'avoir un script dans votre `package.json` pour la compilation SCSS, comme ceci :
     ```json
     "scripts": {
       "build-css": "node-sass --output-style compressed assets/css/styles.scss assets/css/styles.css"
     }
     ```
   - Ensuite, compilez les fichiers SCSS en CSS :
     ```bash
     npm run build-css
     ```

## Exécution en Local

Pour exécuter le site en local avec Jekyll :

1. **Démarrer le serveur Jekyll** :
   - Utilisez Jekyll pour servir le site localement :
     ```bash
     bundle exec jekyll serve
     ```
   - Cela générera le site et le rendra disponible à l'adresse `http://localhost:4000`.

2. **Accéder au site** :
   - Ouvrez votre navigateur et allez à l'adresse `http://localhost:4000` pour voir le site en action.

## Structure du Projet

Voici l'arborescence complète de votre projet :
/_includes
    /header.html
    /footer.html
/_layouts
    /default.html
/_sass
    /_variables.scss
    /_mixins.scss
/assets
    /css
        /styles.scss
    /js
        /scripts.js
    /images
        /logo.png
        /favicon-192x192.png
        /judokate_8ans.png
        /main.jpg
/_config.yml
/index.html
/mentions-legales.html
/reglement-interieur.html
/statuts.html
/plan-du-site.html
/competitions.html
/le-club.html
/inscription.html
/entrainements.html
/contact.html

## Déploiement sur GitHub Pages

Pour déployer votre site sur GitHub Pages, suivez ces étapes :

1. **Configurer le fichier `_config.yml`** :
   - Assurez-vous que le fichier `_config.yml` contient les informations correctes :
     ```yaml
     title: Judo Club de Juvisy
     description: Le site officiel du Judo Club de Juvisy, proposant des cours de judo pour tous les âges et tous les niveaux.
     baseurl: "" # le chemin pour accéder au site si le site n'est pas à la racine du domaine
     url: "https://votre-username.github.io/votre-repository"
     ```

2. **Compiler et pousser le code vers GitHub** :
   - Si vous utilisez la branche `main` ou `master` pour héberger le site, compilez le site et poussez les changements :
     ```bash
     bundle exec jekyll build
     git add .
     git commit -m "Déploiement du site"
     git push origin main
     ```
   - GitHub Pages générera automatiquement le site à partir de la branche `gh-pages` ou de la branche par défaut si spécifié.

3. **Activer GitHub Pages** :
   - Allez dans les paramètres de votre dépôt sur GitHub.
   - Sous la section **Pages**, sélectionnez la branche `main` ou `gh-pages` comme source.
   - Enregistrez les modifications.

4. **Accéder au site** :
   - Après le déploiement, votre site sera accessible à l'adresse `https://votre-username.github.io/votre-repository`.

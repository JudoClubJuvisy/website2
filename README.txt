Il faut compiler le fichier SCSS pour obtenir le fichier CSS interprétable par le navigateur. 
-> pré-requie, intallation de Node.js et npm

Installer Sass :
npm install -g sass

Compiler le fichier SCSS :
sass scss/styles.scss assets/css/styles.css

Surveiller les modifications :
sass --watch scss/styles.scss:assets/css/styles.css
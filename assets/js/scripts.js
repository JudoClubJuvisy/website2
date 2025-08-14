document.addEventListener("DOMContentLoaded", function () {
    // Met à jour l'année actuelle dans le footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Récupère l'URL actuelle
    const currentUrl = window.location.pathname;

    // Correspondance entre l'URL et l'ID du lien de navigation (état actif)
    // ➜ Les sous-pages pointent vers le bouton parent du dropdown.
    const navItems = {
        // Le Club
        "/le-club.html": "nav-club",

        // Nos disciplines (dropdown)
        "/jujitsu.html": "navbarDisciplines",
        "/judo.html": "navbarDisciplines",
        "/taiso.html": "navbarDisciplines",

        // S'inscrire
        "/inscription.html": "nav-inscription",

        // Les entraînements (dropdown)
        "/horaires.html": "navbarTrainings",
        "/equipement.html": "navbarTrainings",

        // Les compétitions (dropdown)
        "/competitions-officielles.html": "navbarCompetitions",
        "/competitions-amicales.html": "navbarCompetitions",

        // Contact
        "/contact.html": "nav-contact"
        // Pas de mapping pour la boutique (lien externe) ni pour /index.html (pas de lien "Accueil")
    };

    // Récupérer l'ID correspondant à l'URL actuelle
    const activeNavId = navItems[currentUrl];

    // Si l'ID est trouvé, ajouter la classe 'active' au bon élément
    if (activeNavId) {
        const activeNavItem = document.getElementById(activeNavId);
        if (activeNavItem) {
            activeNavItem.classList.add("active");
        }
    }

    // Si la page actuelle est "certificat.html", exécuter les fonctions spécifiques
    if (currentUrl === "/certificat.html") {
        initCertificatPage();
    }

    // ================== Thèmes spéciaux (logo + bannière) ==================
    const currentMonth = new Date().getMonth();

    if (currentMonth === 9) { // Octobre
        applySpecialTheme('octobre');
    } else if (currentMonth === 10) { // Novembre
        applySpecialTheme('novembre');
    } else {
        applySpecialTheme(null);
    }

    function setLogoBase(baseWithoutExt) {
        // Met à jour <source type="image/webp"> + fallback <img src="...png">
        const picture = document.getElementById('logo-picture');
        const img = document.getElementById('logo-club');
        if (!img) return;

        const sourceWebp = picture ? picture.querySelector('source[type="image/webp"]') : null;

        if (sourceWebp) sourceWebp.srcset = baseWithoutExt + ".webp";
        img.src = baseWithoutExt + ".png";
    }

    function applySpecialTheme(theme) {
        const img = document.getElementById('logo-club');
        const navbarBrand = document.querySelector('.navbar-brand');
        const banner = document.querySelector('.special-banner');
        if (!img) return;

        const baseRegular  = img.dataset.baseRegular;
        const baseOctobre  = img.dataset.baseOctobre;
        const baseNovembre = img.dataset.baseNovembre;

        if (theme === 'octobre' && baseOctobre) {
            setLogoBase(baseOctobre);
            if (navbarBrand) navbarBrand.classList.add('octobre-rose');
            if (banner) {
                banner.classList.remove('d-none');
                banner.innerHTML = `
                    <a href="https://octobrerose.fondation-arc.org/" class="special-link" target="_blank" rel="noopener" aria-label="Visiter le site d'Octobre Rose">
                        🎗️ Le Judo Club de Juvisy soutient Octobre Rose pour la lutte contre le cancer du sein 🎗️
                    </a>
                `;
                banner.classList.add('octobre-rose-banner');
            }
        } else if (theme === 'novembre' && baseNovembre) {
            setLogoBase(baseNovembre);
            if (navbarBrand) navbarBrand.classList.add('novembre-bleu');
            if (banner) {
                banner.classList.remove('d-none');
                banner.innerHTML = `
                    <a href="https://www.gustaveroussy.fr/fr/faire-un-don-contre-le-cancer-de-la-prostate" class="special-link" target="_blank" rel="noopener" aria-label="Faire un don contre le cancer de la prostate">
                        🎗️ Le Judo Club de Juvisy soutient Movember pour la lutte contre les cancers masculins 🎗️
                    </a>
                `;
                banner.classList.add('novembre-bleu-banner');
            }
        } else {
            // Thème par défaut
            if (baseRegular) setLogoBase(baseRegular);
            if (navbarBrand) navbarBrand.classList.remove('octobre-rose', 'novembre-bleu');
            if (banner) banner.classList.add('d-none');
        }
    }
});

// ================== Fonction spécifique à la page certificat ==================
function initCertificatPage() {
    const birthDateInput = document.getElementById('birthDate');
    const firstLicenseYes = document.getElementById('firstLicenseYes');
    const competitionYes = document.getElementById('competitionYes');
    const resultsDiv = document.getElementById('results');

    // Initialise Flatpickr pour le champ de date
    flatpickr("#birthDate", {
        dateFormat: "d-m-Y", // Format jour-mois-année
        maxDate: "today",    // Limiter la date sélectionnée à aujourd'hui
        locale: "fr"         // Paramétrer en français
    });

    document.getElementById('certificatForm').addEventListener('submit', function (e) {
        e.preventDefault();

        let birthDate = birthDateInput.value;  // Récupère la date directement comme une chaîne

        if (!birthDate) {
            let errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = "Veuillez entrer une date de naissance valide.";
            errorMessage.classList.remove('d-none');
        } else {
            document.getElementById('errorMessage').classList.add('d-none');

            // Convertit la date en un objet Date
            const birthDateObj = new Date(birthDate.split('-').reverse().join('-')); // "JJ-MM-AAAA" → "AAAA-MM-JJ"
            const age = calculateAge(birthDateObj);
            const isFirstLicense = firstLicenseYes.checked;
            const isCompetition = competitionYes.checked;

            showResults(age, birthDateObj, isFirstLicense, isCompetition);
        }
    });

    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function showResults(age, birthDateObj, isFirstLicense, isCompetition) {
        const verbBirthdayElem = document.getElementById('verbBirthday');
        const valueBirthdayElem = document.getElementById('valueBirthday');
        const verbAgeElem = document.getElementById('verbAge');
        const valueAgeElem = document.getElementById('valueAge');
        const reasonCertificatElem = document.getElementById('reasonCertificat');
        const resultsDiv = document.getElementById('results');

        if (!verbBirthdayElem || !valueBirthdayElem || !verbAgeElem || !valueAgeElem || !reasonCertificatElem || !resultsDiv) {
            console.error("Un ou plusieurs éléments requis sont manquants.");
            return;
        }

        const today = new Date();
        const currentYear = today.getFullYear();
        const birthDay = birthDateObj.getDate();
        const birthMonth = birthDateObj.getMonth();

        // Anniversaire le plus récent (dans l'année en cours ou l'année précédente)
        let birthdayThisYear = new Date(currentYear, birthMonth, birthDay);
        if (birthdayThisYear > today) {
            birthdayThisYear = new Date(currentYear - 1, birthMonth, birthDay);
        }

        const formattedBirthdayThisYear = birthdayThisYear.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        let reasonCertificat;

        const nextAge = age + 1;
        const nextBirthday = new Date(birthDateObj);
        nextBirthday.setFullYear(currentYear);

        if (nextBirthday < new Date(`${currentYear}-09-01`)) {
            nextBirthday.setFullYear(currentYear + 1);
        }

        const startOfEligibility = new Date(`${currentYear}-09-01`);
        const endOfEligibility = new Date(`${currentYear + 1}-08-31`);

        // Cas spécifique pour les 18 ans
        if (nextAge === 18 && nextBirthday >= startOfEligibility && nextBirthday <= endOfEligibility) {
            reasonCertificat = "Je dois fournir un certificat médical car j’aurai 18 ans entre le 1er septembre et le 31 août.";
        }
        // Cas pour les âges multiples de 5 (30, 35, 40, etc.)
        else if (nextAge >= 30 && nextAge % 5 === 0 && nextBirthday >= startOfEligibility && nextBirthday <= endOfEligibility) {
            reasonCertificat = `Je dois fournir un certificat médical car j’aurai ${nextAge} ans entre le 1er septembre ${currentYear} et le 31 août ${currentYear + 1}.`;
        }
        // Mineurs (< 18 ans)
        else if (age < 18) {
            if (age === 17 && birthMonth < 8) {
                reasonCertificat = "Je dois fournir un certificat médical car j’aurai 18 ans avant le 31 août.";
            } else {
                reasonCertificat = "Je réponds au questionnaire de santé. Si toutes mes réponses sont NON, je fournis une attestation sur l'honneur.";
            }
        }
        // Majeurs
        else {
            if (isFirstLicense && age >= 18) {
                reasonCertificat = "Je dois fournir un certificat médical datant de moins d'un an pour ma première inscription.";
            } else if (isCompetition && age >= 18) {
                reasonCertificat = "Je dois fournir un certificat médical car je participe à des compétitions de judo.";
            } else {
                reasonCertificat = "Je réponds au questionnaire de santé. Si toutes mes réponses sont NON, je fournis une attestation sur l'honneur.";
            }
        }

        // Mise à jour des résultats dans l'interface
        verbBirthdayElem.textContent = "était";
        valueBirthdayElem.textContent = formattedBirthdayThisYear;
        verbAgeElem.textContent = "ai";
        valueAgeElem.textContent = `eu ${age} ans`;
        reasonCertificatElem.textContent = reasonCertificat;
        resultsDiv.classList.remove('d-none');
    }
}

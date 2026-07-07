document.addEventListener("DOMContentLoaded", function () {
    // Met à jour l'année actuelle dans le footer.
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Normalise l'URL courante pour fonctionner en domaine racine et en environnement local avec baseurl.
    const currentPath = normalizePath(window.location.pathname);
    const currentFilenamePath = getFilenamePath(currentPath);

    // Correspondance entre l'URL et l'ID du lien de navigation.
    // Les sous-pages pointent vers le bouton parent du dropdown.
    const navItems = {
        // Accueil : pas de lien actif dans le menu principal.
        "/": null,
        "/index.html": null,

        // Le Club
        "/le-club.html": "navbarClub",
        "/notre-philosophie.html": "navbarClub",
        "/histoire-du-club.html": "navbarClub",
        "/vie-du-club.html": "navbarClub",
        "/ceintures-noires.html": "navbarClub",

        // Nos disciplines
        "/disciplines.html": "navbarDisciplines",
        "/judo.html": "navbarDisciplines",
        "/jiu-jitsu-bresilien.html": "navbarDisciplines",
        "/jujitsu.html": "navbarDisciplines",
        "/taiso.html": "navbarDisciplines",

        // S'inscrire
        "/inscription.html": "nav-inscription",

        // Les entraînements
        "/horaires.html": "navbarTrainings",
        "/equipement.html": "navbarTrainings",

        // Les compétitions
        "/competitions-officielles.html": "navbarCompetitions",
        "/competitions-amicales.html": "navbarCompetitions",

        // Contact
        "/contact.html": "nav-contact"
    };

    const activeNavId = navItems[currentPath] || navItems[currentFilenamePath];

    if (activeNavId) {
        const activeNavItem = document.getElementById(activeNavId);
        if (activeNavItem) {
            activeNavItem.classList.add("active");
            activeNavItem.setAttribute("aria-current", "page");
        }
    }

    // Si la page actuelle est certificat.html, exécuter les fonctions spécifiques.
    if (currentPath.endsWith("/certificat.html") || currentFilenamePath === "/certificat.html") {
        initCertificatPage();
    }

    // ================== Thèmes spéciaux : logo + bannière ==================
    const currentMonth = new Date().getMonth();

    if (currentMonth === 9) { // Octobre
        applySpecialTheme("octobre");
    } else if (currentMonth === 10) { // Novembre
        applySpecialTheme("novembre");
    } else {
        applySpecialTheme(null);
    }

    function normalizePath(pathname) {
        if (!pathname) return "/";
        const withoutTrailingSlash = pathname.replace(/\/+$/, "");
        return withoutTrailingSlash || "/";
    }

    function getFilenamePath(pathname) {
        if (!pathname || pathname === "/") return "/";
        const parts = pathname.split("/").filter(Boolean);
        return parts.length ? `/${parts[parts.length - 1]}` : "/";
    }

    function setLogoBase(baseWithoutExt) {
        const picture = document.getElementById("logo-picture");
        const img = document.getElementById("logo-club");
        if (!img) return;

        const sourceWebp = picture ? picture.querySelector('source[type="image/webp"]') : null;

        if (sourceWebp) sourceWebp.srcset = baseWithoutExt + ".webp";
        img.src = baseWithoutExt + ".png";
    }

    function applySpecialTheme(theme) {
        const img = document.getElementById("logo-club");
        const navbarBrand = document.querySelector(".navbar-brand");
        const banner = document.querySelector(".special-banner");
        if (!img) return;

        const baseRegular = img.dataset.baseRegular;
        const baseOctobre = img.dataset.baseOctobre;
        const baseNovembre = img.dataset.baseNovembre;

        if (theme === "octobre" && baseOctobre) {
            setLogoBase(baseOctobre);
            if (navbarBrand) navbarBrand.classList.add("octobre-rose");
            if (banner) {
                banner.classList.remove("d-none", "novembre-bleu-banner");
                banner.classList.add("octobre-rose-banner");
                banner.innerHTML = `
                    <a href="https://octobrerose.fondation-arc.org/" class="special-link" target="_blank" rel="noopener" aria-label="Visiter le site d'Octobre Rose, ouvre un nouvel onglet">
                        🎗️ Le Judo Club de Juvisy soutient Octobre Rose pour la lutte contre le cancer du sein 🎗️
                    </a>
                `;
            }
        } else if (theme === "novembre" && baseNovembre) {
            setLogoBase(baseNovembre);
            if (navbarBrand) navbarBrand.classList.add("novembre-bleu");
            if (banner) {
                banner.classList.remove("d-none", "octobre-rose-banner");
                banner.classList.add("novembre-bleu-banner");
                banner.innerHTML = `
                    <a href="https://www.gustaveroussy.fr/fr/faire-un-don-contre-le-cancer-de-la-prostate" class="special-link" target="_blank" rel="noopener" aria-label="Faire un don contre le cancer de la prostate, ouvre un nouvel onglet">
                        🎗️ Le Judo Club de Juvisy soutient Movember pour la lutte contre les cancers masculins 🎗️
                    </a>
                `;
            }
        } else {
            if (baseRegular) setLogoBase(baseRegular);
            if (navbarBrand) navbarBrand.classList.remove("octobre-rose", "novembre-bleu");
            if (banner) {
                banner.classList.add("d-none");
                banner.classList.remove("octobre-rose-banner", "novembre-bleu-banner");
                banner.innerHTML = "";
            }
        }
    }
});

// ================== Fonction spécifique à la page certificat ==================
function initCertificatPage() {
    const certificatForm = document.getElementById("certificatForm");
    if (!certificatForm) return;

    const birthDateInput = document.getElementById("birthDate");
    const firstLicenseYes = document.getElementById("firstLicenseYes");
    const competitionYes = document.getElementById("competitionYes");

    if (!birthDateInput || !firstLicenseYes || !competitionYes) return;

    if (typeof flatpickr === "function") {
        flatpickr("#birthDate", {
            dateFormat: "d-m-Y",
            maxDate: "today",
            locale: "fr"
        });
    }

    certificatForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const birthDate = birthDateInput.value;
        const errorMessage = document.getElementById("errorMessage");

        if (!birthDate) {
            if (errorMessage) {
                errorMessage.textContent = "Veuillez entrer une date de naissance valide.";
                errorMessage.classList.remove("d-none");
            }
            return;
        }

        if (errorMessage) {
            errorMessage.classList.add("d-none");
        }

        const birthDateObj = new Date(birthDate.split("-").reverse().join("-"));
        const age = calculateAge(birthDateObj);
        const isFirstLicense = firstLicenseYes.checked;
        const isCompetition = competitionYes.checked;

        showResults(age, birthDateObj, isFirstLicense, isCompetition);
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
        const verbBirthdayElem = document.getElementById("verbBirthday");
        const valueBirthdayElem = document.getElementById("valueBirthday");
        const verbAgeElem = document.getElementById("verbAge");
        const valueAgeElem = document.getElementById("valueAge");
        const reasonCertificatElem = document.getElementById("reasonCertificat");
        const resultsDiv = document.getElementById("results");

        if (!verbBirthdayElem || !valueBirthdayElem || !verbAgeElem || !valueAgeElem || !reasonCertificatElem || !resultsDiv) {
            console.error("Un ou plusieurs éléments requis sont manquants sur la page certificat.");
            return;
        }

        const today = new Date();
        const currentYear = today.getFullYear();
        const birthDay = birthDateObj.getDate();
        const birthMonth = birthDateObj.getMonth();

        let birthdayThisYear = new Date(currentYear, birthMonth, birthDay);
        if (birthdayThisYear > today) {
            birthdayThisYear = new Date(currentYear - 1, birthMonth, birthDay);
        }

        const formattedBirthdayThisYear = birthdayThisYear.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

        const nextAge = age + 1;
        const nextBirthday = new Date(birthDateObj);
        nextBirthday.setFullYear(currentYear);

        if (nextBirthday < new Date(`${currentYear}-09-01`)) {
            nextBirthday.setFullYear(currentYear + 1);
        }

        const startOfEligibility = new Date(`${currentYear}-09-01`);
        const endOfEligibility = new Date(`${currentYear + 1}-08-31`);

        let reasonCertificat;

        if (nextAge === 18 && nextBirthday >= startOfEligibility && nextBirthday <= endOfEligibility) {
            reasonCertificat = "Je dois fournir un certificat médical car j’aurai 18 ans entre le 1er septembre et le 31 août.";
        } else if (nextAge >= 30 && nextAge % 5 === 0 && nextBirthday >= startOfEligibility && nextBirthday <= endOfEligibility) {
            reasonCertificat = `Je dois fournir un certificat médical car j’aurai ${nextAge} ans entre le 1er septembre ${currentYear} et le 31 août ${currentYear + 1}.`;
        } else if (age < 18) {
            if (age === 17 && birthMonth < 8) {
                reasonCertificat = "Je dois fournir un certificat médical car j’aurai 18 ans avant le 31 août.";
            } else {
                reasonCertificat = "Je réponds au questionnaire de santé. Si toutes mes réponses sont NON, je fournis une attestation sur l'honneur.";
            }
        } else if (isFirstLicense && age >= 18) {
            reasonCertificat = "Je dois fournir un certificat médical datant de moins d'un an pour ma première inscription.";
        } else if (isCompetition && age >= 18) {
            reasonCertificat = "Je dois fournir un certificat médical car je participe à des compétitions de judo.";
        } else {
            reasonCertificat = "Je réponds au questionnaire de santé. Si toutes mes réponses sont NON, je fournis une attestation sur l'honneur.";
        }

        verbBirthdayElem.textContent = "était";
        valueBirthdayElem.textContent = formattedBirthdayThisYear;
        verbAgeElem.textContent = "ai";
        valueAgeElem.textContent = `eu ${age} ans`;
        reasonCertificatElem.textContent = reasonCertificat;
        resultsDiv.classList.remove("d-none");
    }
}

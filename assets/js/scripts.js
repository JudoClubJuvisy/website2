document.addEventListener("DOMContentLoaded", function () {
    // Met à jour l'année actuelle dans le footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Récupère l'URL actuelle
    const currentUrl = window.location.pathname;

    // Correspondance entre l'URL et l'ID du lien de navigation
	const navItems = {
		"/index.html": "nav-home",
		"/le-club.html": "nav-club",
		"/inscription.html": "nav-inscription",
		"/entrainements.html": "nav-entrainements",
		"/competitions.html": "nav-competitions",
		"/boutique.html": "nav-boutique",
		"/contact.html": "nav-contact"
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
});

// Fonction spécifique à la page certificat
function initCertificatPage() {
    const birthDateInput = document.getElementById('birthDate');
    const firstLicenseYes = document.getElementById('firstLicenseYes');
    const competitionYes = document.getElementById('competitionYes');
    const resultsDiv = document.getElementById('results');

    // Initialise Flatpickr pour le champ de date
    flatpickr("#birthDate", {
        dateFormat: "d-m-Y", // Format jour-mois-année
        maxDate: "today", // Limiter la date sélectionnée à aujourd'hui
        locale: "fr" // Paramétrer en français
    });

    document.getElementById('certificatForm').addEventListener('submit', function (e) {
        e.preventDefault();

        let birthDate = birthDateInput.value;  // Récupère la date directement comme une chaîne
        console.log("Date de naissance entrée : ", birthDate);

        if (!birthDate) {
            let errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = "Veuillez entrer une date de naissance valide.";
            errorMessage.classList.remove('d-none');
        } else {
            document.getElementById('errorMessage').classList.add('d-none');

            // Convertit la date en un objet Date
            const birthDateObj = new Date(birthDate.split('-').reverse().join('-')); // Convertit "JJ-MM-AAAA" en "AAAA-MM-JJ"
            const age = calculateAge(birthDateObj);
            const isFirstLicense = firstLicenseYes.checked;
            const isCompetition = competitionYes.checked;

            console.log("Date de naissance : ", birthDateObj);
            console.log("Âge calculé : ", age);

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

        // Calculer l'anniversaire pour l'année en cours
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
        // Logique pour les mineurs (- de 18 ans)
        else if (age < 18) {
            if (age === 17 && birthMonth < 8) {
                reasonCertificat = "Je dois fournir un certificat médical car j’aurai 18 ans avant le 31 août.";
            } else {
                reasonCertificat = "Je réponds au questionnaire de santé. Si toutes mes réponses sont NON, je fournis une attestation sur l'honneur.";
            }
        } 
        // Logique pour les majeurs
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
        verbAgeElem.textContent = "ai";  // Correction ici pour "ai"
        valueAgeElem.textContent = `eu ${age} ans`;  // Correction ici pour "eu ... ans"
        reasonCertificatElem.textContent = reasonCertificat;
        resultsDiv.classList.remove('d-none');
    }
}

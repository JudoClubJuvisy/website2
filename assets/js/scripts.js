document.addEventListener("DOMContentLoaded", function () {
    // Met à jour l'année actuelle dans le footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Récupère l'URL actuelle
    const currentUrl = window.location.pathname;

    // Correspondance entre l'URL et l'ID du lien de navigation
    const navItems = {
        "/index.html": "nav-home",
        "/le-club.html": "nav-club",
        "/inscription.html": "nav-inscription",
        "/entrainements.html": "nav-entrainements",
        "/competitions.html": "nav-competitions",
        "/contact.html": "nav-contact"
    };

    // Récupérer l'ID correspondant à l'URL actuelle
    const activeNavId = navItems[currentUrl];

    // Si l'ID est trouvé, ajouter la classe 'active' au bon élément
    if (activeNavId) {
        document.getElementById(activeNavId).classList.add("active");
    }
});



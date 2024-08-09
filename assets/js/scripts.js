// Met à jour l'année actuelle dans le footer
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

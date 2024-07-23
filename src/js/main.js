// Import our custom CSS


// Import all of Bootstrap's JS
//import * as bootstrap from '/node_modules/bootstrap';

console.log("js loading");

// Écouteur d'événements pour le sélecteur de langue
document.getElementById('language_switcher').addEventListener('change', function() {
    var language = this.value;
    loadLanguageFile(language);
    localStorage.setItem('preferredLanguage', language);
});

// Fonction pour charger le fichier de langue
function loadLanguageFile(language) {
    fetch('language/' + language + '.json')
        .then(response => response.json())
        .then(data => updateContent(data))
        .catch(error => console.error('Error loading language file:', error));
}

// Fonction pour mettre à jour le contenu de la page
function updateContent(data) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = data[key];
            }
        }
    }
}

// Charger la langue préférée à la première visite
document.addEventListener('DOMContentLoaded', function() {
    var preferredLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    loadLanguageFile(preferredLanguage);
    document.getElementById('language_switcher').value = preferredLanguage;
});
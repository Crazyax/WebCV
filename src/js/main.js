// Import our custom CSS


// Import all of Bootstrap's JS
//import * as bootstrap from '/node_modules/bootstrap';

console.log("js loading");

// Écouteur d'événements pour le sélecteur de langue
document.addEventListener('DOMContentLoaded', () => {
    const selected_language = document.querySelector('#language_selected');
    const selected_flag = document.querySelector('#selected_flag');
    const items = document.querySelector('#language_dropdown');
    const options = items.querySelectorAll('div');

    selected_language.addEventListener('click'  , (e) => {
        e.stopPropagation();
        console.log("dropdown clicked");
        items.classList.toggle("select_hide");

        options.forEach(option => {
            if (option.getAttribute('language_value') == selected_language.getAttribute('language_value')){
                option.classList.add('select_hide');
            }
            else if (option.classList.contains('select_hide')){
                option.classList.remove('select_hide');
            }
        })
        
    })

    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log("some language selected");
            selected_flag.innerHTML = option.innerHTML;
            selected_language.setAttribute('language_value', option.getAttribute('language_value'));
            items.classList.add('select_hide');

            var language = option.getAttribute('language_value');
            loadLanguageFile(language);
            localStorage.setItem('preferredLanguage', language);
        })
    })
    
    document.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!e.target.matches('#language_selected')) {
            console.log("clicked outside dropdown");
            items.classList.add('select_hide');
        }
    });
    
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

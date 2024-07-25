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
    /*
    //fading out
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = document.getElementById(key);
            if (element) {
                element.classList.remove('fade-in');
                element.classList.add('fade-out');
            }
        }
    }
    console.log("fading out");

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = data[key];
            }
        }
    }

    //fading in again
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = document.getElementById(key);
            if (element) {
                element.classList.remove('fade-out');
                element.classList.add('fade-in');
            }
        }
    }
    console.log("fading in");
    */
    const textElements = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = document.getElementById(key);
            if (element) {
                textElements.push(element);
                element.classList.remove('fade-in');
                element.classList.add('fade-out');
            }
        }
    }

    // Wait for the fade-out transition to complete
    const handleTransitionEnd = () => {
        textElements.forEach(element => {
            element.textContent = data[element.id];
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        });

        // Remove the event listener after updating the content
        textElements.forEach(element => {
            element.removeEventListener('transitionend', handleTransitionEnd);
        });
    };

    textElements.forEach(element => {
        element.addEventListener('transitionend', handleTransitionEnd);
    });

}

//make the arrow shake when hover
document.addEventListener('DOMContentLoaded', () => {
    const hoverTarget = document.querySelector('#language_switcher_container');
    const shakingTarget = document.querySelector('.arrow');

    if (hoverTarget) {
        hoverTarget.addEventListener('mouseenter', () => {
            shakingTarget.classList.add('fa-shake');
        });

        hoverTarget.addEventListener('mouseleave', () => {
            shakingTarget.classList.remove('fa-shake');
        });
    }
});

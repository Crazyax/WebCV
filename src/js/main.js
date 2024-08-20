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


//carousel appearing
document.addEventListener('DOMContentLoaded', () => {
    const arcade_description = document.querySelector("#job2_description");
    const arcade_carousel = document.querySelector("#arcade_carousel_container");
    arcade_description.addEventListener("click", () => {
        arcade_carousel.classList.remove("select_hide");
    })

    document.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!e.target.closest("#arcade_carousel_container") && !e.target.closest("#job2_description")) {
            console.log("clicked outside carousel");
            arcade_carousel.classList.add("select_hide");
        }
    });

})

//carousel logic
console.log("carousel");
(function () {
    "use strict"
    const slideTimeout = 5000;
    const prev = document.querySelector("#prev");
    const next = document.querySelector("#next");
    const $slides = document.querySelectorAll(".slide");
    let $dots;
    let intervalId;
    let currentSlide = 0;

    //fonction pour afficher une slide spécifique
    function slideTo(index) {
        if (index == -1){ //appends when prev button is clicked on the first slide
            index = $slides.length - 1;
        }
        // Vérifie si l'index est valide (compris entre 0 et le nombre de slides - 1)
        currentSlide = index >= $slides.length || index < 1 ? 0 : index;

        $slides.forEach($elt => $elt.style.transform = `translateX(-${currentSlide * 100}%)`);
        $dots.forEach(($elt, key) => $elt.classList = `dot ${key === currentSlide? 'active': 'inactive'}`);
    }

    //fonction pour afficher la prochaine slide
    function showSlide() {
        slideTo(currentSlide); //rappel: numéro de slide commence à 1 mais index commence à 0
        currentSlide++;
    }

    //Boucle pour créer les dots en fonction du nombre de slides
    for(let i=1; i<=$slides.length; i++){
        console.log("dot created");
        let dotClass = i == currentSlide ? 'active' : 'inactive';
        let $dot = `<div class="dot ${dotClass}"></div>`;
        document.querySelector('.carousel_dots').innerHTML += $dot;
    }

    $dots = document.querySelectorAll(".dot");
    $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key)));
    prev.addEventListener('click', () => slideTo(--currentSlide));
    next.addEventListener('click', () => slideTo(++currentSlide));
    intervalId = setInterval(showSlide, slideTimeout);

    $slides.forEach($elt => {
        let startX;
        let endX;
        // Efface l'intervalle d'affichage des slides lorsque la souris passe sur un slide
        $elt.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        }, false)
        // Réinitialise l'intervalle d'affichage des slides lorsque la souris sort d'un slide
        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);
        // Enregistre la position initiale du toucher lorsque l'utilisateur touche un slide
        $elt.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });
        // Enregistre la position finale du toucher lorsque l'utilisateur relâche son doigt
        $elt.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            // Si la position initiale est plus grande que la position finale, affiche le prochain slide
            if (startX > endX) {
                slideTo(currentSlide + 1);
                // Si la position initiale est plus petite que la position finale, affiche le slide précédent
            } else if (startX < endX) {
                slideTo(currentSlide - 1);
            }
        });
    })

    const closing_cross = document.querySelector("#arcade_carousel_cross");
    const arcade_carousel = document.querySelector("#arcade_carousel_container");
    closing_cross.addEventListener("click", () => {
        arcade_carousel.classList.add("select_hide");
    });

})();
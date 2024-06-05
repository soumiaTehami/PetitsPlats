import { normalizeName, addTag } from './dropdown.js';
import { recipes } from '/data/recipes.js';

export function displayAllAppareils(filter = '') {
    let appareilList = document.getElementById('appareilList');
    if (appareilList) {
        appareilList.innerHTML = '';
        let appareils = getAllAppareils(recipes);
        let filterNormalized = normalizeName(filter);

        appareils = appareils.filter(appareil => normalizeName(appareil).includes(filterNormalized));

        for (let i = 0; i < appareils.length; i++) {
            let li = document.createElement('li');
            li.textContent = appareils[i];
            li.classList.add('appareil-tag');
            appareilList.appendChild(li);
            li.addEventListener('click', function() {
                addTag(appareils[i], 'appareil');
            });
        }

        if (appareilList.innerHTML === '') {
            let noMatchMessage = document.createElement('li');
            noMatchMessage.textContent = 'Aucun appareil correspondant trouvé.';
            noMatchMessage.classList.add('no-match-message');
            appareilList.appendChild(noMatchMessage);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search--Input');
    const clearSearch = document.querySelector('.clearsearch');
    const searchIcon = document.getElementById('searchIcon');

    searchInput.addEventListener('input', function() {
        let filter = this.value;
        clearSearch.style.display = this.value.length >= 1 ? 'block' : 'none';
        console.log('Input event fired. Filter:', filter);
        displayAllAppareils(filter);
    });

    clearSearch.addEventListener('click', function() {
        searchInput.value = '';
        clearSearch.style.display = 'none';
        console.log('Clear search button clicked.');
        displayAllAppareils('');
    });

    searchIcon.addEventListener('click', function() {
        let filter = searchInput.value;
        console.log('Click event fired. Filter:', filter);
        displayAllAppareils(filter);
    });
});

function getAllAppareils(recipes) {
    let appareils = new Set();

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let appareil = recipe.appliance;
        if (appareil && appareil.trim() !== "") {
            appareils.add(appareil.trim());
        }
    }

    return Array.from(appareils);
}

displayAllAppareils();

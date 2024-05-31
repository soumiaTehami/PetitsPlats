import {normalizeName,addTag} from './dropdown.js'
import { recipes } from '/data/recipes.js';
export function displayAllUstensiles(filter = '') {
    let ustensilesList = document.getElementById('ustensilesList');
    if (ustensilesList) {
        ustensilesList.innerHTML = '';
        let ustensiles = getAllUstensiles(recipes);
        let filterNormalized = normalizeName(filter);

        ustensiles = ustensiles.filter(ustensile => normalizeName(ustensile).includes(filterNormalized));

        for (let i = 0; i < ustensiles.length; i++) {
            let li = document.createElement('li');
            li.textContent = ustensiles[i];
            li.classList.add('ustensile-tag');
            ustensilesList.appendChild(li);
            li.addEventListener('click', function() {
                addTag(ustensiles[i], 'ustensile');
            });
        }

        if (ustensilesList.innerHTML === '') {
            let noMatchMessage = document.createElement('li');
            noMatchMessage.textContent = 'Aucun ustensile correspondant trouvé.';
            noMatchMessage.classList.add('no-match-message');
            ustensilesList.appendChild(noMatchMessage);
        }
    }
}
function getAllUstensiles(recipes) {
    let ustensiles = new Set();

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        if (recipe.ustensils && recipe.ustensils.length > 0) {
            for (let j = 0; j < recipe.ustensils.length; j++) {
                let ustensile = recipe.ustensils[j];
                if (ustensile && ustensile.trim() !== "") {
                    ustensiles.add(ustensile.trim());
                }
            }
        }
    }

    return Array.from(ustensiles);
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search---Input').addEventListener('input', function() {
        let filter = this.value;
        console.log('Input event fired. Filter:', filter);
        displayAllUstensiles(filter);
       
    });
    

    document.getElementById('searchIcon').addEventListener('click', function() {
        let filter = document.getElementById('search---Input').value;
        console.log('Click event fired. Filter:', filter);
        displayAllUstensiles(filter);
       
    });
});
displayAllUstensiles();

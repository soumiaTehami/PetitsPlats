
import { normalizeName, addTag } from './dropdown.js';
import { recipes } from '/data/recipes.js';

// Affichage des ingrédients filtrés
export function displayAllIngredients(filter = '') {
    console.log('Displaying ingredients with filter:', filter);
    let ingredientsList = document.getElementById('ingredientsList');
    if (ingredientsList) {
        ingredientsList.innerHTML = '';
        let seenIngredients = new Set();
        let filterNormalized = normalizeName(filter);

        if (Array.isArray(recipes)) {
            for (let i = 0; i < recipes.length; i++) {
                let recipe = recipes[i];
                for (let j = 0; j < recipe.ingredients.length; j++) {
                    let ingredient = recipe.ingredients[j].ingredient;
                    let normalizedIngredient = normalizeName(ingredient);
                    if (!seenIngredients.has(normalizedIngredient) && normalizedIngredient.includes(filterNormalized)) {
                        let li = document.createElement('li');
                        li.textContent = ingredient;
                        li.classList.add('ingredient-tag');
                        ingredientsList.appendChild(li);
                        seenIngredients.add(normalizedIngredient);
                        li.addEventListener('click', function() {
                            addTag(ingredient, 'ingredient');
                        });
                    }
                }
            }
        }

        if (ingredientsList.innerHTML === '') {
            let noMatchMessage = document.createElement('li');
            noMatchMessage.textContent = 'Aucun ingrédient correspondant trouvé.';
            noMatchMessage.classList.add('no-match-message');
            ingredientsList.appendChild(noMatchMessage);
        }
    } else {
        console.error('Element ingredientsList not found.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-Input');
    const clearSearch = document.querySelector('.clear-search');
    const searchIcon = document.getElementById('searchIcon');

    searchInput.addEventListener('input', function() {
        let filter = this.value;
        clearSearch.style.display = this.value.length >= 1 ? 'block' : 'none';
        console.log('Input event fired. Filter:', filter);
        displayAllIngredients(filter);
    });

    clearSearch.addEventListener('click', function() {
        searchInput.value = '';
        clearSearch.style.display = 'none';
        console.log('Clear search button clicked.');
        displayAllIngredients('');
    });

    searchIcon.addEventListener('click', function() {
        let filter = searchInput.value;
        console.log('Click event fired. Filter:', filter);
        displayAllIngredients(filter);
    });
});

displayAllIngredients();

import { recipes } from '/data/recipes.js';
import { displayAllIngredients } from './Ingredients.js';
import { displayAllAppareils } from './Appareils.js';
import { displayAllUstensiles } from './Ustensiles.js';
import { updateRecipeCount } from './updaterecette.js';
import { displayRecipeCardsWithForLoop, createRecipeCard } from './carte.js';
import{afficherCartesRecettes} from './bar-recherche.js'

let selectedIngredients = new Set();
let selectedAppareils = new Set();
let selectedUstensiles = new Set();

function toggleDropdown(contentId, chevronId) {
    let content = document.getElementById(contentId);
    let chevron = document.getElementById(chevronId);
    if (content) {
        if (content.style.display === "block") {
            content.style.display = "none";
            chevron.classList.remove('rotate');
        } else {
            content.style.display = "block";
            chevron.classList.add('rotate');
        }
    }
}

function afficherCartesRecettesFiltrees() {
    const recipeContainer = document.getElementById('recipeList');
    recipeContainer.innerHTML = '';

    const recipesFiltrees = rechercherRecettesParTags([...selectedIngredients], [...selectedAppareils], [...selectedUstensiles]);

    for (let i = 0; i < recipesFiltrees.length; i++) {
        const card = createRecipeCard(recipesFiltrees[i]);
        recipeContainer.appendChild(card);
    }
    updateRecipeCount();
}

// Normalisation des noms pour comparaison insensible à la casse et aux accents
export function normalizeName(name) {
    console.log('Normalizing name:', name);
    return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function addTag(item, type) {
    let selectedSet;
    if (type === 'ingredient') {
        selectedSet = selectedIngredients;
    } else if (type === 'appareil') {
        selectedSet = selectedAppareils;
    } else if (type === 'ustensile') {
        selectedSet = selectedUstensiles;
    }

    if (selectedSet.has(item)) {
        return; // Ne pas ajouter de doublons
    }

    let tagsContainer = document.getElementById('tagsContainer-' + type);
    let tag = document.createElement('div');
    tag.classList.add('selected-tag');
    
    let tagText = document.createElement('span');
    tagText.textContent = item;
    
    let closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    
    closeButton.addEventListener('click', function() {
        tagsContainer.removeChild(tag);
        selectedSet.delete(item);
        afficherCartesRecettesFiltrees();
    });
    
    tag.appendChild(tagText);
    tag.appendChild(closeButton);
    
    tagsContainer.appendChild(tag);
    
    selectedSet.add(item);
    afficherCartesRecettesFiltrees();
    console.log(`Tag ajouté: ${item}, Type: ${type}`);
}

function rechercherRecettesParTags(ingredients, appareils, ustensiles) {
    return recipes.filter(recipe => {
        let matchIngredients = ingredients.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient === tag));
        let matchAppareils = appareils.length === 0 || appareils.includes(recipe.appliance);
        let matchUstensiles = ustensiles.every(tag => recipe.ustensils.includes(tag));

        return matchIngredients && matchAppareils && matchUstensiles;
    });
}



document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('ingredientsButton').addEventListener('click', function() {
        toggleDropdown('ingredientsContent', 'ingredientsChevron');
        displayAllIngredients();
        updateRecipeCount();
    });

    document.getElementById('appareilsButton').addEventListener('click', function() {
        toggleDropdown('appareilsContent', 'appareilsChevron');
        displayAllAppareils();
        updateRecipeCount();
    });

    document.getElementById('ustensilesButton').addEventListener('click', function() {
        toggleDropdown('ustensilesContent', 'ustensilesChevron');
        displayAllUstensiles();
        updateRecipeCount();
    });

    let searchInput = document.getElementById('searchInput');
    let clearSearchBtn = document.querySelector('.clear-search-btn');

    searchInput.addEventListener('input', function(event) {
        const searchTerm = event.target.value.trim();
        clearSearchBtn.style.display = this.value.length >= 1 ? 'block' : 'none';

        if (searchTerm.length >= 3) {
            afficherCartesRecettes(searchTerm);
        } else {
            displayRecipeCardsWithForLoop(recipes);
        }
        updateRecipeCount();
    });

    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        displayRecipeCardsWithForLoop(recipes);
        updateRecipeCount();
    });
});

// Appel initial pour afficher toutes les cartes de recettes
displayRecipeCardsWithForLoop(recipes);
updateRecipeCount();

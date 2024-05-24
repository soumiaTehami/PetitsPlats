import { recipes } from '/data/recipes.js';
import { createRecipeCard } from './carte.js';

let selectedIngredients = new Set();

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

function normalizeName(name) {
    return name.toLowerCase().trim();
}



function afficherCartesRecettesFiltrees() {
    const recipeContainer = document.getElementById('recipeList');
    recipeContainer.innerHTML = '';

    const recipesFiltrees = rechercherRecettesParTags([...selectedIngredients]);

    for (let i = 0; i < recipesFiltrees.length; i++) {
        const card = createRecipeCard(recipesFiltrees[i]);
        recipeContainer.appendChild(card);
    }
}

function displayAllIngredients() {
    let ingredientsList = document.getElementById('ingredientsList');
    if (ingredientsList) {
        ingredientsList.innerHTML = '';
        let seenIngredients = new Set();
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                let ingredient = recipe.ingredients[j].ingredient;
                let normalizedIngredient = normalizeName(ingredient);
                if (!seenIngredients.has(normalizedIngredient)) {
                    let li = document.createElement('li');
                    li.textContent = ingredient;
                    li.classList.add('ingredient-tag');
                    ingredientsList.appendChild(li);
                    seenIngredients.add(normalizedIngredient);
                    li.addEventListener('click', function() {
                        addTag(ingredient);
                    });
                }
            }
        }
    }
}

function addTag(ingredient) {
    if (selectedIngredients.has(ingredient)) {
        return; // Ne pas ajouter de doublons
    }

    let tagsContainer = document.getElementById('tagsContainer');
    
    let tag = document.createElement('div');
    tag.classList.add('selected-tag');
    
    let tagText = document.createElement('span');
    tagText.textContent = ingredient;
    
    let closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    
    closeButton.addEventListener('click', function() {
        tagsContainer.removeChild(tag);
        selectedIngredients.delete(ingredient);
        afficherCartesRecettesFiltrees();
    });
    
    tag.appendChild(tagText);
    tag.appendChild(closeButton);
    
    tagsContainer.appendChild(tag);
    
    selectedIngredients.add(ingredient);
    afficherCartesRecettesFiltrees();
}

function rechercherRecettesParTags(tags) {
    return recipes.filter(recipe => {
        return tags.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient === tag));
    });
}

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

function displayAllAppareils() {
    let appareilList = document.getElementById('appareilList');
    if (appareilList) {
        appareilList.innerHTML = '';
        let appareils = getAllAppareils(recipes);

        for (let i = 0; i < appareils.length; i++) {
            let li = document.createElement('li');
            li.textContent = appareils[i];
            li.classList.add('appareil-tag');
            appareilList.appendChild(li);
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

function displayAllUstensiles() {
    let ustensilesList = document.getElementById('ustensilesList');
    if (ustensilesList) {
        ustensilesList.innerHTML = '';
        let ustensiles = getAllUstensiles(recipes);

        for (let i = 0; i < ustensiles.length; i++) {
            let li = document.createElement('li');
            li.textContent = ustensiles[i];
            li.classList.add('ustensile-tag');
            ustensilesList.appendChild(li);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('ingredientsButton').addEventListener('click', function() {
        toggleDropdown('ingredientsContent', 'ingredientsChevron');
        displayAllIngredients();
    });

    document.getElementById('appareilsButton').addEventListener('click', function() {
        toggleDropdown('appareilsContent', 'appareilsChevron');
        displayAllAppareils();
    });

    document.getElementById('ustensilesButton').addEventListener('click', function() {
        toggleDropdown('ustensilesContent', 'ustensilesChevron');
        displayAllUstensiles();
    });
});

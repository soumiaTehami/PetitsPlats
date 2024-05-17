import { recipes } from '/data/recipes.js';

function toggleDropdown(listId) {
    let content = document.getElementById(listId);
    if (content) {
        let chevron = content.parentElement.querySelector('.fa-chevron-down');
        if (chevron) {
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
    
            }
        }
    }
}

function normalizeIngredientName(name) {
    // Normalise le nom de l'ingrédient en le mettant en minuscules et en supprimant les espaces inutiles
    return name.toLowerCase().trim();
}

function displayAllIngredients() {
    let ingredientsList = document.getElementById('ingredientsList');
    if (ingredientsList) {
        ingredientsList.innerHTML = ''; // Efface la liste actuelle d'ingrédients
        let seenIngredients = new Set(); // Création de l'ensemble pour suivre les ingrédients déjà rencontrés

        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                let ingredient = recipe.ingredients[j].ingredient;
                let normalizedIngredient = normalizeIngredientName(ingredient);
                if (!seenIngredients.has(normalizedIngredient)) {
                    let li = document.createElement('li');
                    li.textContent = ingredient;
                    ingredientsList.appendChild(li);

                    // Ajoute l'ingrédient normalisé à l'ensemble des ingrédients rencontrés
                    seenIngredients.add(normalizedIngredient);
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Placez ici le code qui doit être exécuté lorsque le DOM est complètement chargé
    const dropdownButton = document.getElementById('dropdownButton');
    dropdownButton.addEventListener('click', function() {
        toggleDropdown('ingredientsList');
        displayAllIngredients(); // Appel de la fonction pour afficher les ingrédients
    });

    // Appel de la fonction toggleDropdown pour cacher la liste au chargement de la page
    toggleDropdown('ingredientsList');
});
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownContent = document.getElementById('dropdownContent');

    dropdownButton.addEventListener('click', function() {
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    });

    // Exemple pour ajouter dynamiquement des ingrédients à la liste
    const ingredients = [];
    const ingredientsList = document.getElementById('ingredientsList');

    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
});

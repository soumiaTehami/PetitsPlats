import { recipes } from '/data/recipes.js';

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

function displayAllIngredients() {
    let ingredientsList = document.getElementById('ingredientsList');
    if (ingredientsList) {
        ingredientsList.innerHTML = '';
        let seenIngredients = new Set();
  // Boucle sur toutes les recettes
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            // Boucle sur les ingrédients de chaque recette
            for (let j = 0; j < recipe.ingredients.length; j++) {
                let ingredient = recipe.ingredients[j].ingredient;
                 // Normalise le nom de l'ingrédient pour éviter les doublons
                let normalizedIngredient = normalizeName(ingredient);
                  // Si l'ingrédient n'a pas encore été vu, on l'ajoute à la liste
                if (!seenIngredients.has(normalizedIngredient)) {
                     // Crée un élément de liste HTML pour l'ingrédient
                    let li = document.createElement('li');
                    li.textContent = ingredient;
                    li.classList.add('ingredient-tag');
                    ingredientsList.appendChild(li);
                    seenIngredients.add(normalizedIngredient);
                    li.addEventListener('click', function() {
                        addTag(ingredient);
                    });
                    ingredientsList.appendChild(li);
                    seenIngredients.add(normalizedIngredient);
                }
                }
            }
        }
        function addTag(ingredient) {
            let tagsContainer = document.getElementById('tagsContainer');
        
            // Créer un conteneur pour le tag et le bouton de fermeture
            let tag = document.createElement('div');
            tag.classList.add('selected-tag');
        
            // Ajouter le texte de l'ingrédient au tag
            let tagText = document.createElement('span');
            tagText.textContent = ingredient;
        
            // Créer le bouton de fermeture
            let closeButton = document.createElement('button');
            closeButton.textContent = 'X';
            closeButton.classList.add('close-button');
        
            // Ajouter un écouteur d'événements pour le bouton de fermeture
            closeButton.addEventListener('click', function() {
                tagsContainer.removeChild(tag);
            });
        
            // Ajouter le texte et le bouton de fermeture au tag
            tag.appendChild(tagText);
            tag.appendChild(closeButton);
        
            // Ajouter le tag au conteneur des tags
            tagsContainer.appendChild(tag);
        }
        
        
        
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

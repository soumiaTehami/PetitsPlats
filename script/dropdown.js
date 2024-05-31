import { recipes } from '/data/recipes.js';
import { createRecipeCard } from './carte.js';

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
function normalizeName(name) {
    console.log('Normalizing name:', name);
    return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Affichage des ingrédients filtrés
function displayAllIngredients(filter = '') {
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



// Événement d'entrée sur le champ de recherche
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-Input').addEventListener('input', function() {
        let filter = this.value;
        console.log('Input event fired. Filter:', filter);
        displayAllIngredients(filter);
       
    });
    

    document.getElementById('searchIcon').addEventListener('click', function() {
        let filter = document.getElementById('search-Input').value;
        console.log('Click event fired. Filter:', filter);
        displayAllIngredients(filter);
       
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search--Input').addEventListener('input', function() {
        let filter = this.value;
        console.log('Input event fired. Filter:', filter);
        displayAllAppareils(filter);
       
    });
    

    document.getElementById('searchIcon').addEventListener('click', function() {
        let filter = document.getElementById('search--Input').value;
        console.log('Click event fired. Filter:', filter);
        displayAllAppareils(filter);
       
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search---Input').addEventListener('input', function() {
        let filter = this.value;
        console.log('Input event fired. Filter:', filter);
        displayAllAppareils(filter);
       
    });
    

    document.getElementById('searchIcon').addEventListener('click', function() {
        let filter = document.getElementById('search---Input').value;
        console.log('Click event fired. Filter:', filter);
        displayAllUstensiles(filter);
       
    });
});

// Initial display
displayAllIngredients();
displayAllAppareils();
displayAllUstensiles();



function displayAllAppareils(filter = '') {
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

function displayAllUstensiles(filter = '') {
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


    
function addTag(item, type) {
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
    // Utilise la méthode filter pour parcourir chaque recette dans la liste des recettes
    return recipes.filter(recipe => {
            // Vérifie si tous les ingrédients donnés (tags) sont présents dans la recette
        let matchIngredients = ingredients.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient === tag));
        // Vérifie si chaque ingrédient de la recette correspond à un tag d'ingrédient donné
        // Si la liste des appareils est vide, cela signifie qu'il n'y a pas de filtre sur les appareils
        let matchAppareils = appareils.length === 0 || appareils.includes(recipe.appliance);
        let matchUstensiles = ustensiles.every(tag => recipe.ustensils.includes(tag));

        return matchIngredients && matchAppareils && matchUstensiles;
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
});
 export function updateRecipeCount() {
    // Select the element that will display the number of recipes
    const recipesNumberElement = document.querySelector('.recipesNumber');
    
    // Select all .recipe-card elements
    const allRecipes = document.querySelectorAll('.recipe-card');
    const recipeContainer = document.getElementById('recipeList');
    // Get the search input value
  const searchInput = document.querySelector('#searchInput'); // Assuming there's an input with this ID
  const searchTerm = searchInput ? searchInput.value : 'XXX';
  
    // Update the .recipesNumber element with the number of recipes
    if (allRecipes.length === 0) {
        recipesNumberElement.textContent = ''; // Clear the previous count message if no recipes are found
        recipeContainer.innerHTML = `<p>Aucune recette ne contient ‘${searchTerm}’, vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
      } else if (allRecipes.length === 1) {
      recipesNumberElement.textContent = '1 recette';
    } else {
      recipesNumberElement.textContent = allRecipes.length + ' recettes';
    }
  }
  
  // Run the updateRecipeCount function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    updateRecipeCount();
  });
  
import { recipes } from '/data/recipes.js';
function afficherCartesRecettes(recipes) {
  for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      console.log(recipe);     
  }
}
// Appel de la fonction pour afficher les cartes de recettes
afficherCartesRecettes(recipes);
export function createRecipeCard(recipe) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('recipe-card');

    // Image de la recette
    const image = document.createElement('img');
    image.src = `assets/photos/${recipe.image}`;
    image.alt = recipe.name;
    image.classList.add('recipe-image');
    cardContainer.appendChild(image);
// Durée de la recette
const recipeDuration = document.createElement('span');
recipeDuration.classList.add('recipe-duration');
recipeDuration.textContent = `${recipe.time} min`; // Utilisation de recipe.time au lieu de juste "time"
cardContainer.appendChild(recipeDuration);

// Titre de la recette
const recipeTitle = document.createElement('p');
recipeTitle.textContent =recipe.name;
recipeTitle.classList.add('recipe-title');
cardContainer.appendChild(recipeTitle);
    // Titre "RECETTE"
const titlePara = document.createElement('p');
titlePara.textContent = 'RECETTE';
titlePara.classList.add('recipe-section-title');
cardContainer.appendChild(titlePara);

// Description de la recette
const descriptionPara = document.createElement('p');
descriptionPara.textContent = recipe.description; // Assure-toi que recipe.description est défini dans tes données de recette
descriptionPara.classList.add('recipe-descriptions');
cardContainer.appendChild(descriptionPara);
// Titre "INGRÉDIENTS"
const ingredientsTitle = document.createElement('p');
ingredientsTitle.textContent = 'INGRÉDIENTS';
ingredientsTitle.classList.add('recipe-section-title');
cardContainer.appendChild(ingredientsTitle);
 // Liste des ingrédients
const ingredientList = document.createElement('ul');
ingredientList.classList.add('recipe-ingredient-list');

for (let i = 0; i < recipe.ingredients.length; i++) {
    const ingredient = recipe.ingredients[i];
    const listItem = document.createElement('li');
    listItem.classList.add('ingredient'); // Ajouter la classe 'ingredient' à chaque élément de liste

    let text = '';

    if (ingredient.ingredient) {
        text += `<span class="IngredientsName">${ingredient.ingredient}</span>`;
    }

    if (ingredient.quantity || ingredient.unit) {
        text += `<span class="quantity-unit">`; // Ouvrir la balise <span> pour la quantité et l'unité
        
        if (ingredient.quantity) {
            text += `${ingredient.quantity}`;
        }

        if (ingredient.quantity && ingredient.unit) {
            text += ' '; // Ajouter un espace entre la quantité et l'unité si les deux sont présentes
        }

        if (ingredient.unit) {
            text += `${ingredient.unit}`;
        }
        
        text += `</span>`; // Fermer la balise <span> pour la quantité et l'unité
    }

    listItem.innerHTML = text;
    ingredientList.appendChild(listItem);
}

cardContainer.appendChild(ingredientList);

return cardContainer;


}   



// Fonction pour afficher les cartes de recette avec une boucle for
 export function displayRecipeCardsWithForLoop(recipes) {
    const recipeContainer = document.getElementById('recipeList');
    for (let i = 0; i < recipes.length; i++) {
        const card = createRecipeCard(recipes[i]);
        recipeContainer.appendChild(card);
    }
}

// Appel de la fonction pour afficher les cartes de recette
 displayRecipeCardsWithForLoop(recipes);


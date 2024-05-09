import { recipes } from '/data/recipes.js';
function afficherCartesRecettes(recipes) {
  for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      console.log("Recette: " + recipe.name);
      console.log("Ingrédients:");
      recipe.ingredients.forEach(ingredient => {
          if (ingredient.quantity && ingredient.unit) {
              console.log("- " + ingredient.ingredient + ": " + ingredient.quantity + " " + ingredient.unit);
          } else if (ingredient.quantity) {
              console.log("- " + ingredient.ingredient + ": " + ingredient.quantity);
          } else {
              console.log("- " + ingredient.ingredient);
          }
      });
      console.log("Nombre de parts: " + recipe.servings);
      console.log("\n");
  }
}
// Appel de la fonction pour afficher les cartes de recettes
afficherCartesRecettes(recipes);
function createRecipeCard(recipe) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('recipe-card');

    // Image de la recette
    const image = document.createElement('img');
    image.src = `assets/photos/${recipe.image}`;
    image.alt = recipe.name;
    image.classList.add('recipe-image');
    cardContainer.appendChild(image);
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
    for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredient = recipe.ingredients[i];
        const listItem = document.createElement('li');
        let text = ingredient.ingredient;
        if (ingredient.quantity) {
            text += `: ${ingredient.quantity}`;
            if (ingredient.unit) {
                text += ` ${ingredient.unit}`;
            }
        }
        listItem.textContent = text;
        ingredientList.appendChild(listItem);
    }
    cardContainer.appendChild(ingredientList);

    return cardContainer;
}



// Fonction pour afficher les cartes de recette avec une boucle for
function displayRecipeCardsWithForLoop(recipes) {
    const recipeContainer = document.getElementById('recipeList');
    for (let i = 0; i < recipes.length; i++) {
        const card = createRecipeCard(recipes[i]);
        recipeContainer.appendChild(card);
    }
}

// Appel de la fonction pour afficher les cartes de recette
displayRecipeCardsWithForLoop(recipes);


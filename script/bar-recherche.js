import { recipes } from '/data/recipes.js';
import {createRecipeCard } from './carte.js';
export function rechercherRecettes(term) {
    const termLowerCase = term.toLowerCase();
    const searchTerms = termLowerCase.split(' ');

    // Tableau pour stocker les recettes correspondantes
    const matchingRecipes = [];

    // Parcourir chaque recette
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const nameLowerCase = recipe.name.toLowerCase();
        const descriptionLowerCase = recipe.description.toLowerCase();

        // Vérifier si le nom de la recette contient le terme de recherche
        let nameMatch = nameLowerCase.includes(termLowerCase);

        // Vérifier si la description de la recette contient le terme de recherche
        let descriptionMatch = descriptionLowerCase.includes(termLowerCase);

        // Vérifier si un ingrédient contient la phrase complète
        let phraseMatch = false;
        for (let j = 0; j < recipe.ingredients.length; j++) {
            if (typeof recipe.ingredients[j] === 'string' && recipe.ingredients[j].toLowerCase().includes(termLowerCase)) {
                phraseMatch = true;
                break;
            }
        }

        // Vérifier si chaque mot du terme de recherche est présent dans les ingrédients
        let wordsMatch = true;
        for (let k = 0; k < searchTerms.length; k++) {
            let wordFound = false;
            for (let l = 0; l < recipe.ingredients.length; l++) {
                if (typeof recipe.ingredients[l] === 'string' && recipe.ingredients[l].toLowerCase().includes(searchTerms[k])) {
                    wordFound = true;
                    break;
                }
            }
            if (!wordFound) {
                wordsMatch = false;
                break;
            }
        }

        // Si l'une des conditions est remplie, ajouter la recette aux résultats
        if (nameMatch || descriptionMatch || phraseMatch || wordsMatch) {
            matchingRecipes.push(recipe);
        }
    }

    return matchingRecipes;
}

export function afficherCartesRecettes(term) {
    const recipeContainer = document.getElementById('recipeList');
    recipeContainer.innerHTML = '';

    const recipesFiltrees = rechercherRecettes(term);

    for (let i = 0; i < recipesFiltrees.length; i++) {
        const card = createRecipeCard(recipesFiltrees[i]);
        recipeContainer.appendChild(card);
    }
}
import { recipes } from '/data/recipes.js';
import {createRecipeCard } from './carte.js';
export function rechercherRecettes(term) {
    const termLowerCase = term.toLowerCase();
    const searchTerms = termLowerCase.split(' ');

    return recipes.filter(recipe => {
        const nameMatch = recipe.name.toLowerCase().includes(termLowerCase);
        const descriptionMatch = recipe.description.toLowerCase().includes(termLowerCase);
        const ingredientsMatch = searchTerms.every(searchTerm =>
            recipe.ingredients.some(ingredient =>
                typeof ingredient === 'string' && ingredient.toLowerCase().includes(searchTerm)
            )
        );

        return nameMatch || descriptionMatch || ingredientsMatch;
    });
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
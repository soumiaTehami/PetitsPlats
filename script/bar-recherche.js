import { recipes } from '/data/recipes.js';
import {displayRecipeCardsWithForLoop,createRecipeCard} from './carte.js';
// Fonction de recherche de recettes
function rechercherRecettes(term) {
    // Filtrer les recettes qui correspondent au terme de recherche
    return recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(term.toLowerCase()) ||
        recipe.description.toLowerCase().includes(term.toLowerCase()) 
        //recipe.ingredients.toLowerCase().includes(term.toLowerCase())
    
    );
}

// Fonction pour afficher les cartes de recettes filtrées
function afficherCartesRecettesFiltrees(term) {
    // Supprimer les anciennes cartes de recettes
    const recipeContainer = document.getElementById('recipeList');
    recipeContainer.innerHTML = '';

    // Récupérer les recettes filtrées
    const recipesFiltrees = rechercherRecettes(term);

    // Afficher les nouvelles cartes de recettes filtrées
    for (let i = 0; i < recipesFiltrees.length; i++) {
        const card = createRecipeCard(recipesFiltrees[i]);
        recipeContainer.appendChild(card);
    }
}

// Appel initial pour afficher toutes les cartes de recettes
//displayRecipeCardsWithForLoop(recipes);

// Ajouter un écouteur d'événement sur la barre de recherche
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function(event) {
    const searchTerm = event.target.value.trim();
    if (searchTerm.length >= 3) {
        afficherCartesRecettesFiltrees(searchTerm);
    } else {
        // Si le terme de recherche est trop court, afficher toutes les recettes
        displayRecipeCardsWithForLoop(recipes);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    let searchInput = document.getElementById('searchInput');
    let clearSearchBtn = document.querySelector('.clear-search-btn');

    // Afficher le bouton "X" lorsque le champ de recherche a du texte
    searchInput.addEventListener('input', function() {
        clearSearchBtn.style.display = this.value.length ? 'block' : 'none';
    });

    // Effacer le contenu du champ de recherche lorsqu'on clique sur le bouton "X"
    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        displayRecipeCardsWithForLoop(recipes);

    });
});
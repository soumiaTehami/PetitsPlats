export function updateRecipeCount() {
  // Sélectionner l'élément qui affichera le nombre de recettes
  const recipesNumberElement = document.querySelector('.recipesNumber');
  
  // Sélectionner tous les éléments .recipe-card
  const allRecipes = document.querySelectorAll('.recipe-card');
  const recipeContainer = document.getElementById('recipeList');
  
  // Obtenir la valeur de l'entrée de recherche
  const searchInput = document.querySelector('#searchInput'); // Supposons qu'il y ait un input avec cet ID
  const searchTerm = searchInput ? searchInput.value : 'XXX';
  
  // Mettre à jour l'élément .recipesNumber avec le nombre de recettes
  if (allRecipes.length === 0) {
      recipesNumberElement.textContent = ''; // Effacer le message de compte précédent si aucune recette n'est trouvée
      recipeContainer.innerHTML = `<p>Aucune recette ne contient ‘${searchTerm}’, vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
  } else if (allRecipes.length === 1) {
      recipesNumberElement.textContent = '1 recette';
  } else {
      recipesNumberElement.textContent = allRecipes.length + ' recettes';
  }
}

// Exécuter la fonction updateRecipeCount lorsque le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', function() {
  updateRecipeCount();
});


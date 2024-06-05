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
  
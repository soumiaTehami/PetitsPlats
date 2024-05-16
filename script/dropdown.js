import { recipes } from '/data/recipes.js';

function toggleDropdown(listId) {
    let content = document.getElementById(listId);
    if (content) {
        let chevron = content.parentElement.querySelector('.fa-chevron-down');
        if (chevron) {
            let computedStyle = window.getComputedStyle(content);

            if (computedStyle.display === "block") {
                content.style.display = "none";
                chevron.style.transform = "rotate(0deg)";
            } else {
                content.style.display = "block";
                chevron.style.transform = "rotate(180deg)";
            }
        }
    }
}

function displayAllIngredients() {
    let ingredientsList = document.getElementById('ingredientsList');
    if (ingredientsList) {
        ingredientsList.innerHTML = ''; // Efface la liste actuelle d'ingrédients
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                let ingredient = recipe.ingredients[j].ingredient;
                let li = document.createElement('li');
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
            }
           
        }
    }
    console.log(ingredientsList);
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

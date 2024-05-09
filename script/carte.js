if (Array.isArray(data)) {
    const conteneur = document.getElementById("recipeList");

    for (let i = 0; i < data.length; i++) {
      const recette = data[i];

      const carte = document.createElement("div");
      carte.classList.add("carte");

      const image = document.createElement("img");
      image.src = recette.image;
      carte.appendChild(image);

      const titre = document.createElement("h2");
      titre.textContent = recette.titre;
      carte.appendChild(titre);

      const instructions = document.createElement("p");
      instructions.textContent = recette.instructions;
      carte.appendChild(instructions);

      const listeIngredients = document.createElement("ul");
      for (let j = 0; j < recette.ingredients.length; j++) {
        const ingredient = recette.ingredients[j];
        const listItem = document.createElement("li");
        listItem.textContent = ingredient.quantite + " de " + ingredient.nom;
        listeIngredients.appendChild(listItem);
      }
      carte.appendChild(listeIngredients);

      conteneur.appendChild(carte);
    }
  } else {
    console.error('Les données récupérées ne sont pas au format attendu (tableau d\'objets).');
  }
})
.catch(error => {
  console.error('Une erreur s\'est produite lors de la récupération des données :', error);
});

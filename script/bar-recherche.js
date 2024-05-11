document.addEventListener("DOMContentLoaded", function() {
    // Sélection de l'élément de saisie
    var searchInput = document.getElementById("searchInput");

    // Ajout d'un écouteur d'événement "input"
    searchInput.addEventListener("input", function(event) {
        // Récupération de la valeur saisie
        var inputValue = event.target.value;

        // Vérification si la longueur de la valeur est supérieure ou égale à 3
        if (inputValue.length >= 3) {
            // Si oui, effectuez les actions souhaitées, par exemple :
            console.log("Au moins 3 caractères entrés : ", inputValue);
            // Vous pouvez appeler une fonction de recherche ici, par exemple :
            // searchRecipes(inputValue);
        } else {
            // Si non, vous pouvez réinitialiser les résultats de recherche précédents, par exemple :
            console.log("Moins de 3 caractères entrés");
            // resetSearchResults();
        }
    });
});

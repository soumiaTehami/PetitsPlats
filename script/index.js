// Définition de la fonction pour récupérer les données JSON
async function getDataJson() {
  try {
    const response = await fetch('data/recipes.json');
    if (!response.ok) {
      throw new Error('Erreur de chargement des données');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données :', error);
    return null;
  }
}

// Appel de la fonction pour récupérer les données et affichage dans la console
getDataJson()
  .then(data => {
    if (data) {
      console.log('Données récupérées avec succès :', data);
    } else {
      console.log('Aucune donnée n\'a été récupérée.');
    }
  });



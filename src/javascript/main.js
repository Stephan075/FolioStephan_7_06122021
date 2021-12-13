// récupérer notre élement
const searchInput = document.querySelector('#search')
const recipesSection = document.querySelector('.recipes')

// console.log(recipes)

// ici on crée le DOM pour afficher les recettes
const createRecipes = (recipes) => {
  // On récupére les recette 1/1
  const recipeElemDom = recipes.map((recipe) => {
    card(recipe)
  })
}

const filterRecipes = (recipes) => {
  // écouter l'évenement input

  searchInput.addEventListener('keydown', (e) => {
    const value = e.target.value
    // console.log(value);

    if (value.length > 2) {
      document.querySelector('.recipes').textContent = ''

      createRecipes(
        recipes.filter((recipe) => {
          return recipe.name.toLowerCase().includes(value.toLowerCase())
        })
      )

      createRecipes(
        recipes.filter((recipe) => {
          return recipe.ustensils.includes(value)
        })
      )

      /*
      createRecipes(
        recipes.filter((recipe) => {
          console.log(
            recipe.ingredients.map((ingredient) => {
              return ingredient.ingredient
            })
          )
          return recipe.ingredients
            .map((ingredient) => {
              return ingredient.ingredient
            })
            .includes(value)
        })
      )
      */
    }
  })
}

// init
const initPage = async () => {
  try {
    // liste des recettes
    // const recipes = await fetchRecipes()

    // Créer le DOM
    createRecipes(recipes)

    filterRecipes(recipes)
  } catch (e) {
    console.log('erreur :', e)
  }
}

initPage()

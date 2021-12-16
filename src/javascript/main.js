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

  searchInput.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase()
    // console.log(value)

    if (value.length > 2) {
      document.querySelector('.recipes').textContent = ''

      // recherche par nom
      createRecipes(
        recipes.filter((recipe) => {
          return recipe.name.toLowerCase().includes(value)
        })
      )

      // Recherche par description
      createRecipes(
        recipes.filter((recipe) => {
          return recipe.description.toLowerCase().includes(value)
        })
      )

      // Recherche par ingredient
      createRecipes(
        recipes.filter((recipe) => {
          const allIngredient = recipe.ingredients.map((el) => {
            // console.log('el : ' + el.ingredient)
            return el.ingredient
          })

          return (
            allIngredient.filter((item) => {
              // console.log(item.toLowerCase().includes(value))

              return item.toLowerCase().includes(value)
            }).length > 0
          )
        })
      )

      // Recherche par ustensils NOP
      createRecipes(
        recipes.filter((recipe) => {
          // console.log(value)
          return recipe.ustensils.includes(value)
        })
      )
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

    console.log(displayAllIngredients(recipes))
  } catch (e) {
    console.log('erreur :', e)
  }
}

initPage()

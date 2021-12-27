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

const createDropdown = (recipes) => {
  // On récupére les recette 1/1
  // const DropdownElemDom = recipes.map((recipe) => {
  //   dropdown(recipe)
  // })

  dropdown(recipes)
}

const filterRecipes = (recipes, e) => {
  // écouter l'évenement input

  console.log(recipes)
  const value = e.target.value.toLowerCase()
  console.log(listTags)

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
  } else {
    document.querySelector('.recipes').textContent =
      'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc'
  }
}

const filterSearch = (recipes, e) => {
  const filterInputIngredient = document.querySelector('#inputIngredients')
  // écouter l'évenement input
  // return console.log(filterInputIngredient)
  filterInputIngredient.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase()
    // console.log(value)

    if (value.length > 2) {
      // Recherche par ingredient
      if (!ingredientShow) {
        document.querySelector('.filter__custom-menu').remove()
        ingredientsList(
          getAllIngredients(recipes)
            .map((el) => {
              console.log(el)
              return el.includes(e.target.value) && el
            })
            // retir tout les false
            .filter((el) => {
              return el
            })
        )
        ingredientShow = true
      } else {
        // supprimer le toggle
        // document.querySelector('.filter__custom-menu').remove()
        ingredientShow = false
      }
    }
  })
}

const rechercheEnFonctionDesTags = (recipes, e) => {
  let tag = new Set()

  for (let current of listTags) {
    // recherche par appliance
    tag.add(
      recipes.filter((recipe) => {
        return recipe.appliance.toLowerCase().includes(current)
      })
    )

    // Recherche par ingredient
    if (!(tag.size > 0)) {
      let lavariable = [...tag].filter((el) => {
        return el.length > 0
      })
      lavariable = [...(lavariable[0] || [])]

      tag.add(
        lavariable.filter((recipe) => {
          const allIngredient = recipe.ingredients.map((el) => {
            // console.log('el : ' + el.ingredient)
            return el.ingredient
          })

          return (
            allIngredient.filter((item) => {
              // console.log(item.toLowerCase().includes(value))

              return item.toLowerCase().includes(current)
            }).length > 0
          )
        })
      )
    } else {
      tag.add(
        recipes.filter((recipe) => {
          const allIngredient = recipe.ingredients.map((el) => {
            // console.log('el : ' + el.ingredient)
            return el.ingredient
          })

          return (
            allIngredient.filter((item) => {
              // console.log(item.toLowerCase().includes(value))

              return item.toLowerCase().includes(current)
            }).length > 0
          )
        })
      )
    }

    // Recherche par ustensils NOP
    tag.add(
      recipes.filter((recipe) => {
        // console.log(value)
        return recipe.ustensils.includes(current)
      })
    )
  }
  filterRecipes(
    // [...tag].filter((el) => {
    //   return el.length > 0
    // })

    [
      // convertie le set en tab pour utiliser filter
      ...[...tag].filter((el) => {
        return el.length > 0
      })[0],
    ],
    e
  )
}

// init
const initPage = async () => {
  try {
    // liste des recettes
    // const recipes = await fetchRecipes()

    // Créer le DOM
    createRecipes(recipes)
    searchInput.addEventListener('keyup', (e) => {
      if (listTags.length > 0) {
        rechercheEnFonctionDesTags(recipes, e)
      } else {
        filterRecipes(recipes, e)
      }
    })

    createDropdown(recipes)
    getAllAppliance(recipes)
    filterSearch(recipes)
    getAllUstensils(recipes)

    // console.log(displayAllIngredients(recipes))
  } catch (e) {
    console.log('erreur :', e)
  }
}

initPage()

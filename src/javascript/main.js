// récupérer notre élement
const searchInput = document.querySelector('#search')
const recipesSection = document.querySelector('.recipes')

// ici on crée le DOM pour afficher les recettes
const createRecipes = (recipes) => {
  // On récupére les recette 1/1

  for (let i = 0; i < recipes.length; i++) {
    const element = recipes[i]
    card(element)
  }
  // recipes.map((recipe) => {
  //   console.log(recipe)
  //   card(recipe)
  // })
}

// géré les recherche de l'utilisateur sur le searchBar principale
const filterRecipes = (recipes, e) => {
  // écouter l'évenement input

  // console.log(recipes)
  const value = e.target.value.toLowerCase()
  // console.log(listTags)

  if (value.length > 2) {
    document.querySelector('.recipes').textContent = ''

    let result = []

    for (const cur of recipes) {
      const name = cur.name.toLowerCase()
      const desc = cur.description.toLowerCase()
      const ustensil = cur.ustensils

      for (const ingredient of cur.ingredients) {
        if (ingredient.ingredient.toLowerCase().includes(value)) {
          result.push(cur)
        }
      }
      if (name.includes(value)) {
        result.push(cur)
      } else if (desc.includes(value)) {
        result.push(cur)
      } else if (ustensil.includes(value)) {
        result.push(cur)
      }
    }
    // return
    if (result.length === 0) {
      document.querySelector('.recipes').textContent =
        'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc'
    }
    return createRecipes([...new Set(result)])
  }
}

const createDropdown = (recipes) => {
  dropdown(recipes)
}

// filter les élement au moment de la recherche du dropdown
const filterSearch = (recipes, e) => {
  // filter recherche sur le dropdown ingredients
  const filterInputIngredient = document.querySelector('#inputIngredients')

  filterInputIngredient.addEventListener('keyup', (e) =>
    manageTagsIngredient(e)
  )

  // filter recherche sur le dropdown appareils
  const filterInputAppareils = document.querySelector('#inputAppareils')
  // return console.log(filterInputIngredient)
  filterInputAppareils.addEventListener('keyup', (e) => manageTagsAppliance(e))

  // filter recherche sur le dropdown Ustensiles
  const filterInputUstensiles = document.querySelector('#inputUstensiles')
  // return console.log(filterInputIngredient)
  filterInputUstensiles.addEventListener('keyup', (e) => manageTagsUstensils(e))
}

const cardEnFonctionDesTagsSelectionner = (recipes) => {
  const filterCustomOptionlist = document.querySelectorAll('.filter__select')
  filterCustomOptionlist.forEach((item) => {
    item.addEventListener('click', (e) => {
      const filterCustomOptionItem = document.querySelectorAll(
        '.filter__custom-option'
      )
      for (const curr of filterCustomOptionItem) {
        curr.addEventListener('click', (e) => {
          // console.log(e.target.textContent)
          if (listTags.includes(e.target.textContent)) {
            for (let current of listTags) {
              document.querySelector('.recipes').textContent = ''
              // console.log('curr :', current)
              // console.log(manageFilter(recipes))
              // recherche par ingredients

              const filterIngredient = manageFilter(recipes).filter(
                (recipe) => {
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
                }
              )

              const filterAppliance = manageFilter(recipes).filter((recipe) => {
                return recipe.appliance.toLowerCase().includes(current)
              })

              const filterUstensils = manageFilter(recipes).filter((recipe) => {
                return recipe.ustensils.includes(current)
              })

              createRecipes(
                filterIngredient.length > 0
                  ? filterIngredient
                  : filterAppliance.length > 0
                  ? filterAppliance
                  : filterUstensils.length > 0
                  ? filterUstensils
                  : recipes
              )
            }
          }
        })
      }
    })
  })
}

// On recherche en fonction des tags choisis par l'utilisateurs
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
    // getAllAppliance(recipes)
    filterSearch(recipes)
    // getAllUstensils(recipes)

    // console.log(displayAllIngredients(recipes))
    cardEnFonctionDesTagsSelectionner(recipes)
  } catch (e) {
    console.log('erreur :', e)
  }
}

initPage()

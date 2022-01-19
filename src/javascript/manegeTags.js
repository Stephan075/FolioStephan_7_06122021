let ingredientShow = false
let applianceShow = false
let ustensilShow = false

let ingredientRest = []
let applianceRest = []
let ustensilRest = []

let recipesIngredientsRest = []
let recipesAppliancesRest = []
let recipesUstensilsRest = []

// Manager ingredien
const manageTagsIngredient = (e) => {
  const value = (e.target.textContent || e.target.value).toLowerCase()
  // console.log(ingredientRest)

  if (value.length > 1) {
    // Recherche par ingredient
    if (!ingredientShow || e.target.textContent) {
      document.querySelector('.filter__custom-menu').remove()
      // ingredien list affiche
      ingredientsList(
        ingredientRest.length > 0
          ? ingredientRest
          : getAllIngredients(recipes)
              .map((el) => {
                // console.log(el.includes(value))
                return el.includes(value) && el
              })
              // retir tout les false
              .filter((el) => {
                return el
              })
      )
      ingredientShow = true

      recipesIngredientsRest = recipes.filter((recipe) => {
        const allIngredient = recipe.ingredients.map((el) => {
          return el.ingredient
        })
        return (
          allIngredient.filter((item) => {
            // console.log('item', item)
            return (
              getAllIngredients(recipes)
                .map((el) => {
                  // console.log(el.includes(value))
                  return el.includes(value) && el
                })
                // retir tout les false
                .filter((el) => {
                  return el
                })
                .map((elmToLowerCase) => {
                  // console.log(elmToLowerCase)
                  return elmToLowerCase.toLowerCase()
                })
                .includes(item.toLowerCase())
            )
          }).length > 0
        )
      })
      // reste des Appareils
      funcApplianceRest(recipesIngredientsRest)
      // reste des Ustensils
      funcUstensilsRest(recipesIngredientsRest)
      // les ingredients qui reste
      funcIngredientsRest(recipesIngredientsRest)
    } else {
      ingredientShow = false
    }
  }
}

// Manager appareils
const manageTagsAppliance = (e) => {
  const value = (e.target.textContent || e.target.value).toLowerCase()
  // console.log(value)

  if (value.length > 1) {
    if (!applianceShow || e.target.textContent) {
      document.querySelector('.filter__custom-menu').remove()
      applianceList(
        applianceRest.length > 0
          ? applianceRest
          : getAllAppliance(recipes)
              .map((el) => {
                return el.includes(value) && el
              })
              // retir tout les false
              .filter((el) => {
                return el
              })
      )

      applianceShow = true

      recipesAppliancesRest = recipes.filter((recipe) => {
        const allAppliances = [recipe.appliance]

        return (
          allAppliances.filter((item) => {
            // console.log('item', item)
            return (
              getAllAppliance(recipes)
                .map((el) => {
                  // console.log(el.includes(value))
                  return el.includes(value) && el
                })
                // retir tout les false
                .filter((el) => {
                  return el
                })
                .map((elmToLowerCase) => {
                  // console.log(elmToLowerCase)
                  return elmToLowerCase.toLowerCase()
                })
                .includes(item.toLowerCase())
            )
          }).length > 0
        )
      })
      console.log(recipesAppliancesRest)

      // les ingredients qui reste
      funcIngredientsRest(recipesUstensilsRest)
      // reste des Appareils
      funcApplianceRest(recipesAppliancesRest)
      // ustensile TAG rest
      funcUstensilsRest(recipesAppliancesRest)
    } else {
      applianceShow = false
    }
  }
}

// Manager ustensils
const manageTagsUstensils = (e) => {
  const value = (e.target.textContent || e.target.value).toLowerCase()
  console.log(value)

  if (value.length > 1) {
    if (!ustensilShow || e.target.textContent) {
      document.querySelector('.filter__custom-menu').remove()
      ustensilList(
        ustensilRest.length > 0
          ? ustensilRest
          : getAllUstensils(recipes)
              .map((el) => {
                return el.includes(value) && el
              })
              // retir tout les false
              .filter((el) => {
                return el
              })
      )
      ustensilShow = true
      recipesUstensilsRest = recipes.filter((recipe) => {
        const allUstensil = recipe.ustensils.map((el) => {
          // liste de toutes les ustensils
          return el
        })
        return (
          allUstensil.filter((item) => {
            return (
              getAllUstensils(recipes)
                .map((el) => {
                  return el.includes(value) && el
                })
                // retir tout les false
                .filter((el) => {
                  return el
                })
                .map((elmToLowerCase) => {
                  console.log(elmToLowerCase)
                  return elmToLowerCase.toLowerCase()
                })
                .includes(item.toLowerCase())
            )
          }).length > 0
        )
      })

      // les ingredients qui reste
      funcIngredientsRest(recipesUstensilsRest)
      // Appareil filter rest
      funcApplianceRest(recipesUstensilsRest)
      // ustensile filter rest
      funcUstensilsRest(recipesUstensilsRest)
    } else {
      ustensilShow = false
    }
  }
}

const funcApplianceRest = (rest) => {
  return (applianceRest = [
    ...new Set(
      rest.map((elm) => {
        // console.log(elm.appliance.toLowerCase())
        return elm.appliance.toLowerCase()
      })
    ),
  ])
}

const funcUstensilsRest = (rest) => {
  let mesUstensils = []
  const listeDesUstensils = rest.map((elm) => {
    return elm.ustensils
  })

  // crée un autre tab pour les afficher à la suite
  for (const itemUstensil of listeDesUstensils) {
    for (const item of itemUstensil) {
      mesUstensils.push(item)
    }
  }
  ustensilRest = [...new Set(mesUstensils)]
}

const funcIngredientsRest = (rest) => {
  let mesIngredients = []
  const listeDesIngredients = rest.map((elm) => {
    return elm.ingredients.map((el) => {
      return el.ingredient.toLowerCase()
    })
  })

  // crée un autre tab pour les afficher à la suite
  for (const itemUstensil of listeDesIngredients) {
    for (const item of itemUstensil) {
      mesIngredients.push(item)
    }
  }
  ingredientRest = [...new Set(mesIngredients)]
}

const manageFilter = (recipes) => {
  // le resultat à envoyer à l'utilisateur
  // si il rentre pas dans le if il sera toujours recipes
  let result = recipes

  if (recipesIngredientsRest.length > 0) {
    result = recipesIngredientsRest
  }

  if (recipesAppliancesRest.length > 0) {
    if (result.length > recipesAppliancesRest.length) {
      result = recipesAppliancesRest
    }
  }

  if (recipesUstensilsRest.length > 0) {
    console.log(result.length)
    if (result.length > recipesUstensilsRest.length) {
      result = recipesUstensilsRest
    }
  }

  return result
}

// lossange = CSSConditionRule
// caré = action

// logique gére l'affichage

// Tenter de mettre des conditions pour que le champ appareil dépende de'un tag choisis dans ingrédient par exemple et n'affiche que les ustensils par rapport à la recette trouvée pour l'ingrédient

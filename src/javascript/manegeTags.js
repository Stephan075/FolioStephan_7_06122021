let ingredientShow = false
let applianceShow = false
let ustensilShow = false

let ingredientRest = []
let applianceRest = []
let ustensilRest = []

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
      let tpmRecipes = recipes.filter((recipe) => {
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
      applianceRest = [
        ...new Set(
          tpmRecipes.map((elm) => {
            // console.log(elm.appliance.toLowerCase())
            return elm.appliance.toLowerCase()
          })
        ),
      ]

      let mesUstensils = []
      const listeDesUstensils = tpmRecipes.map((elm) => {
        return elm.ustensils
      })

      // crée un autre tab pour les afficher à la suite
      for (const itemUstensil of listeDesUstensils) {
        for (const item of itemUstensil) {
          mesUstensils.push(item)
        }
      }
      ustensilRest = [...new Set(mesUstensils)]

      let mesIngredients = []
      const listeDesIngredients = tpmRecipes.map((elm) => {
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
    } else {
      ingredientShow = false
    }
  }

  // console.log(ingredientRest)
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
      let tmp = recipes.filter((recipe) => {
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

      // tag ingredients rest
      let mesIngredients = []
      const listeDesIngredients = tmp.map((elm) => {
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

      // ustensile TAG rest
      let mesUstensils = []
      const listeDesUstensils = tmp.map((elm) => {
        return elm.ustensils
      })

      // crée un autre tab pour les afficher à la suite
      for (const itemUstensil of listeDesUstensils) {
        for (const item of itemUstensil) {
          mesUstensils.push(item)
        }
      }
      ustensilRest = [...new Set(mesUstensils)]
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
      let tpmRecipes = recipes.filter((recipe) => {
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

      applianceRest = [
        ...new Set(
          tpmRecipes.map((elm) => {
            console.log(elm.appliance.toLowerCase())
            return elm.appliance.toLowerCase()
          })
        ),
      ]

      let mesIngredients = []
      const listeDesIngredients = tpmRecipes.map((elm) => {
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
    } else {
      ustensilShow = false
    }
  }
}
// lossange = CSSConditionRule
// caré = action

// logique gére l'affichage

// Tenter de mettre des conditions pour que le champ appareil dépende de'un tag choisis dans ingrédient par exemple et n'affiche que les ustensils par rapport à la recette trouvée pour l'ingrédient

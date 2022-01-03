let ingredientShow = false
let applianceShow = false
let ustensilShow = false

let ingredientRest = []
let applianceRest = []
let ustensilRest = []

const manageTagsIngredient = (e) => {
  console.log(e.target.textContent)
  const value = (e.target.textContent || e.target.value).toLowerCase()
  // console.log(value)

  if (value.length > 1) {
    // Recherche par ingredient
    console.log('test')
    console.log(ingredientShow)
    if (!ingredientShow || e.target.textContent) {
      document.querySelector('.filter__custom-menu').remove()
      ingredientsList(
        getAllIngredients(recipes)
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
    } else {
      ingredientShow = false
    }
  }
}

// lossange = CSSConditionRule
// caré = action

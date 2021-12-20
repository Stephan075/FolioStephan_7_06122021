const getAllIngredients = (recipes) => {
  let ingredient = []

  const allIngredients = recipes.map((el) => {
    return el.ingredients.map((ingredient) => {
      return ingredient.ingredient.toLowerCase()
    })
  })

  // Supprimer les doublon
  for (const valeur of allIngredients) {
    for (const item of valeur) {
      ingredient.push(item)
    }
  }

  // Set pour supprimer les doublons en JavaScript avec la syntaxe spread de l’ECMAScript 6
  var uniqueingredient = [...new Set(ingredient)]

  return uniqueingredient
}

// liste appareil
const getAllAppliance = (recipes) => {
  let appliance = []

  const allAppliances = recipes.map((el) => {
    return el.appliance.toLowerCase()
  })

  for (const valeur of allAppliances) {
    appliance.push(valeur)
  }

  // Set pour supprimer les doublons en JavaScript avec la syntaxe spread de l’ECMAScript 6
  let uniqueAppliance = [...new Set(appliance)]

  // console.log(uniqueAppliance)

  return uniqueAppliance
}

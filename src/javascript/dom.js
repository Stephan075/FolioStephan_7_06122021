// Un menu
const card = (recipe) => {
  const recipeDom = document.createElement('article')
  recipeDom.className = 'recipe_card col-lg-4 mb-4'

  let image = document.createElement('img')
  image.src = './src/images/placeholder.jpg'
  image.className = 'card-img-top'
  image.setAttribute('alt', `image ${recipe.name}`)

  recipeDom.appendChild(image)

  let cardBody = document.createElement('div')
  cardBody.className = 'card-body'

  recipeDom.appendChild(cardBody)

  let recipeInfo = document.createElement('div')
  recipeInfo.className = 'recipe__info--first mb-2'

  cardBody.appendChild(recipeInfo)

  let cardTitle = document.createElement('h5')
  cardTitle.className = 'card-title'

  cardTitle.textContent = recipe.name

  recipeInfo.appendChild(cardTitle)

  let recipeIconAndTime = document.createElement('span')
  recipeIconAndTime.className = 'recipe__iconAndTime'

  let icon = document.createElement('i')
  icon.className = 'far fa-clock'
  recipeIconAndTime.appendChild(icon)
  recipeIconAndTime.textContent = recipe.time + ' min'

  recipeInfo.appendChild(recipeIconAndTime)

  let recipeInfoSecond = document.createElement('div')
  recipeInfoSecond.className = 'recipe__info--second'

  cardBody.appendChild(recipeInfoSecond)

  let divIngredients = document.createElement('div')
  divIngredients.className = 'ingredients'

  recipeInfoSecond.appendChild(divIngredients)

  let ingredientList = document.createElement('ul')
  ingredientList.className = 'list-inline ingredient__list'

  divIngredients.appendChild(ingredientList)

  // apl functon display ingredient
  // recipe.ingredients.map(itemIngredient)
  for (let ingredient of recipe.ingredients) {
    // itemIngredient(ingredient)
    ingredientList.appendChild(itemIngredient(ingredient))
  }

  let etape = document.createElement('p')
  etape.className = 'etape'
  etape.textContent = recipe.description

  recipeInfoSecond.appendChild(etape)

  document.querySelector('.recipes').appendChild(recipeDom)
}

const itemIngredient = (ingredient) => {
  let ingredientList = document.createElement('li')
  ingredientList.className = 'list-inline-item'

  // unit => Optionel
  ingredientList.textContent =
    ingredient.ingredient +
    ': ' +
    (ingredient.quantite || ingredient.quantity || ' ') +
    ' ' +
    (ingredient.unit || ' ')

  // console.log(ingredient)

  return ingredientList
}

// affichage tout recipes
const displayAllIngredients = (recipes) => {
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

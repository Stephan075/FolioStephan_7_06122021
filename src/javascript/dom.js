let ingredientShow = false
let applianceShow = false
let ustensilShow = false
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

const ingredientsList = (recipes) => {
  const filterSelect = document.querySelector('.filter__custom-select')

  // console.log(filterSelect)

  const listAllIngredients = recipes
  let arr = Object.values(listAllIngredients).sort()

  const filterCustomMenuList = document.createElement('ul')

  filterCustomMenuList.className = 'filter__custom-menu bg-primary'

  filterSelect.appendChild(filterCustomMenuList)

  for (const valeur of arr) {
    const filterCustomOptionItem = document.createElement('li')
    filterCustomOptionItem.className = 'filter__custom-option'
    filterCustomOptionItem.textContent = valeur

    // afficher les tags
    filterCustomOptionItem.addEventListener('click', displayTag)
    filterCustomMenuList.appendChild(filterCustomOptionItem)
  }
}

const applianceList = (recipes) => {
  // selectionner le bon elem du DOM
  const filterSelect = document.querySelectorAll('.filter__custom-select')[1]

  // console.log(filterSelect)

  const listAllAppliance = getAllAppliance(recipes).sort()

  const filterCustomMenuList = document.createElement('ul')

  filterCustomMenuList.className = 'filter__custom-menu bg-primary'

  filterSelect.appendChild(filterCustomMenuList)

  for (const valeur of listAllAppliance) {
    const filterCustomOptionItem = document.createElement('li')
    filterCustomOptionItem.className = 'filter__custom-option'
    filterCustomOptionItem.textContent = valeur

    filterCustomMenuList.appendChild(filterCustomOptionItem)
  }
}

const ustensilList = (recipes) => {
  // selectionner le bon elem du DOM
  const filterSelect = document.querySelectorAll('.filter__custom-select')[2]

  // console.log(filterSelect)

  const listAllUstensils = getAllUstensils(recipes).sort()

  const filterCustomMenuList = document.createElement('ul')

  filterCustomMenuList.className = 'filter__custom-menu bg-primary'

  filterSelect.appendChild(filterCustomMenuList)

  for (const valeur of listAllUstensils) {
    const filterCustomOptionItem = document.createElement('li')
    filterCustomOptionItem.className = 'filter__custom-option'
    filterCustomOptionItem.textContent = valeur

    filterCustomMenuList.appendChild(filterCustomOptionItem)
  }
}

const dropdown = (recipe) => {
  const dropdownName = {
    ing: 'Ingredients',
    app: 'Appareils',
    uss: 'Ustensiles',
  }

  const arr = Object.values(dropdownName)

  // console.log(arr)

  // liste dropName
  const drop = arr.map((item) => {
    console.log(`item ${item}`)
    const filterCustomSelect = document.createElement('div')
    filterCustomSelect.className = 'filter__custom-select'

    const filterSelect = document.createElement('input')
    filterSelect.className = 'filter__select bg-primary'
    filterSelect.addEventListener('click', (e) => {
      // console.log(e)
    })

    filterSelect.setAttribute('placeholder', item)
    filterSelect.setAttribute('type', 'text')
    filterSelect.setAttribute('aria-label', `Recherche par ${item}`)
    filterSelect.setAttribute('id', `input${item}`)

    filterCustomSelect.appendChild(filterSelect)

    const filterSpanCustomArrow = document.createElement('span')
    filterSpanCustomArrow.className = 'filter__custom-arrow'

    filterCustomSelect.appendChild(filterSpanCustomArrow)

    document.querySelector('.dropdowns').appendChild(filterCustomSelect)
  })

  // const input = document.querySelectorAll('.filter__select')

  document.querySelectorAll('.filter__select').forEach((item) => {
    item.addEventListener('click', (e) => {
      item.classList.toggle('filter__select--toggle')
      if (item.placeholder === 'Ingredients') {
        if (!ingredientShow) {
          ingredientsList(getAllIngredients(recipe))
          ingredientShow = true
        } else {
          // supprimer le toggle
          document.querySelector('.filter__custom-menu').remove()
          ingredientShow = false
        }
      } else if (item.placeholder === 'Appareils') {
        if (!applianceShow) {
          applianceList(recipe)
          applianceShow = true
        } else {
          document.querySelector('.filter__custom-menu').remove()
          applianceShow = false
        }
      } else {
        if (!ustensilShow) {
          ustensilList(recipe)
          ustensilShow = true
        } else {
          ustensilShow = false
          document.querySelector('.filter__custom-menu').remove()
        }

        console.log('test3')
      }
    })
  })

  /*
  const filterCustomSelect = document.createElement('div')
  filterCustomSelect.className = 'filter__custom-select'

  const filterSelect = document.createElement('input')
  filterSelect.className = 'filter__select bg-primary'

  filterSelect.setAttribute('placeholder', dropdownName.ing)
  filterSelect.setAttribute('type', 'text')

  filterCustomSelect.appendChild(filterSelect)

  const filterSpanCustomArrow = document.createElement('span')
  filterSpanCustomArrow.className = 'filter__custom-arrow'

  filterCustomSelect.appendChild(filterSpanCustomArrow)

  document.querySelector('.dropdowns').appendChild(filterCustomSelect)

  */

  // input.addEventListener('click', (e) => {
  //   console.log('click')
  // })

  // filterSelect.addEventListener('click', (e) => {
  //   let input = document.querySelector('.filter__select')

  //   input.classList.toggle('filter__select--toggle')

  //   console.log('click')
  // })

  // ingredientsList(recipe, filterCustomSelect)
  // ingredientsList(recipe)
  // console.log(displayAllAppliance(recipe))
}

const displayTag = (e) => {
  console.log(e.target.textContent)
}

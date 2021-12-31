let ingredientShow = false
let applianceShow = false
let ustensilShow = false
let listTags = []

// créer une seul card
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

// liste d'un indredient avec la quantité et l'unité
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

// affichage toutes les ingredients
const ingredientsList = (recipes) => {
  const filterSelect = document.querySelectorAll('.filter__custom-select')[0]
  // console.log(filterSelect)

  const listAllIngredients = recipes
  // console.log(recipes)
  // console.log('liste des ingredient restant :', listAllIngredients)
  let arr = Object.values(listAllIngredients).sort()

  const filterCustomMenuList = document.createElement('ul')

  filterCustomMenuList.className = 'filter__custom-menu bg-primary'
  filterCustomMenuList.setAttribute('id', `ingredientsList`)

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

// la liste des Appareils
const applianceList = (recipes) => {
  // selectionner le bon elem du DOM
  const filterSelect = document.querySelectorAll('.filter__custom-select')[1]

  const listAllAppliance = recipes

  const filterCustomMenuList = document.createElement('ul')

  filterCustomMenuList.className = 'filter__custom-menu bg-success'

  filterSelect.appendChild(filterCustomMenuList)

  for (const valeur of listAllAppliance) {
    // console.log('valeur : ', valeur)
    const filterCustomOptionItem = document.createElement('li')
    filterCustomOptionItem.className = 'filter__custom-option'
    filterCustomOptionItem.textContent = valeur

    // afficher les tags
    filterCustomOptionItem.addEventListener('click', displayTag)

    filterCustomMenuList.appendChild(filterCustomOptionItem)
  }
}

// la liste des ustensils
const ustensilList = (recipes) => {
  // selectionner le bon elem du DOM
  const filterSelect = document.querySelectorAll('.filter__custom-select')[2]

  const listAllUstensils = recipes

  const filterCustomMenuList = document.createElement('ul')

  filterCustomMenuList.className = 'filter__custom-menu bg-danger'

  filterSelect.appendChild(filterCustomMenuList)

  for (const valeur of listAllUstensils) {
    const filterCustomOptionItem = document.createElement('li')
    filterCustomOptionItem.className = 'filter__custom-option'
    filterCustomOptionItem.textContent = valeur

    // afficher les tags
    filterCustomOptionItem.addEventListener('click', displayTag)

    filterCustomMenuList.appendChild(filterCustomOptionItem)
  }
}

// Création du dropdown
const dropdown = (recipe) => {
  const dropdownName = {
    ing: { name: 'Ingredients', background: 'bg-primary' },
    app: { name: 'Appareils', background: 'bg-success' },
    uss: { name: 'Ustensiles', background: 'bg-danger' },
  }

  const arr = Object.values(dropdownName)

  // console.log(arr)

  // liste dropName
  const drop = arr.map((item) => {
    const filterCustomSelect = document.createElement('div')
    filterCustomSelect.className = 'filter__custom-select'

    const filterSelect = document.createElement('input')
    filterSelect.className = `filter__select ${item.background}`
    filterSelect.addEventListener('click', (e) => {
      // console.log(e)
    })

    filterSelect.setAttribute('placeholder', item.name)
    filterSelect.setAttribute('type', 'text')
    filterSelect.setAttribute('aria-label', `Recherche par ${item.name}`)
    filterSelect.setAttribute('id', `input${item.name}`)

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
          applianceList(getAllAppliance(recipe))
          applianceShow = true
        } else {
          document.querySelector('.filter__custom-menu').remove()
          applianceShow = false
        }
      } else {
        if (!ustensilShow) {
          ustensilList(getAllUstensils(recipe))
          ustensilShow = true
        } else {
          ustensilShow = false
          document.querySelector('.filter__custom-menu').remove()
        }
      }
    })
  })
}

// création d'un tag
const displayTag = (e) => {
  let tagDom = document.createElement('span')

  tagDom.className = 'badge tags bg-primary'
  tagDom.textContent = e.target.textContent

  let icon = document.createElement('i')
  icon.className = 'far fa-times-circle'
  icon.setAttribute('id', 'close')

  tagDom.appendChild(icon)

  document.querySelector('.search__tags').appendChild(tagDom)

  // console.log(e.target.textContent)
  listTags.push(e.target.textContent)

  // console.log(listTags)

  removeTag(e)
}

// Supprimer un tag au click
const removeTag = (e) => {
  const listTagsSelect = document.querySelectorAll('.tags')

  if (listTagsSelect !== null) {
    for (let i = 0; i < listTagsSelect.length; i++) {
      const closeTag = document.querySelectorAll('#close')
      console.log(`A l’index ${i} nous avons ${listTags[i]}`)
      // le TAG!
      closeTag[i].addEventListener('click', () => {
        listTags.splice(i, 1)
        listTagsSelect[i].remove()
        console.log(listTags)
      })
    }
  }
}

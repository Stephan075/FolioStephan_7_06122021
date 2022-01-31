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
  const arrow = document.querySelectorAll('.filter__custom-arrow', 'before')[0]
  // console.log(filterSelect)

  const listAllIngredients = recipes
  // console.log(recipes)
  // console.log('liste des ingredient restant :', listAllIngredients)
  let arr = Object.values(listAllIngredients)
    .map((item) => {
      return !listTags.includes(item) && item
    })
    .filter((flse) => {
      return flse
    })
    .sort()

  const filterCustomMenuList = document.createElement('ul')

  filterCustomMenuList.className = 'filter__custom-menu bg-primary'
  filterCustomMenuList.setAttribute('id', `ingredientsList`)

  filterSelect.appendChild(filterCustomMenuList)
  // console.log(arr)
  if (arr.length > 0) {
    for (const valeur of arr) {
      const filterCustomOptionItem = document.createElement('li')
      filterCustomOptionItem.className = 'filter__custom-option'
      filterCustomOptionItem.textContent = valeur

      // afficher les tags
      filterCustomOptionItem.addEventListener('click', (e) => {
        let value = 'bg-primary'
        displayTag(value, e)
        manageTagsIngredient(e)
        close_the_dropdown(arrow)
        ingredientShow = false
        document.querySelector('#inputIngredients').placeholder = 'Ingredients'
      })
      filterCustomMenuList.appendChild(filterCustomOptionItem)
    }
  }
}

// la liste des Appareils
const applianceList = (recipes) => {
  const arrow = document.querySelectorAll('.filter__custom-arrow', 'before')[1]
  // selectionner le bon elem du DOM
  const filterSelect = document.querySelectorAll('.filter__custom-select')[1]

  const listAllAppliance = recipes
    .map((item) => {
      return !listTags.includes(item) && item
    })
    .filter((flse) => {
      return flse
    })
    .sort()

  const filterCustomMenuList = document.createElement('ul')
  filterCustomMenuList.className = 'filter__custom-menu bg-success'

  filterSelect.appendChild(filterCustomMenuList)

  if (listAllAppliance.length > 0) {
    for (const valeur of listAllAppliance) {
      // console.log('valeur : ', valeur)
      const filterCustomOptionItem = document.createElement('li')
      filterCustomOptionItem.className = 'filter__custom-option'
      filterCustomOptionItem.textContent = valeur

      // afficher les tags
      filterCustomOptionItem.addEventListener('click', (e) => {
        let value = 'bg-success'
        displayTag(value, e)
        manageTagsAppliance(e)
        close_the_dropdown(arrow)
        applianceShow = false
        document.querySelector('#inputAppareils').placeholder = 'Appareils'
      })

      filterCustomMenuList.appendChild(filterCustomOptionItem)
    }
  }
}

// la liste des ustensils
const ustensilList = (recipes) => {
  const arrow = document.querySelectorAll('.filter__custom-arrow', 'before')[2]
  // selectionner le bon elem du DOM
  const filterSelect = document.querySelectorAll('.filter__custom-select')[2]

  const listAllUstensils = recipes
    .map((item) => {
      return !listTags.includes(item) && item
    })
    .filter((flse) => {
      return flse
    })
    .sort()

  const filterCustomMenuList = document.createElement('ul')

  filterCustomMenuList.className = 'filter__custom-menu bg-danger'

  filterSelect.appendChild(filterCustomMenuList)

  if (listAllUstensils.length > 0) {
    for (const valeur of listAllUstensils) {
      const filterCustomOptionItem = document.createElement('li')
      filterCustomOptionItem.className = 'filter__custom-option'
      filterCustomOptionItem.textContent = valeur

      // afficher les tags avec la bonne couleurs
      filterCustomOptionItem.addEventListener('click', (e) => {
        let value = 'bg-danger'
        displayTag(value, e)
        manageTagsUstensils(e)
        close_the_dropdown(arrow)
        ustensilShow = false
        document.querySelector('#inputUstensiles').placeholder = 'Ustensiles'
      })

      filterCustomMenuList.appendChild(filterCustomOptionItem)
    }
  }
}

// supprimer le dropdown et modifier la direction des arrow
const close_the_dropdown = (arrow) => {
  const filterSelect = document.querySelector('.filter__select--toggle')
  const filterCustom = document.querySelector('.filter__custom-menu')

  if (filterSelect !== null || filterCustom !== null) {
    filterSelect.classList.remove('filter__select--toggle')
    filterCustom.remove()
    arrow.style.transform = 'rotate(0deg)'
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

    filterSelect.setAttribute('placeholder', item.name)
    filterSelect.setAttribute('name', item.name)
    filterSelect.setAttribute('type', 'text')
    filterSelect.setAttribute('aria-label', `Recherche par ${item.name}`)
    filterSelect.setAttribute('id', `input${item.name}`)

    filterCustomSelect.appendChild(filterSelect)

    const filterSpanCustomArrow = document.createElement('span')
    filterSpanCustomArrow.className = 'filter__custom-arrow'

    filterCustomSelect.appendChild(filterSpanCustomArrow)

    document.querySelector('.dropdowns').appendChild(filterCustomSelect)
  })

  document.querySelectorAll('.filter__select').forEach((item) => {
    item.addEventListener('click', (e) => {
      const arrow = document.querySelectorAll('.filter__custom-arrow', 'before')
      item.classList.toggle('filter__select--toggle')

      if (item.name === 'Ingredients') {
        item.placeholder = 'Recherche un ingrédient'
        if (!ingredientShow) {
          ingredientsList(
            ingredientRest.length > 0
              ? ingredientRest
              : getAllIngredients(recipe)
          )
          ingredientShow = true
          arrow[0].style.transform = 'rotate(180deg)'
        } else {
          document.querySelector('#inputIngredients').placeholder =
            'Ingredients'
          const filter = document.querySelector('.filter__custom-menu')

          if (filter) filter.remove()

          ingredientShow = false
          arrow[0].style.transform = 'rotate(0deg)'
        }
      } else if (item.name === 'Appareils') {
        item.placeholder = 'Recherche un appareil'
        if (!applianceShow) {
          applianceList(
            applianceRest.length > 0 ? applianceRest : getAllAppliance(recipe)
          )
          // console.log(applianceRest)
          applianceShow = true
          arrow[1].style.transform = 'rotate(180deg)'
        } else {
          document.querySelector('.filter__custom-menu')?.remove()
          applianceShow = false
          arrow[1].style.transform = 'rotate(0deg)'
          document.querySelector('#inputAppareils').placeholder = 'Appareils'
        }
      } else if (item.name === 'Ustensiles') {
        // ustensilShow = false
        if (!ustensilShow) {
          item.placeholder = 'Recherche un ustensile'
          ustensilList(
            ustensilRest.length > 0 ? ustensilRest : getAllUstensils(recipe)
          )
          ustensilShow = true
          arrow[2].style.transform = 'rotate(180deg)'
        } else {
          ustensilShow = false
          arrow[2].style.transform = 'rotate(0deg)'

          document.querySelector('.filter__custom-menu').remove()
          document.querySelector('#inputUstensiles').placeholder = 'Ustensiles'
        }
      }
    })
  })
}

// création d'un tag
const displayTag = (value, e) => {
  let tagDom = document.createElement('span')

  let bgColor = value

  tagDom.className = `badge tags ${value}`
  tagDom.textContent = e.target.textContent

  let icon = document.createElement('i')
  icon.className = 'far fa-times-circle'
  icon.setAttribute('id', 'close')

  tagDom.appendChild(icon)

  document.querySelector('.search__tags').appendChild(tagDom)

  // console.log(e.target.textContent)
  listTags.push(e.target.textContent)

  removeTag(e)
}

// Supprimer un tag au click
const removeTag = (e) => {
  const listTagsSelect = document.querySelectorAll('.tags')

  if (listTagsSelect !== null) {
    for (let i = listTagsSelect.length - 1; i < listTagsSelect.length; i++) {
      const closeTag = document.querySelectorAll('#close')
      // le TAG!
      closeTag[i].addEventListener('click', () => {
        console.log(`A l’index ${i} nous avons ${listTags[i]}`)
        // console.log(i)
        listTagsSelect[i].remove()
        // listTags.splice(i, 1)
        listTags = listTags.filter((tag) => {
          return tag !== listTags[i]
        })
        console.log(listTags)
      })
    }
  }
}

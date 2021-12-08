const fetchRecipes = async () => {
  try {
    // récupérer la data
    const url = './src/javascript/data/recipes.json'
    const response = await fetch(url)

    if (response.status < 300) {
      return response.json()
    }
  } catch (e) {
    console.log('erreur :', e)
  }
}

// ici on crée le DOM pour afficher les recettes
const createRecipes = (recipes) => {
  const recipeList = recipes
  const recipeSection = document.querySelector('.recipes')
  // On récupére les recette 1/1
  const recipeElemDom = recipes.map((recipe) => {
    console.log(recipe)
    // Créer un article
    const recipeDom = document.createElement('article')

    recipeDom.classList.add('recipe_card', 'col-lg-4', 'mb-4')

    // structure html
    recipeDom.innerHTML = `
<img src=" ./src/images/placeholder.jpg" class="card-img-top" alt="image ${recipe.name}">
<div class="card-body">
<div class="recipe__info--first mb-2">
  <h5 class="card-title">${recipe.name}</h5>
  <span class="recipe__iconAndTime"><i class="far fa-clock"></i>${recipe.time} min</span>
</div>


<div class="recipe__info--second">
  <div class="ingredients">
    <ul class="list-inline ingredient__list">
      <li class="list-inline-item">
        Lait de coco: 400ml
      </li>
      <li class="list-inline-item">
        Jus de citron: 2
      </li>
      <li class="list-inline-item">
        Créme de coco: 4
      </li>
      <li class="list-inline-item">
        cuillères Sucre: 20g
      </li>
      <li class="list-inline-item">
        Glaçons: 2
      </li>
    </ul>
  </div>

  <div class="etape">
    Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et
    le
    sucre. Mixer jusqu'à avoir la consistence désirée
  </div>
</div>

</div>`
    return recipeDom
  })

  // On remet le DOM à 0
  recipeSection.innerHTML = ''

  recipeSection.append(...recipeElemDom)
}

const filterRecipes = (recipes) => {
  // récupérer notre élement
  let input = document.querySelector('#search')
  // const value = input.value

  // écouter l'évenement input
  input.addEventListener('input', (e) => {
    const value = e.target.value

    if (value.length > 2) {
      console.log(recipes)
    }
  })
}

// init
const initPage = async () => {
  try {
    // liste des recettes
    const recipes = await fetchRecipes()

    // Créer le DOM
    createRecipes(recipes)

    // filterRecipes(recipes)
  } catch (e) {
    console.log('erreur :', e)
  }
}

initPage()

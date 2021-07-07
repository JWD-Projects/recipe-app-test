class RecipeManager {
    // Properties 
    constructor(currentId = 0) {
        this.recipes = [];
        this.currentId = currentId;
      }


      // Add recipe method
      addRecipe(name, ingredients) {
         // increment id
    let id = this.currentId++;
    // push to recipes array
    this.recipes.push({
      id,
      name,
      ingredients
    });
    
      }

      // Render recipe html method
      render() {
          let recipeHtmlList = [];
          this.recipes.forEach(recipe => {
              let recipeHtml = `
              <tr class="recipe-table-row" data-recipe-id="${recipe.id}">
              <td>${recipe.name}</td>
              <td>${recipe.ingredients}</td>
              <td><button type="button" class="btn btn-danger delete-btn">Delete</button></td>
            </tr>
              `

              recipeHtmlList.push(recipeHtml);
          })
          let joinRecipeHtml = recipeHtmlList.join('\n');
          document.getElementById('table-body').innerHTML = joinRecipeHtml;
      }


  // Save Method
  save() {
    // Create a string for all recipes
    let recipesJson = JSON.stringify(this.recipes);
    // Store the string variable in local storage under key 'recipes'
    localStorage.setItem('recipes', recipesJson);
    // convert currentId to stirng
    let currentId = JSON.stringify(this.currentId);
    // Store the string variable in local storage under key 'currentId'
    localStorage.setItem('currentId', currentId);
  }

  // Load Method
  load() {
    // check if any recipes are saved or exists in localStorage, error will produce if its empty
    if (localStorage.getItem('recipes') !== null) {
      const recipesJson = localStorage.getItem('recipes');
      // Convert the recipiesJson string to an array and store it in this.recipes
      this.recipes = JSON.parse(recipesJson);
    }
    // check if the currentId is saved in localStorage
    if (localStorage.getItem('currentId') !== null) {
      const currentId = localStorage.getItem('currentId');
      //Convert the currentId to a number before storing in this.currentId
      this.currentId = Number(currentId);
    }
  }

  // Delete Recipe Method
      deleteRecipe(recipeId) {
        let newRecipes = [];
        this.recipes.forEach(recipe => {
          if (recipe.id !== recipeId) {
            newRecipes.push(recipe);
          }
        });
        this.recipes = newRecipes;

      }
}
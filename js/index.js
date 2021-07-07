// Create Recipe Manager instance
const recipeManager = new RecipeManager();
// Check local storge 
recipeManager.load();
// Render display on page
recipeManager.render();


// Element Selectors
const recipeName = document.getElementById('recipe');
const ingredients = document.getElementById('ingredients');
const recipeForm = document.getElementById('recipe-form');
const recipeList = document.getElementById('recipeList');
const closeBtn = document.querySelector('.btn-close');



// Clear form function
const clearForm = () => {
  // clear each input
  recipeName.value =
    ingredients.value =
      '';
};


// EVENT HANDLERS
// close button handler - clears the form on close
closeBtn.addEventListener('click', clearForm);

// submit form handler
recipeForm.addEventListener('submit', function (e) {
  e.preventDefault();
  // Get data from form
  const recipeValue = recipeName.value.trim();
  const ingredientsValue = ingredients.value.trim();

    recipeManager.addRecipe(recipeValue, ingredientsValue);
    recipeManager.save();
      // close modal after submit
      $('.btn-close').trigger('click');
    recipeManager.render();
    clearForm();
 
  
});



// Handler to delete a recipe
recipeList.addEventListener('click', event => {
  if (event.target.classList.contains('delete-btn')) {
    const parentRecipe = event.target.closest('.recipe-table-row');
    let recipeId = Number(parentRecipe.dataset.recipeId);
    recipeManager.deleteRecipe(recipeId);
    recipeManager.save();
    recipeManager.render();
  }
});
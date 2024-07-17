const APP_ID = '1032295443271607161';
const API_ENDPOINT = 'https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=' + APP_ID;

document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
});

function fetchCategories() {
    fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            displayCategories(data.result.large);
        })
        .catch(error => console.error('Error fetching categories:', error));
}

function displayCategories(categories) {
    const categoriesDiv = document.getElementById('categories');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.textContent = category.categoryName;
        categoryDiv.dataset.categoryId = category.categoryId;
        categoryDiv.addEventListener('click', () => fetchRecipes(category.categoryId));
        categoriesDiv.appendChild(categoryDiv);
    });
}

function fetchRecipes(categoryId) {
    const RECIPES_API_ENDPOINT = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${APP_ID}&categoryId=${categoryId}`;
    fetch(RECIPES_API_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.result);
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
    const recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = ''; // 以前の結果をクリア
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const img = document.createElement('img');
        img.src = recipe.foodImageUrl;
        img.alt = recipe.recipeTitle;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('recipe-content');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('recipe-title');
        titleDiv.textContent = recipe.recipeTitle;

        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('recipe-description');
        descriptionDiv.textContent = recipe.recipeDescription;

        recipeDiv.appendChild(img);
        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(descriptionDiv);
        recipeDiv.appendChild(contentDiv);

        recipeDiv.addEventListener('click', () => {
            window.open(recipe.recipeUrl, '_blank');
        });

        recipesDiv.appendChild(recipeDiv);
    });
}

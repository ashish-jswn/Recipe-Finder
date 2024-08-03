document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const ingredients = document.getElementById('ingredients').value;
    fetchRecipes(ingredients);
});

async function fetchRecipes(ingredients) {
    const apiKey = '2fd1b37b39a6cd289f882e76b784bdec'; // Replace with your actual API key
    const appId = '8c0b3f2b';   // Replace with your actual App ID (if required)
    const apiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(ingredients)}&app_id=${appId}&app_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        document.getElementById('results').innerHTML = 'Error fetching recipes.';
    }
}

function displayRecipes(recipes) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = '';

    if (recipes.length === 0) {
        resultsSection.innerHTML = 'No recipes found.';
        return;
    }

    recipes.forEach(hit => {
        const recipe = hit.recipe;
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';
        recipeDiv.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <h2>${recipe.label}</h2>
            <p>${recipe.ingredientLines.join(', ')}</p>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
        `;
        resultsSection.appendChild(recipeDiv);
    });
}

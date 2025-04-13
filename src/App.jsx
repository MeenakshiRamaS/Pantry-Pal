import { useState } from 'react';
import './App.css';
import axios from 'axios';
import RecipeCard from './Components/RecipeCard';
import Modal from './Components/RecipeModal';
import Login from './Components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ingredientInput, setIngredientInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [page, setPage] = useState(1); // To track the page number for pagination

  const getImageFromPexels = async (query) => {
    const API_KEY = 'tSDaPmQWr36LCAgW0lNLtXCDLpPNWZSMBkDWgNSvdAGuH15OSNFo89lS';
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: API_KEY,
        },
      });

      if (!response.ok) {
        console.error('Pexels API error:', response.statusText);
        return null;
      }

      const data = await response.json();
      const photo = data.photos[0];
      return photo?.src?.medium || null;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };

  const handleSearch = async () => {
    if (!ingredientInput.trim()) return;

    setIsLoading(true);
    setPage(1); // Reset page to 1 when searching for new ingredients

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful chef who suggests easy and quick recipes based on given ingredients.'
            },
            {
              role: 'user',
              content: `Suggest 12 college-friendly recipes using these ingredients: ${ingredientInput}. 
              Include the recipe title (variable name = "title"),
              a short description (variable name = "description"),
              list of ingredients customer provides they have (variable name = "ingredients_present"), 
              list of ingredients customer does not have (variable name = "missing_ingredients"),
              estimated cook time in minutes(variable name = "cook_time"),
              popularity (variable name = "likes"), and
              the full recipe for the dish (variable name = "recipe"). 
              Respond with ONLY valid JSON — no explanation or intro, just a JSON array of recipe objects.`
            }
          ],
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer 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`,
            'Content-Type': 'application/json'
          }
        }
      );

      const jsonText = response.data.choices[0].message.content;
      const recipesList = JSON.parse(jsonText);

      const recipesWithImages = await Promise.all(
        recipesList.map(async (recipe) => {
          const image = await getImageFromPexels(recipe.title);
          return { ...recipe, imageUrl: image };
        })
      );

      setRecipes(recipesWithImages);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch recipes from Groq:', err);
      setError('Failed to fetch recipes');
    } finally {
      setIsLoading(false);
    }
  };

  // Function for loading more recipes (12 more) when the button is clicked
  const handleLoadMore = async () => {
    if (!ingredientInput.trim()) return;

    setIsLoading(true);
    setPage(page + 1); // Increment the page number

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful chef who suggests easy and quick recipes based on given ingredients.'
            },
            {
              role: 'user',
              content: `Suggest 12 more college-friendly recipes using these ingredients: ${ingredientInput}. 
              Include the recipe title (variable name = "title"),
              a short description (variable name = "description"),
              list of ingredients customer provides they have (variable name = "ingredients_present"), 
              list of ingredients customer does not have (variable name = "missing_ingredients"),
              estimated cook time in minutes(variable name = "cook_time"),
              popularity (variable name = "likes"), and
              the full recipe for the dish (variable name = "recipe"). 
              Respond with ONLY valid JSON — no explanation or intro, just a JSON array of recipe objects.`
            }
          ],
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer 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`,
            'Content-Type': 'application/json'
          }
        }
      );

      const jsonText = response.data.choices[0].message.content;
      const recipesList = JSON.parse(jsonText);

      const recipesWithImages = await Promise.all(
        recipesList.map(async (recipe) => {
          const image = await getImageFromPexels(recipe.title);
          return { ...recipe, imageUrl: image };
        })
      );

      // Add new recipes while keeping only 12 at a time
      setRecipes((prevRecipes) => [...prevRecipes, ...recipesWithImages]);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch recipes from Groq:', err);
      setError('Failed to fetch recipes');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="App">
      <img src="/images/pantry_pal_logo.png" alt="Pandy" />
      <h1 style={{ fontFamily: "'ADLaM Display', sans-serif", color: 'rgba(124, 106, 10, 1)' }}>
        Pantry Pal
      </h1>
      <h2 style={{ fontFamily: "'ADLaM Display', sans-serif", color: 'rgba(99, 53, 27, 1)' }}>
        Your Friendly College Cooking Assistant!
      </h2>
      
      <div className="search-container">
        <input
          type="text"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          placeholder="e.g., tomato, cheese, pasta, etc... (comma separated)"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Profile Icon in the upper right corner */}
      <div className="profile-icon">
      <img src="/images/profile_icon.png" alt="Profile" />

      </div>

      {isLoading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}

      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            onClick={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>
      {recipes.length > 0 && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-btn">
            Load More Recipes
          </button>
        </div>
      )}
      <Modal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div>
  );
}

export default App;

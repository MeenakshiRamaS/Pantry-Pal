import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig'; // adjust the path if needed
import { collection, getDocs, query, where } from 'firebase/firestore';
import RecipeCard from './RecipeCard'; // Import RecipeCard component

function ProfilePage({ userName }) {
  const [likedRecipes, setLikedRecipes] = useState([]);
  console.log("name of recipe", likedRecipes.title);
  useEffect(() => {
    const fetchLikedRecipes = async () => {
      if (!auth.currentUser) return; // Check if the user is logged in
      const userId = auth.currentUser.uid;
      const q = query(collection(db, 'favorites'), where('userId', '==', userId));
      
      try {
        const querySnapshot = await getDocs(q);
        const likedRecipeTitles = querySnapshot.docs.map(doc => doc.data().title);
        setLikedRecipes(likedRecipeTitles); // Store only the liked recipe titles
      } catch (error) {
        console.error("Error fetching liked recipes:", error);
      }
    };

    fetchLikedRecipes();
  }, []);

  return (
    <div>
      <h1>{userName}'s Profile</h1>
      <h2>Liked Recipes</h2>
      <div className="recipes-grid">
        {likedRecipes.length > 0 ? (
          likedRecipes.map((recipeTitle, index) => (
            <RecipeCard key={index} title={recipeTitle} />
          ))
        ) : (
          <p>No liked recipes yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

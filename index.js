const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

app.use(cors());
app.use(express.json());

//app.use(express.static('static'));

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Function to fetch recipes filtered by cuisine from the database
async function filterByCuisine(cuisine) {
  let query = 'SELECT * FROM recipes WHERE cuisine = ?';
  let response = await db.all(query, [cuisine]);

  return { recipes: response };
}

//Endpoint 1: Fetch All Recipes by Cuisine
app.get('/recipes/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;

  try {
    const results = await filterByCuisine(cuisine);

    if (results.recipes.length === 0) {
      return res
        .status(404)
        .json({ message: 'No recipes found for cuisine : ' + cuisine });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Function to fetch recipes filtered by main ingredient from the database
async function filterByMainIngredient(main_ingredient) {
  let query = 'SELECT * FROM recipes WHERE main_ingredient = ?';
  let response = await db.all(query, [main_ingredient]);

  return { recipes: response };
}

//Endpoint 2: Fetch All Recipes by Main Ingredient
app.get('/recipes/main_ingredient/:main_ingredient', async (req, res) => {
  let main_ingredient = req.params.main_ingredient;

  try {
    const results = await filterByMainIngredient(main_ingredient);

    if (results.recipes.length === 0) {
      return res.status(404).json({
        message: 'No recipes found for main ingredient : ' + main_ingredient,
      });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Function to fetch recipes filtered by preparation time from the database
async function filterByPreparationTime(preparation_time) {
  let query = 'SELECT * FROM recipes WHERE preparation_time <= ?';
  let response = await db.all(query, [preparation_time]);

  return { recipes: response };
}

//Endpoint 3: Fetch All Recipes by Preparation Time
app.get('/recipes/preparation_time/:preparation_time', async (req, res) => {
  let preparation_time = parseInt(req.params.preparation_time);

  try {
    const results = await filterByPreparationTime(preparation_time);

    if (results.recipes.length === 0) {
      return res.status(404).json({
        message: 'No recipes found with preparation time : ' + preparation_time,
      });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Function to fetch recipes filtered by difficulty from the database
async function filterByDifficulty(difficulty) {
  let query = 'SELECT * FROM recipes WHERE difficulty = ?';
  let response = await db.all(query, [difficulty]);

  return { recipes: response };
}

//Endpoint 4: Fetch All Recipes by Difficulty
app.get('/recipes/difficulty/:difficulty', async (req, res) => {
  let difficulty = req.params.difficulty;

  try {
    const results = await filterByDifficulty(difficulty);

    if (results.recipes.length === 0) {
      return res.status(404).json({
        message: 'No recipes found with difficulty : ' + difficulty,
      });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Function to fetch recipes filtered by vegetarian status from the database
async function filterByVegetarian(vegetarian) {
  let query = 'SELECT * FROM recipes WHERE vegetarian = ?';
  let response = await db.all(query, [vegetarian]);

  return { recipes: response };
}

//Endpoint 5: Fetch All Recipes by Vegetarian Status
app.get('/recipes/vegetarian/:vegetarian', async (req, res) => {
  let vegetarian = req.params.vegetarian;

  try {
    const results = await filterByVegetarian(vegetarian);

    if (results.recipes.length === 0) {
      return res.status(404).json({
        message: 'No recipes found with vegetarian : ' + difficulty,
      });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

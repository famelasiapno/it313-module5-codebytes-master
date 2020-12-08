const EXECUTE = document.getElementById('execute-btn');

EXECUTE.addEventListener('click', populate);

function populate() {
    for (i = 0; i < 26; i++) { //loop through alphabet
        var letter = (i+10).toString(36);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`) //get list of meals based on first letter
            .then(response => response.json())
            .then(data => {
                if(data.meals !== null) {
                    data.meals
                    .map(meal => {
                        var ingredients = ingredientsToString(meal);
                        addToMealsTable(meal.idMeal, meal.strMeal, meal.strMealThumb, meal.strCategory, meal.strArea,
                            meal.strInstructions, ingredients);
                    });
                }
            });
    }
}

function ingredientsToString(meal) {
    var ingredients = "";
    var first = true;

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]){
            if (!first) { // to make sure no commas are added before the first value
                ingredients += (",");
            }
            ingredients += (`${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`);
            first = false; // set "first" as false for second to 19th iteration
        } else {
            break;
        }
    }

    return ingredients;
}

function addToMealsTable(mealID, mealName, thumbnailLink, category, area, instructions, ingredients) {
    console.log("attempting..")
    const data = new URLSearchParams();
    data.append("mealID", mealID);
    data.append("mealName", mealName);
    data.append("thumbnailLink", thumbnailLink);
    data.append("category", category);
    data.append("area", area);
    data.append("instructions", instructions);
    data.append("ingredients", ingredients);

    fetch('server.php', {
        method: 'POST',
        body: data
    }).then(response => response.text()).then(response => {
        document.getElementById('status').innerHTML = response;
    }).catch(error => console.log(error));
}
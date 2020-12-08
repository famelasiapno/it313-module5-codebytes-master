/** SEARCH & DISPLAY SEARCH FUNCTIONS
Contributor/s: Batara, Eloiza; Tomilas, Crystelle Hannah
Description: The following are the codes for searching a meal and displaying search results
It fetches meals from the API that match the search keywords. The fetched meals
are then displayed.
*/ 
const RESULT_MEALS = document.getElementById('result-meals');
const RESULT_TITLE = document.getElementById('result-title');
const SEARCH_BAR = document.getElementById('search-bar');
const SUBMIT_BUTTON = document.getElementById('search-btn');

SEARCH_BAR.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchMeal();
    }
});

SUBMIT_BUTTON.addEventListener('click', searchMeal);

function searchMeal() {
    SINGLE_MEAL.innerHTML = '';
    document.getElementById('default-message').innerHTML = '';
    var keywords = SEARCH_BAR.value;
    
    if (keywords.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keywords}`)
        .then(response => response.json())
        .then(data => {        
            if(data.meals === null) {
                RESULT_MEALS.innerHTML = '';
                RESULT_TITLE.innerHTML = `<h2>No results for ${keywords}.</h2>`;
            } else {
                displaySearches(data, keywords);
            }
        });
    } else {
        alert("Please input something on the search bar.");
    }
}

function displaySearches(data, keywords) {
    RESULT_TITLE.innerHTML = `<h2>Search results for ${keywords}:</h2>`;
    RESULT_MEALS.innerHTML = data.meals
    .filter(meal => filter(meal))
    .sort((a,b) => compareMeals(a,b))
    .map(meal => `
    <div class="display-result">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-thumbnail" meal-id="${meal.idMeal}"/>
        <h3>${meal.strMeal}</h3>
        <div class="meal-info">
            <p>Category: ${meal.strCategory}</p>
            <p>Area: ${meal.strArea}</br></p>
        </div>
    </div>
    `)
    .join('');
}

RESULT_MEALS.addEventListener('click', e => {
    e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('display-result');
        } else {
            return false;
        }
    }); 
});

/**SORT FUNCTIONS
Contributor/s: Siapno, Maria Famela; De Guzman, Ana
Description: The following are the codes for sorting the search results.
It generates options for a drop-down list and detects if the user
changed the sorting option. The selected option will then be used as 
a parameter for sorting the search results.
*/

const SORT_SELECT = document.getElementById('sort-select');
SORT_SELECT.addEventListener('change', searchMeal);

function compareMeals(a, b) {
    if (SORT_SELECT.value === 'area') {
        return (a.strArea > b.strArea)  ? 1 : (b.strArea > a.strArea) ? -1 : 0;
    } else if (SORT_SELECT.value === 'category') {
        return (a.strCategory > b.strCategory)  ? 1 : (b.strCategory > a.strCategory) ? -1 : 0;
    } else {
        return (a.strMeal > b.strMeal)  ? 1 : (b.strMeal > a.strMeal) ? -1 : 0;
    }
}

/** FILTER FUNCTIONS
Contributor/s: De Guzman, Ana; Siapno, Maria Famela; Tomilas, Crystelle Hannah
Description: The following codes are for the filtering of the search results.
The filter options are dynamically generated, fetched from a list provided by
the API. The selected filter options by the user will then be detected and
used to filter search results of meal area and category.
*/ 

const FILTER_AREA_CHECKBOX = document.getElementById('filter-area-checkbox');
const FILTER_CATEGORY_CHECKBOX = document.getElementById('filter-category-checkbox');
const SUMBIT_AREA_FILTER = document.getElementById('submit-area-filter');
const SUMBIT_CATEGORY_FILTER = document.getElementById('submit-category-filter');
const FILTER_BUTTON = document.getElementById('filter-btn');
const FILTER_AREA_TITLE = document.getElementById('filter-area-title');
const FILTER_CATEGORY_TITLE = document.getElementById('filter-category-title');

var filtersOpen = false;

FILTER_BUTTON.addEventListener('click', function(){
    if (filtersOpen) {
        FILTER_AREA_TITLE.innerHTML = '';
        FILTER_AREA_CHECKBOX.innerHTML = '';
        FILTER_CATEGORY_TITLE.innerHTML = '';
        FILTER_CATEGORY_CHECKBOX.innerHTML = '';
        filtersOpen = false;
    } else {
        FILTER_AREA_TITLE.innerHTML = `<p>Filter Area</p>`;
        addFilterOptions_Area();
        FILTER_CATEGORY_TITLE.innerHTML = `<p>Filter Category</p>`;
        addFilterOptions_Category();
        filtersOpen = true;
    }
});

function addFilterOptions_Area() {
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        .then(response => response.json())
        .then(data => {
            FILTER_AREA_CHECKBOX.innerHTML = data.meals
                .map(meal => `
                <div class="area-checkbox">
                    <input type="checkbox" id="${meal.strArea}" value="${meal.strArea}">
                    <label for="${meal.strArea}">${meal.strArea}</label><br>
                </div>
                `)
                .join('');
        });
}

function addFilterOptions_Category() {
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
        .then(response => response.json())
        .then(data => {
            FILTER_CATEGORY_CHECKBOX.innerHTML = data.meals
                .map(meal => `
                <div class="category-checkbox">
                    <input type="checkbox" id="${meal.strCategory}" value="${meal.strCategory}">
                    <label for="${meal.strCategory}">${meal.strCategory}</label><br>
                </div>
                `)
                .join('');
        });
}

function getCheckedAreas() {
    var elementChild = FILTER_AREA_CHECKBOX.firstElementChild;
    var parameters = new Array();
    for(i = 1; i < FILTER_AREA_CHECKBOX.childElementCount; i++) {
        elementChild = elementChild.nextElementSibling;
        var checkboxID = elementChild.firstElementChild.getAttribute("value");
        var checked = document.getElementById(checkboxID).checked;
        if (checked) {
            parameters.push(checkboxID);
        }
    }
    return parameters;
}

function getCheckedCategories() {
    var elementChild = FILTER_CATEGORY_CHECKBOX.firstElementChild;
    var parameters = new Array();
    for(i = 1; i < FILTER_CATEGORY_CHECKBOX.childElementCount; i++) {
        elementChild = elementChild.nextElementSibling;
        var checkboxID = elementChild.firstElementChild.getAttribute("value");
        var checked = document.getElementById(checkboxID).checked;
        if (checked) {
            parameters.push(checkboxID);
        }
    }
    return parameters;
}

function filter(meal) {
    var checkedAreas = getCheckedAreas();
    var checkedCategories = getCheckedCategories();

    var belongsToCheckedArea;
    var belongsToCheckedCategory;

    if (checkedAreas.length !== 0) {
        checkedAreas.forEach(area => {
            if(meal.strArea == area) {
                belongsToCheckedArea = true;
            }
        });
    } else belongsToCheckedArea = true; //if no areas have been checked

    if (checkedCategories.length !== 0) {
        checkedCategories.forEach(category => {
            if(meal.strCategory == category) {
                belongsToCheckedCategory = true;
            }
        });
    } else belongsToCheckedCategory = true; //if no categories have been checked

    return belongsToCheckedArea && belongsToCheckedCategory;
}

/** RANDOM MEAL & DISPLAY SINGLE MEAL FUNCTIONS
// Contributor/s: Diaz, Jonathan
// Description: The following codes are for the generation of random meal and
displaying of a single meal. The random meal is fetched from the API, which
is displayed as a single meal. Meals that are selected from the search results are
displayed as a single meal as well. This is done by getting the meal ID and fetching
the meal information from the API.
*/ 

RESULT_MEALS.addEventListener('click', e => {
    var mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-thumbnail');
        } else {
            return false;
        }
    });
    if (mealInfo) {
        var mealID = mealInfo.getAttribute('meal-id');
        getMealById(mealID);
    }
});

function getMealById(displayResult) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${displayResult}`)
        .then(results => results.json())
        .then(data => {
            var meal = data.meals[0];
            addMealToDOM(meal); 
        })
}

const RANDOM_LINK = document.getElementById('random-meal-link');
const SINGLE_MEAL = document.getElementById('single-meal');
var ingredients = [];

RANDOM_LINK.addEventListener('click', randomMeal);

function randomMeal (){
    RESULT_MEALS.innerHTML = '';
    RESULT_TITLE.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then (res => res.json())
    .then (data => {
        var meal = data.meals[0];
        addMealToDOM(meal); 
    })
}

function addMealToDOM(meal) {
    RESULT_TITLE.innerHTML = '';
    RESULT_MEALS.innerHTML = '';
    document.getElementById('default-message').innerHTML = '';
    ingredients = []

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]} `);
        } else {
            break;
        }
    }

    SINGLE_MEAL.innerHTML = `
        <div class="single-meal-container">
            <h1>${meal.strMeal}</h1>
            <div class="single-meal-info">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                ${meal.strCategory ? `<p><span>Category: ${meal.strCategory}</span></p>` : ''}
                ${meal.strArea ? `<p><span> Area: ${meal.strArea}</p></span>` : ''}
            </div>
            <div class="main">
                <div class="ingredients">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h2>Ingredients</h2>
                    <ul value="${ingredients}">
                        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul> 
                </div>  
                <button id="nutrition-btn">Get Nutrition Facts</button>        
            </div>
        </div>
    `;
}

/** NUTRITION FUNCTIONS
Contributor/s: Batara, Eloiza; Tomilas, Crystelle Hannah
Description: The following codes are for the nutrition facts of a meal.
The final displayed nutrition facts are computed by adding the relevant
nutrition details  of each ingredient in the meal. These data are provided
by the Edamam Nutrition Analysis API.
*/ 

document.addEventListener('click', async function(e){
    if(e.target.id == 'nutrition-btn') {
        SINGLE_MEAL.innerHTML += `
        <div id="please-wait">
            <p>We are now crunching some numbers. Please wait for a few seconds...</p>
        </div>
    `;

    const PLEASE_WAIT = document.getElementById('please-wait');

    var nutrientDet = {calories: 0, totalFat: 0, satFat: 0, transFat: 0, cholesterol: 0, sodium: 0, 
        totalCarb: 0, fiber: 0, sugar: 0, protein: 0, vitaminD: 0, calcium: 0, iron: 0, potassium: 0};
    
    for(var i = 0; i < ingredients.length; i++) {
        var uri = stringToURI(ingredients[i]);
        var fetchedDet = await fetchNutrients(uri);
        nutrientDet["calories"] += fetchedDet["calories"];
        nutrientDet["totalFat"] += fetchedDet["totalFat"];
        nutrientDet["satFat"] += fetchedDet["satFat"];
        nutrientDet["transFat"] += fetchedDet["transFat"];
        nutrientDet["cholesterol"] += fetchedDet["cholesterol"];
        nutrientDet["sodium"] += fetchedDet["sodium"];
        nutrientDet["totalCarb"] += fetchedDet["totalCarb"];
        nutrientDet["fiber"] += fetchedDet["fiber"];
        nutrientDet["sugar"] += fetchedDet["sugar"];
        nutrientDet["protein"] += fetchedDet["protein"];
        nutrientDet["vitaminD"] += fetchedDet["vitaminD"];
        nutrientDet["calcium"] += fetchedDet["calcium"];
        nutrientDet["iron"] += fetchedDet["iron"];
        nutrientDet["potassium"] += fetchedDet["potassium"];
    }
    
    PLEASE_WAIT.innerHTML = '';

    addNutrientsToDOM(nutrientDet);
    }
 });

function stringToURI(string){
     var uri = encodeURI(string);
     return uri;
 }

function fetchNutrients(uri) {
    const APP_ID = 'dc011a58';
    const APP_KEY = '4194aa970b4abb52f95eeddaaaa19896';
    var fetchedDet = {calories: 0, totalFat: 0, satFat: 0, transFat: 0, cholesterol: 0, sodium: 0, 
        totalCarb: 0, fiber: 0, sugar: 0, protein: 0, vitaminD: 0, calcium: 0, iron: 0, potassium: 0};

    return new Promise(resolve => {
        fetch(`https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${uri}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "d4c748b923mshe6c4b7c9a099352p1269cdjsnc0f84f62d2f1",
                    "x-rapidapi-host": "edamam-edamam-nutrition-analysis.p.rapidapi.com"
                }
            })
            .then(results => results.json())
            .then(data => {
                var tNutrients = data.totalNutrients;
                fetchedDet["calories"] += data.calories;
                if (typeof tNutrients.FAT != "undefined") fetchedDet["totalFat"] = tNutrients.FAT.quantity;
                if (typeof tNutrients.FASAT != "undefined") fetchedDet["satFat"] = tNutrients.FASAT.quantity;
                if (typeof tNutrients.FATRN != "undefined") fetchedDet["transFat"] = tNutrients.FATRN.quantity;
                if (typeof tNutrients.CHOLE != "undefined") fetchedDet["cholesterol"] = tNutrients.CHOLE.quantity;
                if (typeof tNutrients.NA != "undefined") fetchedDet["sodium"] = tNutrients.NA.quantity;
                if (typeof tNutrients.CHOCDF != "undefined") fetchedDet["totalCarb"] = tNutrients.CHOCDF.quantity;
                if (typeof tNutrients.FIBTG != "undefined") fetchedDet["fiber"] = tNutrients.FIBTG.quantity;
                if (typeof tNutrients.SUGAR != "undefined") fetchedDet["sugar"] = tNutrients.SUGAR.quantity;
                if (typeof tNutrients.PROCNT != "undefined") fetchedDet["protein"] = tNutrients.PROCNT.quantity;
                if (typeof tNutrients.VITD != "undefined") fetchedDet["vitaminD"] = tNutrients.VITD.quantity;
                if (typeof tNutrients.CA != "undefined") fetchedDet["calcium"] = tNutrients.CA.quantity;
                if (typeof tNutrients.FE != "undefined") fetchedDet["iron"] = tNutrients.FE.quantity;
                if (typeof tNutrients.K != "undefined") fetchedDet["potassium"] = tNutrients.K.quantity;

                resolve(fetchedDet);
            })
    })
}

function addNutrientsToDOM(nutrientDet){
    SINGLE_MEAL.innerHTML += `
        <div class="nutrient-details">
            <h1>Nutrition Facts<hr></h1>
            <h2>Calories: ${nutrientDet["calories"].toFixed()}g</h2>
            <hr>
            <h3>Total Fat: ${nutrientDet["totalFat"].toFixed()}g</h3>
            <h5>Saturated Fat: ${nutrientDet["satFat"].toFixed()}g</h5>
            <h5>Trans Fat: ${nutrientDet["transFat"].toFixed()}g</h5>
            <h3>Cholesterol: ${nutrientDet["cholesterol"].toFixed()}mg</h3>
            <h3>Sodium: ${nutrientDet["sodium"].toFixed()}mg</span></h3>
            <h3>Total Carbohydrate: ${nutrientDet["totalCarb"].toFixed()}g</h3>
            <h5>Dietary Fiber: ${nutrientDet["fiber"].toFixed()}g</h5>
            <h5>Total Sugars: ${nutrientDet["sugar"].toFixed()}g</h5>
            <h5>Includes - Added Sugars</h5>
            <h3>Protein: ${nutrientDet["protein"].toFixed()}g</h3>
            <h3>Vitamin D: ${nutrientDet["vitaminD"].toFixed()}µg</h3>
            <h3>Calcium: ${nutrientDet["calcium"].toFixed()}mg</h3>
            <h3>Iron: ${nutrientDet["iron"].toFixed()}mg</h3>
            <h3>Potassium: ${nutrientDet["potassium"].toFixed()}mg</h3>
        </div>
    `;
}

/** PANEL FUNCTIONS
Contributor/s: De Guzman, Ana
Description: The following are codes for the panel of the website.
It changes the style of the tab buttons when clicked.
 */ 
// var tabButtons = document.querySelectorAll(".tabContainer .buttonContainer button");
// var tabPanels = document.querySelectorAll(".tabContainer .tabPanel");

// function showPanel(panelIndex){
//     tabButtons.forEach(function(node){
//         node.style.color="";
//         node.style.borderBottom="";
//     });
//     tabButtons[panelIndex].style.color='#3966aa';
//     tabButtons[panelIndex].style.borderBottom='3px solid #5292f3';
//     tabPanels.forEach(function(node){
//         node.style.display="none";
//     });
//     tabPanels[panelIndex].style.display="block";
// }

// showPanel(0);
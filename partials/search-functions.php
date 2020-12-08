<!-- search area -->
<!-- contributor/s: Batara, Eloiza  -->
<!-- description: These are the divs for the search area of the web page -->
<div id="search-area">
    <form id="search-form" action="display-meals.php" method="get">
        <input type="text" id="search-bar" name="keywords" placeholder="Search for a Recipe"/>
    </form>
    
    <div class="btn-container">
        <button type="submit" id="search-btn" form="search-form" value="submit">
            <img src="media/icn_search.png" alt="search icon" class="icon">
        </button>
    </div>

    <div class="btn-container">
        <button id="filter-btn">
            <img src="media/icn_filter.png" alt="filter icon" class="icon">
        </button>
    </div>

<!-- sort section -->
<!-- contributor/s: Siapno, Maria Famela -->
<!-- description: This is the div for the sort section of the web page -->
    <div id="sort-section">
        <p>Sort by:</p>
        <select>
            <option value="name">Name</option>
            <option value="area">Area</option>
            <option value="category">Category</option>
        </select>
    </div>
</div>

<!-- random section -->
<!-- contributor/s: Diaz, Jonathan -->
<!-- description: This is the div for the for the random section of the web page -->
<div id="random-section">
    <p>I don't know what to eat. <a id="random-meal-link" href="#">Surprise me!</a></p>
</div>
            
<!-- filter section -->
<!-- contributor/s: De Guzman, Ana Maria -->
<!-- description: These are the divs for the filter section of the web page -->
<div class="filter-section">
    <div class="filter-div" id="filter-area-div">
        <div id="filter-area-title"></div>
            <form id="filter-area-checkbox" id=>
            </form> 
        </div>
        <div class="filter-div">
            <div id="filter-category-title"></div>
            <form id="filter-category-checkbox">
        </form>
    </div>
</div>
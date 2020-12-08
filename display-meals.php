<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="./style.css">
	<title>Code Bites</title>
</head>
<body>
    <?php include('./partials/logo.php') ?>
    <div class="tabContainer">
        <?php include('./partials/nav.php') ?>
        <div class="panel">
            <?php include('./partials/search-functions.php') ?>
            
            <?php 
                // This gets the keywords that were searched for.
                // See partials > search-functions > lines 5 to 6
                $keywords = $_GET["keywords"];

                // Connect to database
                $connection = mysqli_connect("localhost", "root", "", "codebytes");

                // Fetch data from database
                $query = mysqli_query($connection, "SELECT * FROM meals WHERE mealName LIKE '$keywords'"); // and category =
                // di na ako sure sa next parts
                $data = mysqli_fetch_all($query, MYSQLI_ASSOC);
                $results = json_encode($query);
            ?>

            <!-- display meals area -->
            <!-- contributor/s: Tomilas, Crystelle Hannah -->
            <!-- description: These are the divs for the area of the webpage where the search results are displayed. -->
            <div id="result-title">
                <?php echo "<h2>Search results for $keywords</h2>"; ?>
            </div>
            <div id="result-meals" class="meals"></div>
            <div class="single-meal-info">

            </div>
            
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
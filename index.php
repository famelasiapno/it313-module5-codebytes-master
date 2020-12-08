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
            
            <!-- default message area -->
            <!-- contributor/s: Tomilas, Crystelle Hannah -->
            <!-- description: This is the div for the for the default displayed message upon opening the web page. -->
            <div id="default-message">
                <h1>Welcome to Code Bites!</h1>
                <p>Enter a recipe in the search box to get started,</p>
                <p>or get a random meal by clicking on "Surprise me!"</p>
                <br>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
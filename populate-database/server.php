<?php
// Connect to database
$connection = mysqli_connect("localhost", "root", "", "codebytes");

// Grab the data
$mealID = $_POST['mealID'];
$mealName = $_POST['mealName'];
$thumbnailLink = $_POST['thumbnailLink'];
$category = $_POST['category'];
$area = $_POST['area'];
$instructions = $_POST['instructions'];
$ingredients = $_POST['ingredients'];

// Insert data into database table
$insert = mysqli_query($connection, "INSERT INTO meals (mealID, mealName, thumbnailLink, category, area, instructions, ingredients)
    VALUES('$mealID', '$mealName', '$thumbnailLink', '$category', '$area', '$instructions', '$ingredients')");

// Return response
if ($insert) {
    echo "<div><strong>Success!</strong></div>";
}
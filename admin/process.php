<?php

// $mysqli = new mysqli('localhost', 'root', '', 'codebytes') or die(mysqli_error($mysqli));
// but i don't think we should use localhost

session_start();

include('../partials/connection.php');

// default value for the form
$mealID = '';
$mealName = '';
$thumbnailLink = '';
$category = '';
$area = '';
$instructions = '';
$ingredients = '';

$update = false;

if (isset($_POST['insert'])){ // check if INSERT button was pressed

    // Grab the data
    $mealID = $_POST['mealID'];
    $mealName = $_POST['mealName'];
    $thumbnailLink = $_POST['thumbnailLink'];
    $category = $_POST['category'];
    $area = $_POST['area'];
    $instructions = $_POST['instructions'];
    $ingredients = $_POST['ingredients'];

    // Insert data into database table
    
    // $insert = $mysqli -> query("INSERT INTO meals (mealID, mealName, thumbnailLink, category, area, instructions, ingredients)
    // VALUES ('$mealID', '$mealName', '$thumbnailLink', '$category', '$area', '$instructions', '$ingredients')"
    // or die($mysqli->error));

    mysqli_query($connection, "INSERT INTO meals (mealID, mealName, thumbnailLink, category, area, instructions, ingredients)
    VALUES('$mealID', '$mealName', '$thumbnailLink', '$category', '$area', '$instructions', '$ingredients')");

    $_SESSION['message'] = "The record has been inserted.";
    $_SESSION['alert_type'] = "success";

    header("location: admin.php");
}

if (isset($_GET['delete'])){
    $mealID = $_GET['delete'];

    mysqli_query($connection, "DELETE FROM meals WHERE mealID=$mealID");

    $_SESSION['message'] = "The record has been deleted.";
    $_SESSION['alert_type'] = "danger";

    header("location: admin.php");
}

if (isset($_GET['edit'])){
    $mealID = $_GET['edit'];
    $result = mysqli_query($connection, "SELECT * FROM meals WHERE mealID=$mealID");
    if ($result) { // condition is true only if record exists
        $record = $result->fetch_array();
        $mealID = $record['mealID'];
        $mealName = $record['mealName'];
        $thumbnailLink = $record['thumbnailLink'];
        $category = $record['category'];
        $area = $record['area'];
        $instructions = $record['instructions'];
        $ingredients = $record['ingredients'];
        
        $update = true;
    }
}

if (isset($_POST['update'])){ // check if UPDATE button was pressed

    // Grab the data
    $initialMealID = $_POST['initialMealID'];
    $mealID = $_POST['mealID'];
    $mealName = $_POST['mealName'];
    $thumbnailLink = $_POST['thumbnailLink'];
    $category = $_POST['category'];
    $area = $_POST['area'];
    $instructions = $_POST['instructions'];
    $ingredients = $_POST['ingredients'];

    mysqli_query($connection, "UPDATE meals SET mealID='$mealID', mealName='$mealName', thumbnailLink='$thumbnailLink', category='$category',
        area='$area', instructions='$instructions', ingredients='$ingredients' WHERE mealID=$initialMealID");

    $_SESSION['message'] = "The record has been updated.";
    $_SESSION['alert_type'] = "warning";

    header("location: admin.php");
}
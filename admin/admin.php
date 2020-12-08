<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Admin Module</title>
</head>
<body>
    <?php require_once 'process.php'; ?>

    <?php if(isset($_SESSION['message'])): ?>
        <div class="alert alert-<?=$_SESSION['alert_type']?>">
            <?php
                echo $_SESSION['message'];
                unset($_SESSION['message']);
            ?>
        </div>
    <?php endif ?>

    <div class="container">
        <?php
            include('../partials/connection.php');
            $result = mysqli_query($connection, "SELECT * FROM meals");
        ?>

        <div class="row justify-content-center">
            <table class="table">
                <thead>
                    <tr>
                        <th>Meal ID</th>
                        <th>Meal Name</th>
                        <th>Thumbnail Link</th>
                        <th>Category</th>
                        <th>Area</th>
                        <th>Instructions</th>
                        <th>Ingredients</th>
                        <th colspan="2">Action</th>
                    </tr>
                </thead>

                <?php while ($row = $result->fetch_assoc()): ?>
                    <tr>
                        <td><?php echo $row['mealID'] ?></td>
                        <td><?php echo $row['mealName'] ?></td>
                        <td><?php echo $row['thumbnailLink'] ?></td>
                        <td><?php echo $row['category'] ?></td>
                        <td><?php echo $row['area'] ?></td>
                        <td><?php echo $row['instructions'] ?></td>
                        <td><?php echo $row['ingredients'] ?></td>
                        <td>
                            <a href="admin.php?edit=<?php echo $row['mealID']; ?>" class="btn btn-info"/>Edit</a>
                            <a href="process.php?delete=<?php echo $row['mealID']; ?>" class="btn btn-danger"/>Delete</a>
                        </td>
                    </tr>
                <?php endwhile; ?>
            </table>
        </div>

        <div class="row justify-content-center">
            <form action="process.php" method="POST">
                <input type="hidden" name="initialMealID" value="<?php echo $mealID; ?>" class="form-control"/> 
                <div class="form-group">
                    <label>Meal ID</label> 
                    <input type="number" class="form-control" value="<?php echo $mealID; ?>" name="mealID"/>
                    <!-- actually i dont think we should ask for meal id. like it should probably be auto-generated but let's leave it like this for now -->
                </div>
                <div class="form-group">
                    <label>Meal Name</label>
                    <input type="text" name="mealName" value="<?php echo $mealName; ?>" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Thumbnail Link</label>
                    <input type="text" name="thumbnailLink" value="<?php echo $thumbnailLink; ?>" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <input type="text" name="category" value="<?php echo $category; ?>" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Area</label>
                    <input type="text" name="area" value="<?php echo $area; ?>" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Instructions</label>
                    <input type="text" name="instructions" value="<?php echo $instructions; ?>" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Ingredients</label>
                    <input type="text" name="ingredients" value="<?php echo $ingredients; ?>" class="form-control"/>
                </div>
                <div class="form-group">
                    <?php if($update == true): ?>
                        <button type="submit" class="btn btn-info" name="update">Update</button>
                    <?php else: ?>
                        <button type="submit" class="btn btn-primary" name="insert">Insert</button>
                    <?php endif; ?>
                     <!-- aa-->
                </div>
            </form>
        </div>
    </div>
</body>
</html>
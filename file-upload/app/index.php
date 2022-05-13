<?php
if (isset($_GET['source'])) {
    highlight_file(__FILE__);
    exit();
}
?>

<?php
if (isset($_POST['upload'])) {
    if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        die("upload failed...");
    }

    $tmp_name = $_FILES['image']['tmp_name'];
    $name = $_FILES['image']['name'];

    if (move_uploaded_file($_FILES['image']['tmp_name'], './uploads/' . $name)) {
        echo "Successfully uploaded!!\n";
        echo 'link: ' . "<a href=${$_FILES['image']['tmp_name']}/uploads/$name>Here</a>";
    } else {
        echo 'Image file only!! Don\'t hack!';
    }
    exit();
}
    
?>

<html>

<head>
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <div style="text-align: center;">
        <form action="index.php" method="post" enctype="multipart/form-data">
            <p>Image Upload</p>
            <input type="file" name="image">
            <input type="submit" name="upload" value="upload">
        </form>
    </div>
</body>

</html>


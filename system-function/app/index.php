<?php
if (isset($_GET['source'])) {
    highlight_file(__FILE__);
    exit();
}

?>

<html>

<head>
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <div style="text-align: center;">
        <form action="/" method="POST">
            <label for="ip">IP address:</label>
            <input type="text" name="ip" required placeholder="8.8.8.8">
            <button type="submit">Submit</button>
        </form>
        <?php
        if (isset($_POST['ip'])) {
            $ip = $_POST['ip'];
            echo system("ping -c 3 ${ip}");
        }

        ?>
    </div>
</body>

</html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <header>
        <?php foreach ($route_names as $key => $value) : ?>
            <a href="<?= $key ?>"><?= $value ?></a>
        <?php endforeach ?>
    </header>
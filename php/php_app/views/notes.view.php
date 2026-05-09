<?php require('partials/head.php') ?>

<h1>Notes Page</h1>

<?php foreach ($notes as $note) : ?>
    <h2><?= $note['title'] ?></h2>
    <p><?= $note['description'] ?></p>
<?php endforeach; ?>

<?php require('partials/foot.php') ?>
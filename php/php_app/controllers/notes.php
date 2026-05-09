<?php

$id = $_GET['id'] ?? null;

$query = "select * from notes";
$params = ['user_id' => $user['id']];
$notes = $db->query("select * from notes where user_id = :user_id", $params);

require('./views/notes.view.php');

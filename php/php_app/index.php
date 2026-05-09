<?php

require('./database/mysql.php');

$config = require('./config/dev.config.php');
$db = new Database($config['database']);

// Current User
$user = $db->query('select * from users where id = :id', ['id' => 1], true);

require('./routes/web.php');

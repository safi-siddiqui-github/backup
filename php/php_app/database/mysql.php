<?php

class Database
{

    // public $dsn = "mysql:host=localhost;port=3306;dbname=php_app;user=root;charset=utf8mb4";
    public $config;
    public function __construct($config)
    {
        $this->config = $config;
    }

    public function pdo()
    {
        // $dsn = "mysql:host={$this->config['host']};post={$this->config['port']};dbname={$this->config['dbname']}";
        $dsn = "mysql:" . http_build_query($this->config, '', ';');

        return new PDO($dsn, 'root', '', [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }

    public function query($string, $params = [], $single = false)
    {
        $statement = $this->pdo()->prepare($string);
        $statement->execute($params);
        if($single){
            return $statement->fetch();
        } else {
            return $statement->fetchAll();
        }
    }
}

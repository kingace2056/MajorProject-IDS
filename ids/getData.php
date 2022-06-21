<?php

header("Access-Control-Allow-Origin: *");

$data = file_get_contents('http://localhost/ids/datastorage.txt');

// echo str_replace(' ', PHP_EOL, $data);
echo $data;
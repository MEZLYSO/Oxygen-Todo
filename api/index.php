<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'feature/User/UserController.php';

$method = $_SERVER['REQUEST_METHOD'];
$userController = new UserController();

  if($method === 'GET'){
    $userController->index();
  }



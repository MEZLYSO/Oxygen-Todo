<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');

require __DIR__ . '/features/User/UserModel.php';
require __DIR__ . '/features/User/UserController.php';
require __DIR__ . '/features/User/UserRoutes.php';
require __DIR__ . '/features/Folder/FolderModel.php';
require __DIR__ . '/features/Folder/FolderController.php';
require __DIR__ . '/features/Folder/FolderRoutes.php';
require __DIR__ . '/features/Auth/AuthModel.php';
require __DIR__ . '/features/Auth/AuthController.php';
require __DIR__ . '/features/Auth/AuthRoutes.php';
require __DIR__ . '/features/Note/NoteModel.php';
require __DIR__ . '/features/Note/NoteController.php';
require __DIR__ . '/features/Note/NoteRoutes.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$body   = json_decode(file_get_contents('php://input'), true);

$db = new PDO('sqlite:' . __DIR__ . '/database.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec('PRAGMA foreign_keys = ON;');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$userModel  = new UserModel($db);
$userCtrl   = new UserController($userModel);

$folderModel  = new FolderModel($db);
$folderCtrl   = new FolderController($folderModel);

$authModel  = new AuthModel($db);
$authCtrl   = new AuthController($authModel);

$noteModel  = new noteModel($db);
$noteCtrl   = new noteController($noteModel);

$FoundRouter = UserRoutes($method, $uri, $body, $userCtrl);
if (!$FoundRouter) {
  $FoundRouter = FolderRoutes($method, $uri, $body, $folderCtrl);
}
if (!$FoundRouter) {
  $FoundRouter = AuthRoutes($method, $uri, $body, $authCtrl);
}
if (!$FoundRouter) {
  $FoundRouter = NoteRoutes($method, $uri, $body, $noteCtrl);
}


if (!$FoundRouter) {
  http_response_code(404);
  echo json_encode(["error" => "Endpoint not found"]);
}

<?php

require_once __DIR__ . '/../../utils/Validator.php';
require_once __DIR__ . '/../../utils/Errors.php';

class UserController
{
  private $model;

  public function __construct($model)
  {
    $this->model = $model;
  }

  public function getUsers()
  {
    $users = $this->model->getAll();
    echo json_encode($users);
  }

  public function findUserById($id)
  {
    $user = $this->model->findById($id);
    if (!$user) {
      handleError(404, "user not found");
      return;
    }
    echo json_encode($user);
  }

  public function createUser($body)
  {
    if (!validatorBody($body, ["username", "email", "password"])) {
      handleError(400, "data incomplete");
      return;
    }
    if (!validatorName($body["username"])) {
      handleError(400, "invalid username");
      return;
    }
    if (!validatorEmail($body["email"])) {
      handleError(400, "email invalid");
      return;
    }
    if (!validatorPassword($body["password"])) {
      handleError(400, "password invalid");
      return;
    }
    $user = $this->model->findByEmail($body["email"]);
    if ($user) {
      handleError(400, "email in use");
      return;
    }
    $this->model->create($body['username'], $body['email'], $body['password']);
    http_response_code(201);
    echo json_encode(['message' => 'user created']);
  }

  public function updateUser($body)
  {
    if (!validatorBody($body, ["idUser", "username", "email", "password"])) {
      handleError(400, "data incomplete");
      return;
    }
    if (!validatorName($body["username"])) {
      handleError(400, "invalid username");
      return;
    }
    if (!validatorEmail($body["email"])) {
      handleError(400, "email invalid");
      return;
    }
    if (!validatorPassword($body["password"])) {
      handleError(400, "password invalid");
      return;
    }
    $this->model->update($body['idUser'], $body['username'], $body['email'], $body['password']);
    echo json_encode(['message' => 'user updated']);
  }

  public function updatePremium($body)
  {
    if (!validatorBody($body, ["idUser", "premium"])) {
      handleError(400, "data incomplete");
      return;
    }
    $user = $this->model->findById($body["idUser"]);
    if (!$user) {
      handleError(404, "user not found");
      return;
    }
    $premium = $body["premium"];
    $this->model->updatePremium($body["idUser"], $premium);
    echo json_encode(['message' => 'premium updated']);
  }

  public function destroyUser($id)
  {
    $user = $this->model->findById($id);
    if (!$user) {
      handleError(404, "user not found");
      return;
    }
    $this->model->delete($id);
    echo json_encode(['message' => 'user deleted']);
  }
}

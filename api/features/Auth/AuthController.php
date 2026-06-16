<?php

class AuthController
{

  private $model;

  public function __construct($model)
  {
    $this->model = $model;
  }

  public function loginUser($body)
  {
    $user = $this->model->findByEmail($body["email"]);
    if (!$user) {
      handleError(404, "user not found");
      return;
    }
    if ($user['password'] != $body['password']) {
      handleError(200, "login failed");
      return;
    }
    echo json_encode($user);
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
}

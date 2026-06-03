<?php
require_once __DIR__ . '/../../utils/response.php';
require_once __DIR__ . '/UserModel.php';

class UserController {
    private UserModel $model;

    public function __construct() {
        $this->model = new UserModel();
    }

    public function index(): void {
        $resp = $this->model->findAll();
        respond(200, $resp);
    }
}




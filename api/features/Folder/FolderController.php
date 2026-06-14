<?php

require_once __DIR__ . '/../../utils/Errors.php';
require_once __DIR__ . '/../../utils/Validator.php';

class FolderController
{
  private $model;

  public function __construct($model)
  {
    $this->model = $model;
  }

  public function findAllFolders()
  {
    $folders = $this->model->findAll();
    echo json_encode($folders);
  }

  public function findFoldersByUser($idUser)
  {
    $folders = $this->model->findByIdUser($idUser);
    if (!$folders) {
      handleError(400, "folders not found");
      return;
    }
    echo json_encode($folders);
  }

  public function createFolder($body)
  {
    $this->model->create($body['title'], $body['idUser']);
    http_response_code(201);
    echo json_encode(['message' => 'folder created']);
  }

  public function updateTitleFolder($body)
  {
    $this->model->updateTitle($body['title'], $body['idFolder']);
    http_response_code(200);
    echo json_encode(['message' => 'folder updated']);
  }

  public function deleteFolder($id)
  {
    $folder = $this->model->findById($id);
    if (!$folder) {
      handleError(404, "folder not found");
      return;
    }
    $this->model->delete($id);
    http_response_code(200);
    echo json_encode(['message' => 'folder deleted']);
  }
}

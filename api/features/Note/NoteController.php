<?php

require_once __DIR__ . '/../../utils/Errors.php';
require_once __DIR__ . '/../../utils/Validator.php';

class NoteController
{
  private $model;

  public function __construct($model)
  {
    $this->model = $model;
  }

  public function getNotes()
  {
    $notes = $this->model->getAll();
    echo json_encode($notes);
  }

  public function getAllByFolderId($idFolder)
  {
    $notes = $this->model->getAllByFolderId($idFolder);
    echo json_encode($notes);
  }

  public function deleteNoteById($idNote)
  {
    $this->model->delete($idNote);
    echo json_encode(['message' => 'note delete']);
  }

  public function createNote($body)
  {
    if (!validatorBody($body, ["title", "content", "idFolder"])) {
      handleError(400, "data incomplete");
      return;
    }
    $result = $this->model->create($body['title'], $body['content'], $body['idFolder']);
    if (isset($result['error'])) {
      handleError(404, $result['error']);
      return;
    }
    http_response_code(201);
    echo json_encode(['message' => 'note created']);
  }
}

<?php

function NoteRoutes($method, $uri, $body, $noteCtrl)
{

  if ($method == 'GET' && $uri == '/note') {
    $noteCtrl->getNotes();
    return true;
  }

  if ($method == 'POST' && $uri == '/note') {
    $noteCtrl->createNote($body);
    return true;
  }

  if ($method == 'GET' && preg_match('#^/note/(\d+)$#', $uri, $matches)) {
    $id = $matches[1];
    $noteCtrl->getAllByFolderId($id);
    return true;
  }

  if ($method == 'DELETE' && preg_match('#^/note/(\d+)$#', $uri, $matches)) {
    $id = $matches[1];
    $noteCtrl->deleteNoteById($id);
    return true;
  }
}

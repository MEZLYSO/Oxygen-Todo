<?php

class NoteModel
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function getAll()
  {
    return $this->db->query("SELECT * FROM note")->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getAllByFolderId($idFolder)
  {
    $stmt = $this->db->prepare("SELECT * FROM note WHERE idFolder=?");
    $stmt->execute([$idFolder]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function create($title, $content, $idFolder)
  {
    try {
      $stmt = $this->db->prepare("INSERT INTO note(title,content,idFolder) VALUES (?,?,?)");
      return $stmt->execute([$title, $content, $idFolder]);
    } catch (PDOException $e) {
      if ($e->getCode() === '23000') {
        return ['error' => 'folder not exist'];
      }
      return ['error' => 'error in create note'];
    }
  }

  public function delete($id)
  {
    $stmt = $this->db->prepare("DELETE FROM note WHERE idNote = ?");
    return $stmt->execute([$id]);
  }
}

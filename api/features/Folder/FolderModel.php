<?php

class FolderModel
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function findAll()
  {
    return $this->db->query("SELECT * FROM folder")->fetchAll(PDO::FETCH_ASSOC);
  }

  public function findByIdUser($idUser)
  {
    $stmt = $this->db->prepare("SELECT * FROM folder WHERE idUser=?");
    $stmt->execute([$idUser]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function findById($id)
  {
    $stmt = $this->db->prepare("SELECT * FROM folder WHERE idFolder=?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function create($title, $idUser)
  {
    $stmt = $this->db->prepare("INSERT INTO folder (title,idUser) VALUES (?, ?)");
    return $stmt->execute([$title, $idUser]);
  }

  public function updateTitle($title, $idFolder)
  {
    $stmt = $this->db->prepare("UPDATE folder SET title=? WHERE idFolder=?");
    return $stmt->execute([$title, $idFolder]);
  }

  public function delete($id)
  {
    $stmt = $this->db->prepare("DELETE FROM folder WHERE idFolder = ?");
    return $stmt->execute([$id]);
  }
}

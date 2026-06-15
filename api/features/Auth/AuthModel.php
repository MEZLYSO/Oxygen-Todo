<?php

class AuthModel
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function findByEmail($email)
  {
    $stmt = $this->db->prepare("SELECT * FROM user WHERE email=?");
    $stmt->execute([$email]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function findById($id)
  {
    $stmt = $this->db->prepare("SELECT * FROM user WHERE idUser=?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
}

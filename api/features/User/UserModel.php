<?php

class UserModel {
    private $db;

     function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        return $this->db->query("SELECT idUser,username,email,premium FROM user")->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findById($id) {
     $stmt = $this->db->prepare("SELECT IdUser,username,email,premium FROM user WHERE idUser=?");
     $stmt->execute([$id]);
     return $stmt->fetch(PDO::FETCH_ASSOC); 
    } 

    public function findByEmail($email) {
     $stmt = $this->db->prepare("SELECT * FROM user WHERE email=?");
     $stmt->execute([$email]);
     return $stmt->fetch(PDO::FETCH_ASSOC); 
    } 

    public function create($username, $email, $password) {
        $stmt = $this->db->prepare("INSERT INTO user (username, email, password, premium) VALUES (?, ?, ?, 0)");
        return $stmt->execute([$username, $email, $password]);
    }

    public function updatePremium($id, $premium) {
        $stmt = $this->db->prepare("UPDATE user SET premium=? WHERE idUser=?");
        return $stmt->execute([$premium, $id]);
    }

    public function update($id, $username, $email, $password) {
        $stmt = $this->db->prepare("UPDATE user SET username=?, email=?, password=? WHERE idUser=?");
        return $stmt->execute([$username, $email, $password, $id]);
    }

  public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM user WHERE idUser = ?");
        return $stmt->execute([$id]);
    }
}

<?php 

function UserRoutes($method, $uri, $body, $userCtrl) {

    if ($method == 'GET' && $uri == '/user') {
        $userCtrl->getUsers();
        return true; 
    }

    if ($method == 'GET' && preg_match('#^/user/(\d+)$#', $uri, $matches)) {
        $id = $matches[1];
        $userCtrl->findUserById($id);
        return true;
    }

    if ($method == 'POST' && $uri == '/user') {
        $userCtrl->createUser($body);
        return true;
    }

    if ($method == 'PUT' && $uri == '/user') {
        $userCtrl->updateUser($body);
        return true;
    }

    if ($method == 'PUT' && $uri == '/user/premium') {
        $userCtrl->updatePremium($body);
        return true;
    }

    if ($method == 'DELETE' && preg_match('#^/user/(\d+)$#', $uri, $matches)) {
        $id = $matches[1];
        $userCtrl->destroyUser($id);
        return true;
    }

    return false; 
}



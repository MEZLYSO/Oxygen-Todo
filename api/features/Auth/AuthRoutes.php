<?php

function AuthRoutes($method, $uri, $body, $authCtrl)
{

  if ($method == 'POST' && $uri == '/login') {
    $authCtrl->loginUser($body);
    return true;
  }

  if ($method == 'GET' && preg_match('#^/auth/(\d+)$#', $uri, $matches)) {
    $id = $matches[1];
    $authCtrl->findUserById($id);
    return true;
  }

  return false;
}

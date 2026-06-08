<?php 

function AuthRoutes($method, $uri, $body, $authCtrl) {

    if ($method == 'POST' && $uri == '/login') {
        $authCtrl->loginUser($body);
        return true; 
    }

    return false; 
}



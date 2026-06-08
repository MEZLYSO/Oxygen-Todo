<?php 

function FolderRoutes($method, $uri, $body, $folderCtrl) {

    if ($method == 'GET' && $uri == '/folder') {
        $folderCtrl->getFolders();
        return true; 
    }

    if ($method == 'GET' && preg_match('#^/folder/(\d+)$#', $uri, $matches)) {
        $id = $matches[1];
        $folderCtrl->getFoldersByUser($id);
        return true;
    }

    if ($method == 'POST' && $uri == '/folder') {
        $folderCtrl->createFolder($body);
        return true;
    }

    if ($method == 'DELETE' && preg_match('#^/folder/(\d+)$#', $uri, $matches)) {
        $id = $matches[1];
        $folderCtrl->deleteFolder($id);
        return true;
    }


    return false; 
}



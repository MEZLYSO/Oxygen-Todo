<?php

function handleError($codeStatus,$message){
  http_response_code($codeStatus);
        echo json_encode([
            "message" => $message
        ]);
}

